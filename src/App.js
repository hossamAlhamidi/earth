import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import GEO from './test.json';
import MapAlt from './MapAlt';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});
var myCustomStyle = {
  stroke: true,
  weight: 1.5,
  fill: true,
  color: '#040617',
  fillColor: '#145DA0',
  fillOpacity: 1,
};
const center = { lat: 59.433421, lng: 24.75224 };

function App() {
  function onEachFeature(feature, layer) {
    if (feature.properties) {
      /**
       * feature.properties <- هنا تجيب البيانات اللي في الجيسون بتاعك
       *  name_ar - string
       *  name_en - string
       * ... etc
       */
      const { name_en, abbrev } = feature.properties;
      layer.bindPopup(`${name_en} ${abbrev}`);
      layer.on({
        mouseover: (e) => {
          // on mouse over, set the layer style
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            color: '#666',
            fillColor: 'white',
            dashArray: '',
            fillOpacity: 0.7,
          });
        },
        mouseout: (e) => {
          // on mouse out, reset the layer style
          const layer = e.target;
          layer.setStyle({
            weight: 1.5,
            color: '#040617',
            fillColor: '#145DA0',
            dashArray: '',
            fillOpacity: 1,
          });
        },
        click: (e) => {
          // on click, get the layer name

          const layer = e.target;
          console.log(layer.feature.properties, 'la');
          console.log(layer.feature.properties.name_ar);
        },
      });
    }
  }
  return (
    <>
    <MapContainer
      style={{ height: '50vh', width: '100vw' }}
      center={center}
      zoom={2}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
      />
      {/* Marker Example :) */}
      <Marker position={[59.43046, 24.728563]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* Load GeoJson Example :) */}
      <GeoJSON data={GEO} onEachFeature={onEachFeature} style={myCustomStyle} />
    </MapContainer>
    
    <MapAlt/>
    </>
  );
}

export default App;
