'use client';

import { useEffect, useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export default function MapComponent({
  pickup,
  destination,
}: {
  pickup: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
}) {
  const [mapCenter, setMapCenter] = useState({ lat: 53.3498, lng: -6.2603 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Auto-fit map to show both markers when both are selected
    if (pickup && destination) {
      // Calculate center point between pickup and destination
      const centerLat = (pickup.lat + destination.lat) / 2;
      const centerLng = (pickup.lng + destination.lng) / 2;
      setMapCenter({ lat: centerLat, lng: centerLng });
      
      // Calculate appropriate zoom level based on distance
      const latDiff = Math.abs(pickup.lat - destination.lat);
      const lngDiff = Math.abs(pickup.lng - destination.lng);
      const maxDiff = Math.max(latDiff, lngDiff);
      
      // Adjust zoom based on distance
      if (maxDiff > 0.5) setZoom(10);
      else if (maxDiff > 0.1) setZoom(12);
      else if (maxDiff > 0.05) setZoom(13);
      else setZoom(14);
    } else if (pickup) {
      setMapCenter(pickup);
      setZoom(14);
    } else if (destination) {
      setMapCenter(destination);
      setZoom(14);
    }
  }, [pickup, destination]);

  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden' }}>
      <Map
        center={mapCenter}
        zoom={zoom}
        mapId="e-hailing-map"
        gestureHandling="greedy"
        disableDefaultUI={false}
      >
        {pickup && (
          <AdvancedMarker position={pickup}>
            <Pin
              background={'#22c55e'}
              borderColor={'#16a34a'}
              glyphColor={'#fff'}
            >
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>A</div>
            </Pin>
          </AdvancedMarker>
        )}

        {destination && (
          <AdvancedMarker position={destination}>
            <Pin
              background={'#ef4444'}
              borderColor={'#dc2626'}
              glyphColor={'#fff'}
            >
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>B</div>
            </Pin>
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
}
