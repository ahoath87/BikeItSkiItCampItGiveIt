import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

// useMemo performs the calculation once and then use it once when it rerenders
const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default Home;
