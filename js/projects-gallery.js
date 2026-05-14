/**
 * Projects gallery: manifest-driven carousel + hero filmstrip.
 * Each item may use "url" (full URL) and/or "file" (under assets/images/projects/).
 */
(function () {
    var MANIFEST = 'assets/data/projects-manifest.json';
    /** Try in order: subfolder script, then site root (some hosts block PHP under /assets/). */
    var PHP_ENDPOINTS = ['assets/data/list-project-images.php', 'list-project-images.php'];
    /** One image filename per line — works without PHP if you upload this file. */
    var FILE_LIST = 'assets/data/projects-file-list.txt';
    var IMAGE_BASE = 'assets/images/projects/';

    var state = {
        allItems: [],
        filter: 'all'
    };

    var carouselCleanup = null;

    function escapeHtml(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function getSrc(item) {
        var f = (item.file || '').trim();
        if (!f) return (item.url || '').trim();
        var parts = f.split(/[/\\]/);
        var encoded = parts
            .map(function (seg) {
                return encodeURIComponent(seg);
            })
            .join('/');
        return IMAGE_BASE + encoded;
    }

    /** Strip auto filenames (e.g. chat exports); never show "WhatsApp Image…" in the UI. */
    var AVOID_TITLE_RE =
        /whatsapp|wetransfer|image\s*20\d{2}|dsc[\-_]?\d|screenshot|photo[_\-]?\d|img[_\-]?\d|pic[\-_]|^p\d{3,}$/i;

    function looksLikeAutoDateTitle(s) {
        var t = (s || '').trim();
        if (!t) return false;
        if (/^\d{1,2}[-./]\d{1,2}[-./]\d{2,4}$/.test(t)) return true;
        if (/^\d{4}\s+\d{1,2}\s+\d{1,2}$/.test(t)) return true;
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(t)) return true;
        if (/^\d{4}[-./]\d{1,2}[-./]\d{1,2}\s+\d{1,2}/.test(t)) return true;
        return false;
    }

    function filenameStem(file) {
        var s = (file || '').replace(/^.*[/\\]/, '');
        return s.replace(/\.[^.]+$/, '');
    }

    function stableHashFromFile(file) {
        var s = filenameStem(file);
        var h = 0;
        for (var i = 0; i < s.length; i++) {
            h = ((h << 5) - h + s.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }

    function fallbackBahrainCaption(category, file, index) {
        var cat = (category || 'trenchless').toLowerCase();
        var themes = {
            trenchless: [
                'HDD & guided drilling — Bahrain utility corridor',
                'Trenchless crossing — roads and live utilities protected',
                'Rig line — directional drilling execution on site'
            ],
            road: [
                'Road & ROW — civil staging in the Kingdom',
                'Corridor works — earthworks and paving discipline',
                'Highway / urban link — coordinated site delivery'
            ],
            building: [
                'Building civil — structural and envelope milestones',
                'Vertical & slab works — engineered checkpoints',
                'Built facility — civil package in progress'
            ],
            infrastructure: [
                'Utility backbone — networks, chambers, tie-ins',
                'Infrastructure corridor — water, power, and drainage context',
                'Chamber and duct banks — Bahrain utility spine'
            ]
        };
        var list = themes[cat] || themes.trenchless;
        var h = stableHashFromFile(file || String(index));
        var pick = list[h % list.length];
        var fig = ((h % 80) + (index % 20)) % 99 + 1;
        return pick + ' · fig. ' + String(fig).padStart(2, '0');
    }

    function humanizeProjectTitle(file, manifestTitle, index, category) {
        var baseFromFile = filenameStem(file);
        var rawTitle = (manifestTitle || '').trim();
        var slug = (rawTitle || baseFromFile).trim();
        if (slug && !AVOID_TITLE_RE.test(slug) && !AVOID_TITLE_RE.test(baseFromFile) && !looksLikeAutoDateTitle(slug)) {
            return slug.length > 70 ? slug.slice(0, 67) + '…' : slug;
        }
        var cleaned = baseFromFile
            .replace(/^WhatsApp\s*Image\s*/i, '')
            .replace(/^IMG[_-]?/i, '')
            .replace(/\s+at\s+[\d.:apm\s-]+$/i, '')
            .replace(/\s*\(\s*\d+\s*\)\s*$/g, '')
            .replace(/^\d{1,2}[-._]\d{1,2}[-._]\d{2,4}\s*/i, '')
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (cleaned.length >= 4 && !AVOID_TITLE_RE.test(cleaned) && !/^\d+$/.test(cleaned) && !looksLikeAutoDateTitle(cleaned)) {
            var cap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
            return cap.length > 70 ? cap.slice(0, 67) + '…' : cap;
        }
        var catKey = (category || 'trenchless').toLowerCase();
        return fallbackBahrainCaption(catKey, file || '', index);
    }

    function categoryLabel(item, category) {
        if (item.categoryLabel) return item.categoryLabel;
        var map = {
            road: 'Road Construction',
            building: 'Building Construction',
            infrastructure: 'Infrastructure',
            trenchless: 'Trenchless'
        };
        if (map[category]) return map[category];
        if (!category || category === 'all') return 'Project';
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    function filteredItems() {
        var f = state.filter;
        if (f === 'all') return state.allItems.slice();
        return state.allItems.filter(function (item) {
            return (item.category || 'trenchless').toLowerCase() === f;
        });
    }

    function emptyState(html) {
        return (
            '<div class="inside-projects-empty" role="status">' +
            '<div class="inside-projects-empty-inner">' +
            '<i class="fas fa-images" aria-hidden="true"></i>' +
            '<p>' +
            html +
            '</p>' +
            '</div></div>'
        );
    }

    function buildCard(item, index) {
        var src = getSrc(item);
        if (!src) return null;
        var category = (item.category || 'trenchless').toLowerCase();
        var displayTitle = humanizeProjectTitle(item.file || '', item.title || '', index, category);
        var caption = item.caption || '';
        var year = item.year || '—';
        var status = item.status || '—';
        var catTitle = categoryLabel(item, category);

        var card = document.createElement('article');
        card.className = 'inside-project-card';
        card.setAttribute('data-category', category);
        card.setAttribute('data-delay', (0.05 * Math.min(index, 12)) + 's');

        card.innerHTML =
            '<div class="inside-project-image">' +
            '<img src="' +
            src +
            '" alt="' +
            escapeHtml(displayTitle) +
            '" loading="lazy" decoding="async" width="800" height="500">' +
            '<div class="inside-project-overlay">' +
            '<div class="inside-project-info">' +
            '<span class="inside-project-category">' +
            escapeHtml(catTitle) +
            '</span>' +
            '<h3>' +
            escapeHtml(displayTitle) +
            '</h3>' +
            (caption ? '<p>' + escapeHtml(caption) + '</p>' : '') +
            '</div></div></div>' +
            '<div class="inside-project-card-label">' +
            '<span class="inside-project-card-title">' +
            escapeHtml(displayTitle) +
            '</span>' +
            '<span class="inside-project-card-meta">' +
            'Kingdom of Bahrain · ' +
            escapeHtml(catTitle) +
            '</span></div>' +
            '<div class="inside-project-details">' +
            '<div class="inside-project-stats">' +
            '<div class="inside-stat-item"><i class="fas fa-calendar-alt"></i><span>' +
            escapeHtml(year) +
            '</span></div>' +
            '<div class="inside-stat-item"><i class="fas fa-hard-hat"></i><span>' +
            escapeHtml(status) +
            '</span></div>' +
            '</div></div>';

        return card;
    }

    function updateProjectHeroMeta() {
        var n = state.allItems.length;
        var el = document.querySelector('[data-projects-count]');
        if (el) {
            el.textContent = n ? String(n) : '—';
        }
    }

    function renderHeroMarquee() {
        var el = document.getElementById('projects-hero-marquee');
        if (!el) return;
        var list = state.allItems.slice(0, 16);
        if (!list.length) {
            el.innerHTML = '';
            el.hidden = true;
            el.setAttribute('aria-hidden', 'true');
            return;
        }
        el.hidden = false;
        el.setAttribute('aria-hidden', 'false');
        function buildTrack() {
            var track = document.createElement('div');
            track.className = 'projects-hero-marquee-track';
            list.forEach(function (item, i) {
                var src = getSrc(item);
                if (!src) return;
                var fig = document.createElement('figure');
                fig.className = 'projects-hero-marquee-item';
                var img = document.createElement('img');
                img.src = src;
                img.alt = '';
                img.loading = 'lazy';
                img.decoding = 'async';
                fig.appendChild(img);
                track.appendChild(fig);
            });
            return track;
        }
        var inner = document.createElement('div');
        inner.className = 'projects-hero-marquee-inner';
        inner.appendChild(buildTrack());
        inner.appendChild(buildTrack());
        el.innerHTML = '';
        el.appendChild(inner);
    }

    function throttle(fn, ms) {
        var t = null;
        return function () {
            var ctx = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout(function () {
                fn.apply(ctx, args);
            }, ms);
        };
    }

    function initProjectsCarousel(viewport) {
        if (carouselCleanup) {
            carouselCleanup();
            carouselCleanup = null;
        }
        var track = viewport.querySelector('.projects-carousel-track');
        if (!track) return;
        var slides = track.querySelectorAll('.projects-carousel-slide');
        var n = slides.length;
        if (n < 1) return;

        var prev = document.getElementById('projectsCarouselPrev');
        var next = document.getElementById('projectsCarouselNext');
        var dotsEl = document.getElementById('projectsCarouselDots');
        var carousel = document.getElementById('projectsGalleryCarousel');
        if (!prev || !next || !dotsEl || !carousel) return;

        carousel.hidden = false;

        function slideW() {
            return Math.max(1, Math.floor(viewport.clientWidth));
        }

        function layoutSlides() {
            var w = slideW();
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.flex = '0 0 ' + w + 'px';
                slides[i].style.width = w + 'px';
            }
        }

        layoutSlides();

        function activeIndex() {
            var w = slideW();
            return Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / w)));
        }

        function updateDots() {
            var idx = activeIndex();
            var btns = dotsEl.querySelectorAll('.projects-carousel-dot');
            for (var i = 0; i < btns.length; i++) {
                btns[i].classList.toggle('is-active', i === idx);
                btns[i].setAttribute('aria-selected', i === idx ? 'true' : 'false');
            }
        }

        var onScroll = throttle(updateDots, 80);

        function go(delta) {
            var w = slideW();
            viewport.scrollBy({ left: delta * w, behavior: 'smooth' });
        }

        function onPrev() {
            go(-1);
        }
        function onNext() {
            go(1);
        }

        prev.addEventListener('click', onPrev);
        next.addEventListener('click', onNext);
        viewport.addEventListener('scroll', onScroll, { passive: true });

        function onResize() {
            layoutSlides();
            updateDots();
        }
        window.addEventListener('resize', onResize);

        dotsEl.innerHTML = '';
        for (var i = 0; i < n; i++) {
            (function (idx) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'projects-carousel-dot';
                b.setAttribute('role', 'tab');
                b.setAttribute('aria-label', 'Slide ' + (idx + 1) + ' of ' + n);
                b.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
                b.addEventListener('click', function () {
                    var w = slideW();
                    viewport.scrollTo({ left: idx * w, behavior: 'smooth' });
                });
                dotsEl.appendChild(b);
            })(i);
        }

        function onKey(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                go(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                go(1);
            }
        }
        viewport.addEventListener('keydown', onKey);

        var solo = n < 2;
        prev.hidden = solo;
        next.hidden = solo;
        dotsEl.hidden = solo;
        if (!solo && dotsEl.firstElementChild) {
            dotsEl.firstElementChild.classList.add('is-active');
        }

        updateDots();

        carouselCleanup = function () {
            prev.removeEventListener('click', onPrev);
            next.removeEventListener('click', onNext);
            viewport.removeEventListener('scroll', onScroll);
            viewport.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
            prev.hidden = false;
            next.hidden = false;
            dotsEl.hidden = false;
            dotsEl.innerHTML = '';
        };
    }

    function render() {
        var mount = document.getElementById('inside-projects-grid-mount');
        var carousel = document.getElementById('projectsGalleryCarousel');
        var dots = document.getElementById('projectsCarouselDots');
        var fallback = document.getElementById('projects-gallery-fallback');
        if (!mount) return;

        if (carouselCleanup) {
            carouselCleanup();
            carouselCleanup = null;
        }

        var items = filteredItems();

        if (!items.length) {
            if (carousel) carousel.hidden = true;
            if (dots) {
                dots.innerHTML = '';
                dots.hidden = false;
            }
            mount.className = '';
            mount.innerHTML = '';
            if (fallback) {
                fallback.hidden = false;
                fallback.innerHTML = emptyState(
                    'No projects in this category yet. Choose <strong>All Projects</strong> or add matching entries in <strong>projects-manifest.json</strong>.'
                );
            }
            return;
        }

        if (fallback) {
            fallback.hidden = true;
            fallback.innerHTML = '';
        }

        mount.className = 'projects-carousel-viewport';
        mount.innerHTML = '<div class="projects-carousel-track"></div>';
        var track = mount.querySelector('.projects-carousel-track');

        items.forEach(function (item, i) {
            var c = buildCard(item, i);
            if (!c) return;
            var slide = document.createElement('div');
            slide.className = 'projects-carousel-slide';
            slide.appendChild(c);
            track.appendChild(slide);
        });

        if (typeof window.ktccInsideProjectsInit === 'function') {
            window.ktccInsideProjectsInit();
        }

        initProjectsCarousel(mount);
    }

    function bindFilters() {
        var filterBar = document.querySelector('.ktcc-projects-root .inside-projects-filter');
        if (!filterBar || filterBar.dataset.ktccGalleryBound) return;
        filterBar.dataset.ktccGalleryBound = '1';
        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('.inside-filter-btn');
            if (!btn) return;
            filterBar.querySelectorAll('.inside-filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            state.filter = btn.getAttribute('data-filter') || 'all';
            render();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.querySelector('.ktcc-projects-root');
        if (!root) return;

        bindFilters();

        function activateAllFilter() {
            state.filter = 'all';
            var first = document.querySelector('.ktcc-projects-root .inside-filter-btn[data-filter="all"]');
            if (first) {
                first.closest('.inside-projects-filter').querySelectorAll('.inside-filter-btn').forEach(function (b) {
                    b.classList.remove('active');
                });
                first.classList.add('active');
            }
        }

        function applyLoadedImages(images) {
            state.allItems = images || [];
            if (!state.allItems.length) {
                if (carouselCleanup) {
                    carouselCleanup();
                    carouselCleanup = null;
                }
                var gridEmpty = document.getElementById('inside-projects-grid-mount');
                var carouselEl = document.getElementById('projectsGalleryCarousel');
                var dotsEl = document.getElementById('projectsCarouselDots');
                var fb = document.getElementById('projects-gallery-fallback');
                if (carouselEl) carouselEl.hidden = true;
                if (dotsEl) {
                    dotsEl.innerHTML = '';
                    dotsEl.hidden = false;
                }
                if (gridEmpty) {
                    gridEmpty.className = '';
                    gridEmpty.innerHTML = '';
                }
                if (fb) {
                    fb.hidden = false;
                    fb.innerHTML = emptyState(
                        'Still no photos loaded. <strong>Fastest on Hostinger:</strong> copy your JPEGs into <code>assets/images/projects/</code> on your PC, run <code>npm run projects:scan</code> in the <code>ktcc-web</code> folder, then upload the new <strong>assets/data/projects-manifest.json</strong> plus <strong>js/projects-gallery.js</strong> and all images. Or use <strong>list-project-images.php?debug=1</strong>, or <strong>projects-file-list.txt</strong> (one filename per line). Then Ctrl+F5.'
                    );
                }
                updateProjectHeroMeta();
                renderHeroMarquee();
                return;
            }
            activateAllFilter();
            updateProjectHeroMeta();
            renderHeroMarquee();
            render();
        }

        function fetchPhpList(url) {
            return fetch(url + bust, { cache: 'no-store' })
                .then(function (r) {
                    if (!r.ok) throw new Error('no-php');
                    return r.text();
                })
                .then(function (text) {
                    var data;
                    try {
                        data = JSON.parse(text);
                    } catch (e) {
                        throw new Error('bad-json');
                    }
                    var imgs = (data && data.images) || [];
                    if (imgs.length > 0) return imgs;
                    throw new Error('empty-dir');
                });
        }

        function fetchFileListTxt() {
            return fetch(FILE_LIST + bust, { cache: 'no-store' }).then(function (r) {
                if (!r.ok) throw new Error('no-list');
                return r.text();
            }).then(function (text) {
                var lines = text.split(/\r?\n/);
                var cats = ['trenchless', 'infrastructure', 'road', 'building'];
                var out = [];
                var idx = 0;
                lines.forEach(function (raw) {
                    var line = raw.trim();
                    if (!line || line.charAt(0) === '#') return;
                    var file = line.replace(/^.*[/\\]/, '').trim();
                    if (!file) return;
                    var cat = cats[idx % 4];
                    out.push({
                        file: file,
                        title: humanizeProjectTitle(file, '', idx, cat),
                        category: cat,
                        caption: 'Bahrain field execution — HDD, utilities & related civil scope.',
                        year: '—',
                        status: 'Field photo'
                    });
                    idx++;
                });
                if (!out.length) throw new Error('empty-list');
                return out;
            });
        }

        function tryPhpSequential() {
            var p = Promise.reject();
            PHP_ENDPOINTS.forEach(function (url) {
                p = p.catch(function () {
                    return fetchPhpList(url);
                });
            });
            return p.catch(function () {
                return [];
            });
        }

        var bust = '?v=' + Date.now();
        fetch(MANIFEST + bust, { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('manifest');
                return r.json();
            })
            .then(function (data) {
                var imgs = (data && data.images) || [];
                if (imgs.length) return imgs;
                throw new Error('manifest-empty');
            })
            .catch(function () {
                return tryPhpSequential().then(function (imgs) {
                    if (imgs && imgs.length) return imgs;
                    return fetchFileListTxt().catch(function () {
                        return [];
                    });
                });
            })
            .then(function (imgs) {
                applyLoadedImages(imgs || []);
            })
            .catch(function () {
                applyLoadedImages([]);
            });
    });
})();
