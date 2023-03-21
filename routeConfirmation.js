// Classes
class Point{
  // building attributes of class
  constructor(longitude, latitude){
    this._longitude = longitude;
    this._latitude = latitude;
  }
  // defining accessors
  get longitude(){return this._longitude;}
  get latitude(){return this._latitude;}

  getCoordinates()
  {
    return [this._longitude, this._latitude];
  }

  fromData(dataObj)
  {
    this._longitude = dataObj._longitude;
    this._latitude = dataObj._latitude;
  }
}

class Route{
  // building attributes of class Route
    constructor(start, end, ship, waypoints)
    {
      this._start = start;
      this._end = end;
      this._ship = ship;
      this._waypoints = waypoints;
      this._distance = this._calculateDistance(start, end, waypoints);
    }

    // defining accessors
    get start(){return this._start;}
    get end(){return this._end;}
    get ship(){return this._ship;}
    get distance(){return this._distance;}

    // defining setters
    set waypoints(newWaypoints) { this._waypoints = newWaypoints; }

    _calculateDistance(start, end, waypoints)
    {
      let distance = 0;
      distance += sqrt(((start.coord.lat-waypoints[0].lat)**2)+((start.coord.lng-waypoints[0].lng)**2));
      for (let i = 0; i<waypoints.length-1;i++){
        distance += sqrt(((waypoints[i].lat-waypoints[i+1].lat)**2)+((waypoints[i].lng-waypoints[i+1].lng)**2));
      }
      distance += sqrt(((waypoints[waypoints.length-1].lat-end.coord.lat)**2)+((waypoints[waypoints.length-1].lng-end.coord.lng)**2))

      return distance
    }

    fromData(dataObj)
    {
      let oldStart = new Port;
      oldStart.fromData(dataObj._start);
      this._start = oldStart;
      let oldEnd = new Port;
      oldEnd.fromData(dataObj._end);
      this._end = oldEnd;
      let oldShip = new Ship;
      oldShip.fromData(dataObj._ship);
      this._ship = oldShip;
      let oldWaypoints = [];
      for (let i = 0; i < dataObj._waypoints.length;i++){
        let oldPoint = new Point;
        oldPoint.fromData(dataObj._waypoints[i]);
        oldWaypoints.push(oldPoint);
      }
      this._waypoints = oldWaypoints;
      this._distance = this._calculateDistance(start, end, waypoints);
    }
}

// MAPBOX
mapboxgl.accessToken = "pk.eyJ1IjoiZ29yYm9jaG8iLCJhIjoiY2swZXBnanZ2MGo1ZTNkcXhldXFjcjMxYiJ9.IaIUIz6IcnQzpOViYAK_Yg";
let map3 = new  mapboxgl.Map(
  {
  container: 'mapArea3',
  center: [144.9305, -37.84688],
  zoom: 13,
  style: 'mapbox://styles/mapbox/streets-v9'
  });

// LOCAL STORAGE
// checking for local storage
if (typeof(Storage) !== "undefined")
{
	console.log("localStorage is available.");
}
else
{
	console.log("localStorage is not supported by current browser.");
}

// getting local storage data
let waypointObjectArray = JSON.parse(localStorage.getItem("waypoints"));
let waypointInstanceArray = [];

if (waypointObjectArray != null)  // if there is local storage data retrieved
{
  // taking all point objects from local storage, convert to point class, add to new point class array
  for (let i = 0; i < waypointObjectArray.length; i++)
  {
    waypointInstanceArray[i] = new Point;
    waypointInstanceArray[i].fromData(waypointObjectArray[i]);
  }
}

// ILLUSTRATING ROUTE ONTO MAP
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
// adding markers
for (i = 0; i < waypointInstanceArray.length; i++)
{
  markerArray.push(new mapboxgl.Marker({ "color": "#FF8C00" }).setLngLat(waypointInstanceArray[i].getCoordinates()).addTo(map3));
}

// illustrating route: using callback function to prevent adding layer before map style has finished loading
map3.on("load", function () {
  // adding lines between markers when map loads
  for(let i = 0; i < waypointInstanceArray.length; i++)
  {
    lineObject.data.geometry.coordinates.push(waypointInstanceArray[i].getCoordinates());
  }
  // adding layer - generating lines
  map3.addLayer({
    id: "pathBetweenWaypoints",
    type: "line",
    source: lineObject,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });
  // zooming map to show full route
  let boundaryCoordinates = [];
  for (i = 0; i < waypointInstanceArray.length; i++)  // creating array of coordinates
  {
    boundaryCoordinates.push(waypointInstanceArray[i].getCoordinates());
  }
  let bounds = boundaryCoordinates.reduce(function(bounds, boundaryCoordinates) {
    return bounds.extend(boundaryCoordinates);
  }, new mapboxgl.LngLatBounds(boundaryCoordinates[0], boundaryCoordinates[0]));

  map3.fitBounds(bounds, {
    padding: 20
  });
});
