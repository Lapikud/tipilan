import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = 'public/images';
const QUALITY = 85;

const files = await readdir(INPUT_DIR);
const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

console.log(`Converting ${pngs.length} PNG(s) to WebP at quality ${QUALITY}...\n`);

for (const file of pngs) {
  const input = join(INPUT_DIR, file);
  const output = join(INPUT_DIR, basename(file, '.png') + '.webp');

  const { width, height, size: inSize } = await sharp(input).metadata();
  await sharp(input).webp({ quality: QUALITY }).toFile(output);

  const { size: outSize } = await sharp(output).metadata();
  const saved = (((inSize - outSize) / inSize) * 100).toFixed(1);

  console.log(`${file} (${width}x${height})`);
  console.log(`  ${(inSize/1024).toFixed(0)} KB → ${(outSize/1024).toFixed(0)} KB  (${saved}% smaller)\n`);
}

console.log('Done.');
