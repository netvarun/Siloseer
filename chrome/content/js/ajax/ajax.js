Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");
var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]  
               .createInstance(Components.interfaces.nsIXMLHttpRequest);  
var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"]
             .createInstance(Components.interfaces.nsIDOMParser);
             // optionally, call parser.init(principal, documentURI, baseURI);
var serializer = Components.classes["@mozilla.org/xmlextras/xmlserializer;1"].createInstance(Components.interfaces.nsIDOMSerializer);



//Pushing to server (when creating a Wrapper or making any changes to it)
//used by ff-overlay and create_domain
function uploadDomain(domNum)
{
    var lastArray = domains[domNum];
   
    //clone an object
    //var lastArray = jQuery.extend(true, {}, lastArrayOrig);

    var jsied =  utf8_to_b64(JSON.stringify({lastArray: lastArray}));
    var url = serverUrl+'mongo.pl';
    //var url = serverUrl+'mongo.pl?json='+jsied;

    LOG("ajax.js stringify " + jsied + " " + url);

    request.onload = function(aEvent) {
        //window.alert("Response Text: " + aEvent.target.responseText);
    };
    request.onerror = function(aEvent) {
        window.alert("Error Status: " + aEvent.target.status);
    };
    //request.open("GET", url, true);
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send('json='+jsied);
    //request.send(null);
}


function downloadWrappers()
{
    var url=serverUrl+'getWrappers.pl?u='+loginVar.userName;
    var bool=0;

    request.onload = function(aEvent) {
        var jsonString = aEvent.target.responseText;
        LOG('success: '+jsonString);
        jsObject = JSON.parse(jsonString);
        for(var i in jsObject)
        {
            var foundObject = jsObject[i];
            var foundObjectId = foundObject['id'];
            //Check if wrapper already exists
            if(!checkId(foundObjectId))
            {
                //domains.push(foundObject);
                //does not exist hence store it
                //process it -> convert 'string' to 'dom'

                domains[domains.length] = foundObject;
                foundArray[domains.length-1] = {};

                //foundArray.push(domains.length);
                //foundArray[domains.length]=new Array();

            }
        }
        //loginVar.firstSync=1;
    };
    request.onerror = function(aEvent) {
        LOG('Error: '+aEvent.target.status);
    };
    request.open("GET", url, false);
    request.send(null);

    //update_list("Test","Varun","http://google.com/");

}

