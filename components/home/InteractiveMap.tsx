'use client';

import { useEffect, useRef } from 'react';

type LeafletMap = { remove: () => void };

const REGIONAL_HUB_LAT = 39.5;
const REGIONAL_HUB_LNG = -102.35;
const WAVE_MAX_RADIUS = 400000;
const WAVE_SPEED = 5000;
const LASER_DISTANCE_KM = 400000; // meters
const STARLINK_COUNT = 150;

function shuffleArray<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface StarlinkItem {
  latitude: number | null;
  longitude: number | null;
  spaceTrack?: { OBJECT_NAME?: string };
}

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const cleanupRef = useRef<{
    waveId?: number;
    waveTimeouts: ReturnType<typeof setTimeout>[];
    intervals: ReturnType<typeof setInterval>[];
  }>({ waveTimeouts: [], intervals: [] });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    let cancelled = false;

    void import('leaflet').then((Lmod) => {
      const L = Lmod.default;
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: true,
        minZoom: 5,
      }).setView([REGIONAL_HUB_LAT, REGIONAL_HUB_LNG], 5);
      mapInstance.current = map; // set before wave animation so animateRadioWaves can run

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const regionalHubIcon = L.icon({
        iconUrl: '/img/RadioDogeRegionalHub.gif',
        iconSize: [80, 78],
        iconAnchor: [25, 34],
      });

      const regionalHub = L.marker([REGIONAL_HUB_LAT, REGIONAL_HUB_LNG], { icon: regionalHubIcon }).addTo(map);
      regionalHub.bindPopup('Regional Hub');

      const hubLatLng = L.latLng(REGIONAL_HUB_LAT, REGIONAL_HUB_LNG);

      // Static fill circle under the hub (subtle)
      L.circle(hubLatLng, {
        color: '#FCBE2E',
        fillColor: '#FFE42B',
        fillOpacity: 0.3,
        radius: 0,
      }).addTo(map);

      // ----- Radio wave animation (original: createWaveCircle per frame, remove after 100ms) -----
      // Matches https://github.com/dogeorg/radiodoge-docs: maxWaveRadius 400000, waveSpeed 5000, expand then contract
      if (!map.getPane('wavePane')) {
        const wavePane = map.createPane('wavePane');
        wavePane.style.zIndex = '650';
      }
      let waveRadius = 0;
      let expandingWave = true;
      const WAVE_MAX_RADIUS = 400000; // meters (400 km) - original value
      const WAVE_SPEED = 5000; // meters per frame - original value
      const waveColor = '#FFE42B';

      function createWaveCircle(radius: number) {
        const radioWave = L.circle(hubLatLng, {
          color: waveColor,
          opacity: 1,
          weight: 0.5,
          fill: false,
          fillOpacity: 0,
          radius,
          pane: 'wavePane',
        }).addTo(map);
        const timeoutId = setTimeout(() => {
          if (map.hasLayer(radioWave)) map.removeLayer(radioWave);
        }, 150);
        cleanupRef.current.waveTimeouts.push(timeoutId);
      }

      function animateRadioWaves() {
        if (cancelled || !mapInstance.current) return;
        if (expandingWave) {
          createWaveCircle(waveRadius);
          if (waveRadius >= WAVE_MAX_RADIUS) expandingWave = false;
        } else {
          if (waveRadius <= 0) expandingWave = true;
        }
        if (expandingWave) {
          waveRadius += WAVE_SPEED;
        } else {
          waveRadius -= WAVE_SPEED;
        }
        const id = requestAnimationFrame(animateRadioWaves);
        cleanupRef.current.waveId = id;
      }
      animateRadioWaves();

      // ----- Community hubs -----
      const communityHubIcon = L.icon({
        iconUrl: '/img/RadioDogeCommunityHub.gif',
        iconSize: [70, 58],
        iconAnchor: [35, 40],
      });

      const communityHubs = [
        { lat: 39.5, lng: -97.7, popupContent: 'Community Hub' },
      ];

      communityHubs.forEach((hub) => {
        const marker = L.marker([hub.lat, hub.lng], { icon: communityHubIcon }).addTo(map);
        marker.bindPopup(hub.popupContent);
        L.circle([hub.lat, hub.lng], {
          color: '#FFE42B',
          fillColor: '#FFE42B',
          fillOpacity: 0.3,
          radius: 15000,
        }).addTo(map);
      });

      // ----- Shibe stations -----
      const shibeStationIcon = L.icon({
        iconUrl: '/img/RadioDogeShibeStation.gif',
        iconSize: [48, 58],
        iconAnchor: [30, 40],
      });

      const shibeStations = [
        { lat: 37.0, lng: -105.0, popupContent: 'Shibe Stations' },
      ];

      shibeStations.forEach((hub) => {
        const marker = L.marker([hub.lat, hub.lng], { icon: shibeStationIcon }).addTo(map);
        marker.bindPopup(hub.popupContent);
        L.circle([hub.lat, hub.lng], {
          color: '#FFE42B',
          fillColor: '#FFE42B',
          fillOpacity: 0.3,
          radius: 10000,
        }).addTo(map);
      });

      // ----- Starlink satellites (fetch from SpaceX API, animate, laser when in range) -----
      const starlinkIcon = L.icon({
        iconUrl: '/img/Starlink.png',
        iconSize: [35, 38],
        iconAnchor: [16, 16],
      });

      function animateLaser(laser: ReturnType<typeof L.polyline>) {
        let opacity = 1;
        function step() {
          if (cancelled || !mapInstance.current) return;
          opacity -= 0.01;
          if (opacity <= 0) {
            if (map.hasLayer(laser)) map.removeLayer(laser);
          } else {
            laser.setStyle({ opacity });
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
      }

      function addSatelliteMarkers() {
        fetch('https://api.spacexdata.com/v4/starlink')
          .then((res) => res.json())
          .then((data: StarlinkItem[]) => {
            if (cancelled || !mapInstance.current) return;
            const shuffled = shuffleArray(data);
            const selected = shuffled
              .filter(
                (s) =>
                  typeof s.latitude === 'number' &&
                  typeof s.longitude === 'number' &&
                  !Number.isNaN(s.latitude) &&
                  !Number.isNaN(s.longitude)
              )
              .slice(0, STARLINK_COUNT);

            selected.forEach((starlink) => {
              let lat = Number(starlink.latitude);
              let lng = Number(starlink.longitude);
              const marker = L.marker([lat, lng], { icon: starlinkIcon }).addTo(map);
              const name = starlink.spaceTrack?.OBJECT_NAME;
              if (name) {
                marker.bindPopup(name);
              }
              marker.on('click', () => marker.openPopup());

              const intervalId = setInterval(() => {
                if (cancelled || !mapInstance.current) return;
                lat += 0.05;
                lng += 0.05;
                marker.setLatLng([lat, lng]);
                const dist = hubLatLng.distanceTo(marker.getLatLng());
                if (dist <= LASER_DISTANCE_KM) {
                  const laser = L.polyline([hubLatLng, marker.getLatLng()], { color: 'red' }).addTo(map);
                  animateLaser(laser);
                }
              }, 1000);
              cleanupRef.current.intervals.push(intervalId);
            });
          })
          .catch((err) => console.error('Error fetching Starlink data:', err));
      }

      addSatelliteMarkers();
    });

    return () => {
      cancelled = true;
      if (cleanupRef.current.waveId != null) {
        cancelAnimationFrame(cleanupRef.current.waveId);
      }
      cleanupRef.current.waveTimeouts.forEach((id) => clearTimeout(id));
      cleanupRef.current.waveTimeouts = [];
      cleanupRef.current.intervals.forEach((id) => clearInterval(id));
      cleanupRef.current.intervals = [];
      if (mapInstance.current?.remove) {
        mapInstance.current.remove();
      }
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="rounded overflow-hidden border border-border">
      <div ref={mapRef} className="w-full h-[600px] z-0" />
    </div>
  );
}
