export interface RideRequest {
  pickupLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  fare: number;
}

export interface RideResponse {
  id: string;
  pickupLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  fare: number;
  status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string;
}
