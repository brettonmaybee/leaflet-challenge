//Create the tile layer that will be the background of our map
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

//Initialize all of the LayerGroups 
var layers = {
  dayLayer : new L.LayerGroup(),
  weekLayer: new L.LayerGroup(),
  monthLayer: new L.LayerGroup(),
};  

var platesLayer= new L.LayerGroup()

//Create base layer group
var baseLayers= {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

//Create the map with layers
var myMap =L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers:[
    streetmap,
    platesLayer
  ]
});

//Create overlays object
var overlayMaps = {
  "1 day": layers.dayLayer,
  "7 Days": layers.weekLayer,
  "30 days": layers.monthLayer,
  "Tectonic Plates": platesLayer
};

//Create Layer control
L.control.layers(baseLayers, overlayMaps, {
  collapsed: false
}).addTo(myMap);

//Create a legend
var info=L.control({
  position: "bottomright"
});

//Insert div with class legend
info.onAdd  = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add info legend to map
info.addTo(myMap);

//Initialize an object containing markers for each layer group

//Define end point urls
var monthUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var weekUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var dayUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";
 
//Perform API call to data end points
d3.json((monthUrl), (monthdata)=> {
  
  function onEachFeature(feature, Layer) {
    Layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + "Date and Time: "+new Date(feature.properties.time) + 
    "</p>" + "Magnitude: "+ feature.properties.mag);    
  };

  L.geoJSON(monthdata, {
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
      };

      var markersize=((feature.properties.mag**(4))/100)
        return L.circleMarker(latlng, {
        radius: markersize,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  }).addTo(layers.monthLayer);

  d3.json((weekUrl), (weekdata)=> {
    
    function onEachFeature(feature, Layer) {
      Layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "Date and Time: "+new Date(feature.properties.time) + 
      "</p>" + "Magnitude: "+ feature.properties.mag);    
    };

    L.geoJSON(weekdata, { 
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
        };
  
        var markersize=((feature.properties.mag**(4))/100)
          return L.circleMarker(latlng, {
          radius: markersize,
          color: color,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(layers.weekLayer);
    
    d3.json((dayUrl), (daydata)=> {

      function onEachFeature(feature, Layer) {
        Layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + "Date and Time: "+new Date(feature.properties.time) + 
        "</p>" + "Magnitude: "+ feature.properties.mag);    
      };

      L.geoJSON(daydata, {
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
          };
    
          var markersize=((feature.properties.mag**(4))/100)
            return L.circleMarker(latlng, {
            radius: markersize,
            color: color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          });
        }
      }).addTo(layers.dayLayer);
    
      d3.json(("static/js/boundaries.json"), (platesData)=> {
        L.geoJSON(platesData).addTo(platesLayer);
      });
    });
  });
});

document.querySelector(".legend").innerHTML = [
  "<p class='blue'> Magnitude  0-3.9 </p>",
  "<p class='green'> Magnitude 4.0-4.9 </p>",
  "<p class='yellow'> Magnitude 5.0-5.9 </p>",
  "<p class='red'> Magnitude 6+  </p>",
].join("");