# 🚀 GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `meltdown-report` (or your preferred name)
3. **Description**: "Meltdown Attack - Academic Report and Interactive Demonstration"
4. **Visibility**: Public (so GitHub Pages works for free)
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click **"Create repository"**

---

## Step 2: Copy Your GitHub Username

You'll need your GitHub username for the next step.
Example: If your profile is `github.com/sharique123`, your username is `sharique123`

---

## Step 3: Run These Commands

After creating the repository, GitHub will show you commands. OR run these:

```powershell
# Replace YOUR_USERNAME with your actual GitHub username
cd "c:\Users\admin\OneDrive - Institute of Business Administration\Desktop\Sharique\sem 5\CS\act13"
git remote add origin https://github.com/YOUR_USERNAME/meltdown-report.git
git branch -M main
git push -u origin main
```

---

## Step 4: Install gh-pages for Deployment

```powershell
npm install -D gh-pages
```

---

## Step 5: Deploy to GitHub Pages

```powershell
npm run deploy
```

This will:
- Build your project
- Push to gh-pages branch
- Make it live!

---

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. Click **Save**

---

## Step 7: Get Your Live URL

After a few minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/meltdown-report/
```

---

## 📝 Quick Reference

```powershell
# Add remote (first time only)
git remote add origin https://github.com/YOUR_USERNAME/meltdown-report.git

# Push to GitHub (first time)
git push -u origin main

# Deploy to GitHub Pages
npm run deploy

# Future updates
git add .
git commit -m "Update description"
git push
npm run deploy
```

---

## ✅ What's Been Committed

✅ All source code
✅ PDF report (Meltdown_Report.pdf)
✅ Video file (demo.mp4)
✅ Documentation files
✅ Configuration files

**Ready to push to GitHub!** 🚀

**NEXT**: Create the repository on GitHub, then tell me your username so I can help you push!
