'use client';
import { useState } from 'react';
import { post } from '../services/api';
import LocationAutocomplete from './LocationAutocomplete';

export default function RideRequestForm({
  onPickupChange,
  onDestinationChange,
}: {
  onPickupChange: (pickup: { address: string; latLng: { lat: number; lng: number } }) => void;
  onDestinationChange: (dest: { address: string; latLng: { lat: number; lng: number } }) => void;
}) {
  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [error, setError] = useState('');

  const handlePickupSelect = (address: string, latLng: { lat: number; lng: number }) => {
    const loc = { address, latLng };
    console.log("loc ", loc)
    setPickup(loc);
    onPickupChange(loc);
  };

  const handleDestinationSelect = (address: string, latLng: { lat: number; lng: number }) => {
    const loc = { address, latLng };
    console.log("loc 2 ", loc)
    setDestination(loc);
    onDestinationChange(loc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("pickup ", pickup)
    console.log("destination ", destination)
    if (!pickup || !destination) {
      setError('Please select both pickup and destination.');
      return;
    }
  
    setError('');
  
    console.log('✅ Pickup Selected:', pickup);
    console.log('✅ Destination Selected:', destination);
  
    // Example: send to backend or calculate route
    const rideData = {
      pickupAddress: pickup.address,
      pickupCoords: pickup.latLng,
      destinationAddress: destination.address,
      destinationCoords: destination.latLng,
    };
  
    console.log('📦 Ride Data Ready To Send:', rideData);
  
    // Example API call
    // post('/api/rides', rideData)
    //   .then(response => console.log('🚀 Ride requested successfully', response))
    //   .catch(err => console.error('❌ Failed to request ride:', err));
  };
  

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      borderRadius: '8px',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Request a Ride</h2>

        <div>
          <label style={{ color: '#555', fontWeight: 'bold' }}>Pickup Location</label>
          <LocationAutocomplete onSelect={handlePickupSelect} placeholder="Enter pickup location" />
        </div>

        <div>
          <label style={{ color: '#555', fontWeight: 'bold' }}>Destination</label>
          <LocationAutocomplete onSelect={handleDestinationSelect} placeholder="Enter destination" />
        </div>

        <button type="submit" style={{
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          background: '#0070f3',
          color: 'white',
          fontWeight: 'bold'
        }}>
          Request Ride
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
}
