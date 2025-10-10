/////////////////////////////////////////////////////////////////
// Swatch Legend Generator v1.0
//>=--------------------------------------
//
// DESCRIPTION:
//   Automatically generates a professional color legend from your Illustrator
//   swatches panel. Creates a grid of color squares with detailed color
//   information overlaid on each swatch.
//
// FEATURES:
//   • Generates organized grid layout of selected swatches
//   • Displays swatch name and comprehensive color values
//   • Shows HEX, RGB, and CMYK color codes
//   • Automatically adjusts text color (black/white) for readability
//   • Works with RGB, CMYK, Grayscale, and Spot colors
//   • Fully customizable dimensions and spacing
//
// USAGE:
//   1. Select swatches in the Swatches panel (or leave blank for all)
//   2. Run script: File → Scripts → SwatchLegend
//   3. Choose your options in the settings dialog
//   4. Color legend will be generated on your artboard
//
// COMPATIBILITY:
//   Adobe Illustrator CC and later
//
// AUTHOR:
//   Built with insights from the Illustrator scripting community
//   Refactored and modernized 2025
//
//>=--------------------------------------
// COPYRIGHT & LICENSE:
//   Copyright © 2025 Huement.com - All Rights Reserved
//   
//   This script is commercial software. Unauthorized copying, distribution,
//   modification, or use of this script is strictly prohibited without
//   written permission from Huement.com.
//   
//   Licensed users may use this script for personal or commercial projects.
//   Redistribution or resale of this script is not permitted.
//   
//   For licensing inquiries: https://huement.com
//////////////////////////////////////////////////////////////////

// ===== LOAD COLOR NAMES DATABASE =====
var colorNamesDatabase = null;

// Load color names from JSON file
try {
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var colorNamesFile = new File(scriptFolder + "/colornames.min.json");
    
    if (colorNamesFile.exists) {
        colorNamesFile.open('r');
        var jsonString = colorNamesFile.read();
        colorNamesFile.close();
        colorNamesDatabase = eval('(' + jsonString + ')');
    }
} catch (e) {
    // If file doesn't load, color naming will fall back to basic naming
}

// ===== CONFIGURATION =====
var doc = activeDocument;
var swatches = doc.swatches.getSelected();

// If no swatches selected, use all swatches
if (swatches.length === 0) {
    swatches = doc.swatches.getAll();
}

// Grid layout settings
var columns = 4;                    // Number of columns in the grid
var swatchWidth = 150;              // Width of each color swatch
var swatchHeight = 120;             // Height of each color swatch
var horizontalPadding = 10;         // Space between swatches horizontally
var verticalPadding = 10;           // Space between swatches vertically

// Text settings
var textSize = 10;                  // Text size in points
var textHorizontalPadding = 10;     // Text padding from left/right edges
var textVerticalPadding = 10;       // Text padding from top/bottom edges

// Text colors for labels
var blackText = new GrayColor();
var whiteText = new GrayColor();
blackText.gray = 100;
whiteText.gray = 0;

// ===== SETTINGS DIALOG =====
var scriptName = 'Swatch Legend Generator';
var win = new Window('dialog', scriptName + ' \u00A9 huement.com');
win.orientation = 'column';
win.alignChildren = 'fill';
win.preferredSize.width = 350; // Make dialog wider so title doesn't get cut off

// Settings panel
var settingsPanel = win.add('panel', undefined, 'Display Options');
settingsPanel.orientation = 'column';
settingsPanel.alignChildren = 'left';
settingsPanel.margins = [10, 15, 10, 10];

// Color format checkboxes
var colorFormatsGroup = settingsPanel.add('group');
colorFormatsGroup.orientation = 'column';
colorFormatsGroup.alignChildren = 'left';

var hexCheckbox = colorFormatsGroup.add('checkbox', undefined, 'Show HEX colors');
hexCheckbox.value = true; // Checked by default

var rgbCheckbox = colorFormatsGroup.add('checkbox', undefined, 'Show RGB values');
rgbCheckbox.value = true; // Checked by default

var cmykCheckbox = colorFormatsGroup.add('checkbox', undefined, 'Show CMYK values');
cmykCheckbox.value = false; // NOT checked by default

