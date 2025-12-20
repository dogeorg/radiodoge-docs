// RadioDoge Documentation Script - Matching dogecoin-core-docs functionality

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');

    // Check if all required elements exist
    if (!sidebar || !sidebarToggle || !mainContent) {
        console.error('Required sidebar elements not found');
        return;
    }

    // Check if desktop
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Update toggle icon
    function updateToggleIcon() {
        if (sidebarToggle) {
            const icon = sidebarToggle.querySelector('.material-icons');
            if (icon) {
                if (sidebar.classList.contains('open')) {
                    icon.textContent = 'close';
                } else {
                    icon.textContent = 'menu';
                }
            }
        }
    }

    // Toggle sidebar
    function toggleSidebar() {
        if (!sidebar || !mainContent) return;
        
        const isOpen = sidebar.classList.contains('open');
        sidebar.classList.toggle('open');
        updateToggleIcon();
        
        if (isDesktop()) {
            // On desktop: push content
            if (sidebar.classList.contains('open')) {
                mainContent.classList.add('shifted');
            } else {
                mainContent.classList.remove('shifted');
            }
        } else {
            // On mobile: show overlay
            if (sidebar.classList.contains('open')) {
                if (sidebarOverlay) sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        mainContent.classList.remove('shifted');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        updateToggleIcon();
    }

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    } else {
        console.error('Sidebar toggle button not found');
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle && sidebarToggle.contains(event.target);
            const isClickOnOverlay = sidebarOverlay.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && !isClickOnOverlay && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (isDesktop()) {
                // Desktop: sidebar should be open by default, push content
                if (!sidebar.classList.contains('open')) {
                    sidebar.classList.add('open');
                }
                mainContent.classList.add('shifted');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Mobile: sidebar should be closed, no push
                mainContent.classList.remove('shifted');
                if (sidebar.classList.contains('open')) {
                    sidebarOverlay.classList.add('active');
                }
            }
        }, 250);
    });

    // Initialize sidebar state based on screen size
    function initializeSidebar() {
        if (isDesktop()) {
            // Desktop: open by default (CSS handles this, but ensure classes are set)
            sidebar.classList.add('open');
            mainContent.classList.add('shifted');
        } else {
            // Mobile: closed by default
            sidebar.classList.remove('open');
            mainContent.classList.remove('shifted');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        }
        updateToggleIcon();
    }
    
    // Initialize on load
    initializeSidebar();

    // Search functionality
    const sidebarSearch = document.getElementById('sidebarSearch');
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    link.style.display = 'flex';
                } else {
                    link.style.display = searchTerm === '' ? 'flex' : 'none';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveLink() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        // Get all elements that have IDs matching navigation links
        const allSections = [];
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const id = href.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    allSections.push({
                        id: id,
                        element: element
                    });
                }
            }
        });
        
        // Find the section currently in view
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        allSections.forEach(section => {
            const sectionTop = section.element.offsetTop;
            const sectionHeight = section.element.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.id;
            }
        });
        
        // If no section is in view, find the last section that has been scrolled past
        if (!current) {
            let lastSection = '';
            allSections.forEach(section => {
                const sectionTop = section.element.offsetTop;
                if (scrollPosition >= sectionTop) {
                    lastSection = section.id;
                }
            });
            current = lastSection;
        }

        // Update active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Copy code functionality
function copyCode(button) {
    const codeSnippet = button.closest('.code-snippet');
    if (!codeSnippet) return;
    
    const codeContent = codeSnippet.querySelector('.code-snippet-content code');
    if (!codeContent) return;
    
    const textToCopy = codeContent.textContent || codeContent.innerText;
    
    // Create a temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Visual feedback
        const icon = button.querySelector('.material-icons');
        if (icon) {
            const originalText = icon.textContent;
            button.classList.add('copied');
            icon.textContent = 'check';
            button.title = 'Copied!';
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('copied');
                icon.textContent = originalText;
                button.title = 'Copy code';
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy code. Please select and copy manually.');
    } finally {
        document.body.removeChild(textarea);
    }
}

// Map functionality (from doge.js)
// Open/Close RadioDoge Map Menu
$('#toolbar .RadioDoge').on('click', function() {
    $(this).parent().toggleClass('open');
});

// Select the Regional Hubs
function selectRegionalHub() {
    if (typeof regionalHub !== 'undefined') {
        regionalHub.openPopup();
    }
}

// Select all Community Hubs
function selectAllCommunityHubs() {
    if (typeof communityHubs !== 'undefined') {
        communityHubs.forEach(function(hub) {
            if (hub.marker) {
                hub.marker.openPopup();
            }
        });
    }
}

// Select all Shibe Stations
function selectAllShibeStations() {
    if (typeof shibeStations !== 'undefined') {
        shibeStations.forEach(function(hub) {
            if (hub.marker) {
                hub.marker.openPopup();
            }
        });
    }
}

