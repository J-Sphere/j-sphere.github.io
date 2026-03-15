const map = L.map('map').setView([48.1351, 11.5820], 12);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);


// Wedding location
L.marker([48.13, 11.58])
  .addTo(map)
  .bindPopup("Wedding Ceremony");


// Celebration location
L.marker([48.14, 11.60])
  .addTo(map)
  .bindPopup("Celebration");


// Hotel example
const hotelIcon = L.icon({
    iconUrl: 'hotel-marker.png',
    iconSize: [25, 41]
});

L.marker([48.15, 11.57], {icon: hotelIcon})
  .addTo(map)
  .bindPopup("Hotel Example");