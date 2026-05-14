<?php
/**
 * ROOT copy — lists assets/images/projects/ as JSON.
 * Upload to: public_html/list-project-images.php (same folder as index.html)
 */
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$allowedExt = ['jpg', 'jpeg', 'jpe', 'jfif', 'pjpeg', 'png', 'webp', 'gif', 'avif', 'bmp'];
$skipNames = ['.gitkeep', 'thumbs.db', '.ds_store', 'desktop.ini', 'projects-file-list.txt'];

function ktcc_root_candidate_dirs($startDir)
{
    $out = [];
    $dir = $startDir;
    for ($i = 0; $i < 10; $i++) {
        $out[] = $dir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'projects';
        $out[] = $dir . DIRECTORY_SEPARATOR . 'Assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'projects';
        $out[] = $dir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'Images' . DIRECTORY_SEPARATOR . 'projects';
        $parent = dirname($dir);
        if ($parent === $dir) {
            break;
        }
        $dir = $parent;
    }
    return $out;
}

$root = __DIR__;
$candidates = [];

$doc = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], "/\\") : '';
if ($doc !== '') {
    $candidates[] = $doc . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'projects';
    $candidates[] = $doc . DIRECTORY_SEPARATOR . 'Assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'projects';
}

$candidates = array_merge($candidates, ktcc_root_candidate_dirs($root));

$script = isset($_SERVER['SCRIPT_FILENAME']) ? (string) $_SERVER['SCRIPT_FILENAME'] : __FILE__;
$candidates = array_merge($candidates, ktcc_root_candidate_dirs(dirname($script)));

$candidates = array_unique($candidates);

$projectsDir = null;
$checked = [];
foreach ($candidates as $p) {
    $rp = @realpath($p);
    $checked[] = [
        'path' => $p,
        'realpath' => $rp !== false ? $rp : null,
        'is_dir' => $rp !== false && is_dir($rp),
        'readable' => $rp !== false && is_dir($rp) && is_readable($rp),
    ];
    if ($rp !== false && is_dir($rp) && is_readable($rp)) {
        $projectsDir = $rp;
        break;
    }
}

if ($projectsDir === null) {
    echo json_encode(
        [
            'images' => [],
            'source' => 'root-fallback-missing',
            'checked' => $checked,
            'document_root' => $doc,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function ktcc_truncate_title_root($s)
{
    if (function_exists('mb_strlen') && function_exists('mb_substr')) {
        if (mb_strlen($s, 'UTF-8') > 70) {
            return mb_substr($s, 0, 67, 'UTF-8') . '…';
        }
    } elseif (strlen($s) > 70) {
        return substr($s, 0, 67) . '…';
    }
    return $s;
}

function ktcc_looks_like_auto_date_root($s)
{
    $t = trim((string) $s);
    if ($t === '') {
        return false;
    }
    if (preg_match('/^\d{1,2}[-.\/]\d{1,2}[-.\/]\d{2,4}$/', $t)) {
        return true;
    }
    if (preg_match('/^\d{4}\s+\d{1,2}\s+\d{1,2}$/', $t)) {
        return true;
    }
    if (preg_match('/^\d{4}-\d{1,2}-\d{1,2}$/', $t)) {
        return true;
    }
    if (preg_match('/^\d{4}[-.\/]\d{1,2}[-.\/]\d{1,2}\s+\d{1,2}/', $t)) {
        return true;
    }

    return false;
}

function ktcc_human_project_title_root($filename, $index)
{
    $labels = [
        'Infrastructure & utilities',
        'Civil works in progress',
        'Trenchless site operations',
        'Equipment & crew on site',
        'Structural milestones',
        'Road & ROW coordination',
        'Safety-led construction',
        'Quality checkpoint',
    ];
    $baseFromFile = pathinfo($filename, PATHINFO_FILENAME);
    $raw = str_replace(['_', '  '], [' ', ' '], (string) $baseFromFile);
    $slug = trim($raw);
    $avoid = '/whatsapp|wetransfer|image\s*20\d{2}|dsc[\-_]?\d|screenshot|photo[_\\-]?\d|img[_\\-]?\d|pic[\-_]|^p\d{3,}$/i';
    if ($slug !== '' && !preg_match($avoid, $slug) && !ktcc_looks_like_auto_date_root($slug)) {
        return ktcc_truncate_title_root($slug);
    }
    $cleaned = preg_replace('/^whatsapp\s*image\s*/i', '', $raw);
    $cleaned = preg_replace('/^img[_\\-]?/i', '', $cleaned);
    $cleaned = preg_replace('/\s+at\s+[\d.:apm\\s-]+$/i', '', $cleaned);
    $cleaned = preg_replace('/\s*\(\s*\d+\s*\)\s*$/', '', $cleaned);
    $cleaned = preg_replace('/^\d{1,2}[-._]\d{1,2}[-._]\d{2,4}\s*/i', '', $cleaned);
    $cleaned = preg_replace('/[\-_]+/', ' ', $cleaned);
    $cleaned = preg_replace('/\s+/', ' ', (string) $cleaned);
    $cleaned = trim($cleaned);
    if (
        strlen($cleaned) >= 4
        && !preg_match($avoid, $cleaned)
        && !preg_match('/^\d+$/', $cleaned)
        && !ktcc_looks_like_auto_date_root($cleaned)
    ) {
        $cap = function_exists('mb_strtoupper') && function_exists('mb_substr')
            ? mb_strtoupper(mb_substr($cleaned, 0, 1, 'UTF-8'), 'UTF-8') . mb_substr($cleaned, 1, 200, 'UTF-8')
            : ucfirst(strtolower($cleaned));

        return ktcc_truncate_title_root($cap);
    }
    $mod = (crc32((string) pathinfo($filename, PATHINFO_FILENAME)) % 8 + 8) % 8;
    $num = (crc32('n' . (string) pathinfo($filename, PATHINFO_FILENAME)) % 99 + 99) % 99 + 1;

    return $labels[$mod] . ' · ' . str_pad((string) $num, 2, '0', STR_PAD_LEFT);
}

$categories = ['trenchless', 'infrastructure', 'road', 'building'];
$files = @scandir($projectsDir, SCANDIR_SORT_ASCENDING);
if ($files === false) {
    echo json_encode(['images' => [], 'source' => 'read-error', 'dir' => $projectsDir], JSON_UNESCAPED_UNICODE);
    exit;
}

$images = [];
$i = 0;
foreach ($files as $fn) {
    if ($fn === '.' || $fn === '..') {
        continue;
    }
    if (in_array(strtolower($fn), $skipNames, true)) {
        continue;
    }
    $ext = strtolower(pathinfo($fn, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt, true)) {
        continue;
    }
    $images[] = [
        'file' => $fn,
        'title' => ktcc_human_project_title_root($fn, $i),
        'category' => $categories[$i % count($categories)],
        'caption' => 'KTCC project site — Bahrain.',
        'year' => '—',
        'status' => 'Gallery',
    ];
    $i++;
}

$out = [
    'images' => $images,
    'source' => 'root-directory-scan',
    'count' => count($images),
    'dir' => $projectsDir,
];
if (isset($_GET['debug'])) {
    $out['checked'] = $checked;
}
echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
