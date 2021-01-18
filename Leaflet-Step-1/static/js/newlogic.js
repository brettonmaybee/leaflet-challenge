// Store our API endpoint inside queryUrl
var monthUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var weekUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Perform a GET request to the query URL
d3.json((monthUrl), (data)=> {
   createFeatures(data.features);
   console.log(data);
});

// Create Features
function createFeatures(earthquakeData) {  

  function onEachFeature(feature, Layer) {
    Layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + "Date and Time: "+new Date(feature.properties.time) + 
    "</p>" + "Magnitude: "+ feature.properties.mag);    
  };
  
  var earthquakes =L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color = "";
      if (feature.properties.mag > 6) {
        color = "red";
      }
      else if (feature.properties.mag > 5) {
        color = "yellow";
      }
      else if (feature.properties.mag > 4) {
        color = "green";
      }
      else {
        color = "blue";
      }
          
      var markersize=((feature.properties.mag**(4))/100)
        return L.circleMarker(latlng, {
        radius: markersize,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  });    
  createMap(earthquakes);
};


// Create Map    
function createMap(earthquakes) {    
  
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
   
  var tectonicplates = new L.LayerGroup();
   d3.json(("js/boundaries.json"), (plates)=>{
   L.geoJSON(plates).addTo(tectonicplates);
  
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap 
  };
   
  // Create overlay object to hold our overlay layer
  var overlayMaps = {  
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicplates,
      
  };
  
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
    0, 0
    ],
    zoom: 2,
    layers: [streetmap, earthquakes]
  });
  
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap); 
})
}





