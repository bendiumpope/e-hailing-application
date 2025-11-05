'use client';
import { useEffect, useRef } from 'react';
import { getGoogle } from '../utils/googleMapsLoader';

export default function MapComponent({
  pickup,
  destination,
}: {
  pickup: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map>();
  const pickupMarker = useRef<google.maps.Marker>();
  const destMarker = useRef<google.maps.Marker>();

  useEffect(() => {
    const initMap = async () => {
      const google = await getGoogle();
      mapInstance.current = new google.maps.Map(mapRef.current as HTMLElement, {
        center: { lat: 53.3498, lng: -6.2603 },
        zoom: 12,
      });
    };
    initMap();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const google = window.google;

    if (pickup) {
      if (!pickupMarker.current) {
        pickupMarker.current = new google.maps.Marker({
          position: pickup,
          map: mapInstance.current,
          label: 'A',
        });
      } else {
        pickupMarker.current.setPosition(pickup);
      }
    }

    if (destination) {
      if (!destMarker.current) {
        destMarker.current = new google.maps.Marker({
          position: destination,
          map: mapInstance.current,
          label: 'B',
        });
      } else {
        destMarker.current.setPosition(destination);
      }
    }

    if (pickup && destination) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickup);
      bounds.extend(destination);
      mapInstance.current.fitBounds(bounds);
    }
  }, [pickup, destination]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px', borderRadius: '8px' }}
    />
  );
}