var labCheckbox = colorFormatsGroup.add('checkbox', undefined, 'Show LAB values');
labCheckbox.value = false; // NOT checked by default

// Visual options
settingsPanel.add('statictext', undefined, ''); // Spacer

var bordersCheckbox = settingsPanel.add('checkbox', undefined, 'Show borders around swatches');
bordersCheckbox.value = true; // Checked by default

// Advanced options
settingsPanel.add('statictext', undefined, ''); // Spacer

var colorNamesCheckbox = settingsPanel.add('checkbox', undefined, 'Use descriptive color names');
colorNamesCheckbox.value = false; // NOT checked by default

var hueSortCheckbox = settingsPanel.add('checkbox', undefined, 'Sort by hue');
hueSortCheckbox.value = false; // NOT checked by default

// Buttons
var buttonGroup = win.add('group');
buttonGroup.orientation = 'row';
buttonGroup.alignChildren = 'center';

var cancelButton = buttonGroup.add('button', undefined, 'Cancel');
var okButton = buttonGroup.add('button', undefined, 'Generate', {name: 'ok'});

cancelButton.onClick = function() {
    win.close();
};

var userSettings = null;

okButton.onClick = function() {
    userSettings = {
        showHex: hexCheckbox.value,
        showRgb: rgbCheckbox.value,
        showCmyk: cmykCheckbox.value,
        showLab: labCheckbox.value,
        showBorders: bordersCheckbox.value,
        useColorNames: colorNamesCheckbox.value,
        sortByHue: hueSortCheckbox.value
    };
    win.close();
};

// Show dialog
win.center();
win.show();

// If user cancelled, exit
if (userSettings === null) {
    // User cancelled
} else {
    // Build color formats array based on user selection
    var colorFormatsToDisplay = [];
    if (userSettings.showHex) colorFormatsToDisplay.push("HEX");
    if (userSettings.showRgb) colorFormatsToDisplay.push("RGB");
    if (userSettings.showCmyk) colorFormatsToDisplay.push("CMYK");
    if (userSettings.showLab) colorFormatsToDisplay.push("LAB");

    // Sort swatches by hue if requested
    if (userSettings.sortByHue) {
        swatches = sortSwatchesByHue(swatches);
    }

    // ===== MAIN SCRIPT =====
    activeDocument.layers[0].locked = false;

    // Create main group to hold all swatches
    var legendGroup = doc.groupItems.add();
    legendGroup.name = "Swatch Legend";
    legendGroup.move(doc, ElementPlacement.PLACEATBEGINNING);

    // Generate a swatch card for each selected color
    for (var index = 0, totalSwatches = swatches.length; index < totalSwatches; index++) {
        var currentSwatch = swatches[index];
        var swatchGroup = doc.groupItems.add();
        swatchGroup.name = currentSwatch.name;
        
        // Calculate position in grid
        var xPosition = (swatchWidth + horizontalPadding) * (index % columns);
        var yPosition = (swatchHeight + verticalPadding) * (Math.round(((index + 2) + 0.03) / columns)) * -1;
        
        // Create colored rectangle
        var colorRectangle = doc.pathItems.rectangle(yPosition, xPosition, swatchWidth, swatchHeight);
        var swatchColor = currentSwatch.color;
        colorRectangle.fillColor = swatchColor;
        
        // Add border if enabled
        if (userSettings.showBorders) {
            colorRectangle.stroked = true;
            colorRectangle.strokeColor = blackText;
            colorRectangle.strokeWidth = 1;
        } else {
            colorRectangle.stroked = false;
        }
        
        // Create text area for color information
        var textAreaBounds = doc.pathItems.rectangle(
            yPosition - textVerticalPadding,
            xPosition + textHorizontalPadding,
            swatchWidth - (2 * textHorizontalPadding),
            swatchHeight - (2 * textVerticalPadding)
        );
        var textFrame = doc.textFrames.areaText(textAreaBounds);
        
        // Determine swatch name
        var displayName = currentSwatch.name;
        if (userSettings.useColorNames) {
            displayName = getColorName(swatchColor);
        }
        
        // Set text content and styling
        textFrame.contents = displayName + "\r" + formatSwatchColorValues(swatchColor);
        textFrame.textRange.fillColor = isDarkColor(swatchColor) ? whiteText : blackText;
        textFrame.textRange.size = textSize;
        
        // Group the rectangle and text together
        colorRectangle.move(swatchGroup, ElementPlacement.PLACEATBEGINNING);
        textFrame.move(swatchGroup, ElementPlacement.PLACEATBEGINNING);
        swatchGroup.move(legendGroup, ElementPlacement.PLACEATEND);
    }
}