// Initialize the map
if (typeof L !== 'undefined') {
    var map = L.map('leafletmap', {
        zoomControl: true,
        minZoom: 5
    }).setView([39.50, -102.35], 5);

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
        radius: 0
    }).addTo(map);

    // Define variables for the wave animation
    var waveRadius = 0;
    var maxWaveRadius = 400000;
    var waveSpeed = 5000;
    var expandingWave = true;
    var waveColor = '#FFE42B';

    // Function to animate the radio wave effect
    function animateRadioWaves() {
        if (expandingWave) {
            createWaveCircle(waveRadius);
            if (waveRadius >= maxWaveRadius) {
                expandingWave = false;
            }
        } else {
            if (waveRadius <= 0) {
                expandingWave = true;
            }
        }

        if (expandingWave) {
            waveRadius += waveSpeed;
        } else {
            waveRadius -= waveSpeed;
        }

        requestAnimationFrame(animateRadioWaves);
    }

    // Function to create a wave circle line
    function createWaveCircle(radius) {
        var radioWave = L.circle(regionalHub.getLatLng(), {
            color: waveColor,
            opacity: 0.7,
            weight: 1,
            fillColor: 'none',
            radius: radius
        }).addTo(map);

        setTimeout(function() {
            map.removeLayer(radioWave);
        }, 100);
    }

    // Start the radio wave animation
    animateRadioWaves();

    // Create custom icon for Radio Doge Community Hub markers
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
    }];

    // Add Radio Doge Community Hubs
    for (var i = 0; i < communityHubs.length; i++) {
        var hub = communityHubs[i];
        hub.marker = L.marker([hub.lat, hub.lng], {
            icon: RadioDogeCommunityHubIcon
        }).addTo(map);
        hub.marker.bindPopup(hub.popupContent);

        L.circle([hub.lat, hub.lng], {
            color: '#FFE42B',
            fillColor: '#FFE42B',
            fillOpacity: 0.3,
            radius: 15000
        }).addTo(map);
    }

    // Create custom icon for Radio Doge Shibe Station markers
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
    }];

    // Add Radio Doge Shibe Stations
    for (var i = 0; i < shibeStations.length; i++) {
        var hub = shibeStations[i];
        hub.marker = L.marker([hub.lat, hub.lng], {
            icon: RadioDogeShibeStationIcon
        }).addTo(map);
        hub.marker.bindPopup(hub.popupContent);

        L.circle([hub.lat, hub.lng], {
            color: '#FFE42B',
            fillColor: '#FFE42B',
            fillOpacity: 0.3,
            radius: 10000
        }).addTo(map);
    }

    // Function to add SpaceX Starlink satellite markers
    function addSatelliteMarkers() {
        fetch('https://api.spacexdata.com/v4/starlink')
            .then(response => response.json())
            .then(data => {
                shuffleArray(data);
                var selectedStarlink = data.slice(0, 150);
                animateSatellites(selectedStarlink);
            })
            .catch(error => {
                console.error('Error fetching starlink data:', error);
            });
    }

    // Animate starlink movement
    function animateSatellites(satellites) {
        satellites.forEach(function(starlink) {
            var starlinkIcon = L.icon({
                iconUrl: 'img/Starlink.png',
                iconSize: [35, 38],
                iconAnchor: [16, 16]
            });

            if (typeof starlink.latitude === 'number' && typeof starlink.longitude === 'number' && !isNaN(starlink.latitude) && !isNaN(starlink.longitude)) {
                const marker = L.marker([starlink.latitude, starlink.longitude], {
                    icon: starlinkIcon
                });

                if (starlink.spaceTrack && starlink.spaceTrack.OBJECT_NAME) {
                    marker.satelliteName = starlink.spaceTrack.OBJECT_NAME;
                }

                marker.addTo(map);

                setInterval(function() {
                    starlink.latitude += (0.5) * 0.1;
                    starlink.longitude += (0.5) * 0.1;
                    marker.setLatLng([starlink.latitude, starlink.longitude]);

                    const regionalHubLatLng = regionalHub.getLatLng();
                    const starlinkLatLng = marker.getLatLng();
                    const distance = regionalHubLatLng.distanceTo(starlinkLatLng);

                    if (distance <= 400000) {
                        const laser = L.polyline([regionalHubLatLng, starlinkLatLng], {
                            color: 'red'
                        }).addTo(map);
                        animateLaser(laser);
                    }
                }, 1000);

                marker.on('click', function() {
                    if (marker.satelliteName) {
                        marker.bindPopup(marker.satelliteName).openPopup();
                    }
                });
            }
        });
    }

    // Shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Animate laser
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

    // Add SpaceX Starlink satellite markers
    addSatelliteMarkers();
}

