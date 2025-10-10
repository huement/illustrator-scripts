# Contributing to AI Swatch Scripts

Thank you for your interest in AI Swatch Scripts! This document provides guidelines for contributing to this project.

## 📜 License Notice

Please note that AI Swatch Scripts is **proprietary software** licensed under a commercial license. This means:

- The source code is provided for **transparency and evaluation purposes** only
- You may **NOT** fork, redistribute, or create derivative works without explicit written permission
- All contributions become the property of Huement.com
- Contributors must sign a Contributor License Agreement (CLA)

## 🐛 Bug Reports

We welcome bug reports! If you encounter an issue:

1. **Check existing issues** first to avoid duplicates
2. **Provide detailed information:**
   - Adobe Illustrator version
   - Operating system (macOS/Windows version)
   - Script name and version
   - Steps to reproduce the issue
   - Expected vs. actual behavior
   - Screenshots or error messages (if applicable)

3. **Open an issue** with a clear, descriptive title

### Example Bug Report

```
Title: SwatchExport fails with CMYK spot colors

Environment:
- Adobe Illustrator 2024 (v28.0)
- macOS 13.4 Ventura
- Script: SwatchExport.jsx v1.0

Steps to reproduce:
1. Create document with CMYK color mode
2. Add spot colors based on CMYK values
3. Run SwatchExport script
4. Error appears: [error message]

Expected: Should export spot colors correctly
Actual: Script throws error and doesn't export
```

## 💡 Feature Requests

Have an idea for a new feature? We'd love to hear it!

1. **Search existing issues** to see if someone else has suggested it
2. **Describe the feature** in detail:
   - What problem does it solve?
   - How would it work?
   - Use cases and examples
   - Any reference implementations or similar features

3. **Open an issue** with the `feature-request` label

## 🔧 Code Contributions

Due to the proprietary nature of this software, we have strict guidelines for code contributions:

### Before Contributing Code

1. **Open an issue first** to discuss your proposed changes
2. **Wait for approval** from a maintainer before starting work
3. **Sign the Contributor License Agreement (CLA)** - contact us at https://huement.com
4. All accepted contributions become the property of Huement.com

### Contribution Process

1. Fork the repository (for evaluation purposes only)
2. Create a feature branch (`feature/your-feature-name`)
3. Make your changes following our coding standards (see below)
4. Test thoroughly with multiple Illustrator versions
5. Submit a pull request with a clear description

### Coding Standards

- **JavaScript ES5 syntax** (for Illustrator compatibility)
- **Consistent indentation** (4 spaces)
- **Clear variable names** and comments
- **Function documentation** using JSDoc format
- **Error handling** for edge cases
- **No external dependencies** (Illustrator ExtendScript only)

### Example Code Style

```javascript
/**
 * Converts RGB to HEX color value
 * @param {Number} r - Red value (0-255)
 * @param {Number} g - Green value (0-255)
 * @param {Number} b - Blue value (0-255)
 * @returns {String} Hex color code without #
 */
function rgbToHex(r, g, b) {
    var hexR = (r < 16 ? "0" : "") + r.toString(16);
    var hexG = (g < 16 ? "0" : "") + g.toString(16);
    var hexB = (b < 16 ? "0" : "") + b.toString(16);
    return (hexR + hexG + hexB).toUpperCase();
}
```

## 📝 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear instructions
- Add screenshots or examples
- Improve installation guides
- Translate documentation (with approval)

Documentation contributions follow the same process as code contributions.

## 🧪 Testing

If you submit code changes, please test on:

- **Multiple Illustrator versions** (if possible)
- **Both macOS and Windows** (if possible)
- **Different document color modes** (RGB and CMYK)
- **Various swatch types** (process colors, spot colors, gradients)
- **Edge cases** (empty selections, locked layers, etc.)

## 📮 Contact

For licensing inquiries, partnership opportunities, or general questions:

- Website: https://huement.com
- Issues: [GitHub Issues](../../issues)

## ⚖️ Legal

By submitting a contribution, you:

1. Certify that you have the right to submit the contribution
2. Agree that your contribution will become the property of Huement.com
3. Grant Huement.com perpetual, worldwide rights to use your contribution
4. Agree to sign the Contributor License Agreement if requested

---

Thank you for helping make AI Swatch Scripts better! 🎨