// ===== FUNCTIONS =====

/**
 * Sorts swatches by their hue value
 * @param {Array} swatchArray - Array of swatches to sort
 * @returns {Array} Sorted array of swatches
 */
function sortSwatchesByHue(swatchArray) {
    var swatchesWithHue = [];
    
    for (var i = 0; i < swatchArray.length; i++) {
        var hue = getColorHue(swatchArray[i].color);
        swatchesWithHue.push({
            swatch: swatchArray[i],
            hue: hue
        });
    }
    
    // Sort by hue value
    swatchesWithHue.sort(function(a, b) {
        return a.hue - b.hue;
    });
    
    // Extract sorted swatches
    var sortedSwatches = [];
    for (var i = 0; i < swatchesWithHue.length; i++) {
        sortedSwatches.push(swatchesWithHue[i].swatch);
    }
    
    return sortedSwatches;
}

/**
 * Gets the hue value (0-360) of a color
 * @param {Color} color - The color to analyze
 * @returns {number} Hue value in degrees (0-360)
 */
function getColorHue(color) {
    // Convert any color to RGB first
    var rgb = convertColorToRGB(color);
    
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    
    var hue = 0;
    
    if (delta === 0) {
        hue = 0; // Achromatic (gray)
    } else if (max === r) {
        hue = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
        hue = 60 * (((b - r) / delta) + 2);
    } else {
        hue = 60 * (((r - g) / delta) + 4);
    }
    
    if (hue < 0) hue += 360;
    
    return hue;
}

/**
 * Converts any color type to RGB array
 * @param {Color} color - The color to convert
 * @returns {Array} RGB values [r, g, b]
 */
function convertColorToRGB(color) {
    if (!color.typename) {
        return [0, 0, 0];
    }
    
    if (color.typename === "SpotColor") {
        return convertColorToRGB(color.spot.color);
    }
    
    if (color.typename === "RGBColor") {
        return [color.red, color.green, color.blue];
    }
    
    // Convert from other color spaces to RGB
    var sourceSpace, colorComponents;
    
    switch (color.typename) {
        case "CMYKColor":
            sourceSpace = ImageColorSpace.CMYK;
            colorComponents = [color.cyan, color.magenta, color.yellow, color.black];
            break;
        case "LabColor":
            sourceSpace = ImageColorSpace.LAB;
            colorComponents = [color.l, color.a, color.b];
            break;
        case "GrayColor":
            sourceSpace = ImageColorSpace.GrayScale;
            colorComponents = [color.gray];
            break;
        default:
            return [0, 0, 0];
    }
    
    var rgbValues = app.convertSampleColor(
        sourceSpace,
        colorComponents,
        ImageColorSpace.RGB,
        ColorConvertPurpose.previewpurpose
    );
    
    return [Math.round(rgbValues[0]), Math.round(rgbValues[1]), Math.round(rgbValues[2])];
}

/**
 * Gets a descriptive color name based on color values
 * Uses the color names database for accurate naming
 * @param {Color} color - The color to name
 * @returns {string} Descriptive color name
 */
