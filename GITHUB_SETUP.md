# GitHub Repository Setup Guide

Quick guide to get your AI Swatch Scripts repository up and running on GitHub.

## 📋 Pre-Setup Checklist

✅ All files are ready for GitHub:
- Main repository files (README, LICENSE, etc.)
- Scripts and templates in their folders
- Documentation website in `/docs` folder
- GitHub-specific files (.gitignore, issue templates, etc.)

## 🚀 Initial Repository Setup

### 1. Create Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Fill in details:
   - **Repository name:** `illustrator-scripts` (or your preferred name)
   - **Description:** "Professional color workflow tools for Adobe Illustrator"
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**

### 2. Push Your Code to GitHub

Open Terminal and run these commands from your project directory:

```bash
cd /Users/eris/Developer/illustrator-scripts

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Swatch Scripts v1.0"

# Add GitHub as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**:
   - **Branch:** Select `main`
   - **Folder:** Select `/docs`
5. Click **Save**
6. Wait 1-2 minutes, then refresh the page
7. Your site URL will appear: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### 4. Update Documentation URLs

After GitHub Pages is live, update these files with your actual URL:

**docs/index.html** (lines 12-23):
```html
<meta property="og:url" content="https://YOUR-USERNAME.github.io/REPO-NAME/">
<meta property="twitter:url" content="https://YOUR-USERNAME.github.io/REPO-NAME/">
```

**docs/robots.txt** (line 5):
```
Sitemap: https://YOUR-USERNAME.github.io/REPO-NAME/sitemap.xml
```

**docs/sitemap.xml** (lines 4, 9):
```xml
<loc>https://YOUR-USERNAME.github.io/REPO-NAME/</loc>
<loc>https://YOUR-USERNAME.github.io/REPO-NAME/index.html</loc>
```

**README.md** - Update any placeholder links

Then commit and push the changes:
```bash
git add .
git commit -m "Update documentation URLs"
git push
```

## 🏷️ Create Your First Release

1. Go to your repository on GitHub
2. Click **Releases** (right sidebar)
3. Click **Create a new release**
4. Fill in:
   - **Tag version:** `v1.0.0`
   - **Release title:** `AI Swatch Scripts v1.0.0`
   - **Description:** Copy from CHANGELOG.md
5. Attach files (optional):
   - Zip of Scripts folder
   - Zip of Templates folder
6. Click **Publish release**

## 🎯 Repository Settings

### About Section
1. Click the ⚙️ icon next to "About" (top right)
2. Add description: "Professional color workflow tools for Adobe Illustrator"
3. Add website: Your GitHub Pages URL
4. Add topics: `adobe-illustrator`, `color-palette`, `design-tools`, `jsx`, `scripts`, `color-export`
5. Check "Releases"
6. Click **Save changes**

### Enable Features
Go to Settings → General:
- ✅ Issues
- ✅ Projects (optional)
- ❌ Wikis (you have docs already)
- ✅ Discussions (optional)

### Issue Labels
GitHub will create default labels. You can add custom ones:
- `color-export` - Issues with export functionality
- `color-legend` - Issues with legend generation
- `illustrator-version` - Version-specific issues
- `documentation` - Documentation improvements

## 📱 Social Media Preview

To set a social media preview image:
1. Go to Settings → General
2. Scroll to "Social preview"
3. Click **Edit**
4. Upload `preview.png` or create a custom 1280x640px image
5. Save

## 🔒 Security

Consider adding:
1. **SECURITY.md** file with security policy
2. **Dependabot alerts** (Settings → Security)
3. **Branch protection** rules for main branch (Settings → Branches)

## 📊 Optional Enhancements

### Add GitHub Actions (CI/CD)
Create `.github/workflows/validate.yml` to:
- Validate JSX syntax
- Check for broken links in documentation
- Auto-deploy documentation updates

### Add Sponsor Button
Create `.github/FUNDING.yml`:
```yaml
custom: ['https://huement.com']
```

### Add Code of Conduct
GitHub can generate one: Insights → Community → Code of conduct → Add

## ✅ Verification Checklist

After setup, verify:
- [ ] Repository is accessible on GitHub
- [ ] README displays correctly on main page
- [ ] GitHub Pages site is live and working
- [ ] All images display in documentation
- [ ] Favicon appears in browser tab
- [ ] 404 page works (test with invalid URL)
- [ ] Issue templates appear when creating new issue
- [ ] License file is recognized by GitHub
- [ ] Repository topics are set
- [ ] Social preview image is set

## 🎉 You're Done!

Your repository is now fully set up and ready to share!

**Share your project:**
- Post on social media with your GitHub Pages URL
- Submit to design tool directories
- Share in Adobe Illustrator communities
- Add to your portfolio

## 📞 Support

If you need help:
- Check GitHub's [Pages documentation](https://docs.github.com/pages)
- Review [Git basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- Ask in [GitHub Community](https://github.community)

---

**Good luck with your project! 🚀**

