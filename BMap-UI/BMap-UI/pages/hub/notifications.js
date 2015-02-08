if (WinJS.Application.sessionState.requests == "0") {
    var frndlist = "Sorry! Unable to fetch your friendlist.";
}
else {
    var details = WinJS.Application.sessionState.requests;
    details = $.parseJSON(details);
    var frndlist = '<div>';
    for (var i = 0 ; i < details['people'].length ; i++) {
        frndlist += '<div>';
        frndlist += details['people'][i]['name'];
        frndlist += '</div>';
    }
    frndlist += '</div>';
}
$("#friends").html(frndlist);