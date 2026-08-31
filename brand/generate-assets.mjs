// ============================================================================
//  ヨリツキ 画像アセット生成器
//  正本 brand/yoritsuki-logo.svg から public/ の全画像を機械生成する。
//  ドット単位の手作業は一切しない(このスクリプトの出力がすべて)。
//
//  用途割当(正本SVGのコメントと一致):
//    og:image / twitter:image        → #board-og (横長1200×630, 4文字を中央630四方に3%で配置)
//    apple-touch / PWA192・512 / fav96 → #lockup-2 (ヨリ/ツキ 2行)
//    favicon-16 / favicon-32          → #lockup-1 (ヨ 1文字。タブ極小で2行は潰れるため)
//    favicon.ico                      → 16=ヨ / 32=ヨ / 48=2行 のマルチサイズ
//
//  使い方:  node brand/generate-assets.mjs
//  依存:    sharp
// ============================================================================
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'brand', 'yoritsuki-logo.svg');
const OUT = join(ROOT, 'public');
const BG = '#0b1020';

const master = readFileSync(SRC, 'utf8');
const defs = master.match(/<defs>[\s\S]*?<\/defs>/)[0];

// 正方形へ lockup を contain 配置した SVG 文字列を作る(symbol の既定 preserveAspectRatio=meet で中央寄せ)。
function squareSvg(lockupId, size, padFrac) {
  const p = Math.round(size * padFrac);
  const u = size - 2 * p;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`
    + `<rect width="${size}" height="${size}" fill="${BG}"/>${defs}`
    + `<use href="#${lockupId}" x="${p}" y="${p}" width="${u}" height="${u}" fill="#ffffff"/></svg>`;
}
const renderSquare = (lockupId, size, padFrac = 0.10) =>
  sharp(Buffer.from(squareSvg(lockupId, size, padFrac))).png();

// スケーラブルな SVG favicon(タブ表示は極小のため中身は #lockup-1 = ヨ 1文字。
// 対応ブラウザは ICO/PNG より SVG を優先するので、タブは常に「ヨ」で判読性を確保)。
function faviconSvgText() {
  const S = 160, p = Math.round(S * 0.12), u = S - 2 * p;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">`
    + `<rect width="${S}" height="${S}" fill="${BG}"/>${defs}`
    + `<use href="#lockup-1" x="${p}" y="${p}" width="${u}" height="${u}" fill="#ffffff"/></svg>\n`;
}

// ---- 最小限の ICO ライター(PNG ペイロードを内包。現代ブラウザは PNG-in-ICO を解釈する) ----
function buildIco(entries /* [{size, png:Buffer}] */) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const chunks = [];
  entries.forEach((e, i) => {
    const b = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 0);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 1);
    dir.writeUInt8(0, b + 2); dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4); dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(e.png.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += e.png.length;
    chunks.push(e.png);
  });
  return Buffer.concat([header, dir, ...chunks]);
}

async function main() {
  // 1) 横長OGP: 正本の既定表示(#board-og)そのまま = 1200×630
  await sharp(Buffer.from(master)).png().toFile(join(OUT, 'ogp.png'));

  // 2) 正方系アイコン = 2行
  await renderSquare('lockup-2', 180, 0.10).toFile(join(OUT, 'apple-touch-icon.png'));
  await renderSquare('lockup-2', 192, 0.10).toFile(join(OUT, 'icon-192.png'));
  await renderSquare('lockup-2', 512, 0.10).toFile(join(OUT, 'icon-512.png'));
  await renderSquare('lockup-2', 96, 0.10).toFile(join(OUT, 'favicon-96.png'));

  // 3) 極小(16・32) = ヨ 1文字(タブ表示で2行は潰れるため) / スケーラブル SVG favicon(= ヨ)
  await renderSquare('lockup-1', 32, 0.06).toFile(join(OUT, 'favicon-32.png'));
  await renderSquare('lockup-1', 16, 0.06).toFile(join(OUT, 'favicon-16.png'));
  writeFileSync(join(OUT, 'favicon.svg'), faviconSvgText());

  // 4) favicon.ico = 16(ヨ) / 32(ヨ) / 48(2行)
  const ico16 = await renderSquare('lockup-1', 16, 0.06).toBuffer();
  const ico32 = await renderSquare('lockup-1', 32, 0.06).toBuffer();
  const ico48 = await renderSquare('lockup-2', 48, 0.08).toBuffer();
  writeFileSync(join(OUT, 'favicon.ico'), buildIco([
    { size: 16, png: ico16 }, { size: 32, png: ico32 }, { size: 48, png: ico48 },
  ]));

  console.log('generated: ogp.png, apple-touch-icon.png, icon-192.png, icon-512.png, favicon-96.png, favicon-32.png, favicon-16.png, favicon.svg, favicon.ico');
}
main().catch((e) => { console.error(e); process.exit(1); });
