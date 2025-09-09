document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const gpxFiles = [  'Activity_Husavik.gpx',
                        'Hike_Hverfall.gpx',
                        'Hike_Mini_Studlagil.gpx',
                        'Hike_Thingvellir.gpx',
                        'Hike_Arnarvatn.gpx',
                        'Hike_Hverir.gpx',
                        'Hike_Reykjanes.gpx',
                        'Hike_Vestmannaeyjar.gpx',
                        'Hike_Bifrost.gpx',
                        'Hike_Mini_Jokursalon.gpx',
                        'Hike_Skaftafell.gpx',
                        'Hike_Virkisjokull.gpx',
                        'Hike_Grindavik.gpx',
                        'Hike_Mini_Kviarjokull.gpx',
                        'Hike_Svartifoss.gpx',
                        'Hike_Hveragerdi.gpx',
                        'Hike_Mini_Reynisfjara.gpx',
                        'Hike_Svinafell.gpx',
                        'Run_Bogarnes.gpx',
                        'Run_Vestmannaeyjar.gpx',
                      ]; // Add GPX filenames here

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
