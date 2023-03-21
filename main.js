// CLASSES

class Point{
  // building attributes of class
  constructor(latitude, longitude){
    this._lat = latitude;
    this._lng = longitude;
  }
  // defining accessors
  get lat(){return this._lat;}
  get lng(){return this._lng;}


  getCoordinates()
  {
    return [this._lat, this._lng];
  }

  fromData(dataObj)
  {
    this._lat = dataObj._lat;
    this._lng = dataObj._lng;
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
      this._coord = coord; // point object
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
      this._coord = new Point;
      this._coord.fromData(dataObj._coord);
    }
}

class Route{
  // building attributes of class Route
    constructor(id, startPort, endPort, startDate, ship, waypoints)
    {
      let distance = this._calculateDistance(startPort, endPort, waypoints)
      this._id = id;
      this._startPort = startPort;
      this._endPort = endPort;
      this._startDate = startDate;
      this._endDate = this._calculateArrival(ship, startDate, distance);
      this._ship = ship;
      this._waypoints = waypoints;
      this._distance = distance;
    }

    // defining accessors
    get id(){return this._id;}
    get startPort(){return this._startPort;}
    get endPort(){return this._endPort;}
    get startDate(){return this._startDate;}
    get endDate(){return this._endDate;}
    get ship(){return this._ship;}
    get distance(){return this._distance;}

    // defining setters
    set waypoints(newWaypoints) { this._waypoints = newWaypoints; }

    _calculateDistance(start, end, waypoints)
    {
      let distance = 0;
      /*
      distance += sqrt(((start.coord.lat-waypoints[0].lat)**2)+((start.coord.lng-waypoints[0].lng)**2));
      for (let i = 0; i<waypoints.length-1;i++){
        distance += sqrt(((waypoints[i].lat-waypoints[i+1].lat)**2)+((waypoints[i].lng-waypoints[i+1].lng)**2));
      }
      distance += sqrt(((waypoints[waypoints.length-1].lat-end.coord.lat)**2)+((waypoints[waypoints.length-1].lng-end.coord.lng)**2))
      */
      return distance
    }

    _calculateArrival(ship, start, dis)
    {

    }

    fromData(dataObj)
    {
      this._id = dataObj._id
      let oldStart = new Port;
      oldStart.fromData(dataObj._start);
      this._startPort = oldStart;
      let oldEnd = new Port;
      oldEnd.fromData(dataObj._end);
      this._endPort = oldEnd;
      this._startDate = dataObj._startDate;
      this._endDate = dataObj._endDate;
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
      this._distance = dataObj._distance;
    }
}

class Map{
  // building attributes of class Map
    constructor()
    {
      this._routeList = [];
      this._portList = [];
    }

    // defining accessors
    get routeList(){return this._routeList;}
    get portList(){return this._portList;}
    getPort(index)
  	{
  		if (index >= this._portList.length)
  		{
  			return null;
  		}
  		return this._portList[index];
  	}

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
    }
}

// FUNCTIONS
//GLOBAL
function jsonpRequest(url, data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}
function requestShips(shipsObj)
{
  for (let i = 0; i < shipsObj.ships.length; i++){

    let oldShip = shipsObj.ships[i];
    let newShip = new Ship(oldShip.name,oldShip.maxSpeed,oldShip.range,oldShip.desc,oldShip.cost,oldShip.status,oldShip.comments);
    mainFleet.addShip(newShip);
  }
  localStorage.setItem("mainFleet", JSON.stringify(mainFleet));		// saving to local storage
  let shipList = document.getElementById("shipList");
  if (shipList != null){
    shipList.innerHTML = generateShipList();
  }
}
function requestPorts(portsObj)
{
  for (let i = 0; i < portsObj.ports.length; i++){

    let oldPort = portsObj.ports[i];
    let newPoint = new Point(oldPort.lat,oldPort.lng);
    let newPort = new Port(oldPort.name,oldPort.country,oldPort.type,oldPort.size,oldPort.locprecision,newPoint);
    mainMap.addPort(newPort);
  }
  localStorage.setItem("mainMap", JSON.stringify(mainMap));		// saving to local storage
  let portList = document.getElementById("portList");
  if (portList != null){
    portList.innerHTML = generatePortList();
  }
}

