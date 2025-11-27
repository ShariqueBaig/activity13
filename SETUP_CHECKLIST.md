# 📋 QUICK REFERENCE - Video & Team Setup

## ✅ Team Members Updated

- **Sharique Baig** - Research & Implementation Lead
- **Maira Aijaz** - Documentation & Video Production

---

## 🎥 VIDEO SETUP

### Where to Put Video:

```
public/videos/demo.mp4
```

**Full path:**

```
c:\Users\admin\OneDrive - Institute of Business Administration\Desktop\Sharique\sem 5\CS\act13\public\videos\demo.mp4
```

---

## 🚀 Two Options for Video

### Option A: Local File (< 50MB)

1. Copy video to: `public/videos/demo.mp4`
2. Open: `src/MeltdownReport.jsx`
3. Go to line ~510
4. Uncomment this:
   ```jsx
   <video controls className="w-full h-full">
     <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
   </video>
   ```
5. Comment out the placeholder div
6. Save & refresh browser

### Option B: YouTube (Any Size)

1. Upload video to YouTube
2. Copy video ID from URL
3. Open: `src/MeltdownReport.jsx`
4. Go to line ~520
5. Uncomment and update:
   ```jsx
   <iframe
     src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
     ...
   ></iframe>
   ```
6. Save & refresh browser

---

## 📝 Quick Commands

```cmd
npm run dev          # View your site
npm run build        # Build for production
npm run deploy       # Deploy to GitHub
```

---

## 📁 Important Files

- `VIDEO_GUIDE.md` - Detailed video instructions
- `DEPLOYMENT_GUIDE.md` - GitHub deployment steps
- `src/MeltdownReport.jsx` - Main component (line ~510 for video)
- `public/videos/` - Place videos here

---

## ✅ Checklist Before Deploying

- [x] PDF report embedded (✓ act13.pdf → public/Meltdown_Report.pdf)
- [x] Team names correct (Sharique Baig ✓, Maira Aijaz ✓)
- [ ] Video added (local or YouTube)
- [ ] Test locally: `npm run dev`
- [ ] Everything works in browser
- [ ] Push to GitHub
- [ ] Deploy: `npm run deploy`

---

**Status**: Team ✅ | PDF ✅ | Video: Add to `public/videos/demo.mp4`

**For help**: See `VIDEO_GUIDE.md`
