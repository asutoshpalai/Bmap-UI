﻿(function () {
    "use strict";

    var ControlConstructor =
      WinJS.UI.Pages.define("/pages/sign/signInPage.html", {
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




              $('#document').ready(function () { $('#login').submit = null; });
              $("#login").submit(function (event) {
                  event.preventDefault();
                  var d = {
                      username: $('#user').val(),
                      password: $('#pass').val()
                  }
                  var x = domain + "/login";
                  console.log(x);
                  var posting = $.post(x, d);
                  posting.done(function (data) {
                      var response = $.parseJSON(data);
                      var result = response['result'];
                      switch (result) {
                          case '0':
                              x = domain + "/flist";
                              var posting = $.post(x, '');
                              console.log("nnnnnnnnnn");
                              posting.done(function (data) {
                                  var details = $.parseJSON(data);
                                  var check = details['result'];
                                  var privacy = response['privacy'];
                                  if (check == '0') {
                                      WinJS.Application.sessionState.frndlist = details;
                                  }
                                  else {
                                      WinJS.Application.sessionState.frndlist = null;
                                  }
                                  user.people = details['people'];
                              });
                              console.log("mmmmmmmmmmmmm");
                              user.userid = response['userid'];
                              user.name = response['name'];
                              user.privacy = response['privacy'];
                              x = domain + "/frequests";
                              var posting = $.post(x, '' );
                              posting.done(function (datar) {
                                  console.log("iiiiiiiiiiiiii");
                                  console.log(datar);
                                  var detailsr = $.parseJSON(datar);
                                  var checkr = detailsr['result'];
                                  
                                  if (checkr == '0') {
                                      WinJS.Application.sessionState.requestsr = detailsr;
                                  }
                                  else {
                                      WinJS.Application.sessionState.requestsr =null;
                                  }
                                  //user.people = details['people'];
                              });
                              WinJS.Navigation.navigate('/pages/hub/hub.html');
                              break;
                          case '1':
                              $("#error").html("No such user exist or passwords do not match.");
                              break;
                          case '7':
                              $("#error").html("Could not complete the Sign In process. Please try again later.");
                              break;
                          default:
                              $("#error").html("Login error. Please try again later.");
                      }
                  });
                  posting.fail(function (a) {
                      //document.write(a);
                  })
              });
          },
      });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside 
    // the data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        signInControl: ControlConstructor
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