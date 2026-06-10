# KTCC Website — Full Design, UI & Feature Guide

**Kapisha Trenchless & Contracting Company W.L.L. (KTCC)**  
Official marketing website for trenchless technology, civil contracting, and utility infrastructure in Bahrain and the Gulf region.

---

## 1. Live addresses & repository

| Resource | URL / path |
|----------|------------|
| **Live site (current hosting)** | [https://ktccgulf.in/](https://ktccgulf.in/) |
| **Primary domain (SEO / config)** | [https://www.ktccgulf.com/](https://www.ktccgulf.com/) |
| **GitHub repository** | [https://github.com/Shamem-cyberx/ktcc-web](https://github.com/Shamem-cyberx/ktcc-web) |
| **Local project folder** | `e:\ktcc\ktcc-web` |
| **Branch** | `master` |

### Page URLs (all pages)

| Page | File | Canonical URL |
|------|------|---------------|
| Home | `index.html` | `https://www.ktccgulf.com/` |
| Services | `services.html` | `https://www.ktccgulf.com/services.html` |
| Projects | `projects.html` | `https://www.ktccgulf.com/projects.html` |
| About Us | `about.html` | `https://www.ktccgulf.com/about.html` |
| Contact | `contact.html` | `https://www.ktccgulf.com/contact.html` |
| IMS Policy | `ims-policy.html` | `https://www.ktccgulf.com/ims-policy.html` |

### Service deep-links (hash routing on Services page)

| Service | URL |
|---------|-----|
| Micro Tunneling | `services.html#micro-tunneling-service` |
| HDD | `services.html#hdd-service` |
| Infrastructure | `services.html#infrastructure-service` |
| Building Construction | `services.html#building-service` |
| Water Transmission | `services.html#water-transmission-service` |
| Electrical Transmission Civil | `services.html#electrical-transmission-service` |
| Irrigation & Landscaping | `services.html#irrigation-landscaping-service` |

### Company contact (site-wide)

| Field | Value |
|-------|-------|
| **Legal name** | Kapisha Trenchless & Contracting Company W.L.L. |
| **Address** | Flat 43, Building 49, Road/ Street 2701, Block 327, Adliyah, Manama, Kingdom of Bahrain |
| **Mobile** | +973 35034495 |
| **Landline (TEL)** | +973 17670813 |
| **Email** | info@ktccgulf.com |
| **WhatsApp** | [wa.me/97335034495](https://wa.me/97335034495) |
| **CR number** | 184157-1 |
| **Experience badge** | 19+ years |
| **Working hours** | Sunday–Thursday, 8:00 AM – 5:00 PM |

> **Note:** If your live domain is `ktccgulf.in` only, update `siteUrl` in `js/site-config.js` and URLs inside `sitemap.xml` / `robots.txt` to match.

---

## 2. Technology stack (what we use)

This is a **static HTML/CSS/JavaScript** website — no React, Vue, or WordPress. It is designed for fast loading on Hostinger / Apache shared hosting.

| Layer | Technology | Version / source |
|-------|------------|------------------|
| **Markup** | HTML5 | Semantic sections, ARIA on chatbot |
| **Styling** | Custom CSS | `css/style.css` (~6,300 lines) |
| **Animations** | WOW.js + custom `animate.css` | WOW 1.1.2 (CDN) |
| **Icons** | Font Awesome | **6.4.0** (CDN) — use only icons available in FA 6.4 free set |
| **Fonts** | Google Fonts — **Poppins** | Weights 300–700 |
| **Maps** | Leaflet + OpenStreetMap tiles | 1.9.4 (Contact page only) |
| **Analytics** | Google Analytics 4 (optional) | Via `js/marketing-tracking.js` |
| **Build** | None required for deploy | Optional Node script for projects manifest |
| **Server** | Apache (`.htaccess`) | Hostinger |

### Third-party CDN scripts

```html
<!-- Icons -->
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

<!-- Scroll animations -->
https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js

<!-- Contact map (contact.html only) -->
https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css
https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js
```

### Font rule

All elements use **Poppins** via:

```css
font-family: 'Poppins', sans-serif;
```

---

## 3. Brand color palette & design tokens

All colors are defined as CSS custom properties in `:root` inside `css/style.css`.

### Core brand colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#1e88e5` | Primary blue — buttons, links, icons, accents |
| `--secondary` | `#ff4081` | Pink accent — CTAs, highlights, logo “TCC”, section kicker text |
| `--dark` | `#0d47a1` | Dark blue — headings, header/footer shell, ISO gradient start |
| `--light` | `#bbdefb` | Light blue — hero text highlights |
| `--white` | `#ffffff` | Backgrounds, cards, logo plate |
| `--black` | `#212121` | Body text |
| `--gray` | `#757575` | Secondary / supporting text |
| `--light-gray` | `#f5f5f5` | Subtle backgrounds |

### Layout & elevation tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ktcc-radius-lg` | `20px` | Large cards, ISO showcase, credentials hub |
| `--ktcc-radius-md` | `14px` | Buttons, badges, icon boxes |
| `--ktcc-shadow-soft` | `0 16px 48px rgba(13, 71, 161, 0.1)` | Card elevation |
| `--ktcc-shadow-deep` | `0 24px 70px rgba(0, 0, 0, 0.2)` | Hero / modal depth |
| `--ktcc-header-h` | `72px` | Header offset for scroll anchors |
| `--ktcc-shell-bg-scrolled` | `#0d47a1` | Header when scrolled |
| `--ktcc-shell-edge` | `rgba(255, 255, 255, 0.12)` | Header border |

### Extended palette (component-specific)

| Context | Colors |
|---------|--------|
| **Header (fixed)** | `rgba(13, 71, 161, 0.93)` + backdrop blur |
| **Contact CTA button** | Gradient `#ff4081` → `#e91e63` |
| **ISO showcase** | Gradient `#0d47a1` → `#1565c0` → `#1e88e5` |
| **ISO badge tick** | `#2e7d32` (green) |
| **Trust & safety card** | Green gradient `#2e7d32` → `#43a047` |
| **Hero text gradient** | `primary` → `secondary` (`.text-gradient`) |
| **Hero pink phrase** | `secondary` → `#c084fc` → `primary` |
| **Footer** | Dark blue shell matching header |
| **Chatbot toggle** | Primary blue circle |
| **Back to top** | Pink (`--secondary`) |

### Gradient patterns we use

1. **Section dividers:** `linear-gradient(to right, var(--primary), var(--secondary))`
2. **Card top accent bars:** `linear-gradient(90deg, var(--primary), var(--secondary))`
3. **ISO / compliance blocks:** Blue vertical gradients on dark backgrounds
4. **Hero overlay:** Dark gradient over full-width video
5. **Button hovers:** Outline flip (fill → transparent with colored border)

---

## 4. Typography & text hierarchy

| Element | Style |
|---------|-------|
| **Body** | 16px base, line-height 1.6, color `--black` |
| **Section kicker** | 18px, `--secondary`, uppercase feel via letter-spacing on some kickers |
| **Section H2** | 36px, `--dark`, centered with gradient divider |
| **Hero H1** | `clamp()` responsive, white on video |
| **Card titles** | 1.0–1.12rem, weight 600 |
| **Labels / kickers** | 0.68–0.72rem, uppercase, letter-spacing 0.12–0.14em |

### Special text classes

| Class | Effect |
|-------|--------|
| `.text-gradient` | Blue → pink gradient text |
| `.text-pink` | Solid secondary pink (bold) |
| `.text-blue` | Light blue highlight |
| `.section-title .divider` | 80×3px gradient bar |

---

## 5. Layout system

| Rule | Value |
|------|-------|
| **Max content width** | `1200px` (`.container`) |
| **Horizontal padding** | `clamp(16px, 4vw, 32px)` |
| **Section vertical padding** | `100px 0` (default `section`) |
| **Grid** | CSS Grid + Flexbox (no Bootstrap/Tailwind) |
| **Breakpoints** | 992px, 768px, 576px (mobile nav at ≤768px) |
| **Scroll** | `scroll-behavior: smooth` on `html` |

### Responsive behavior

- **Desktop:** Full horizontal nav + services dropdown
- **Tablet / mobile (≤768px):** Hamburger menu, stacked grids, portrait hero video
- **Small mobile (≤576px):** Smaller logo (36px height)

---

## 6. UI components & design patterns

### 6.1 Global chrome (every page)

| Component | ID / class | Behavior |
|-----------|------------|----------|
| **Preloader** | `.preloader` | Spinner until `window.load`; hidden via JS |
| **Site header** | `#header` | Fixed top bar; **must use `#header` selector in CSS** (not bare `header`) |
| **Logo** | `.logo` | White plate behind PNG; click → home |
| **Nav** | `#nav` | Active link underline; pink hover |
| **Contact nav button** | `.contact-btn` | Pink pill CTA in header |
| **Services dropdown** | `.dropdown` | Hover desktop; tap-to-expand mobile |
| **Footer** | `footer` | 4-column grid: logo, links, services, contact |
| **Back to top** | `#backToTop` | Pink circle; shows after 300px scroll |
| **Chatbot** | `#chatbotToggle` / `#chatbotContainer` | Floating assistant bottom-right |

### 6.2 Buttons

| Class | Look | Use |
|-------|------|-----|
| `.btn-primary` | Blue fill | Main actions |
| `.btn-secondary` | Pink fill | Secondary / quote CTAs |
| `.btn` | Base padding 12×30px, radius 4px | All buttons |
| `.primary-btn` | Homepage service CTA with ripple | Services section |
| `.service-btn` | Card link with arrow | Service cards |
| `.about-cert-btn` | ISO download / IMS links | Certificate panel |

**Hover pattern:** Primary/secondary buttons invert to outline on hover.

### 6.3 Cards

| Component | Class | Description |
|-----------|-------|-------------|
| **Service card** | `.service-card` | Image header + icon + tags + description |
| **Team card** | `.team-card` | Photo + role + name; lead card variant |
| **Credentials card** | `.ktcc-cred-card` | White card, gradient top bar, icon box |
| **Capability item** | `.ktcc-cap-item` | Light blue tint sub-card in capabilities grid |
| **ISO badge** | `.about-iso-badge` | White card on blue showcase |
| **Project card** | `.inside-project-card` | Projects page gallery |

### 6.4 Section patterns

| Pattern | Where used |
|---------|------------|
| **`.section-title`** | Centered H2 + pink span + gradient divider |
| **`.section-header`** | Editorial header with custom divider dots |
| **WOW fade-in** | `wow fadeInUp` on scroll (WOW.js) |
| **Video hero** | Full-viewport MP4 + gradient overlay |
| **Slider** | `translateX(-n%)` track (projects, testimonials, services) |
| **Marquee** | Infinite client logo scroll (`.client-track`) |

---

## 7. Page-by-page breakdown

### 7.1 Home (`index.html`)

| Section | ID | Features |
|---------|-----|----------|
| **Hero** | `#home` | Desktop + mobile hero videos, pills, gradient headline, dual CTAs, scroll indicator |
| **About** | `#about` | About video with play/mute/download, CR badge |
| **ISO showcase** | `#iso-certification` | 3 ISO badges, embedded PDF iframe, download + IMS link |
| **Credentials hub** | `#about-credentials` | Registration, trust, capabilities grid, compliance list, Bahrain card |
| **Team** | `#team` | 9 team members in responsive grid |
| **Services preview** | `#services` | 3 service cards + CTA to contact |
| **Projects slider** | `#projects` | Auto carousel with dots, prev/next |
| **Mini contact CTA** | — | Animated word CTA band |
| **Clients** | `#clients` | Logo marquee + testimonial carousel |

### 7.2 Services (`services.html`)

- **Tab navigation:** 7 category buttons (`.inside-category-btn`)
- **Content panels:** One active panel per service (`.inside-service-content`)
- **Hash routing:** URL `#hdd-service` etc. auto-selects tab and scrolls
- **Per-service image sliders:** Auto-advance every 5s with arrows and dots
- **Irrigation service:** Uses **local** images in `assets/images/services/`

### 7.3 Projects (`projects.html`)

- **Hero:** `.projects-page-hero` with stats and marquee
- **Gallery:** Driven by `js/projects-gallery.js`
- **Data sources (fallback chain):**
  1. `assets/data/projects-manifest.json`
  2. PHP endpoint `list-project-images.php`
  3. `assets/data/projects-file-list.txt`
  4. Hardcoded inline fallback images
- **Filters:** Trenchless, infrastructure, road, building categories
- **Carousel + filmstrip** UI with lightbox-style viewing

### 7.4 About (`about.html`)

- Company story, values, experience
- Mirrors brand styling from homepage

### 7.5 Contact (`contact.html`)

- Contact form (`#contactForm`) — **currently shows alert only** (no email backend)
- Office details with click-to-call / WhatsApp / email
- **Leaflet map** at Adliyah office coordinates with custom construction marker SVG

### 7.6 IMS Policy (`ims-policy.html`)

- Public Integrated Management System policy document
- Linked from ISO certificate panel and footer

---

## 8. JavaScript architecture

| File | Responsibility |
|------|----------------|
| `js/site-config.js` | Central config: URLs, phone, GA4 ID, address |
| `js/marketing-tracking.js` | GA4 load + event tracking (phone, WhatsApp, email, form, CTA) |
| `js/main.js` | Preloader, sticky header, mobile menu, sliders, WOW, services tabs, contact form, team observer, service card animations |
| `js/chatbot.js` | Rule-based KTCC assistant (quotes, services, contact) |
| `js/contact-map.js` | Leaflet map initialization |
| `js/projects-gallery.js` | Projects manifest loading, filters, carousel |

### Key interactions (`main.js`)

| Feature | How it works |
|---------|--------------|
| Sticky header | Adds `.scrolled` to `#header` after 100px |
| Smooth anchors | Offset `-90px` for fixed header |
| Project slider | `translateX(-slideIndex * 100%)`, auto 5s |
| Testimonial slider | Auto 6s |
| Service hash | Reads `location.hash`, clicks matching tab |
| WOW.js | `new WOW().init()` — elements with `.wow` animate on scroll |

### Chatbot capabilities

- Greeting with shortcut buttons
- Services overview
- Quote request flow
- Contact details (both phone numbers, email, address, hours)
- Keyword matching on user input

### Analytics events (when GA4 ID is set)

| Event | Trigger |
|-------|---------|
| `phone_click` | `tel:` links |
| `whatsapp_click` | WhatsApp / wa.me links |
| `email_click` | `mailto:` links |
| `contact_form_submit` | Form submit |
| `cta_click` | `.btn-cta`, `.contact-btn` |

---

## 9. Assets & folder structure

```
ktcc-web/
├── index.html, about.html, services.html, projects.html, contact.html, ims-policy.html
├── css/
│   ├── style.css          ← All site styles + design tokens
│   └── animate.css        ← WOW animation keyframes
├── js/
│   ├── site-config.js
│   ├── marketing-tracking.js
│   ├── main.js
│   ├── chatbot.js
│   ├── contact-map.js
│   └── projects-gallery.js
├── assets/
│   ├── ktcc-logo (1).png
│   ├── hero-banner-landscape.mp4
│   ├── hero-banner-portrait.mp4
│   ├── about-video-fix.mp4
│   ├── documents/
│   │   └── ktcc-iso-certificate.pdf
│   ├── images/
│   │   ├── favicon.png
│   │   ├── team/          ← Team headshots (filename = Name - Role)
│   │   ├── services/      ← Irrigation slider images (local)
│   │   └── projects/      ← Field photos for gallery
│   └── data/
│       ├── projects-manifest.json
│       ├── projects-file-list.txt
│       └── list-project-images.php
├── sitemap.xml
├── robots.txt
├── .htaccess
├── MARKETING-GROWTH.md    ← ROI / marketing playbook
└── KTCC-WEBSITE-GUIDE.md  ← This file
```

### Cache busting

HTML pages link CSS with version query strings, e.g. `css/style.css?v=ktcc15`. **Bump the version after CSS changes** so Hostinger/browsers load fresh styles.

---

## 10. SEO & marketing setup

| Item | Status | Location |
|------|--------|----------|
| Page titles & meta descriptions | ✅ Per page | Each `<head>` |
| Canonical URLs | ✅ | `https://www.ktccgulf.com/...` |
| Open Graph tags | ✅ | Homepage + key pages |
| JSON-LD schema | ✅ | Homepage (`GeneralContractor`) |
| `sitemap.xml` | ✅ | Root |
| `robots.txt` | ✅ | Points to sitemap |
| GA4 tracking hooks | ✅ | Needs `ga4Id` in `site-config.js` |
| Contact form email | ❌ Not wired | Shows browser `alert()` only |

See **`MARKETING-GROWTH.md`** for the 90-day marketing and ROI plan.

---

## 11. Certifications & compliance content

| Certification | Standard |
|---------------|----------|
| Quality Management | ISO 9001:2015 |
| Environmental Management | ISO 14001:2015 |
| Occupational Health & Safety | ISO 45001:2018 |

- **PDF certificate:** `assets/documents/ktcc-iso-certificate.pdf`
- **IMS Policy page:** `ims-policy.html`
- Displayed in homepage **ISO showcase** with inline PDF viewer

---

## 12. Services offered (7 activities)

1. **Micro Tunneling Works** — EWA, Oil & Gas  
2. **HDD Works** — EWA, Oil & Gas  
3. **Infrastructure Works** — Sewer, storm water, roads  
4. **Building Construction Works**  
5. **Water Transmission Works**  
6. **Electrical Transmission Civil Works** — 11KV, 66KV, 220KV, 400KV  
7. **Irrigation & Landscaping Works**  

---

## 13. Team (homepage)

| Name | Role |
|------|------|
| Karutha Pandi | Managing Director |
| Mohamed Shajid | Admin |
| Cyril Dixon | Accountant |
| Fathima Pamnagadan | Secretary |
| Sanaullah Khan | Admin Coordinator |
| Mansoor Imtiaz | Construction Manager |
| Mohammed Ehteshamuddin | Project Coordinator |
| Vinesh Kadavathuvalappil | HSE Lead |
| Ashok Rajan | Site Inspector |

Photos live in `assets/images/team/` using the naming pattern `NAME - DESIGNATION.ext`.

---

## 14. Deployment (Hostinger)

1. Push changes to GitHub: `https://github.com/Shamem-cyberx/ktcc-web`
2. Upload / pull files to Hostinger `public_html` (or subdomain folder)
3. Ensure `.htaccess` is uploaded (MP4/PDF MIME, no-cache HTML)
4. Hard refresh browser: **Ctrl+F5** after deploy
5. Verify videos play and CSS version query updated

### Apache rules (`.htaccess`)

- `DirectoryIndex index.html`
- `Options -MultiViews` (prevents broken CSS/JS on some hosts)
- Correct MIME for MP4, WebM, PDF
- HTML: `no-cache` headers so users see updates immediately

### Optional: regenerate projects manifest

```bash
cd ktcc-web
npm run projects:scan
```

Requires Node 18+. Scans `assets/images/projects/` and updates manifest.

---

## 15. Design rules for future edits

1. **Always use `#header` for navigation styles** — never bare `header { position: fixed }` (breaks in-page headers).
2. **Stick to Font Awesome 6.4.0 icons** — verify icons exist before using (e.g. use `fa-shield-halved`, not `fa-shield-check`).
3. **Use CSS variables** from `:root` for colors — do not introduce random hex values.
4. **Match card pattern:** white background, `border-radius: var(--ktcc-radius-md)`, soft blue shadow, gradient top bar.
5. **Section rhythm:** `.section-title` or `.section-header` + `.container` + 100px section padding.
6. **Bump `?v=ktccNN`** on `style.css` after any CSS change.
7. **Update `js/site-config.js`** when phone, address, or domain changes — chatbot and tracking read from there.

---

## 16. Known limitations & next steps

| Item | Notes |
|------|-------|
| Contact form | Does not send email — configure Hostinger form forwarding or Formspree |
| GA4 | `ga4Id` is empty until you add your Measurement ID |
| Domain mismatch | Config uses `ktccgulf.com`; live host may be `ktccgulf.in` |
| No CMS | Content edits are direct HTML/CSS changes or GitHub deploy |
| No Arabic version | English only currently |
| Chatbot | Rule-based, not AI — answers from predefined knowledge base |

---

## 17. Quick reference — file to edit for common tasks

| Task | File(s) |
|------|---------|
| Change phone / address | `js/site-config.js`, footer in each HTML, `js/chatbot.js` |
| Add team member | `index.html` + image in `assets/images/team/` |
| Add project photo | `assets/images/projects/` + run `npm run projects:scan` or edit manifest |
| New service tab | `services.html` + nav dropdown in all HTML files + `main.js` hash slug |
| Colors / spacing | `css/style.css` `:root` and component sections |
| ISO certificate | Replace `assets/documents/ktcc-iso-certificate.pdf` |
| Analytics | `js/site-config.js` → `ga4Id` |
| Marketing strategy | `MARKETING-GROWTH.md` |

---

*Document version: May 2026 — matches repo commit with credentials hub fixes and `style.css?v=ktcc15`.*
