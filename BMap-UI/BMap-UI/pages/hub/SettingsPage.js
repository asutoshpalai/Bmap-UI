(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/SettingsPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};


            //adding custom code

            $("#logout").submit(function (event) {
                event.preventDefault();
                var x = domain + "/logout";
                var posting = $.post(x);
                posting.done(function (data) {
                    var response = $.parseJSON(data);
                    var result = response['result'];
                    if (result == 0) {
                        //Location of sign/hub file
                        clearInterval(user.interval);
                        user = {};
                        mapDetails.map.dispose();
                        mapDetails = {};
                        var mapdiv = $('#mapDiv');
                        if (mapdiv) {
                            console.log('Sucesses' + mapdiv);
                            mapdiv.html('');
                            console.log(mapDiv);
                        }
                        WinJS.Navigation.navigate('/pages/sign/hub.html');
                    }
                    else {
                        document.getElementById("error").innerHTML = "Error signing out...";
                    }
                });
            });

            $("#logout").submit(function (event) {
                event.preventDefault();
                var x = domain + "/logout";

                var posting = $.post(x, '');
                posting.done(function (data) {
                    WinJS.Navigation.navigate('/pages/sign/hub.html');

                });
            });
            
        }//end of ready function
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        SettingsControl: ControlConstructor
    });
})();