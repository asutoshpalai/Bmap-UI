(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/TrackerPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
            function initMap(divName) {
                var map;

                if (!divName)
                    divName = "mapDiv";

                var mapOptions =
                {
                    credentials: "AsR2QA0NZcWSui-nFCb50_nSCfoJoSenaR-R3Ha5heqM6OkRVZw-IP2Lml7F2E-K",
                    center: new Microsoft.Maps.Location(mapDetails.lat, mapDetails.long),
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    zoom:17
                };

                map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);

                var center = map.getCenter();

                // Add a pin to the center of the map
                

               

                mapDetails.map = map;


                mapDetails.updateMap = function () {
                    mapDetails.map.entities.clear();

                    var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(mapDetails.lat, mapDetails.long), { text: 'Me' });

                    map.entities.push(pin);
                    var p;
                    for (p in user.disp) {
                        var loc = new Microsoft.Maps.Location(p.latitude, p.longitude);
                        pin = new Microsoft.Maps.Pushpin(loc, { text: p.name });

                    }
                };

                mapDetails.updateMap();

            }
        },
    });

   
    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        TrackerControl: ControlConstructor
    });
})();