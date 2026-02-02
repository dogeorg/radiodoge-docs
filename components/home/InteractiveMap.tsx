'use client';

import { useEffect, useRef } from 'react';

type LeafletMap = { remove: () => void };

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    let cancelled = false;

    void import('leaflet').then((Lmod) => {
      const L = Lmod.default;
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: true,
        minZoom: 5,
      }).setView([39.5, -102.35], 5);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const regionalHubIcon = L.icon({
        iconUrl: '/img/RadioDogeRegionalHub.gif',
        iconSize: [80, 78],
        iconAnchor: [25, 34],
      });

      const regionalHub = L.marker([39.5, -102.35], { icon: regionalHubIcon }).addTo(map);
      regionalHub.bindPopup('Regional Hub');

      L.circle([39.5, -102.35], {
        color: '#FCBE2E',
        fillColor: '#FFE42B',
        fillOpacity: 0.3,
        radius: 0,
      }).addTo(map);

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

      mapInstance.current = map;
    });

    return () => {
      cancelled = true;
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
