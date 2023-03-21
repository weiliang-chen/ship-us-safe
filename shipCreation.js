// SHIP TAB

// date: 29/09/2019

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

class Ship{
  // building attributes of class
  constructor(name,speed,range,description,cost,status,comments)
  {
    // comments default variable
    if (typeof comments === undefined){
      comments = ""
    }

    this._name = name;
    this._speed = speed;
    this._range = range;
    this._desc = description;
    this._cost = cost;
    this._status = status;
    this._comments = comments;
  }
  // defining accessors
  get name(){return this._name;}
  get speed(){return this._speed;}
  get range(){return this._range;}
  get desc(){return this._desc;}
  get cost(){return this._cost;}
  get status(){return this._status;}
  get comments(){return this._comments;}

  fromData(dataObj)
  {
    this._name = dataObj._name;
    this._speed = dataObj._speed;
    this._range = dataObj._range;
    this._desc = dataObj._desc;
    this._cost = dataObj._cost;
    this._status = dataObj._status;
    this._comments = dataObj._comments;
  }

}

class ShipFleet{
  // building attributes of class ShipFleet
    constructor()
    {
      this._availableShipList = [];
      this._activeShipList = [];
    }

    // defining accessors
    get availableShipList(){return this._availableShipList;}
    get activeShipList(){return this._activeShipList;}
    getAvailableShip(index)
  	{
  		if (index >= this._availableShipList.length)
  		{
  			return null;
  		}
  		return this._availableShipList[index];
  	}
    getActiveShip(index)
  	{
  		if (index >= this._activeShipList.length)
  		{
  			return null;
  		}
  		return this._activeShipList[index];
  	}

    reserveShip(ship)
    {
      for (let i = 0;i<this._availableShipList.length;i++){
        if (this._availableShipList[i] == ship){
          this._activeShipList.push(this._availableShipList[i].pop())
        }
      }
    }

    doneShip(ship)
    {
      for (let i = 0;i<this._activeShipList.length;i++){
        if (this._activeShipList[i] == ship){
          this._activeShipList.push(this._availableShipList[i].pop());
        }
      }
    }

    addShip(ship)
    {
      this._availableShipList.push(ship);
    }

    fromData(dataObj)
    {

      this._availableShipList = [];
      for (let i = 0;i<dataObj._availableShipList.length;i++){
        let oldAvailableShip = new Ship;
        oldAvailableShip.fromData(dataObj._availableShipList[i]);
        this.addShip(oldAvailableShip);
      }
      this._activeShipList = [];
      for (let i = 0;i<dataObj._activeShipList.length;i++){
        let oldActiveShip = new Ship;
        oldActiveShip.fromData(dataObj._activeShipList[i]);
        this.addShip(oldActiveShip);
        this.reserveShip(oldActiveShip);
    }
  }

}

class Port{
  // building attributes of class Port
    constructor(name, country, type, size, locationPrecision, coord)
    {
      this._name = name;
      this._country = country;
      this._type = type;
      this._size = size;
      this._locationPrecision = locationPrecision;
      this._coord = coord;
    }

    // defining accessors
    get name(){return this._name;}
    get country(){return this._country;}
    get type(){return this._type;}
    get size(){return this._size;}
    get locationPrecision(){return this._locationPrecision;}
    get coord(){return this._coord;}

    getWeather(time)
    {
      return weatherStr
    }

    fromData(dataObj)
    {
      this._name = dataObj._name;
      this._country = dataObj._country;
      this._type = dataObj._type;
      this._size = dataObj._size;
      this._locationPrecision = dataObj._locationPrecision;
      this._coord = dataObj._coord;
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

class Map{
  // building attributes of class Map
    constructor(mapAPI)
    {
      this._routeList = [];
      this._portList = [];
      this._mapAPI = mapAPI;
    }

    // defining accessors
    get routeList(){return this._routeList;}
    get portList(){return this._portList;}
    get mapAPI(){return this._mapAPI;}

    displayRoute(routeIndex)
    {

    }

    addRoute(route)
    {
      this._routeList.push(route);
    }

    addPort(port)
    {
      this._portList.push(port);
    }

    fromData(dataObj)
    {
      this._routeList = [];
      for (let i = 0; i<dataObj._routeList.length;i++){
        let oldRoute = new Route;
        oldRoute.fromData(dataObj._routeList[i]);
        this.addRoute(oldRoute);
      }
      this._portList = [];
      for (let i = 0; i<dataObj._portList.length;i++){
        let oldPort = new Port;
        oldPort.fromData(dataObj._portList[i]);
        this.addPort(oldPort);
      }
      this._mapAPI = dataObj._mapAPI;
    }
}

/* Global Code */
/*
 // creating a new map instance
 mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
 var map = new mapboxgl.Map({
 container: 'mapArea', // container id
 style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
 center: [145.1343136, -37.9110467], // starting position [lng, lat]
 zoom: 13 // starting zoom
 });

 // instancing map class
 let mainMap = new Map(map);

 // checking if local storage has information
 if (localStorage.hasOwnProperty("mainMap")){
 	mainMap.fromData(JSON.parse(localStorage.getItem("mainMap")));
 }
*/
 // instancing map class
let mainFleet = new ShipFleet();

 // checking if local storage has information
 if (localStorage.hasOwnProperty("mainFleet")){
	mainFleet.fromData(JSON.parse(localStorage.getItem("mainFleet")));
}
document.getElementById("shipInformationSummary").style.visibility = "hidden";


// initializing global VARIABLES
let nameShip = "";
let speedShip = "";
let rangeShip = "";
let descShip = "";
let costShip = "";
let statusShip = "";
let commentsShip = "";

function addShip()
{
  // NOTE: have to find a way to stop people inputting now
  // taking input data
  nameShip = document.getElementById("inNameShip").value;
  speedShip = document.getElementById("inSpeedShip").value;
  rangeShip = document.getElementById("inRangeShip").value;
  descShip = document.getElementById("inDescShip").value;
  costShip = document.getElementById("inCostShip").value;
  statusShip = document.getElementById("inStatusShip").value;
  commentsShip = document.getElementById("inComShip").value;

  // displaying input data to user
  document.getElementById("nameShip").innerHTML = nameShip;
  document.getElementById("speedShip").innerHTML = speedShip + " (knots)";
  document.getElementById("rangeShip").innerHTML = rangeShip + " (km)";
  document.getElementById("descShip").innerHTML = descShip
  document.getElementById("costShip").innerHTML = costShip;
  if (statusShip == ""){
    statusShip = "available"
  }
  document.getElementById("statusShip").innerHTML = statusShip;
  if (commentsShip== ""){
    document.getElementById("commentsShip").innerHTML = "No comments";
  }
  else{
    document.getElementById("commentsShip").innerHTML = commentsShip
  }
  document.getElementById("shipInformationSummary").style.visibility = "visible";
}

function confirmShip()
{
  let addingShip = new Ship(nameShip,speedShip,rangeShip,descShip,costShip,statusShip,commentsShip);
  mainFleet.addShip(addingShip);
  localStorage.setItem("mainFleet", JSON.stringify(mainFleet));		// saving to local storage
}
function cancelShip()
{
  // NOTE: have to find a way so people can input again now
  document.getElementById("shipInformationSummary").style.visibility = "hidden";
}
