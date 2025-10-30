const fs = require('fs');
const path = require('path');

const iconSource = 'nodes/SeRanking/seranking.svg';
const iconDest = 'dist/nodes/SeRanking/seranking.svg';

// Ensure destination directory exists
const destDir = path.dirname(iconDest);
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy icon if it exists
if (fs.existsSync(iconSource)) {
    fs.copyFileSync(iconSource, iconDest);
    console.log('✅ Icon copied successfully');
} else {
    console.log('⚠️  Icon not found at', iconSource);
    console.log('   Creating placeholder icon...');
    
    // Create a simple placeholder icon
    const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="15" fill="#4A90E2"/>
  <text x="50" y="60" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">SE</text>
</svg>`;
    
    fs.writeFileSync(iconDest, placeholderSvg);
    console.log('✅ Placeholder icon created');
}