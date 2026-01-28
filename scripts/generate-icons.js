// Generate PWA icons from SVG
import sharp from 'sharp';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const iconsDir = join(rootDir, 'icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
    console.log('Generating PWA icons...\n');

    // Ensure icons directory exists
    if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
    }

    // Read SVG file
    const svgPath = join(iconsDir, 'icon.svg');
    const svgBuffer = readFileSync(svgPath);

    // Generate each size
    for (const size of sizes) {
        const outputPath = join(iconsDir, `icon-${size}.png`);

        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(outputPath);

        console.log(`Generated: icon-${size}.png`);
    }

    console.log('\n========================================');
    console.log('All icons generated successfully!');
    console.log(`Output: ${iconsDir}`);
    console.log('========================================\n');
}

generateIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
