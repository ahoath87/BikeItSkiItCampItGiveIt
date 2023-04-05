import { useMemo, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

// useMemo performs the calculation once and then use it once when it rerenders
const Map = () => {
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);

  const center = useMemo(
    () => ({ lat: 40.015725874467755, lng: -105.25984995283301 }),
    []
  );

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName='map-container'
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <MarkerF
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            // icon={{
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            //   scaledSize: new window.google.maps.Size(30, 30),
            // }}
          />
        ))}
        {/* <MarkerF position={center} /> */}
      </GoogleMap>
    </div>
  );
};

export default Home;
