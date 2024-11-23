'use client';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';

const AvailableLocationMap = ({ asset }) => {
  const assetCoordinates = asset?.coordinates
    ?.slice(1, -1)
    .split(',')
    .map(Number);
  const center = asset?.coordinates
    ? { lat: assetCoordinates[0], lng: assetCoordinates[1] }
    : { lat: 22.9908, lng: 120.2133 };

  const libraries: Library[] = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  if (loadError) return <div>無法載入地圖</div>;
  if (!isLoaded) return <div>正在載入地圖...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={20}
      center={center}
    >
      <Marker
        key={asset?.id}
        position={center}
        title={asset?.target_name}
        icon={{
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path fill="red" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <path fill="rgba(0,0,0,0.2)" d="M12 1C7.58 1 4 4.58 4 9c0 5.75 8 14 8 14s8-8.25 8-14c0-4.42-3.58-8-8-8zm0 1c3.87 0 7 3.13 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.87 3.13-7 7-7z"/>
                <circle fill="rgba(0,0,0,0.2)" cx="12" cy="9" r="3.5"/>
              </svg>
            `)}`,
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 36),
        }}
      />
    </GoogleMap>
  );
};

export default AvailableLocationMap;
