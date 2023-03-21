// GLOBAL VARIABLES
let waypointsArray = [];  // array of Point instances
let markerArray = [];  // array of markers
let lineObject = {
  type: "geojson",
  data: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: []
    }
  }
};

// checking for local storage
if (typeof(Storage) !== "undefined")
{
	console.log("localStorage is available.");
}
else
{
	console.log("localStorage is not supported by current browser.");
}
// retrieve source port and destination port from local storage

// checking for local storage
if (typeof(Storage) !== "undefined")
{
	console.log("localStorage is available.");
}
else
{
	console.log("localStorage is not supported by current browser.");
}
// start with 'add' mode: first time user is adding waypoints
let editState = "Add";

// MAPBOX setup
mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
let waypointMap = new mapboxgl.Map({
container: 'waypointMapArea', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [144.9305, -37.84688], // starting position [lng, lat]
zoom: 13 // starting zoom
});

// LISTENER FUNCTION: allows user to click on map to add waypoints
function onMapClick(e)
{
 // gives you coorindates of the location where the map is clicked
 let waypointCoordinates = e.lngLat;
 waypointsArray.push(new Point(waypointCoordinates.lng, waypointCoordinates.lat));
 // adding a marker at waypoint
 markerArray.push(new mapboxgl.Marker({ "color": "#FF8C00" }).setLngLat([waypointCoordinates.lng, waypointCoordinates.lat]).addTo(waypointMap));
 // enable undo and confirm buttons if there are waypoints set
 if (markerArray.length > 0)
 {
   document.getElementById("undoWaypointButton").disabled = false;
   document.getElementById("doneButton").disabled = false;
 }
}

// BUTTON: ADD WAYPOINTS
// This function allows user to click on map to add waypoints and this function
// will store the waypoints into an array, along with the markers
document.getElementById("waypointsInstructions").style.visibility = "hidden";
function addWaypoint()
{
  // if user is pressing this button to edit, remove lines and clear data memory to prevent bugs
  if (editState == "Edit")
  {
    waypointMap.removeLayer("pathBetweenWaypoints");
    waypointMap.removeSource("pathBetweenWaypoints");
    lineObject.data.geometry.coordinates = [];
  }
  // setting button availability
  document.getElementById("confirmWaypointsButton").disabled = true;
  document.getElementById("waypointsInstructions").style.visibility = "visible";
  document.getElementById("addWaypointsButton").disabled = true;
  if (markerArray.length > 0)
  {
    document.getElementById("undoWaypointButton").disabled = false;
    document.getElementById("doneButton").disabled = false;
  }
  // changes cursor style to invite clicking
  waypointMap.getCanvas().style.cursor = 'crosshair';
  // adds pointer to where user presses on the map
  waypointMap.on("click", onMapClick);
}

// BUTTON: UNDO LAST WAYPOINT
// This function removes last added marker, and pops this marker from the markers array
// along with popping the coordinates of that marker from the points array and line object
function undoWaypoint()
{
  // remove data of waypoint from arrays
  markerArray[markerArray.length - 1].remove();
  markerArray.pop();
  waypointsArray.pop();
  // changing button availability if conditions are met
  if (markerArray.length == 0)
  {
    document.getElementById("undoWaypointButton").disabled = true;
    document.getElementById("doneButton").disabled = true;
  }
}

// BUTTON: DONE
// This function will show route including the waypoints, and allows user to then press
// the confirm button to save the route.
function doneAddingWaypoints()
{
  // setting button availability
  document.getElementById("confirmWaypointsButton").disabled = false;
  document.getElementById("doneButton").disabled = true;
  document.getElementById("undoWaypointButton").disabled = true;
  document.getElementById("addWaypointsButton").disabled = false;
  // change crosshair to invite dragging
  waypointMap.getCanvas().style.cursor = '';
  // taking away on click event of map
  waypointMap.off("click", onMapClick);
  // saving coordinates of waypoints into line object
  for(let i = 0; i < waypointsArray.length; i++)
  {
    lineObject.data.geometry.coordinates.push(waypointsArray[i].getCoordinates());
  }
  // adding layer - generating lines
  waypointMap.addLayer({
    id: "pathBetweenWaypoints",
    type: "line",
    source: lineObject,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });
  // sets to edit mode: allows user to choose to edit waypoints
  editState = "Edit";
}

// BUTTON: CONFIRM WAYPOINTS
// This function will store waypoint coordinates into local storage so route may be
// displayed on the route's information page
function confirmWaypoints()
{
  let waypointsArrayString = JSON.stringify(waypointsArray);
  localStorage.setItem("waypoints", waypointsArrayString);
  // takes us back to route creation page
  window.location.href="routeCreation.html";
}
