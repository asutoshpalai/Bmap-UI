(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/SearchPage.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};

            $('#searchresult').css('display', 'none');
            document.getElementById('finduser').onsubmit = null;
            document.getElementById('sendfr').onsubmit = function () {
                event.preventDefault();
                $('#searchresult').css('display', 'none');
                $('#friendRequest').html("Freind Request Sent!!");
            };


            $("#finduser").submit(function (event) {
                event.preventDefault();
                $('#friendRequest').html("");

                var d = {
                    username: $('#user').val(),

                }
                var x = domain + "/getuser";
                var posting = $.post(x, d);
                posting.done(function (data) {

                    $('#searchresult').css('display', 'block');
                    console.log(data);
                    var result = $.parseJSON(data);
                    var searchresult = result['result'];
                    var userid = result['userid'];
                    var name = result['name'];
                    var privacy = result['privacy'];
                    var res;
                    switch (searchresult) {
                        case '0':
                            document.getElementById("usernamedisp").innerHTML = name;
                            document.getElementById("userdisp").innerHTML = $('#user').val();
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
                    $("#searchresult").html(res);
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