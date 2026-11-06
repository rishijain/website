// Regenerates favicon.svg, apple-touch-icon.png and og-default.png in public/.
// Run `node scripts/make-assets.mjs` after the owner's real name/title are known,
// then commit the results. Placeholder values below mirror src/data/site.ts.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const NAME = 'Firstname Lastname';
const TITLE = 'Product engineer';
const LINE = 'Building production AI agents. Rails conference speaker.';
const INITIALS = 'FL';
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

// Palette from src/styles/global.css (light for the share image, accent for the icon).
const ACC = '#2563eb', ACC_DARK = '#60a5fa', BG = '#ffffff', FG = '#14171a', MUT = '#5b6670', RULE = '#d5d9de';

// Favicon: initials on the accent colour, inverted in dark mode.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>
    .bg{fill:${ACC}} .fg{fill:#fff}
    @media (prefers-color-scheme: dark){.bg{fill:${ACC_DARK}} .fg{fill:#0e1013}}
  </style>
  <rect class="bg" width="64" height="64" rx="14"/>
  <text class="fg" x="32" y="43" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="30" letter-spacing="-1">${INITIALS}</text>
</svg>
`;
writeFileSync('public/favicon.svg', favicon);

// Apple touch icon: 180x180, always the light variant (iOS rounds the corners itself, so no rx).
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${ACC}"/>
  <text x="90" y="118" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="84" letter-spacing="-3" fill="#fff">${INITIALS}</text>
</svg>`;
await sharp(Buffer.from(touch)).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');

// Open Graph / Twitter share image: 1200x630, plain background matching the site.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="80" y="80" width="96" height="96" rx="20" fill="${ACC}"/>
  <text x="128" y="148" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="46" letter-spacing="-1.5" fill="#fff">${INITIALS}</text>
  <text x="80" y="340" font-family="${FONT}" font-weight="700" font-size="84" letter-spacing="-3" fill="${FG}">${NAME}</text>
  <text x="80" y="408" font-family="${FONT}" font-size="40" fill="${MUT}">${TITLE}</text>
  <rect x="80" y="450" width="1040" height="2" fill="${RULE}"/>
  <text x="80" y="510" font-family="${FONT}" font-size="30" fill="${MUT}">${LINE}</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true }).toFile('public/og-default.png');
