/**
 * Contact page map: Leaflet + OSM tiles, custom construction marker + CSS motion.
 * Marker uses inline SVG so it works without Font Awesome inside the map pane.
 */
(function () {
    /** Rough centre for Building 49 / Road 2701 area, Block 327, Adliyah */
    var OFFICE_LAT = 26.2147;
    var OFFICE_LNG = 50.5874;

    /** Minimal excavator / plant silhouette (white on orange badge) */
    var MARKER_SVG =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">' +
        '<path fill="currentColor" d="M4 21h17v4H4v-4zm2-8 4-9h11l3 9h6v3H6v-3zm9 0V11h7l2 7h-9z"/>' +
        '<circle fill="currentColor" cx="11" cy="25" r="2.8"/>' +
        '<circle fill="currentColor" cx="21" cy="25" r="2.8"/>' +
        '</svg>';

    function boot() {
        var el = document.getElementById('contactMap');
        if (!el) {
            return;
        }
        if (typeof L === 'undefined') {
            el.classList.add('contact-map-leaflet--failed');
            return;
        }

        var map = L.map(el, {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([OFFICE_LAT, OFFICE_LNG], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var icon = L.divIcon({
            className: 'ktcc-leaflet-marker',
            html:
                '<div class="ktcc-map-marker-pin" aria-hidden="true">' +
                '<span class="ktcc-map-marker-body">' +
                MARKER_SVG +
                '</span>' +
                '<span class="ktcc-map-marker-point"></span>' +
                '</div>',
            iconSize: [56, 62],
            iconAnchor: [28, 62],
            popupAnchor: [0, -54]
        });

        L.marker([OFFICE_LAT, OFFICE_LNG], { icon: icon })
            .addTo(map)
            .bindPopup(
                '<strong>Kapisha Trenchless &amp; Contracting Company</strong><br>' +
                    'Flat 43, Building 49, Road 2701<br>Block 327, Adliyah, Manama'
            );

        function refreshSize() {
            try {
                map.invalidateSize();
            } catch (e) {
                /* ignore */
            }
        }

        requestAnimationFrame(refreshSize);
        setTimeout(refreshSize, 400);
        window.addEventListener('load', function () {
            setTimeout(refreshSize, 150);
        });

        if (typeof IntersectionObserver !== 'undefined') {
            var io = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            refreshSize();
                        }
                    });
                },
                { threshold: 0.12 }
            );
            io.observe(el);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
