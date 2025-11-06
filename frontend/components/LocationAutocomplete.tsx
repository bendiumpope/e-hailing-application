'use client';
import { useEffect, useRef } from 'react';

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
    const el = autocompleteRef.current;
    if (!el) return;

    // ✅ Event fires when user selects a place
    const handleSelect = async (event: any) => {
      console.log('🚀 gmp-placeselect event fired', event);
      const placePrediction = event?.placePrediction;
      const place = placePrediction?.toPlace?.();
      
      if (!place) return;
      
      try {
        await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

        const location = place.location;
        if (!location) return;

        const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
        const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
        const address = place.formattedAddress || place.displayName || '';

        console.log('📍 Selected place:', { address, lat, lng });
        onSelect(address, { lat, lng });
      } catch (err) {
        console.error('❌ Failed to fetch fields', err);
      }
    };

    el.addEventListener('gmp-select', handleSelect);
    // Attach correct event listener
    el.addEventListener('gmp-placeselect', handleSelect);

    return () => el.removeEventListener('gmp-placeselect', handleSelect);
  }, [onSelect]);

  return (
    <gmp-place-autocomplete ref={autocompleteRef} style={{ width: '100%' }}>
      <input
        slot="input"
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          color: '#000',
          fontSize: '14px',
        }}
      />
    </gmp-place-autocomplete>
  );
}
