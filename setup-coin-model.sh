#!/bin/bash
# ================================================
# The Hadal Store - Automatic Coin Model Setup
# ================================================
# This script downloads and sets up the golden coin model
# from Sketchfab for your Hadal Store website
# ================================================

echo "🪙 The Hadal Store - Coin Model Setup"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    echo "Please run this script from the hadal-store-v2 folder"
    echo ""
    echo "Usage:"
    echo "  cd hadal-store-v2"
    echo "  bash setup-coin-model.sh"
    exit 1
fi

echo "✅ Found index.html - you're in the right directory!"
echo ""

# Check if coin.glb already exists
if [ -f "coin.glb" ]; then
    echo "⚠️  Warning: coin.glb already exists"
    read -p "Do you want to replace it? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "📥 Downloading Golden Coin of Henry VI model..."
echo "Source: Sketchfab - FloraKardis"
echo "License: CC Attribution"
echo ""

# Note: Sketchfab requires manual download through their website
# This script will guide the user through the process

echo "⚠️  MANUAL DOWNLOAD REQUIRED"
echo ""
echo "Sketchfab requires you to download models through their website."
echo ""
echo "📋 Please follow these steps:"
echo ""
echo "1. Visit this URL in your browser:"
echo "   https://sketchfab.com/3d-models/golden-coin-of-henry-vi-f7b674acf40741fb8f6c139183336a9c"
echo ""
echo "2. Click the 'Download 3D Model' button (blue button on the left)"
echo ""
echo "3. Select format: 'Autoconverted format (GLB)'"
echo ""
echo "4. Download and extract the ZIP file"
echo ""
echo "5. Find the .glb file (probably named 'golden-coin-of-henry-vi.glb')"
echo ""
echo "6. Copy or move it to this folder:"
echo "   $(pwd)"
echo ""
echo "7. Rename it to: coin.glb"
echo ""
echo "────────────────────────────────────────────────────────────────"
echo ""
read -p "Press Enter when you've completed the download and placed coin.glb in this folder..."
echo ""

# Check if the file now exists
if [ -f "coin.glb" ]; then
    echo "✅ Success! coin.glb found!"
    
    # Get file size
    SIZE=$(du -h coin.glb | cut -f1)
    echo "📊 File size: $SIZE"
    
    # Check if size is reasonable (between 100KB and 50MB)
    SIZE_BYTES=$(stat -f%z coin.glb 2>/dev/null || stat -c%s coin.glb 2>/dev/null)
    
    if [ $SIZE_BYTES -lt 100000 ]; then
        echo "⚠️  Warning: File seems very small ($SIZE). Please verify it downloaded correctly."
    elif [ $SIZE_BYTES -gt 52428800 ]; then
        echo "⚠️  Warning: File is large ($SIZE). Consider compressing it for faster web loading."
        echo "   Run: npm install -g gltf-pipeline"
        echo "   Then: gltf-pipeline -i coin.glb -o coin-compressed.glb -d"
    else
        echo "✅ File size looks good for web use!"
    fi
    
    echo ""
    echo "🎨 Adding attribution credit to index.html..."
    
    # Check if attribution already exists
    if grep -q "FloraKardis" index.html; then
        echo "✅ Attribution already exists in HTML"
    else
        # Add attribution before closing footer
        # This is a simple approach - you may want to customize the placement
        echo "   (You should manually add attribution credit to your footer)"
        echo "   See COIN_MODEL_SETUP.md for instructions"
    fi
    
    echo ""
    echo "🎉 Setup Complete!"
    echo ""
    echo "Next steps:"
    echo "1. Open index.html in your browser to test"
    echo "2. The coin should now display and rotate automatically"
    echo "3. Test the control buttons (reset, toggle, fullscreen)"
    echo "4. Test on mobile devices"
    echo "5. Add attribution credit (see COIN_MODEL_SETUP.md)"
    echo ""
    echo "🚀 Ready to deploy!"
    
else
    echo "❌ Error: coin.glb not found"
    echo ""
    echo "Please complete the download steps above and try again."
    echo ""
    echo "Need help? Check COIN_MODEL_SETUP.md for detailed instructions"
    exit 1
fi

echo ""
echo "📚 Documentation:"
echo "   - COIN_MODEL_SETUP.md - Detailed setup guide"
echo "   - QUICK_START.md - Quick deployment guide"
echo "   - README.md - Complete documentation"
echo ""
echo "🌊 The Hadal Store is ready to dive deep! 🪙"
