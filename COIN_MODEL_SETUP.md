# 🪙 How to Add the Golden Coin Model from Sketchfab

## Model Information

**Model**: Golden Coin of Henry VI  
**Source**: Sketchfab  
**URL**: https://sketchfab.com/3d-models/golden-coin-of-henry-vi-f7b674acf40741fb8f6c139183336a9c  
**Author**: FloraKardis  
**License**: CC Attribution (free to use with credit)  
**Quality**: 1.8k triangles, 898 vertices - perfect for web!  
**Based on**: Coins from the Fishpool hoard (British Museum)

---

## ✅ This is a PERFECT Model!

### Why It's Ideal:
- ✅ **Downloadable** - "Download 3D Model" button available
- ✅ **Free License** - CC Attribution (commercial use allowed)
- ✅ **Optimized** - Low poly count (1.8k triangles)
- ✅ **High Quality** - Beautiful gold material
- ✅ **Historic** - Real museum coin reference
- ✅ **Web-Ready** - Already optimized for web viewing

---

## 📥 Download Instructions

### Step 1: Download the Model

1. **Visit the model page**: https://sketchfab.com/3d-models/golden-coin-of-henry-vi-f7b674acf40741fb8f6c139183336a9c

2. **Click "Download 3D Model"** button (blue button on left)

3. **Select format**:
   - **Best**: Choose **"glTF 2.0 (.gltf/.glb)"** 
   - **Recommended**: Select **"Autoconverted format (GLB)"**

4. **Download** and extract the ZIP file

### Step 2: Rename the File

```bash
# Find the downloaded .glb file (usually in Downloads folder)
# Rename it to: coin.glb

# Example:
mv golden-coin-of-henry-vi.glb coin.glb
```

### Step 3: Place in Website Folder

```bash
# Copy to your hadal-store-v2 folder
cp coin.glb /path/to/hadal-store-v2/coin.glb
```

### Step 4: Test It!

```bash
# Open index.html in browser
# The 3D coin should now display and rotate!
```

---

## 🎨 Model Details

### Technical Specs:
- **Polygons**: 1,800 triangles
- **Vertices**: 898 points
- **File Size**: ~2-5MB (estimated)
- **Texture**: Gold material included
- **Format**: GLB (binary glTF)

### Perfect for Web:
- ✅ Fast loading
- ✅ Smooth rotation
- ✅ Mobile-friendly
- ✅ Beautiful gold appearance

---

## 📝 Attribution Required

Since this uses **CC Attribution** license, you must credit the creator:

### Where to Add Credit:

**Option 1: In Footer** (recommended)
Add to `index.html` footer section (around line 692):

```html
<div class="footer-section">
    <h4 class="footer-title">3D Model Credits</h4>
    <p class="footer-description">
        Golden coin 3D model based on 
        <a href="https://sketchfab.com/3d-models/golden-coin-of-henry-vi-f7b674acf40741fb8f6c139183336a9c" 
           target="_blank" rel="noopener">
            Golden Coin of Henry VI
        </a> 
        by FloraKardis, licensed under 
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">
            CC Attribution
        </a>
    </p>
</div>
```

**Option 2: Near the 3D Viewer** (alternative)
Add below the coin showcase:

```html
<p style="font-size: 0.85rem; color: var(--hadal-gray-400); text-align: center; margin-top: 1rem;">
    3D model: 
    <a href="https://sketchfab.com/3d-models/golden-coin-of-henry-vi-f7b674acf40741fb8f6c139183336a9c" 
       style="color: var(--hadal-gold);">
        Golden Coin of Henry VI
    </a> 
    by FloraKardis (CC-BY)
</p>
```

---

## 🔧 Advanced: Optimize Further (Optional)

If the file is too large, compress it:

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress the model
gltf-pipeline -i coin.glb -o coin-compressed.glb -d

# Use the compressed version
mv coin-compressed.glb coin.glb
```

---

## 🎯 Expected Result

After following these steps, you should see:

1. **Hero Section**: Beautiful rotating gold coin (auto-rotate at 30°/sec)
2. **Interactive Controls**: 
   - Camera reset button
   - Toggle rotation button
   - Fullscreen button
3. **Mobile Support**: Touch gestures work perfectly
4. **Fast Loading**: Coin loads in 1-3 seconds
5. **Smooth Rotation**: No lag or stuttering

---

## 🚨 Troubleshooting

### Issue: Model Not Showing

**Check:**
1. File is named exactly `coin.glb` (lowercase)
2. File is in the root `hadal-store-v2/` folder
3. File size is reasonable (under 20MB)
4. Open browser console (F12) for error messages

**Solution:**
```bash
# Verify file location
ls -lh hadal-store-v2/coin.glb

