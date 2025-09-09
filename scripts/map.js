document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const gpxFiles = ['vestmannaeyjar.gpx']; // Add GPX filenames here

    const gpxList = document.getElementById('gpx-list');

    gpxFiles.forEach(file => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = file;
        link.onclick = function() {
            new L.GPX(`gpx/${file}`, {
                async: true
            }).on('loaded', function(e) {
                map.fitBounds(e.target.getBounds());
            }).on('error', function(e) {
                console.error('Error loading GPX file:', e);
            }).addTo(map);
        };
        listItem.appendChild(link);
        gpxList.appendChild(listItem);
    });
});
