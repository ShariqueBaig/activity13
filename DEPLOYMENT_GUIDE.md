# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your Meltdown Report webpage to GitHub Pages.

## Prerequisites

- Git installed on your system
- GitHub account
- Project files ready

## Step 1: Initialize Git Repository

Open Command Prompt in your project folder and run:

```cmd
git init
git add .
git commit -m "Initial commit: Meltdown Attack Report webpage"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right → "New repository"
3. Name it: `meltdown-report` (or any name you prefer)
4. Keep it public
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

Copy the commands GitHub shows you, or run these (replace YOUR_USERNAME):

```cmd
git remote add origin https://github.com/YOUR_USERNAME/meltdown-report.git
git branch -M main
git push -u origin main
```

## Step 4: Update Vite Configuration

1. Open `vite.config.js`
2. Update the `base` property with your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/meltdown-report/", // Make sure this matches your repo name
});
```

## Step 5: Install gh-pages Package

```cmd
npm install -D gh-pages
```

## Step 6: Add Deploy Script

The `package.json` already includes these scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

## Step 7: Deploy to GitHub Pages

Run the deploy command:

```cmd
npm run deploy
```

This will:

1. Build your project for production
2. Push the build files to a `gh-pages` branch
3. Deploy automatically

## Step 8: Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" tab
3. Scroll to "Pages" section (left sidebar)
4. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click "Save"

## Step 9: Access Your Website

After a few minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/meltdown-report/
```

## 🔄 Updating Your Website

Whenever you make changes:

```cmd
git add .
git commit -m "Description of changes"
git push origin main
npm run deploy
```

## 🛠️ Troubleshooting

### Issue: Page shows 404

**Solution**: Make sure:

- The `base` in `vite.config.js` matches your repository name exactly
- GitHub Pages is enabled in repository settings
- You're using the correct URL format

### Issue: Styles not loading

**Solution**:

- Check that `base` path is correct in `vite.config.js`
- Clear browser cache
- Rebuild and redeploy: `npm run deploy`

### Issue: npm run deploy fails

**Solution**:

- Make sure gh-pages is installed: `npm install -D gh-pages`
- Check you have git configured properly
- Ensure you've committed all changes

## 📝 Custom Domain (Optional)

If you want to use a custom domain:

1. Create a file named `CNAME` in the `public` folder
2. Add your domain name in it (e.g., `meltdown.yourdomain.com`)
3. Configure DNS settings with your domain provider
4. Redeploy

## ✅ Quick Reference Commands

```cmd
# Run locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Update website
git add .
git commit -m "Update message"
git push origin main
npm run deploy
```

## 🎯 GitHub Pages URL Format

Your website will be available at:

- **Project Site**: `https://USERNAME.github.io/REPOSITORY-NAME/`
- Example: `https://johndoe.github.io/meltdown-report/`

## 📞 Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

---

Good luck with your deployment! 🚀
