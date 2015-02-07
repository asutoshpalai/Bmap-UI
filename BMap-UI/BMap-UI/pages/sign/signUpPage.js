(function () {
    "use strict";

    var ControlConstructor =
      WinJS.UI.Pages.define("/pages/sign/signUpPage.html", {
          // This function is called after the page control contents 
          // have been loaded, controls have been activated, and 
          // the resulting elements have been parented to the DOM. 
          ready: function (element, options) {
              options = options || {};

              // Retrieve the page 2 link and register the event handler. 
              // Don't use a button when the action is to go to another 
              // page; use a link instead. 
              // See Guidelines and checklist for buttons at 
              // http://go.microsoft.com/fwlink/p/?LinkID=313598
              // and Quickstart: Using single-page navigation at 
              // http://go.microsoft.com/fwlink/p/?LinkID=320288.
              WinJS.Utilities.query("a").listen(
                "click", linkClickHandler, false);

                 $("#signup").submit(function(event) {
        event.preventDefault();
        if ($('#cpass').val() == $('#pass').val()) {
            var d = {
                username: $('#user').val(),
                name: $('#name').val(),
                password: $('#pass').val(),
                privacy: $('#privacy').val()
            }
            var x = domain + "/signup";
            var posting = $.post(x, d);
            posting.done(function (data) {
                $response = $.parseJSON(data);
            });
            posting.fail(function (a) {
                //document.write(a);
            })
        }
        else {
            $("#signup").append("Passwords don't match");
        }
    }) ;




             
          },
      });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside 
    // the data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        signUpControl: ControlConstructor
    });

    function linkClickHandler(eventInfo) {
        var link = eventInfo.target;
        eventInfo.preventDefault();
        if (link.href.indexOf("ms-appx") > -1) {
            WinJS.Navigation.navigate(link.href);
        }
        else if (link.href.indexOf("http") > -1) {
            // Create a Uri object from a URI string 
            var uri = new Windows.Foundation.Uri(link.href);
            var options = new Windows.System.LauncherOptions();
            // Launch the URI with a warning prompt
            options.treatAsUntrusted = true;
            // Launch the URI
            Windows.System.Launcher.launchUriAsync(uri, options).then(
               function (success) {
                   if (success) {
                       // URI launched
                   } else {
                       // URI launch failed
                   }
               });
        }
    }
})();