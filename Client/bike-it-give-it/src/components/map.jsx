import './css/map.css';
import React from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Home() {
  return (
    <div className='App'>
      <div>Hello World</div>
      <MapContainer center={[40.014984, -105.270546]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ></TileLayer>
      </MapContainer>
    </div>
  );
}

export default Home;