function getColorName(color) {
    var rgb = convertColorToRGB(color);
    var r = Math.round(rgb[0]);
    var g = Math.round(rgb[1]);
    var b = Math.round(rgb[2]);
    
    // Convert to hex (without #)
    var hexR = (r < 16 ? "0" : "") + r.toString(16);
    var hexG = (g < 16 ? "0" : "") + g.toString(16);
    var hexB = (b < 16 ? "0" : "") + b.toString(16);
    var hexColor = (hexR + hexG + hexB).toLowerCase();
    
    // If we have the color names database loaded
    if (colorNamesDatabase !== null) {
        // First check for exact match
        if (colorNamesDatabase[hexColor]) {
            return colorNamesDatabase[hexColor];
        }
        
        // If no exact match, find closest color
        var closestDistance = Infinity;
        var closestName = "Unknown Color";
        
        for (var hex in colorNamesDatabase) {
            if (colorNamesDatabase.hasOwnProperty(hex)) {
                // Convert hex to RGB
                var dbR = parseInt(hex.substr(0, 2), 16);
                var dbG = parseInt(hex.substr(2, 2), 16);
                var dbB = parseInt(hex.substr(4, 2), 16);
                
                // Calculate Euclidean distance
                var distance = Math.sqrt(
                    Math.pow(r - dbR, 2) +
                    Math.pow(g - dbG, 2) +
                    Math.pow(b - dbB, 2)
                );
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestName = colorNamesDatabase[hex];
                }
                
                // If we found a very close match, stop searching
                if (closestDistance < 5) {
                    break;
                }
            }
        }
        
        return closestName;
    }
    
    // Fallback to basic naming if database not loaded
    // Calculate HSL for basic color naming
    var rNorm = r / 255;
    var gNorm = g / 255;
    var bNorm = b / 255;
    
    var max = Math.max(rNorm, gNorm, bNorm);
    var min = Math.min(rNorm, gNorm, bNorm);
    var delta = max - min;
    
    var h = 0, s = 0, l = (max + min) / 2;
    
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        
        if (max === rNorm) {
            h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
        } else if (max === gNorm) {
            h = ((bNorm - rNorm) / delta + 2) / 6;
        } else {
            h = ((rNorm - gNorm) / delta + 4) / 6;
        }
    }
    
    h *= 360;
    s *= 100;
    l *= 100;
    
    // Check for achromatic colors first
    if (s < 10) {
        if (l > 95) return "White";
        if (l > 85) return "Light Gray";
        if (l > 70) return "Silver";
        if (l > 50) return "Gray";
        if (l > 30) return "Dark Gray";
        if (l > 15) return "Charcoal";
        return "Black";
    }
    
    // Determine base hue name
    var hueName = "";
    if (h >= 0 && h < 15) hueName = "Red";
    else if (h >= 15 && h < 45) hueName = "Orange";
    else if (h >= 45 && h < 70) hueName = "Yellow";
    else if (h >= 70 && h < 150) hueName = "Green";
    else if (h >= 150 && h < 200) hueName = "Cyan";
    else if (h >= 200 && h < 260) hueName = "Blue";
    else if (h >= 260 && h < 290) hueName = "Purple";
    else if (h >= 290 && h < 330) hueName = "Magenta";
    else hueName = "Red";
    
    // Add lightness modifier
    var modifier = "";
    if (l > 80) modifier = "Pale ";
    else if (l > 65) modifier = "Light ";
    else if (l < 30) modifier = "Dark ";
    else if (l < 15) return "Deep ";
    
    // Add saturation modifier for muted colors
    if (s < 40 && l > 40 && l < 80) {
        modifier = "Muted ";
    }
    
    return modifier + hueName;
}

/**
 * Formats color values for display on the swatch
 * @param {Color} color - The color object to format
 * @param {Spot} spotColor - Optional spot color reference
 * @returns {string} Formatted color values string
 */
