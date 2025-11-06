'use client';
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from 'react';
import RideRequestForm from "@/components/RideRequestForm";
import Map from "@/components/Map";

export default function Home() {
  const [pickup, setPickup] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

  const handlePickupChange = (loc: { address: string; latLng: { lat: number; lng: number } }) => {
    console.log("📍 Pickup location selected:", loc);
    setPickup(loc.latLng);
  };

  const handleDestinationChange = (loc: { address: string; latLng: { lat: number; lng: number } }) => {
    console.log("📍 Destination location selected:", loc);
    setDestination(loc.latLng);
  };

  return (
    <APIProvider 
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={['places', 'marker']}
    >
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#000',
          color: '#fff',
          padding: '2rem',
        }}
      >
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Welcome to the E-Hailing App</h1>

        {/* Pass callbacks to update map */}
        <RideRequestForm
          onPickupChange={handlePickupChange}
          onDestinationChange={handleDestinationChange}
        />

        <div style={{ marginTop: '2rem', width: '80%' }}>
          <Map pickup={pickup} destination={destination} />
        </div>
      </main>
    </APIProvider>
  );
}

