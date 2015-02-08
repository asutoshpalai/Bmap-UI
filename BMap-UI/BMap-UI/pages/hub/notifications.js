if (WinJS.Application.sessionState.requests == "0") {
    var requests = "Sorry! Unable to fetch requests.";
}
else {
    var details = WinJS.Application.sessionState.requests;
    var requests = '<div>';
    for (var i = 0 ; i < details['people'].length ; i++) {
        requests += '<div>';
        requests += details['people'][i]['name'];
        requests += '</div>';
        requests += '<form method="POST" id="acceptrequest">';
        requests += '<input type="submit" value = "Accept request" />';
        requests += '</form>';
    }
    requests += '</div>';
}
$("#requests").html(requests);
document.getElementById("acceptrequest").onsubmit = null;
var x = domain + "/login";
var posting = $.post(x, d);
posting.done(function (data) {
var response = $.parseJSON(data);
var result = response['result'];
var str ;
switch (result)
{
    case '0' :
        str = "Now you are friends..." ;
        break ;
    default :
        str = "Error while accepting..." ;
}