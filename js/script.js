var startPos; 
var watchId;


function startTracking() {

	if(!navigator.geolocation) {
		alert("Your broswer does not support geolocation feature");
		return; 
	}


	// Change the button display
	document.getElementById('startBtn').style.display = "none"; 
	document.getElementById('stopBtn').style.display = "inline"; 
	// Get starting Geo location
	navigator.geolocation.getCurrentPosition(showStartingLocation, showError); 
	// Get current Geo location
	watchId = navigator.geolocation.watchPosition(showCurrentLocation, showError); 

}

function stopTracking() {

    // Stop geo location watch
	navigator.geolocation.clearWatch(watchId);
    // Change the button display
	document.getElementById('startBtn').style.display = "inline"; 
	document.getElementById('stopBtn').style.display = "none"; 
    // Clear the distance displays
	document.getElementById("startLatitude").innerHTML = '-----'; 
	document.getElementById("startLongitude").innerHTML = '-----'; 
	document.getElementById("currentLatitude").innerHTML = '-----'; 
	document.getElementById("currentLongitude").innerHTML = '-----'; 
	document.getElementById("distance").innerHTML = '-----';

}

function showStartingLocation(pos) {

	startPos = pos; 
	document.getElementById("startLatitude").innerHTML = pos.coords.latitude; 
	document.getElementById("startLongitude").innerHTML = pos.coords.longitude; 
	console.log(startPos.coords.latitude, startPos.coords.longtitude);
}

function showCurrentLocation(pos) {
	
	document.getElementById("currentLatitude").innerHTML = pos.coords.latitude; 
	document.getElementById("currentLongitude").innerHTML = pos.coords.longitude; 
	console.log(pos.coords.latitude, pos.coords.longtitude);
	calculateDistance(startPos, pos); 
}

function calculateDistance(startPos, currentPos) {

	var isMiles = false; 
	var distance = haversineDistance(startPos, currentPos, isMiles); 
	document.getElementById("distance").innerHTML = distance;

}

function showError(err) {
	alert("Error: "+ err.message);
	console.log(err);
}

function haversineDistance(pos1, pos2, isMiles) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = pos1.coords.latitude;
  var lat1 = pos1.coords.longitude; 

  var lon2 = pos2.coords.latitude;
  var lat2 = pos2.coords.longitude;

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if(isMiles) d /= 1.60934;

  return d;
}


