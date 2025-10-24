'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Vendor } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMemo } from 'react';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function VendorMapInner({ vendor }: { vendor: Vendor }) {
  const position = useMemo(() => [vendor.latitude, vendor.longitude] as [number, number], [vendor]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '18rem', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          <strong>{vendor.name}</strong>
          <br />
          {vendor.address}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