function formatSwatchColorValues(color, spotColor) {
    if (!color.typename) {
        return "Non-Standard Color Type";
    }
    
    // Handle spot colors recursively
    if (color.typename === "SpotColor") {
        return formatSwatchColorValues(color.spot.color, color.spot);
    }
    
    // Determine source color space and components
    var sourceColorSpace, colorComponents;
    
    switch (color.typename) {
        case "RGBColor":
            sourceColorSpace = ImageColorSpace.RGB;
            colorComponents = [color.red, color.green, color.blue];
            break;
        case "CMYKColor":
            sourceColorSpace = ImageColorSpace.CMYK;
            colorComponents = [color.cyan, color.magenta, color.yellow, color.black];
            break;
        case "LabColor":
            sourceColorSpace = ImageColorSpace.LAB;
            colorComponents = [color.l, color.a, color.b];
            break;
        case "GrayColor":
            sourceColorSpace = ImageColorSpace.GrayScale;
            colorComponents = [color.gray];
            break;
        default:
            return "Unknown Color Type";
    }
    
    // Convert and format colors for each output format
    var formattedColors = [];
    
    for (var i = 0; i < colorFormatsToDisplay.length; i++) {
        var format = colorFormatsToDisplay[i];
        var colorValues;
        
        if (format === "HEX") {
            colorValues = convertToHexFormat(color);
        } else if (format === "LAB") {
            // Convert to LAB
            var targetColorSpace = ImageColorSpace.LAB;
            var labValues = app.convertSampleColor(
                sourceColorSpace,
                colorComponents,
                targetColorSpace,
                ColorConvertPurpose.previewpurpose
            );
            colorValues = formatLABValues(labValues);
        } else {
            // Convert to target color space
            var targetColorSpace = ImageColorSpace[format];
            colorValues = app.convertSampleColor(
                sourceColorSpace,
                colorComponents,
                targetColorSpace,
                ColorConvertPurpose.previewpurpose
            );
            
            if (format === "RGB") {
                colorValues = formatRGBValues(colorValues);
            } else if (format === "CMYK") {
                colorValues = formatCMYKValues(colorValues);
            }
        }
        
        formattedColors.push(colorValues);
    }
    
    return formattedColors.join("");
}

/**
 * Converts color to HEX format
 * @param {Color} color - The color to convert
 * @returns {string} Formatted HEX color string
 */
function convertToHexFormat(color) {
    var rgbValues;
    
    // Check if document is in CMYK mode and convert if needed
    if (app.activeDocument.documentColorSpace === DocumentColorSpace.CMYK) {
        var cmykArray = [color.cyan, color.magenta, color.yellow, color.black];
        rgbValues = app.convertSampleColor(
            ImageColorSpace.CMYK,
            cmykArray,
            ImageColorSpace.RGB,
            ColorConvertPurpose.defaultpurpose
        );
    } else {
        rgbValues = [color.red, color.green, color.blue];
    }
    
    // Convert to hex and pad with zeros
    var hexComponents = [];
    for (var i = 0; i < 3; i++) {
        var hexValue = Math.round(rgbValues[i]).toString(16).toUpperCase();
        if (hexValue.length === 1) {
            hexValue = "0" + hexValue;
        }
        hexComponents.push(hexValue);
    }
    
    return "HEX #" + hexComponents.join("") + "\r";
}

/**
 * Formats RGB values for display
 * @param {Array} rgbArray - Array of RGB values [r, g, b]
 * @returns {string} Formatted RGB string
 */
function formatRGBValues(rgbArray) {
    return "R " + Math.round(rgbArray[0]) + 
           " G " + Math.round(rgbArray[1]) + 
           " B " + Math.round(rgbArray[2]) + "\r";
}

/**
 * Formats CMYK values for display
 * @param {Array} cmykArray - Array of CMYK values [c, m, y, k]
 * @returns {string} Formatted CMYK string
 */
function formatCMYKValues(cmykArray) {
    return "C " + Math.round(cmykArray[0]) + 
           " M " + Math.round(cmykArray[1]) + 
           " Y " + Math.round(cmykArray[2]) + 
           " K " + Math.round(cmykArray[3]) + "\r";
}

/**
 * Formats LAB values for display
 * @param {Array} labArray - Array of LAB values [l, a, b]
 * @returns {string} Formatted LAB string
 */
function formatLABValues(labArray) {
    return "L " + Math.round(labArray[0]) + 
           " A " + Math.round(labArray[1]) + 
           " B " + Math.round(labArray[2]) + "\r";
}

/**
 * Determines if a color is dark (for text color selection)
 * @param {Color} color - The color to evaluate
 * @returns {boolean} True if color is dark, false if light
 */
function isDarkColor(color) {
    if (!color.typename) {
        return false;
    }
    
    switch (color.typename) {
        case "CMYKColor":
            // Dark if high black value or high cyan+magenta
            return (color.black > 50 || (color.cyan > 50 && color.magenta > 50));
            
        case "RGBColor":
            // Dark if low red and green values
            return (color.red < 100 && color.green < 100);
            
        case "GrayColor":
            // Dark if grayscale value is high
            return color.gray > 50;
            
        case "SpotColor":
            // Recursively check the spot color's base color
            return isDarkColor(color.spot.color);
            
        default:
            return false;
    }
}