# Should show: coin.glb with size around 2-5MB
```

### Issue: Slow Loading

**Solutions:**
1. Compress with gltf-pipeline (see above)
2. Use a CDN for hosting the GLB file
3. Enable gzip compression on your web server

### Issue: Wrong Orientation

**Solution:**
The model-viewer will auto-orient. If needed, add rotation:

```html
<model-viewer
    orientation="0deg 0deg 0deg"
    ...
```

---

## 🎨 Customization Options

### Adjust Rotation Speed

In `index.html`, find the model-viewer tag and change:

```html
rotation-per-second="30deg"  <!-- Current: 30° per second -->
rotation-per-second="45deg"  <!-- Faster: 45° per second -->
rotation-per-second="15deg"  <!-- Slower: 15° per second -->
```

### Adjust Lighting

```html
<model-viewer
    exposure="1.2"           <!-- Brightness: 0.5-2.0 -->
    shadow-intensity="1"     <!-- Shadow strength: 0-2 -->
    environment-image="neutral"  <!-- or "legacy" -->
    ...
```

### Adjust Camera

```html
<model-viewer
    camera-orbit="0deg 75deg 105%"  <!-- angle, height, distance -->
    field-of-view="45deg"            <!-- zoom: 30-90deg -->
    ...
```

---

## ✅ Quick Setup Checklist

- [ ] Visit Sketchfab model page
- [ ] Click "Download 3D Model"
- [ ] Select GLB format
- [ ] Extract downloaded ZIP
- [ ] Rename file to `coin.glb`
- [ ] Copy to `hadal-store-v2/` folder
- [ ] Add attribution credit to footer
- [ ] Open `index.html` in browser
- [ ] Test 3D viewer (should rotate automatically)
- [ ] Test controls (reset, toggle, fullscreen)
- [ ] Test on mobile device
- [ ] Deploy to hosting

---

## 🌟 Why This Model Works Perfectly

### Historical Authenticity
- ✅ Based on real museum coins (British Museum)
- ✅ Fishpool hoard reference (1966 discovery)
- ✅ Medieval gold coin aesthetic
- ✅ Period-appropriate for 15th century

### Technical Excellence
- ✅ Optimized polygon count (web-friendly)
- ✅ Beautiful gold material/texture
- ✅ Proper UV mapping
- ✅ Clean geometry

### Legal Compliance
- ✅ CC Attribution license (commercial use OK)
- ✅ Clear attribution requirements
- ✅ Created by verified Sketchfab artist
- ✅ No usage restrictions

---

## 💡 Pro Tip: Multiple Coins

Want to add different coins? Use the same process:

1. Download another coin model from Sketchfab
2. Rename to unique name: `coin-abbasid.glb`, `coin-aksumite.glb`
3. Update the `src` attribute in HTML:

```html
<!-- For Abbasid coin -->
<model-viewer src="coin-abbasid.glb" ...></model-viewer>

<!-- For Aksumite coin -->
<model-viewer src="coin-aksumite.glb" ...></model-viewer>
```

---

## 📚 Additional Resources

### More Coin Models on Sketchfab:
- Search: https://sketchfab.com/search?q=ancient+coin&type=models
- Filter by: "Downloadable" + "Free"
- Tags: `coin`, `ancient`, `gold`, `artifact`, `treasure`

### Model Optimization Tools:
- **gltf-pipeline**: https://github.com/CesiumGS/gltf-pipeline
- **glTF Viewer**: https://gltf-viewer.donmccurdy.com/
- **Three.js Editor**: https://threejs.org/editor/

### CC License Info:
- **CC Attribution**: https://creativecommons.org/licenses/by/4.0/
- **Usage Guidelines**: Commercial use allowed with credit

---

## 🎉 You're All Set!

Once you complete these steps, your Hadal Store will have:

✅ **Beautiful 3D coin model** from museum reference  
✅ **Smooth auto-rotation** showcasing all angles  
✅ **Interactive controls** for user engagement  
✅ **Mobile-friendly** touch gestures  
✅ **Legally compliant** with proper attribution  
✅ **Fast loading** optimized for web  

### Ready to Launch! 🚀

Your fractional coin ownership platform now has a stunning visual centerpiece that will captivate investors and collectors.

---

**Model Source**: Sketchfab  
**License**: CC Attribution  
**Creator**: FloraKardis  
**Reference**: British Museum Fishpool Hoard  
**Status**: ✅ Ready to Use

🌊 Dive deep with authentic 3D coins! 🪙
