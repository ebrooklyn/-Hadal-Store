# 🎨 LOGO SETUP GUIDE

## 📌 **IMPORTANT: Add Your Logo File**

The Hadal Store is configured to use a **local logo file** for better performance and reliability.

---

## ✅ **What You Need to Do**

### **Add your logo file to the root folder:**

```
hadal-store/
├── logo.png          ← ADD YOUR LOGO HERE!
├── coin.glb          (3D model)
├── index.html
├── coin-detail.html
└── ...
```

---

## 📋 **Logo File Specifications**

### **File Name:**
- Must be named exactly: `logo.png`
- Or: `logo.jpg`, `logo.svg`, `logo.webp` (if you change the code)

### **Recommended Specs:**
- **Format:** PNG (with transparent background) - BEST
- **Alternative:** SVG (scalable), JPG, or WebP
- **Width:** 200-400px (will be displayed at 40px height)
- **Aspect Ratio:** Landscape (wider than tall) works best
- **File Size:** Keep under 100KB for fast loading
- **Background:** Transparent PNG recommended

### **Design Tips:**
- Use high contrast (light logo for dark header)
- Gold/white color works well with Hadal theme
- Simple, clean design
- Horizontal orientation preferred

---

## 🔧 **If You Don't Have a Logo Yet**

### **Option 1: Use Text Fallback (Current)**
The site has a smart fallback that shows "THE HADAL STORE" in gold text if the logo file is missing. This works perfectly fine!

### **Option 2: Create a Simple Logo**
Use free tools like:
- **Canva:** https://www.canva.com/
- **LogoMakr:** https://logomakr.com/
- **Figma:** https://www.figma.com/

### **Option 3: Use Your Existing Logo**
If you already have a logo:
1. Export as PNG (transparent background)
2. Rename to `logo.png`
3. Place in the root folder

---

## 🎯 **Why Local Logo is Better**

### **Advantages:**
✅ **Faster loading** - No external HTTP request
✅ **Always works** - No dependency on external servers
✅ **More reliable** - Won't break if external URL changes
✅ **Works offline** - Site functions without internet
✅ **Self-contained** - Complete package with all assets
✅ **Better for SEO** - Search engines prefer local assets

### **Previous Setup (Remote URL):**
❌ Required authentication
❌ Could break if file service changed
❌ Added extra HTTP request
❌ Slower loading time

---

## 🔄 **Using a Different Logo Format**

If you want to use SVG, JPG, or WebP instead of PNG:

### **Step 1: Update index.html**
Find this line (appears twice):
```html
<img src="logo.png" ...>
```

Change to:
```html
<img src="logo.svg" ...>    <!-- For SVG -->
<img src="logo.jpg" ...>    <!-- For JPG -->
<img src="logo.webp" ...>   <!-- For WebP -->
```

### **Step 2: Add your logo file**
Make sure the filename matches exactly!

---

## 🎨 **Logo Styling**

The logo is styled in `styles.css`:

```css
.logo-image {
    height: 40px;      /* Height: 40px */
    width: auto;       /* Width: automatic based on aspect ratio */
}
```

### **To Change Logo Size:**
Edit the `.logo-image` class in `styles.css`:
```css
.logo-image {
    height: 60px;      /* Make it bigger */
    width: auto;
}
```

---

## 🚨 **Fallback Text**

If the logo file is missing or fails to load, the site automatically shows:

**"THE HADAL STORE"**

In gold text (Cormorant Garamond font, 24px, #D4AF37 color)

This is configured in the `onerror` attribute:
```html
onerror="this.style.display='none'; 
         this.parentElement.innerHTML='<span style=\'...\'>THE HADAL STORE</span>'"
```

---

## ✅ **Quick Setup Checklist**

- [ ] Logo file prepared (PNG recommended)
- [ ] File named `logo.png` (or updated in code)
- [ ] File placed in root folder (same level as index.html)
- [ ] Logo displays correctly when site loads
- [ ] Fallback text works if logo is removed

---

## 🆘 **Troubleshooting**

### **Logo not showing?**
1. Check filename is exactly `logo.png` (case-sensitive on some servers)
2. Check file is in root folder (not in a subfolder)
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for errors (F12)

### **Logo too big/small?**
Edit `.logo-image` height in `styles.css`

### **Want different fallback text?**
Edit the `onerror` attribute in `index.html`

### **Logo looks blurry?**
Use a higher resolution image (2x the display size)

---

## 📝 **Summary**

**Current Setup:**
- Logo uses local file: `logo.png`
- Smart fallback to text if file missing
- Faster and more reliable than remote URL
- You just need to add your logo file!

**File Location:**
```
hadal-store/
├── logo.png          ← YOUR LOGO HERE
├── coin.glb          (3D coin model)
├── index.html
└── ...
```

**Deploy Steps:**
1. Add `logo.png` to root folder
2. Add `coin.glb` to root folder
3. Upload to Netlify
4. Done! 🎉

---

**Updated:** January 29, 2026  
**Status:** ✅ Local logo configured  
**Fallback:** ✅ Text backup ready
