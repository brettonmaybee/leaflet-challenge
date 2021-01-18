# leaflet-challenge
Data Class Assignment #17

The folder Leaflet-Step-1 contains a more basic and less complete version of the final project contained in Leaflet-Step-2. The earthquake data presented on this map is for earthquakes over 4.5 recorded over the past 30 days.  

The folder Leaflet-Step-2 contains a project that utilizes html and java script to analyze world earthquake data from 'earthquake.usgs.gov'.
The html file (leaflet-Step-2/index.html) utilizes the java script program located at (leaflet-Step-2/static/js/logic.js) to constuct a world map marking the location and magnitude of earthquakes with a magnitude over 4.5, which have been recorded in the past 30 days. The map allows the user to switch between the past 1, 7, or 30 days of records. It also allowes the user to turn on or off a global overlay map of tectonic plates and switch between a street or dark base map. The markers for each earth quake represent the magnitude in color, and expotentialy in size. Earthquares with a magnitude below 4.5 are blue; 4.0-4.9 are green; 5.0-5.9 are yollow; and earthqakes magnitude 6+ are red. 

The api key allowing access to the online geoJSON data is located at Leaflet-Step-2/static/config.js.

The JSON source file for the tectonic plates overlay map is located at Leaflet-Step-2/static/js/boundaries.json