// map tab
// ship tab
function viewAvailableShip(index)
{
  document.getElementById("shipInfoCard").style.visibility = "visible";
	let selectedShip = mainFleet.getAvailableShip(index);
	document.getElementById("shipNameCard").innerText = selectedShip.name;
	document.getElementById("shipSpeedCard").innerText = selectedShip.speed + " (knots)";
	document.getElementById("shipRangeCard").innerText = selectedShip.range + " (km)";
	document.getElementById("shipDescCard").innerText = selectedShip.desc;
	document.getElementById("shipCostCard").innerText = selectedShip.cost;
	document.getElementById("shipStatusCard").innerText = selectedShip.status;
	document.getElementById("shipCommentsCard").innerText = selectedShip.comments;
}

function viewActiveShip(index)
{
  document.getElementById("shipInfoCard").style.visibility = "visible";
	let selectedShip = mainFleet.getActiveShip(index);
	document.getElementById("shipNameCard").innerText = selectedShip.name;
	document.getElementById("shipSpeedCard").innerText = selectedShip.speed + " (knots)";
	document.getElementById("shipRangeCard").innerText = selectedShip.range + " (km)";
	document.getElementById("shipDescCard").innerText = selectedShip.desc;
	document.getElementById("shipCostCard").innerText = selectedShip.cost;
	document.getElementById("shipStausCard").innerText = selectedShip.status;
	document.getElementById("shipCommentsCard").innerText = selectedShip.comments;
}

function generateShipList()
{
	let shipList = mainFleet.availableShipList;
  for (let i = 0; i<mainFleet.activeShipList.length;i++){
    shipList.append(mainFleet.activeShipList[i])
  }
	let output = "";
  let shipDisplayEnd;
  if (shipList.length < shipDisplay + numDisplay){
    shipDisplayEnd = shipList.length;
  }
  else{
    shipDisplayEnd = shipDisplay + numDisplay
  }
	for (let i = shipDisplay; i < shipDisplayEnd; i++)
	{
		output += "<tr>";
		output += "<td>"+shipList[i].name+"</td>";
		output += "<td>"+shipList[i].desc+"</td>";
    if (i < mainFleet.availableShipList.length){
      output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"viewAvailableShip("+i+")\">View</a></td>";
    }
    else{
      output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"viewActiveShip("+(i-mainFleet.availableShipList.length)+")\">View</a></td>"
    }
		output += "</tr>";
	}
	return output;
}

function nextShip()
{
  if (shipDisplay + numDisplay < mainFleet.availableShipList.length + mainFleet.activeShipList.length){
    shipDisplay += numDisplay;
    shipList.innerHTML = generateShipList();
  }
}

function prevShip()
{
  if (shipDisplay - numDisplay >= 0){
    shipDisplay -= numDisplay;
    shipList.innerHTML = generateShipList();
  }
}
// ship creation
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
  shipAddCon.style.visibility = "visible";
}

function confirmShip()
{
  let addingShip = new Ship(nameShip,speedShip,rangeShip,descShip,costShip,statusShip,commentsShip);
  mainFleet.addShip(addingShip);
  localStorage.setItem("mainFleet", JSON.stringify(mainFleet));		// saving to local storage
  alert(nameShip + " was added to available ships")
}

