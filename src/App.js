import React, { useState, useEffect } from 'react';

function App() {
  const [coords, setCoords] = useState({lat: '', long: ''});
  const [address, setAddress] = useState('2844 golden gate ave sf');
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [placeType, setPlaceType] = useState('park');

  useEffect(() => {
    const googleScript = document.createElement('script');
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBm9I6HoI2r0KCQV-WSCCH-_AuFoUSZmTA&libraries=places`;
    googleScript.async = true;
    googleScript.defer = true;
    window.document.body.appendChild(googleScript);
    googleScript.addEventListener('load', () => {
      console.log('Map Object Loaded');
    });
  }, []);

  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition(loc=>console.log(loc))
    window.navigator.geolocation.getCurrentPosition(loc=>setCoords({lat: loc.coords.latitude, long: loc.coords.longitude}))
  }

  const getLocationByAddress = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({address: address}, processResponse);
  }

  const processResponse = response => {
    console.log(response);
    const location = response[0].geometry.location;
    setCoords({lat: location.lat(), long: location.lng()});
  }

  const placesSearch = () => {
    const params = {
      location: new window.google.maps.LatLng(coords.lat, coords.long),
      keyword: keyword,
      type: placeType,
      radius: '10000'
    }
    const map = new window.google.maps.Map(document.getElementById('googleMap'));
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(params, setPlaces);
    console.log(places);
  }

  return (
    <>
      <button onClick={getCurrentLocation}>Use My Current Location</button><br /><br />
      <input type='text' value={address} onChange={e=>setAddress(e.target.value)}></input>
      <button onClick={getLocationByAddress}>Use This Address</button><br /><br />
      <label>
      {`Latitude: ${coords.lat}`}
      <br />
      {`Longitude: ${coords.long}`} 
      </label>
      <br /><br />
      <button onClick={placesSearch}>Search Using Lat / Lng</button>
      <br />
      <label>
      Enter a Keyword to Search:
      </label>
      <input type='text' value={keyword} onChange={e=>setKeyword(e.target.value)}></input>
      <br />
      <label>
      Enter a Place Type to Search:
      </label>
      <input type='text' value={placeType} onChange={e=>setPlaceType(e.target.value)}></input>
      <div id='googleMap'></div>
      <ul>
  {places.map((place, index)=><li key={index}>Name: {place.name}   Address: {place.vicinity}</li>)}
      </ul>
    </>
  );
}

export default App;
