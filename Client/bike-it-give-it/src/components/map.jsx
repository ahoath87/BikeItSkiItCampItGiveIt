import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { fetchAllLocations } from '../api/map';
import {
  GoogleMap,
  useLoadScript,
  // StandaloneSearchBox,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';

// import usePlacesAutocomplete from 'use-places-autocomplete'; // getLatLng, // getGeocode,

//***************** Global Constants ****************

const key = process.env.REACT_APP_API_KEY;
const libraries = ['places'];
const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

//******************** Places Component **************

const PlacesTwo = () => {
  // const [libraries] = useState(['places']);
  console.log('this is libraries', libraries);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

//******************** Map Function ******************
// useMemo performs the calculation once and then use it once when it rerenders

const Map = () => {
  const center = useMemo(
    () => ({ lat: 40.015725874467755, lng: -105.25984995283301 }),
    []
  );
  const [selected, setSelected] = useState(null);

  const [markers, setMarkers] = useState([]);
  //   const [adminMarkers, setAdminMarkers] = useState([]);

  //   useEffect(() => {
  //     const fetchedLocations = async () => {
  //       const allLocations = await fetchAllLocations();
  //       setAdminMarkers(allLocations);
  //     };
  //     fetchedLocations();
  //   }, []);
  //   console.log('this is admin Markers line 59', adminMarkers);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  return (
    <>
      <div className='places-container'>
        <GoogleMap
          id='map'
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <MarkerF
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Location Name</h2>
                <p>Resources </p>
              </div>
            </InfoWindow>
          ) : null}{' '}
        </GoogleMap>
      </div>
    </>
  );
};

export default PlacesTwo;
