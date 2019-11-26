// HeatMap react
import React, {Component} from 'react';
//import Heatmap from './heatmap.min.js';
//import Leaflet from './leaflet-heatmap.js';

export default class HeatMap extends Component {
  render() {
    /*
    //The Lat and lng cordinates of the crimes go into this data structure
    //Documentation here at https://leafletjs.com/reference-1.6.0.html#zoom/pan-options
    var testData = {
      max: 0, data: [{ lat: 39.29, lng: -76.60, count: 1 },
      { lat: 39.295, lng: -76.60, count: 1 },
      { lat: 39.298, lng: -76.605, count: 1 },
      { lat: 39.292, lng: -76.646, count: 1 }]
    };

    var baseLayer = L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets',
      maxZoom: 18
    });

    var cfg = {
      "radius": 0.005,
      "maxOpacity": .8,
      "scaleRadius": true,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };

    var heatmapLayer = new HeatmapOverlay(cfg);
    var mymap = new L.map('mapid', { layers: [baseLayer, heatmapLayer] }).setView({ lat: 39.29, lon: -76.60, }, 11);
    heatmapLayer.setData(testData);
    */
   return null;
  }

  
}