function cancelShip()
{
  // NOTE: have to find a way so people can input again now
  shipAddCon.style.visibility = "hidden";
}
// port tab
function viewPort(index)
{
  document.getElementById("portInfoCard").style.visibility = "visible";
	let selectedPort = mainMap.getPort(index);
	document.getElementById("portNameCard").innerText = selectedPort.name;
	document.getElementById("portCountryCard").innerText = selectedPort.country;
	document.getElementById("portTypeCard").innerText = selectedPort.type;
	document.getElementById("portSizeCard").innerText = selectedPort.size;
	document.getElementById("portLocationPrecisionCard").innerText = selectedPort.locationPrecision;
	document.getElementById("portLatCard").innerText = selectedPort.coord.lat;
	document.getElementById("portLngCard").innerText = selectedPort.coord.lng;
  // If in select html
  let selectPortButton = document.getElementById("selectPortButton")
  if (selectPortButton != null){
    selectPortButton.setAttribute("onclick","selectPort("+index+")");
  }
  document.getElementById("mapAreaPort").style.visibility="hidden"
  // get location coordinates
  let lat = selectedPort.coord.lat;
  let lng = selectedPort.coord.lng;
  let coord = [lng,lat];
  // move map to location
  mapPort.setZoom(4);
  mapPort.panTo(coord);
  // add marker
  if (markerPort == undefined) {
    markerPort = new mapboxgl.Marker()
    markerPort.setLngLat(coord).addTo(mapPort);
    document.getElementById("mapAreaPort").style.visibility = "visible";
  }
  else{
    markerPort.setLngLat(coord)
    document.getElementById("mapAreaPort").style.visibility = "visible";
  }

}

function generatePortList()
{
	let portList = mainMap.portList;
	let output = "";
  let portDisplayEnd;
  if (portList.length < portDisplay + numDisplay){
    portDisplayEnd = portList.length;
  }
  else{
    portDisplayEnd = portDisplay + numDisplay
  }

	for (let i = portDisplay; i < portDisplayEnd; i++)
	{
		output += "<tr>";
		output += "<td>"+portList[i].name+"</td>";
		output += "<td>"+portList[i].country+"</td>";
    output += "<td>"+portList[i].size+"</td>";
    output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"viewPort("+i+")\">View</a></td>";
		output += "</tr>";
	}
	return output;
}
function nextPort()
{
  if (portDisplay + numDisplay < mainMap.portList.length){
    portDisplay += numDisplay;
    portList.innerHTML = generatePortList();
  }
}

function prevPort()
{
  if (portDisplay - numDisplay >= 0){
    portDisplay -= numDisplay;
    portList.innerHTML = generatePortList();
  }
}
// port creation
function addPort()
{
  // NOTE: have to find a way to stop people inputting now
  // taking input data
  namePort = document.getElementById("inNamePort").value;
  countryPort = document.getElementById("inCountryPort").value;
  typePort = document.getElementById("inTypePort").value;
  sizePort = document.getElementById("inSizePort").value;
  locationPrecisionPort = document.getElementById("inLocationPrecisionPort").value;
  latPort = document.getElementById("inLatPort").value;
  lngPort = document.getElementById("inLngPort").value;

  // displaying input data to user
  document.getElementById("namePort").innerHTML = namePort;
  document.getElementById("countryPort").innerHTML = countryPort;
  document.getElementById("typePort").innerHTML = typePort;
  document.getElementById("sizePort").innerHTML = sizePort;
  document.getElementById("locationPrecisionPort").innerHTML = locationPrecisionPort;
  document.getElementById("latPort").innerHTML = latPort;
  document.getElementById("lngPort").innerHTML = lngPort;
  portAddCon.style.visibility = "visible";
}

function confirmPort()
{
  let coords = new Point(latPort,lngPort);
  let addingPort = new Port(namePort,countryPort,typePort,sizePort,locationPrecisionPort,coords);
  mainMap.addPort(addingPort);
  localStorage.setItem("mainMap", JSON.stringify(mainMap));		// saving to local storage
  alert(namePort + " was added to the map");
}

function cancelPort()
{
  // NOTE: have to find a way so people can input again now
  portAddCon.style.visibility = "hidden";
}
// route tab
function viewRoute()
{

}
function generateRouteList()
{

}
function nextRoute()
{

}
function prevRoute()
{

}

