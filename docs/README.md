# Documentation Website

This folder contains the GitHub Pages documentation website for AI Swatch Scripts.

## 🌐 GitHub Pages Setup

### Automatic Deployment

When you push this repository to GitHub, the documentation will automatically be available at:
```
https://[your-username].github.io/[repository-name]/
```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Branch:** `main` (or `master`)
   - **Folder:** `/docs`
5. Click **Save**
6. Your site will be published at the URL shown

### Custom Domain (Optional)

If you have a custom domain:

1. Update the `CNAME` file with your domain
2. Add DNS records at your domain provider:
   - **Type:** CNAME
   - **Name:** @ or www
   - **Value:** [your-username].github.io
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 📁 Files in This Folder

- **index.html** - Main documentation page with installation guide
- **404.html** - Custom 404 error page
- **site.webmanifest** - PWA manifest for mobile/desktop installation
- **robots.txt** - Search engine indexing instructions
- **sitemap.xml** - XML sitemap for search engines
- **.nojekyll** - Prevents GitHub Pages from using Jekyll processing
- **CNAME** - Custom domain configuration (optional)
- **favicon files** - Various favicon formats for all devices
- **images** (PNG files) - Screenshots and visual examples

## 🎨 Customization

### Update URLs

After publishing, update these files with your actual GitHub Pages URL:

1. **index.html** - Update Open Graph and Twitter meta tags (lines 12-23)
2. **robots.txt** - Update sitemap URL (line 5)
3. **sitemap.xml** - Update all URLs (lines 4, 9)

### Branding

The color theme is set to `#667eea` (purple/blue gradient). Update in:
- `site.webmanifest` - theme_color (line 15)
- `index.html` - hero gradient (line 14)
- `404.html` - background gradient (line 20)

## 🔍 SEO Features

This documentation includes:

- ✅ Semantic HTML structure
- ✅ Meta descriptions and keywords
- ✅ Open Graph tags (Facebook sharing)
- ✅ Twitter Card tags
- ✅ XML sitemap
- ✅ robots.txt
- ✅ Mobile-responsive design
- ✅ Fast loading (Bootstrap CDN)
- ✅ Favicon for all devices

## 📱 PWA Support

The `site.webmanifest` file enables:
- Add to home screen on mobile devices
- Standalone app mode
- Custom app icons
- Themed browser chrome

## 🚀 Testing Locally

To test the documentation locally:

```bash
# Option 1: Python 3
cd docs
python3 -m http.server 8000

# Option 2: Python 2
cd docs
python -m SimpleHTTPServer 8000

# Option 3: Node.js (if you have npx)
cd docs
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## 📊 Analytics (Optional)

To add Google Analytics:

1. Create a Google Analytics property
2. Get your tracking ID (G-XXXXXXXXXX)
3. Add this before `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔧 Maintenance

- Update **sitemap.xml** lastmod dates when making significant changes
- Keep Bootstrap version up to date (currently 5.3.2)
- Compress images for faster loading if needed
- Test on multiple devices and browsers

---

Built with Bootstrap 5 and ❤️ for the design community.

