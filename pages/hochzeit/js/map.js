var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

window.addEventListener("load", function () {
  map.invalidateSize();
});


// // Wedding location
// L.marker([48.13, 11.58])
//   .addTo(map)
//   .bindPopup("Wedding Ceremony");


// // Celebration location
// L.marker([48.14, 11.60])
//   .addTo(map)
//   .bindPopup("Celebration");


// // Hotel example
// const hotelIcon = L.icon({
//     iconUrl: 'hotel-marker.png',
//     iconSize: [25, 41]
// });

// L.marker([48.15, 11.57], {icon: hotelIcon})
//   .addTo(map)
//   .bindPopup("Hotel Example");


setTimeout(function () {
  console.log("fixing size");
  map.invalidateSize();
}, 100);

window.addEventListener("resize", function () {
  console.log("fixing size 2");
  map.invalidateSize();
});