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
  constructor(name,maxSpeed,range,description,cost,status,comments)
  {
    // comments default variable
    if (typeof comments === undefined){
      comments = ""
    }

    this._name = name;
    this._maxSpeed = maxSpeed;
    this._range = range;
    this._description = description;
    this._cost = cost;
    this._status = status;
    this._comments = comments;
  }
  // defining accessors
  get name(){return this._name;}
  get maxSpeed(){return this._maxSpeed;}
  get range(){return this._range;}
  get description(){return this._description;}
  get cost(){return this._cost;}

  fromData(dataObj)
  {
    this._name = dataObj._name;
    this._maxSpeed = dataObj._maxSpeed;
    this._range = dataObj._range;
    this._description = dataObj._description;
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

/*
function generateShip()
{
  let script = document.createElement('script');
  script.src ="https://eng1003.monash/api/v1/ships/?callback=generateShipList";
  document.body.appendChild(script);
}

function generateShipList(data)
{
  console.log(data.ships.length);
}

let script = document.createElement('script');
script.src ="https://eng1003.monash/api/v1/ships/?callback=generateShipList";
document.body.appendChild(script);

for (let i=0;i<data.ships.length;i++)
{
  constructor(name,maxSpeed,range,description,cost,status,comments)

  let shipName = data.ships[i].name;
  let shipSpeed = data.ships[i].maxSpeed.toString();
  let shipRange = data.ships[i].range.toString();
  let shipDesc = data.ships[i].desc;
  let shipCost = data.ships[i].cost.toString();
  let shipStat = data.ships[i].status;
  let shipCom = data.ships[i].comments;

  let newShip = new Ship(shipName,shipSpeed,shipRange,shipDesc,shipCost,shipStat,shipCom);


}
*/
/* Global Code */


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
// instancing map class
let mainFleet = new ShipFleet();
// // checking if local storage has information
if (localStorage.hasOwnProperty("mainFleet")){
  mainFleet.fromData(JSON.parse(localStorage.getItem("mainFleet")));
}
