console.log("sesefgs");

(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/RequestsPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            console.log("seggjise");
            console.log(element);
            
            options = options || {};
            var frndlist = "";
            console.log((WinJS.Application.sessionState.requestr) == null);
            if (WinJS.Application.sessionState.requestr) {
                console.log("eeeeeee");
                frndlist = "Sorry! Unable to fetch your friend requests.";
            }
            else {


                var detailsr = WinJS.Application.sessionState.requestsr;
                console.log("jjjjjjjjjjjjjj");
                console.log(detailsr);
                if (detailsr.people.length == 0) frndlist = 'No Friend Requests.'
                frndlist += '<div>';

                for (var i = 0 ; i < detailsr.people.length ; i++) {
                    frndlist += '<div class="label-medium">';
                    frndlist += detailsr['people'][i]['name'];
                    frndlist += '<br/><button class="accbutton" id="' + 'a' + i + '">Accept Request</button>';
                    frndlist += '</div>';
                    console.log(detailsr);
                }
                frndlist += '</div>';
            }
            console.log(frndlist);
            element.innerHTML = frndlist;
            var buttons = document.getElementsByClassName('accbutton');
            for (var i = 0 ; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function (e) {
                    var el = e.target;
                    console.log(e.target);
                    var x = domain + "/accfr";
                    var code = parseInt(e.target.id.substring(1, e.target.id.length));
                    var posting = $.post(x, 'user2=' + detailsr.people[code].userid);

                    posting.done(function (data) {
                        document.getElementById('a' + code).innerHTML = 'Friends';
                        document.getElementById('a' + code).disabled = true;
                    });
                    
                }, false);
            }
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        RequestsControl: ControlConstructor
    });
})();