(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/SearchPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};


            document.getElementById('finduser').onsubmit = null;
            domain = "http://192.168.0.117";
            $("#finduser").submit(function (event) {
                event.preventDefault();
                var d = {
                    username: $('#user').val(),

                }
                var x = domain + "/getuser";
                var posting = $.post(x, d);
                posting.done(function (data) {

                    console.log(data);
                    var result = $.parseJSON(data);
                    var searchresult = result['result'];
                    var userid = result['userid'];
                    var name = result['name'];
                    var privacy = result['privacy'];
                    var res;
                    switch (searchresult) {
                        case '0':
                            res = '<div>';
                            res += name;
                            res += '</div>';
                            res += '<div>';
                            res += $('#user').val();
                            res += '</div><br />';
                            res += '<form id="sendfr" action="POST"><input type="submit" value="Send Request" /></form>';
                            break;
                        case '1':
                            res = "No such user found...";
                            break;
                        case '7':
                            res = "Sorry! Could not complete the search request...";
                            break;
                        default:
                            res = "Sorry! Could not complete the search request...";
                    }
                    $("#searchresult").append(res);
                });
            });
        },
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        SearchControl: ControlConstructor
    });
})();