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

const Places = () => {
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

function Map() {
  const center = useMemo(
    () => ({ lat: 40.015725874467755, lng: -105.25984995283301 }),
    []
  );
  const [selected, setSelected] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [adminMarkers, setAdminMarkers] = useState([]);

  useEffect(() => {
    const fetchedLocations = async () => {
      const allLocations = await fetchAllLocations();
      setAdminMarkers(allLocations);
    };
    fetchedLocations();
  }, []);
  console.log('this is admin Markers', adminMarkers);

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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <>
      <div className='places-container'>
        <Locate panTo={panTo} />
        {/* <Search panTo={panTo} />  */}
        {/* <PlacesAutocomplete setSelected={setSelected} /> */}
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
              // icon={{
              //   // url: `/bear.svg`,
              //   origin: new window.google.maps.Point(0, 0),
              //   anchor: new window.google.maps.Point(15, 15),
              //   scaledSize: new window.google.maps.Size(30, 30),
              // }}
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
          ) : null}

          {adminMarkers.map((adminMarker) => (
            <MarkerF
              key={adminMarker.id}
              position={
                console.log(
                  'this is adminMarker.geolocation',
                  adminMarker.geolocation
                ) && adminMarker.geolocation
              }
              onClick={() => {
                setSelectedAdmin(adminMarker.geolocation);
              }}
              // icon={{
              //   // url: `/bear.svg`,
              //   origin: new window.google.maps.Point(0, 0),
              //   anchor: new window.google.maps.Point(15, 15),
              //   scaledSize: new window.google.maps.Size(30, 30),
              // }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={selected}
              onCloseClick={() => {
                setSelectedAdmin(null);
              }}
            >
              <div>
                <h2>AdminLocation</h2>
                <p>Resources </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className='locate'
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src='/compass.svg' alt='compass' />
    </button>
  );
}

// function Search({ panTo }) {
//   const [places, setPlaces] = useState([]);
//   const {
//     ready,
//     value,
//     // suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   });

//   const onPlacesChanged = async (address) => {
//     setValue(address);
//     setPlaces(value);

//     clearSuggestions();
//     try {
//       console.log('this is address', address);
//       const results = await getGeocode({ address });
//       let { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log('😱 Error: ', error);
//     }
//   };

//   // const handleInput = (e) => {
//   //   setValue(e.target.value);
//   // };

//   // const handleSelect = async (address) => {
//   //   setValue(address, false);
//   //   clearSuggestions();
//   //   try {
//   //     console.log('this is address', address);
//   //     const results = await getGeocode({ address });
//   //     let { lat, lng } = await getLatLng(results[0]);
//   //     panTo({ lat, lng });
//   //   } catch (error) {
//   //     console.log('😱 Error: ', error);
//   //   }
//   // };
//   const handleSelect = async (e) => {
//     setValue(e.target.value);
//     console.log('this is value:', value);
//     console.log('this is e', e);
//     try {
//     } catch (error) {
//       console.log('error message:', error);
//     }
//   };

//   return (
//     <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
//       <input
//         type='text'
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         placeholder='Search locations here'
//       ></input>
//     </StandaloneSearchBox>
//   );
// }

export default Places;
