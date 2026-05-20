/**
 * Loads GA4 when KTCC_SITE.ga4Id is set; tracks quote-intent events for ROI reporting.
 */
(function () {
    var cfg = window.KTCC_SITE || {};
    var gaId = (cfg.ga4Id || '').trim();

    function gtagSafe() {
        return typeof window.gtag === 'function';
    }

    function track(eventName, params) {
        if (!gtagSafe()) return;
        window.gtag('event', eventName, params || {});
    }

    if (gaId) {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', gaId, { send_page_view: true });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
            el.addEventListener('click', function () {
                track('phone_click', { link_url: el.getAttribute('href') });
            });
        });

        document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function (el) {
            el.addEventListener('click', function () {
                track('whatsapp_click', { link_url: el.getAttribute('href') });
            });
        });

        document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
            el.addEventListener('click', function () {
                track('email_click', { link_url: el.getAttribute('href') });
            });
        });

        var form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function () {
                track('contact_form_submit', { form_id: 'contactForm' });
            });
        }

        document.querySelectorAll('.btn-cta, a.contact-btn').forEach(function (el) {
            el.addEventListener('click', function () {
                track('cta_click', { link_text: (el.textContent || '').trim().slice(0, 80) });
            });
        });
    });

    window.ktccTrack = track;
})();
