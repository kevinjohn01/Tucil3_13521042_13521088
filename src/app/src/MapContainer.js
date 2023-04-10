// import React, { useState, useEffect } from 'react';
// import { Map, GoogleApiWrapper, Marker, DirectionsRenderer } from 'google-maps-react';

// function MapContainer(props) {
//   const [selectedPlaces, setSelectedPlaces] = useState([]);

//   const handleMapClick = (mapProps, map, event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setSelectedPlaces(prevState => [...prevState, { lat, lng }]);
//   };
//   const handleMarkerClick = (place) => {
//     const updatedPlaces = selectedPlaces.filter((p) => p !== place);
//     setSelectedPlaces(updatedPlaces);
//   };
//   return (
//     <div className="map_container">
//       <div className="pos_display">
//         {selectedPlaces.map((place, index) => (
//           <div key={index}>
//             <p>Marker {index+1}</p>
//             <p>Latitude: {place.lat}</p>
//             <p>Longitude: {place.lng}</p>
//             <button onClick={() => handleMarkerClick(place)}>Delete Marker</button>
//           </div>
//         ))}
//       </div>
//       <Map
//         google={props.google}
//         zoom={18}
//         initialCenter={{ lat: -6.890585, lng: 107.609806 }}
//         onClick={handleMapClick}
//       >
//         {selectedPlaces.map((place, index) => (
//           <Marker key={`${place.lat}_${place.lng}`} position={place} onClick={() => handleMarkerClick(place)} />
//         ))}
//       </Map>
//     </div>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyARU5nFMn3Y4-3ccy1lTnH6F4i926-jk2E',
// })(MapContainer);
import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, DirectionsRenderer } from 'google-maps-react';

function MapContainer(props) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleMapClick = (mapProps, map, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPlaces(prevState => [...prevState, { lat, lng }]);
  };

  const handleMarkerClick = (place) => {
    const updatedPlaces = selectedPlaces.filter((p) => p !== place);
    setSelectedPlaces(updatedPlaces);
  };

  useEffect(() => {
    if (selectedPlaces.length < 2) {
      return;
    }

    const waypoints = selectedPlaces.map(place => ({
      location: new props.google.maps.LatLng(place.lat, place.lng)
    }));

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new props.google.maps.DirectionsService();
    const travelMode = props.google.maps.TravelMode.DRIVING;

    directionsService.route({
      origin,
      destination,
      waypoints,
      travelMode
    }, (response, status) => {
      if (status === 'OK') {
        const directionsRenderer = new props.google.maps.DirectionsRenderer();
        directionsRenderer.setDirections(response);
        setSelectedPlaces([]);
        setDirections(directionsRenderer);
      }
    });
  }, [selectedPlaces]);

  const [directions, setDirections] = useState(null);

  return (
    <div className="map_container">
      <div className="pos_display">
        {selectedPlaces.map((place, index) => (
          <div key={index}>
            <p>Marker {index+1}</p>
            <p>Latitude: {place.lat}</p>
            <p>Longitude: {place.lng}</p>
            <button onClick={() => handleMarkerClick(place)}>Delete Marker</button>
          </div>
        ))}
      </div>
      <Map
        google={props.google}
        zoom={18}
        initialCenter={{ lat: -6.890585, lng: 107.609806 }}
        onClick={handleMapClick}
      >
        {selectedPlaces.map((place, index) => (
          <Marker key={`${place.lat}_${place.lng}`} position={place} onClick={() => handleMarkerClick(place)} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyARU5nFMn3Y4-3ccy1lTnH6F4i926-jk2E',
  })(MapContainer);

