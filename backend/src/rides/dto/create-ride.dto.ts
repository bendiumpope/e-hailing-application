export class CreateRideDto {
  pickupLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  fare: number;
}
