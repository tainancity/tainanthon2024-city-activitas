'use client';

import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { features as counties } from '@/app/(public)/availables/map/tw.json';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const COORDS: LatLngExpression = [22.9999, 120.227];
  const TainanAreasCoordinates = counties
    .find((county) => county.properties.name === 'Tainan City')
    ?.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]) as [
    LatLngExpression[],
  ];

  return (
    <MapContainer center={COORDS} zoom={11} className="h-full w-full">
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon
        pathOptions={{
          color: 'lime',
          fillColor: 'lime',
          fillOpacity: 0.3,
        }}
        positions={TainanAreasCoordinates}
      />
    </MapContainer>
  );
}
