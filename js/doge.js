// Open/Close RadioDoge Map Menu
$('#toolbar .RadioDoge').on('click', function() {
    $(this).parent().toggleClass('open');
});

// Select the Regional Hubs
function selectRegionalHub() {
    regionalHub.openPopup();
}

// Select all Community Hubs
function selectAllCommunityHubs() {
    communityHubs.forEach(function(hub) {
        hub.marker.openPopup();
    });
}

// Select all Shibe Stations
function selectAllShibeStations() {
    shibeStations.forEach(function(hub) {
        hub.marker.openPopup();
    });
}

// Initialize the map
var map = L.map('leafletmap', {
    zoomControl: true,
    minZoom: 5
}).setView([39.50, -102.35], 5); // Centered in the middle of the US

// If we want a colourfull map add this
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

// Add a grayscale base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create custom icon for Radio Doge Regional Hub markers
var RadioDogeRegionalHubIcon = L.icon({
    iconUrl: 'img/RadioDogeRegionalHub.gif',
    iconSize: [80, 78],
    iconAnchor: [25, 34]
});

// Add a marker at the regional hub
var regionalHub = L.marker([39.50, -102.35], {
    icon: RadioDogeRegionalHubIcon
}).addTo(map);
regionalHub.bindPopup('Regional Hub');

// Create a circle with a radius of 15KM for the regional hub
var Regionalcircle = L.circle([39.50, -102.35], {
    color: '#FCBE2E',
    fillColor: '#FFE42B',
    fillOpacity: 0.3,
    radius: 0 // initial zero
}).addTo(map);

// Define variables for the wave animation
var waveRadius = 0;
var maxWaveRadius = 400000; // Maximum wave radius in meters
var waveSpeed = 5000; // Speed at which the wave expands and contracts (in meters per frame)
var expandingWave = true; // Indicates whether the wave is currently expanding or contracting
var waveColor = '#FFE42B'; // Color of the wave circles

// Function to animate the radio wave effect
function animateRadioWaves() {
    if (expandingWave) {
        createWaveCircle(waveRadius); // Create a new circle line with the current radius
        if (waveRadius >= maxWaveRadius) {
            expandingWave = false;
        }
    } else {
        if (waveRadius <= 0) {
            expandingWave = true;
        }
    }

    // Adjust the wave radius based on the wave speed
    if (expandingWave) {
        waveRadius += waveSpeed;
    } else {
        waveRadius -= waveSpeed;
    }

    // Request the next frame for the animation
    requestAnimationFrame(animateRadioWaves);
}

// Function to create a wave circle line
function createWaveCircle(radius) {
    // Create a new circle representing the radio wave
    var radioWave = L.circle(regionalHub.getLatLng(), {
        color: waveColor,
        opacity: 0.7,
        weight: 1,
        fillColor: 'none',
        radius: radius
    }).addTo(map);

    // Remove the circle after a short delay to simulate the wave effect
    setTimeout(function() {
        map.removeLayer(radioWave);
    }, 100); // Adjust the delay as needed for the desired animation speed
}

// Start the radio wave animation
animateRadioWaves();

// Create custom icon for Radio Doge Regional Hub markers
var RadioDogeCommunityHubIcon = L.icon({
    iconUrl: 'img/RadioDogeCommunityHub.gif',
    iconSize: [70, 58],
    iconAnchor: [35, 40]
});

// Array of Radio Doge Community Hub locations
var communityHubs = [{
    lat: 39.50,
    lng: -97.70,
    popupContent: 'Community Hub'
}, ];

// Add Radio Doge Community Hubs with a radius of 15KM
for (var i = 0; i < communityHubs.length; i++) {
    var hub = communityHubs[i];

    // Create a marker for the community hub and bind the popup
    hub.marker = L.marker([hub.lat, hub.lng], {
        icon: RadioDogeCommunityHubIcon
    }).addTo(map);
    hub.marker.bindPopup(hub.popupContent);

    // Create circles for each community hub
    L.circle([hub.lat, hub.lng], {
        color: '#FFE42B',
        fillColor: '#FFE42B',
        fillOpacity: 0.3,
        radius: 15000 // 15 kilometers in meters
    }).addTo(map);
}

// Create custom icon for Radio Doge Regional Hub markers
var RadioDogeShibeStationIcon = L.icon({
    iconUrl: 'img/RadioDogeShibeStation.gif',
    iconSize: [48, 58],
    iconAnchor: [30, 40]
});

