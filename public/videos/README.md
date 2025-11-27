# Videos Folder

## 📁 Place Your Demonstration Video Here

### File Name

- **Recommended**: `demo.mp4`
- Or update the source path in `src/MeltdownReport.jsx` to match your filename

### Supported Formats

- ✅ MP4 (H.264 codec) - **Recommended**
- ✅ WebM
- ✅ OGG

### File Size

- **Recommended**: Under 50MB for GitHub
- **Maximum**: 100MB (GitHub file limit)
- For larger files, use YouTube instead (see VIDEO_GUIDE.md)

### Video Specifications

- **Resolution**: 720p (1280x720) or 1080p (1920x1080)
- **Duration**: 5-10 minutes recommended
- **Format**: MP4 with H.264 codec
- **Audio**: AAC codec

---

## 🎬 How to Add Your Video

### Option 1: Local Video (For smaller files)

1. Copy your video file here: `public/videos/demo.mp4`
2. Edit `src/MeltdownReport.jsx` (line ~510)
3. Uncomment the `<video>` tag
4. Comment out the placeholder div
5. Save and refresh browser

### Option 2: YouTube (For larger files)

1. Upload video to YouTube
2. Get the video ID from URL
3. Edit `src/MeltdownReport.jsx` (line ~520)
4. Uncomment the `<iframe>` tag
5. Replace `VIDEO_ID` with your video ID
6. Save and refresh browser

---

## 📝 Example Video Tag

```jsx
<video controls className="w-full h-full">
  <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

---

## 🔗 More Details

See the complete guide: `VIDEO_GUIDE.md` in the project root

---

**Current Status**: ⏳ Waiting for video file

**After adding video**: ✅ Ready to deploy
