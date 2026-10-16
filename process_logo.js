import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'd:/Downloads/recruitment_logo.png';
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);

  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels);

  // Sample top-left corner color
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];
  console.log('Detected background RGB:', bgR, bgG, bgB);

  const numPixels = info.width * info.height;

  // Buffer 1: Transparent with white text (for dark backgrounds)
  const bufLight = Buffer.alloc(numPixels * 4);

  // Buffer 2: Transparent with dark teal text (for light backgrounds)
  const bufDark = Buffer.alloc(numPixels * 4);

  for (let i = 0; i < numPixels; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];

    // Distance from background color
    const dist = Math.sqrt(
      Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
    );

    // Is it background?
    if (dist < 32) {
      // fully transparent
      bufLight[i * 4] = 0;
      bufLight[i * 4 + 1] = 0;
      bufLight[i * 4 + 2] = 0;
      bufLight[i * 4 + 3] = 0;

      bufDark[i * 4] = 0;
      bufDark[i * 4 + 1] = 0;
      bufDark[i * 4 + 2] = 0;
      bufDark[i * 4 + 3] = 0;
    } else {
      // Calculate alpha based on distance for smooth anti-aliased edge
      const alpha = Math.min(255, Math.max(0, Math.round((dist - 15) * (255 / 40))));

      // Check if pixel is gold or white
      // Gold has r > b + 25 (gold has strong red/yellow component, very little blue)
      const isGold = (r > 120 && g > 80 && b < 120) || (r > g && r > b * 1.5);

      // Light version (white text + gold shield)
      bufLight[i * 4] = r;
      bufLight[i * 4 + 1] = g;
      bufLight[i * 4 + 2] = b;
      bufLight[i * 4 + 3] = alpha;

      // Dark version (dark teal text + gold shield)
      if (isGold) {
        // Keep gold shield emblem as gold!
        bufDark[i * 4] = r;
        bufDark[i * 4 + 1] = g;
        bufDark[i * 4 + 2] = b;
        bufDark[i * 4 + 3] = alpha;
      } else {
        // Tint white/gray text to Deep Teal (#002F3A -> R: 0, G: 47, B: 58)
        // Keep brightness proportionality
        const brightness = (r + g + b) / 3 / 255;
        bufDark[i * 4] = Math.round(0 * brightness);
        bufDark[i * 4 + 1] = Math.round(47 * brightness + (1 - brightness) * 0);
        bufDark[i * 4 + 2] = Math.round(58 * brightness + (1 - brightness) * 0);
        bufDark[i * 4 + 3] = alpha;
      }
    }
  }

  // Save both images
  await sharp(bufLight, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .trim()
    .png()
    .toFile('d:/LICHT_Web/public/assets/recruitment_logo_light.png');

  await sharp(bufDark, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .trim()
    .png()
    .toFile('d:/LICHT_Web/public/assets/recruitment_logo_dark.png');

  console.log('Successfully generated transparent logo assets!');
}

processLogo().catch(console.error);
