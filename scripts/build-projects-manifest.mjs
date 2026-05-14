/**
 * Scans assets/images/projects/ and writes assets/data/projects-manifest.json
 * so https://ktccgulf.in/projects.html works on Hostinger without PHP.
 *
 * Usage (from ktcc-web folder):
 *   1. Copy your JPEGs from FTP into assets/images/projects/
 *   2. npm run projects:scan
 *   3. Upload assets/data/projects-manifest.json + images to hPanel public_html
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const projectsDir = path.join(root, 'assets', 'images', 'projects');
const outFile = path.join(root, 'assets', 'data', 'projects-manifest.json');

const extOk = /\.(jpe?g|png|webp|gif|bmp|avif)$/i;

const categories = ['trenchless', 'infrastructure', 'road', 'building'];

const AVOID_TITLE_RE =
    /whatsapp|wetransfer|image\s*20\d{2}|dsc[\-_]?\d|screenshot|photo[_\-]?\d|img[_\-]?\d|pic[\-_]|^p\d{3,}$/i;

function looksLikeAutoDateTitle(s) {
    const t = (s || '').trim();
    if (!t) return false;
    if (/^\d{1,2}[-./]\d{1,2}[-./]\d{2,4}$/.test(t)) return true;
    if (/^\d{4}\s+\d{1,2}\s+\d{1,2}$/.test(t)) return true;
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(t)) return true;
    if (/^\d{4}[-./]\d{1,2}[-./]\d{1,2}\s+\d{1,2}/.test(t)) return true;
    return false;
}

function humanProjectTitle(file, manifestTitle, index) {
    const baseFromFile = path.parse(file).name;
    const rawTitle = (manifestTitle || '').trim();
    let slug = (rawTitle || baseFromFile).trim();
    if (slug && !AVOID_TITLE_RE.test(slug) && !AVOID_TITLE_RE.test(baseFromFile) && !looksLikeAutoDateTitle(slug)) {
        return slug.length > 70 ? slug.slice(0, 67) + '…' : slug;
    }
    let cleaned = baseFromFile
        .replace(/^WhatsApp\s*Image\s*/i, '')
        .replace(/^IMG[_-]?/i, '')
        .replace(/\s+at\s+[\d.:apm\s-]+$/i, '')
        .replace(/\s*\(\s*\d+\s*\)\s*$/g, '')
        .replace(/^\d{1,2}[-._]\d{1,2}[-._]\d{2,4}\s*/i, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (cleaned.length >= 4 && !AVOID_TITLE_RE.test(cleaned) && !/^\d+$/.test(cleaned) && !looksLikeAutoDateTitle(cleaned)) {
        const cap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        return cap.length > 70 ? cap.slice(0, 67) + '…' : cap;
    }
    const labels = [
        'Infrastructure & utilities',
        'Civil works in progress',
        'Trenchless site operations',
        'Equipment & crew on site',
        'Structural milestones',
        'Road & ROW coordination',
        'Safety-led construction',
        'Quality checkpoint',
    ];
    const stem = path.parse(file).name;
    let h = 0;
    for (let i = 0; i < stem.length; i++) {
        h = (h * 31 + stem.charCodeAt(i)) | 0;
    }
    h = Math.abs(h);
    return `${labels[h % 8]} · ${String((h % 99) + 1).padStart(2, '0')}`;
}

if (!fs.existsSync(projectsDir)) {
    console.error('Missing folder:', projectsDir);
    process.exit(1);
}

const files = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isFile() && extOk.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

const images = files.map((file, i) => ({
    file,
    title: humanProjectTitle(file, '', i),
    category: categories[i % categories.length],
    caption: 'KTCC project site — Bahrain.',
    year: '—',
    status: 'Gallery',
}));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ images }, null, 2), 'utf8');
console.log('Wrote', images.length, 'entries to', path.relative(root, outFile));
