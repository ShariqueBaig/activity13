# 🎥 VIDEO GUIDE - How to Add Your Demonstration Video

## 📁 Where to Put Your Video

Place your video file in:

```
public/videos/demo.mp4
```

The full path is:

```
c:\Users\admin\OneDrive - Institute of Business Administration\Desktop\Sharique\sem 5\CS\act13\public\videos\demo.mp4
```

## ✅ Video File Requirements

- **Format**: MP4 (recommended) or WebM
- **Name**: `demo.mp4` (or update the code to match your filename)
- **Size**: Keep under 100MB for GitHub (or use YouTube for larger files)
- **Duration**: 5-10 minutes recommended

## 🎬 Three Ways to Add Video

### Option 1: Local Video File (Recommended for Small Files)

1. **Copy your video** to: `public/videos/demo.mp4`

2. **Edit `src/MeltdownReport.jsx`** (around line 500)

3. **Uncomment the video tag** and comment out the placeholder:

```jsx
{
  /* Local video - UNCOMMENT THIS */
}
<video controls className="w-full h-full">
  <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>;

{
  /* COMMENT OUT THE PLACEHOLDER DIV */
}
```

4. **Save and refresh** your browser

---

### Option 2: YouTube Video (Recommended for Large Files)

1. **Upload your video** to YouTube

   - Sign in to YouTube
   - Click "Create" → "Upload video"
   - Upload your demonstration video
   - Set as "Unlisted" if you don't want it public

2. **Get the video ID** from the URL

   - YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ` (the part after `v=`)

3. **Edit `src/MeltdownReport.jsx`** (around line 500)

4. **Uncomment the iframe** and add your video ID:

```jsx
{
  /* YouTube video - UNCOMMENT THIS */
}
<iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Meltdown Attack Demonstration"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>;

{
  /* COMMENT OUT THE PLACEHOLDER DIV */
}
```

5. **Save and refresh** your browser

---

### Option 3: Google Drive (Alternative)

1. **Upload to Google Drive**
2. Right-click → Share → Get link → Set to "Anyone with the link"
3. Click "Open in new window" → Copy the embed code
4. Use similar iframe approach as YouTube

---

## 🔧 Code Location

The video section is in `src/MeltdownReport.jsx` around **line 500-530**

Look for this section:

```jsx
{activeTab === 'demo' && (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Video className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-bold text-gray-800">Attack Demonstration Video</h2>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 mb-6">
        {/* VIDEO SECTION IS HERE */}
```

---

## 📝 Step-by-Step for Local Video

1. **Place video file**:

   - Copy `your-video.mp4` to `public/videos/`
   - Rename it to `demo.mp4`

2. **Open** `src/MeltdownReport.jsx` in VS Code

3. **Find line ~510** (the video section)

4. **Uncomment these lines**:

   ```jsx
   <video controls className="w-full h-full">
     <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
     Your browser does not support the video tag.
   </video>
   ```

5. **Comment out the placeholder**:
   Add `{/*` before and `*/}` after the placeholder div

6. **Save the file**

7. **Refresh browser** - Your video should now play!

---

## 📊 File Size Considerations

### Local Video (public/videos/)

- ✅ Good for: < 50MB files
- ✅ Works offline
- ❌ Increases GitHub repo size
- ❌ Slower to load

### YouTube

- ✅ Good for: Any size
- ✅ Fast streaming
- ✅ Doesn't increase repo size
- ❌ Requires internet
- ❌ May show ads

---

## 🎯 Recommended Approach

**For smaller demos (< 30MB)**: Use local video
**For longer demos (> 30MB)**: Use YouTube

---

## ✅ Testing Your Video

After adding the video:

1. Check locally: `npm run dev`
2. Test controls (play, pause, volume)
3. Test fullscreen mode
4. Build and preview: `npm run build && npm run preview`
5. Deploy and test online: `npm run deploy`

---

## 🐛 Troubleshooting

### Video not showing?

- Check file path is correct: `public/videos/demo.mp4`
- Check file format (must be MP4 or WebM)
- Make sure you uncommented the right section
- Clear browser cache

### Video not playing?

- Check browser console for errors (F12)
- Try different browser
- Ensure video codec is H.264 (most compatible)

### YouTube video not loading?

- Check video ID is correct
- Ensure video is not private
- Check internet connection

---

## 🎨 Customizing Video Player

You can customize the video player by modifying the code:

```jsx
<video
  controls // Show controls
  autoplay // Auto-play (not recommended)
  muted // Start muted
  loop // Loop video
  className="w-full h-full rounded-lg"
>
  <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
</video>
```

---

## 📤 Deploying with Video

### If using local video:

```cmd
npm run deploy
```

The video will be included in the deployment.

### If using YouTube:

Just deploy normally - the iframe will work automatically.

---

## 💡 Pro Tips

1. **Compress your video** before adding to reduce file size

   - Use HandBrake (free): https://handbrake.fr/
   - Target: H.264 codec, 720p resolution

2. **Add subtitles** for accessibility:

   ```jsx
   <video controls>
     <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
     <track
       src="/meltdown-report/videos/subtitles.vtt"
       kind="subtitles"
       srclang="en"
       label="English"
     />
   </video>
   ```

3. **Multiple formats** for compatibility:
   ```jsx
   <video controls>
     <source src="/meltdown-report/videos/demo.mp4" type="video/mp4" />
     <source src="/meltdown-report/videos/demo.webm" type="video/webm" />
   </video>
   ```

---

## 📞 Need Help?

- Check the code comments in `MeltdownReport.jsx`
- Review browser console (F12) for errors
- Test in different browsers (Chrome, Firefox, Edge)

---

**Ready to add your video!** 🎬