function showShipList()
{
		let dialogBox = "";
		dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Select Port</h4><div class="mdl-dialog__content">';
    dialogBox += '<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp fill40"><thead><tr>'
    dialogBox += '<th class="mdl-data-table__cell--non-numeric">Name</th><th class="mdl-data-table__cell--non-numeric">Description</th>'
    dialogBox += '<th>Action</th></tr>'
    dialogBox += generateShipSelectionList();
    dialogBox += '</thead></table>'


		dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
		document.getElementById("hiddenDialog").innerHTML = dialogBox;
		let dialog = document.querySelector('dialog');
	    let showDialogButton = document.querySelector('#show-dialog');
	    if (!dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
	    dialog.querySelector('.close').addEventListener('click', function() {
	      dialog.close();
	    });
}
function generateShipSelectionList()
{
  let shipList = mainFleet.availableShipList;
  let output = "";
  let shipDisplayEnd;
  if (shipList.length < shipDisplay + numDisplay){
    shipDisplayEnd = shipList.length;
  }
  else{
    shipDisplayEnd = shipDisplay + numDisplay
  }
	for (let i = shipDisplay; i < shipDisplayEnd; i++)
	{
		output += "<tr>";
		output += "<td>"+shipList[i].name+"</td>";
		output += "<td>"+shipList[i].desc+"</td>";
    output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"selectShip("+i+")\">Select</a></td>";
		output += "</tr>";
	}
	return output;
}
function selectShip(index)
{
  addingRouteShip = mainFleet.availableShipList[index];
  document.getElementById("addingRouteShip").innerHTML = addingRouteShip.name;
  document.getElementById("hiddenDialog").innerHTML = '';
}
function showStartPortList()
{
		let dialogBox = "";
		dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Select Port</h4><div class="mdl-dialog__content">';
    dialogBox += '<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp fill40"><thead><tr>'
    dialogBox += '<th class="mdl-data-table__cell--non-numeric">Name</th><th class="mdl-data-table__cell--non-numeric">Country</th>'
    dialogBox += '<th class="mdl-data-table__cell--non-numeric">Size</th><th>Action</th></tr>'
    dialogBox += generateStartPortSelectionList();
    dialogBox += '</thead></table>'


		dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
		document.getElementById("hiddenDialog").innerHTML = dialogBox;
		let dialog = document.querySelector('dialog');
	    let showDialogButton = document.querySelector('#show-dialog');
	    if (!dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
	    dialog.querySelector('.close').addEventListener('click', function() {
	      dialog.close();
	    });
}
function generateStartPortSelectionList()
{
  let portList = mainMap.portList;
	let output = "";
  let portDisplayEnd;
  if (portList.length < portDisplay + numDisplay){
    portDisplayEnd = portList.length;
  }
  else{
    portDisplayEnd = portDisplay + numDisplay
  }

	for (let i = portDisplay; i < portDisplayEnd; i++)
	{
		output += "<tr>";
		output += "<td>"+portList[i].name+"</td>";
		output += "<td>"+portList[i].country+"</td>";
    output += "<td>"+portList[i].size+"</td>";
    output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"selectStartPort("+i+")\">Select</a></td>";
		output += "</tr>";
	}
	return output;
}
function selectStartPort(index)
{
  addingStart = mainMap.portList[index];
  document.getElementById("addingStart").innerHTML = addingStart.name;
  document.getElementById("hiddenDialog").innerHTML = '';
}
function showEndPortList()
{
		let dialogBox = "";
		dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Select Port</h4><div class="mdl-dialog__content">';
    dialogBox += '<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp fill40"><thead><tr>'
    dialogBox += '<th class="mdl-data-table__cell--non-numeric">Name</th><th class="mdl-data-table__cell--non-numeric">Country</th>'
    dialogBox += '<th class="mdl-data-table__cell--non-numeric">Size</th><th>Action</th></tr>'
    dialogBox += generateEndPortSelectionList();
    dialogBox += '</thead></table>'


		dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
		document.getElementById("hiddenDialog").innerHTML = dialogBox;
		let dialog = document.querySelector('dialog');
	    let showDialogButton = document.querySelector('#show-dialog');
	    if (!dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
	    dialog.querySelector('.close').addEventListener('click', function() {
	      dialog.close();
	    });
}
function generateEndPortSelectionList()
{
  let portList = mainMap.portList;
	let output = "";
  let portDisplayEnd;
  if (portList.length < portDisplay + numDisplay){
    portDisplayEnd = portList.length;
  }
  else{
    portDisplayEnd = portDisplay + numDisplay
  }

	for (let i = portDisplay; i < portDisplayEnd; i++)
	{
		output += "<tr>";
		output += "<td>"+portList[i].name+"</td>";
		output += "<td>"+portList[i].country+"</td>";
    output += "<td>"+portList[i].size+"</td>";
    output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"selectEndPort("+i+")\">Select</a></td>";
		output += "</tr>";
	}
	return output;
}
function selectEndPort(index)
{
  addingEnd = mainMap.portList[index];
  document.getElementById("addingEnd").innerHTML = addingEnd.name;
  document.getElementById("hiddenDialog").innerHTML = '';
}
function addRoute()
{
  let routeId = mainMap.routeList.length;
  let dDate = document.getElementById("inRouteDate").value;
  let routeWaypoints = [];
  addingRoute = new Route(routeId, addingStart, addingEnd, dDate, addingRouteShip, routeWaypoints);
  showRouteConfirm();
}
function confirmRoute()
{
  mainMap.addRoute(addingRoute);
  alert('Route #' + addingRoute.id + ' has been created')
  localStorage.setItem("mainMap", JSON.stringify(mainMap));		// saving to local storage
}
function showRouteConfirm()
{
  let dialogBox = "";
  dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Select Port</h4><div class="mdl-dialog__content">';
  dialogBox += '<div class="mdl-grid"><div class="mdl-cell mdl-cell--6-col"><div class="mdl-card mdl-shadow--4dp fill40">';
  dialogBox += '<span> Route ID: <label>' + addingRoute.Id + '</label></span><br/>';
  dialogBox += '<span> Departure Port: <label>' + addingRoute.startPort.name + '</label></span><br/>';
  dialogBox += '<span> Arrival Port: <label>' + addingRoute.endPort.name + '</label></span><br/>';
  dialogBox += '<span> Departure Date: <label>' + addingRoute.startDate + '</label></span><br/>';
  dialogBox += '<span> Arrival Date: <label>' + addingRoute.endDate + '</label></span><br/>';
  dialogBox += '<span> Ship: <label>' + addingRoute.ship.name + '</label></span><br/>';
  dialogBox += '<span> Distance: <label>' + addingRoute.distance + '</label></span><br/>'
  dialogBox += '<div class="mdl-card__actions mdl-card--border">'
  dialogBox += '<a class="mdl-button mdl-button--colored mdl-js-button" onclick ="confirmRoute()">Confirm Route</a></div></div>';
  dialogBox += '<div class="mdl-cell mdl-cell--6-col"><div id="mapAreaRouteConfirm" class="page-block"></div><br/></div></div></div>'
  dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
  document.getElementById("hiddenDialog").innerHTML = dialogBox;
  let dialog = document.querySelector('dialog');
    let showDialogButton = document.querySelector('#show-dialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}


// GLOBAL CODE

// pulling from local storage
// instancing map class

let mainMap = new Map();
// checking if local storage has information
if (localStorage.hasOwnProperty("mainMap")){
	mainMap.fromData(JSON.parse(localStorage.getItem("mainMap")));
}
else{
  url = "https://eng1003.monash/api/v1/ports/";
  data = {
    callback: 'requestPorts'
  };
  jsonpRequest(url,data);
}


// instancing map class
let mainFleet = new ShipFleet();
// // checking if local storage has information
if (localStorage.hasOwnProperty("mainFleet")){
  mainFleet.fromData(JSON.parse(localStorage.getItem("mainFleet")));
}
else{
  url = "https://eng1003.monash/api/v1/ships/";
  data = {
    callback: 'requestShips'
  };
  jsonpRequest(url,data);
}

// gloabl variable instanciation
let shipDisplay = 0; // start of ships to display in table
let portDisplay = 0;// start of ports to display in table
let numDisplay = 6;// number of items ot display in tables

let nameShip = "";
let speedShip = "";
let rangeShip = "";
let descShip = "";
let costShip = "";
let statusShip = "";
let commentsShip = "";

let namePort = "";
let countryPort = "";
let typePort = "";
let sizePort = "";
let locationPrecisionPort = "";
let latPort = "";
let lngPort = "";

let addingRouteShip;
let addingRoute;
let addingStart;
let addingEnd;


let markerPort = undefined;

let shipInfoSum = document.getElementById("shipInformationCard");
if (shipInfoSum != null){
  shipInfoSum.style.visibility = "hidden";
}

let shipAddCon = document.getElementById("shipAddConfirmation");
if (shipAddCon != null){
  shipAddCon.style.visibility = "hidden";
}

let shipInfoCard = document.getElementById("shipInfoCard");
if (shipInfoCard != null){
  shipInfoCard.style.visibility = "hidden";
}

let portAddCon = document.getElementById("portAddConfirmation");
if (portAddCon != null){
  portAddCon.style.visibility = "hidden";
}

let portInfoCard = document.getElementById("portInfoCard");
if (portInfoCard != null){
  portInfoCard.style.visibility = "hidden";
}

// MAP TAB

let map1Test = document.getElementById("mapArea1");
if (map1Test != null){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
  var map1 = new mapboxgl.Map({
  container: 'mapArea1', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [144.9305, -37.84688], // starting position [lng, lat]
  zoom: 1 // starting zoom
  });
}


// SHIP TAB
let shipList = document.getElementById("shipList");
if (shipList != null){
  shipList.innerHTML = generateShipList();
}
// PORTS TAB
let mapPortTest = document.getElementById("mapAreaPort");
if (mapPortTest != null){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
  var mapPort = new mapboxgl.Map({
  container: 'mapAreaPort', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [144.9305, -37.84688], // starting position [lng, lat]
  zoom: 13 // starting zoom
  });
  document.getElementById("mapAreaPort").style.visibility = "hidden";
}

let portList = document.getElementById("portList");
if (portList != null){
  portList.innerHTML = generatePortList();
}
// ROUTES TAB

if (document.getElementById("mapArea2") != null){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
  var map2 = new mapboxgl.Map({
  container: 'mapArea2', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [144.9305, -37.84688], // starting position [lng, lat]
  zoom: 13 // starting zoom
  });
}

// MAP CONFIRM
/*
let mapRouteConfirmTest = document.getElementById("mapArea3");
if (mapRouteConfirmTest != null){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
  var map3 = new mapboxgl.Map({
  container: 'mapArea3', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [144.9305, -37.84688], // starting position [lng, lat]
  zoom: 13 // starting zoom
  });
  let waypointInstanceArray = [];
  if (localStorage.hasOwnProperty("waypoints")){
    let waypointObjectArray = JSON.parse(localStorage.getItem("waypoints"));
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
  if (waypointInstanceArray.length > 0){
    for (i = 0; i < waypointInstanceArray.length; i++)
    {
      markerArray.push(new mapboxgl.Marker({ "color": "#FF8C00" }).setLngLat(waypointInstanceArray[i].getCoordinates()).addTo(map3));
    }
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
}
*/
/*function showWaypoints()
{
let dialogBox = "";
dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Waypoints</h4><div class="mdl-dialog__content">';
 dialogBox += '<div id="mapArea" class="page-block"></div>'

dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
document.getElementById("hiddenDialog").innerHTML = dialogBox;
let dialog = document.querySelector('dialog');
  let showDialogButton = document.querySelector('#show-dialog');
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
  mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcjAwNTEiLCJhIjoiY2swZzN2bGIzMDNtZTNjbnh1bm94d3ByZCJ9.CD0kSJKKLZqqlZIy0YekuA';
  var map = new mapboxgl.Map({
  container: 'mapArea', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [145.1343136, -37.9110467], // starting position [lng, lat]
  zoom: 13 // starting zoom
  });
}*/
