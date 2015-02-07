(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};

            if (WinJS.Application.sessionState.frndlist == "0") {
                var friendlist = "Sorry! Unable to fetch your friendlist.";
            }
            else {
                var details = WinJS.Application.sessionState.frndlist;
                var frndlist = '<div>';
                for (var i = 0 ; i < details['people'].size() ; i++) {
                    frndlist += '<div>';
                    frndlist += details['people'][i]['name'];
                    frndlist += '</div>';
                }
                frndlist += '</div>';
            }
            $("#friends").append(friendlist);
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();