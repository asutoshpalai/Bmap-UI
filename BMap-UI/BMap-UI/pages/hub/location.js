
var mapDetails = {};

mapDetails.lat = 29.8644;
mapDetails.long = 77.8964;


function getLocation() {

    console.log("Geolocation.");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");;
    }
}

function setPosition(position) {
    mapDetails.lat = position.coords.latitude;
    mapDetails.long = position.coords.longitude;

    console.log("Got user's Loaciton");
}

mapDetails.loc = null;

function getLoc() {
    if (mapDetails.loc == null) {
        
        mapDetails.loc = new Windows.Devices.Geolocation.Geolocator();
    }
    if (mapDetails.loc != null) {
        mapDetails.loc.getGeopositionAsync().then(getPositionHandler, errorHandler);
    }
}

function getPositionHandler(pos) {

    console.log("Non html5 meathod sucessful");
    mapDetails.lat= pos.coordinate.point.position.latitude;
    mapDetails.long = pos.coordinate.point.position.longitude;
    mapDetails.accuracy = pos.coordinate.accuracy;
    mapDetails.geolocatorStatus =
        getStatusString(mapDetails.loc.locationStatus);
}

function errorHandler(e) {
    mapDetails.errormsg = e.message;
    // Display an appropriate error message based on the location status.
    mapDetails.geolocatorStatus =
        getStatusString(mapDetails.loc.locationStatus);
}

function getStatusString(locStatus) {
    switch (locStatus) {
        case Windows.Devices.Geolocation.PositionStatus.ready:
            // Location data is available
            return "Location is available.";
            break;
        case Windows.Devices.Geolocation.PositionStatus.initializing:
            // This status indicates that a GPS is still acquiring a fix
            return "A GPS device is still initializing.";
            break;
        case Windows.Devices.Geolocation.PositionStatus.noData:
            // No location data is currently available 
            return "Data from location services is currently unavailable.";
            break;
        case Windows.Devices.Geolocation.PositionStatus.disabled:
            // The app doesn't have permission to access location,
            // either because location has been turned off.
            return "Your location is currently turned off. " +
                "Change your settings through the Settings charm " +
                " to turn it back on.";
            break;
        case Windows.Devices.Geolocation.PositionStatus.notInitialized:
            // This status indicates that the app has not yet requested
            // location data by calling GetGeolocationAsync() or 
            // registering an event handler for the positionChanged event. 
            return "Location status is not initialized because " +
                "the app has not requested location data.";
            break;
        case Windows.Devices.Geolocation.PositionStatus.notAvailable:
            // Location is not available on this version of Windows
            return "You do not have the required location services " +
                "present on your system.";
            break;
        default:
            break;
    }
}


setInterval(function () {
    getLoc();

    /*
    var x = domain + "/getlocs" ;
    var posting = $.post(x);
    posting.done(function (data) {

        console.log(data);
        var result = $.parseJSON(data);

        switch (result['result']) {
            case '0': user.disp = result['people'];
                break;
            case '7': console.log("Error");
                break;
        }
    });
    */
    if (mapDetails.map) {
        mapDetails.map.setView({ center: new Microsoft.Maps.Location(mapDetails.lat, mapDetails.long) });
    }

}, 30000);

getLoc();
getLocation();


