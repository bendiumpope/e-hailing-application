'use client';
import { useEffect, useRef } from 'react';

// Define the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-autocomplete': any;
    }
  }
}

export default function LocationAutocomplete({
  onSelect,
  placeholder,
}: {
  onSelect: (address: string, latLng: { lat: number; lng: number }) => void;
  placeholder: string;
}) {
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    const element = autocompleteRef.current;
    if (!element) return;

    const handlePlaceChange = (event?: any) => {
      // Prefer event detail (new API), fallback to element.value (legacy)
      const place = event?.detail?.place ?? element.value;

      // New Places (Web Component): place.location is LatLngLiteral
      let lat: number | undefined;
      let lng: number | undefined;

      if (place?.location && typeof place.location.lat === 'number') {
        lat = place.location.lat;
        lng = place.location.lng;
      } else if (place?.geometry?.location) {
        // Legacy Places: geometry.location has lat()/lng() methods
        lat = place.geometry.location.lat?.();
        lng = place.geometry.location.lng?.();
      }

      if (typeof lat === 'number' && typeof lng === 'number') {
        const address = place?.formattedAddress || place?.formatted_address || '';
        onSelect(address, { lat, lng });
      }
    };

    element.addEventListener('gmp-placechange', handlePlaceChange);
    return () => {
      element.removeEventListener('gmp-placechange', handlePlaceChange);
    };
  }, [onSelect]);

  return (
    <gmp-place-autocomplete
      ref={autocompleteRef}
      placeholder={placeholder}
      style={{ width: '100%' }}
    >
      <input slot="input" placeholder={placeholder} />
    </gmp-place-autocomplete>
  );
}