// Array of Radio Doge Shibe Stations locations
var shibeStations = [{
    lat: 37.00,
    lng: -105.00,
    popupContent: 'Shibe Stations'
}, ];

// Add Radio Doge Shibe Stations with a radius of 10KM
for (var i = 0; i < shibeStations.length; i++) {
    var hub = shibeStations[i];

    // Create a marker for the shibe station and bind the popup
    hub.marker = L.marker([hub.lat, hub.lng], {
        icon: RadioDogeShibeStationIcon
    }).addTo(map);
    hub.marker.bindPopup(hub.popupContent);

    // Create circles for each shibe station
    L.circle([hub.lat, hub.lng], {
        color: '#FFE42B',
        fillColor: '#FFE42B',
        fillOpacity: 0.3,
        radius: 10000 // 10 kilometers in meters
    }).addTo(map);
}


// Event listener for clicking on the map
/*
map.on('click', function (e) {
    var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent('Coordinates: ' + e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6) +
            ' <button onclick="copyCoordinates(\'' + e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6) + '\')">Copy</button>')
        .openOn(map);
});
*/

// Function to copy coordinates to the clipboard
function copyCoordinates(coordinates) {
    var textArea = document.createElement("textarea");
    textArea.value = coordinates;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Coordinates copied to clipboard: ' + coordinates);
}

// Function to add SpaceX Starlink satellite markers
function addSatelliteMarkers() {
    // Make an API request to retrieve SpaceX Starlink satellite data
    fetch('https://api.spacexdata.com/v4/starlink')
        .then(response => response.json())
        .then(data => {

            // Shuffle the starlink satellite data array randomly
            shuffleArray(data);

            // Take the first 5 starlink from the shuffled array
            var selectedStarlink = data.slice(0, 150);

            // Animate satellite movement (simulated)
            animateSatellites(selectedStarlink);
        })
        .catch(error => {
            console.error('Error fetching starlink data:', error);
        });
}

// Animate starlink movement (simulated)
function animateSatellites(satellites) {
    satellites.forEach(function(starlink) {
        // Create custom icon for starlink satellite markers
        var starlinkIcon = L.icon({
            iconUrl: 'img/Starlink.png',
            iconSize: [35, 38],
            iconAnchor: [16, 16]
        });

        if (typeof starlink.latitude === 'number' && typeof starlink.longitude === 'number' && !isNaN(starlink.latitude) && !isNaN(starlink.longitude)) {
            const marker = L.marker([starlink.latitude, starlink.longitude], {
                icon: starlinkIcon
            });

            // Attach satellite name to the marker as a property
            marker.satelliteName = starlink.spaceTrack.OBJECT_NAME;

            marker.addTo(map);

            // Simulate starlink movement (update position randomly)
            setInterval(function() {
                // Simulate small random changes in latitude and longitude
                starlink.latitude += (0.5) * 0.1;
                starlink.longitude += (0.5) * 0.1;

                // Update marker position
                marker.setLatLng([starlink.latitude, starlink.longitude]);

                // Check if the starlink is in range of the Radio Doge Regional Hub
                const regionalHubLatLng = regionalHub.getLatLng();
                const starlinkLatLng = marker.getLatLng();
                const distance = regionalHubLatLng.distanceTo(starlinkLatLng); // in meters

                if (distance <= 400000) { // Adjust the range as needed
                    // Create a line (laser) between the Radio Doge Regional Hub and the starlink satellite
                    const laser = L.polyline([regionalHubLatLng, starlinkLatLng], {
                        color: 'red'
                    }).addTo(map);

                    // Animate the laser
                    animateLaser(laser);
                }

            }, 1000); // Update every 1 second (simulated)

            // Add a click event to display the satellite name on click
            marker.on('click', function() {
                marker.bindPopup(marker.satelliteName).openPopup();
            });
        }
    });
}

// Shuffle function for randomizing the satellite data
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to animate the laser between the regional hub and satellite
function animateLaser(laser) {
    var opacity = 1;

    function animate() {
        opacity -= 0.01;
        if (opacity <= 0) {
            map.removeLayer(laser);
        } else {
            laser.setStyle({
                opacity: opacity
            });
            requestAnimationFrame(animate);
        }
    }

    animate();
}


// Add SpaceX Starlink satellite markers to the map and start animation
addSatelliteMarkers();