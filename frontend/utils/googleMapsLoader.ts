import { Loader } from '@googlemaps/js-api-loader';

let google: typeof window.google | null = null;

export async function getGoogle(): Promise<typeof window.google> {
  if (google) {
    return google;
  }

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'weekly',
    libraries: ['places', 'maps'],
  });

  google = await loader.load();
  return google;
}