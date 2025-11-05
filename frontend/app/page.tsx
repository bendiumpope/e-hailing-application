'use client';
import RideRequestForm from "@/components/RideRequestForm";
import Map from "@/components/Map";
import { useState } from 'react';

export default function Home() {
  const [pickup, setPickup] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  console.log("pickup", pickup, " destination",destination)
  return (
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
        onPickupChange={(loc) => setPickup(loc.latLng)}
        onDestinationChange={(loc) => setDestination(loc.latLng)}
      />

      <div style={{ marginTop: '2rem', width: '80%' }}>
        <Map pickup={pickup} destination={destination} />
      </div>
    </main>
  );
}

