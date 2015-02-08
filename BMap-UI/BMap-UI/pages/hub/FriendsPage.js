(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/FriendsPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};
            var frndlist = "";
           if (WinJS.Application.sessionState.frndlist == "0") {
                frndlist = "Sorry! Unable to fetch your friendlist.";
            }
           else {

               
               var details = WinJS.Application.sessionState.frndlist;
               console.log(details);
                frndlist = '<div>';
                for (var i = 0 ; i < user.people.length ; i++) {
                    frndlist += '<div>';
                    frndlist += details['people'][i]['name'];
                    frndlist += '</div>';
                    console.log(details);
                }
                frndlist += '</div>';
            }
            $("#friends").html(frndlist);
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        FriendsControl: ControlConstructor
    });
})();