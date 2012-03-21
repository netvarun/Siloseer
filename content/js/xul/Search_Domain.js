var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
.createInstance(Components.interfaces.nsIXMLHttpRequest);

var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

var jsObject;

function search_domain()
{
    var url = document.getElementById("Domain_Url").value;


    //var lastArray = domains[domains.length-1];
    //var jsied =  JSON.stringify({lastArray: lastArray});
    //LOG("stringify " + jsied + " " + url);

    var url=serverUrl+'search.pl?q='+url+'&u='+loginVar.userName;

    request.onload = function(aEvent) {
        var jsonString = aEvent.target.responseText;
        LOG('success: '+jsonString);
        jsObject = JSON.parse(jsonString);
        for(var i in jsObject)
        {
            LOG('i = ' + i);
            var foundObject = jsObject[i];
            var foundUrl = foundObject['url'];
            var foundUser = foundObject['user'];
            var foundRating = foundObject['rating'];
            LOG('name: ' + foundUrl);
            //domains[domains.length-1] = foundObject;
     //       domains.push(foundObject);
            update_list(foundUrl,foundUser,foundRating,i);
        }
    };
    request.onerror = function(aEvent) {
        LOG('Error: '+aEvent.target.status);
    };
    request.open("GET", url, true);
    request.send(null);

    //update_list("Test","Varun","http://google.com/");


}


//put rating and user
function update_list(Domain,User,Rating,Url)
{
    var theList = document.getElementById('SearchList');

    var row = document.createElement('listitem');

    var cell1 = document.createElement('listcell');
    var cell2 = document.createElement('listcell');
    var cell3 = document.createElement('listcell');

    row.setAttribute('id', Url);

    cell1.setAttribute('label', Domain);
    cell2.setAttribute('label', User);
    cell3.setAttribute('label', Rating);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    theList.appendChild(row);
}

function gotoURL() {
    var selectedId = document.getElementById('SearchList').selectedItem.id;

    if(selectedId != null)
    {
        var foundObject = jsObject[selectedId];
        var siloseerId = foundObject['id'];

        var usermd5 = MD5(loginVar.userName);
        var wrapperUrl = serverUrl+'wrapper.pl?wId='+siloseerId+'&u='+usermd5;

        mainWindow.content.wrappedJSObject.location=wrapperUrl;
    }
}

//save selected search result
function select_search_result(num) {
            var foundObject = jsObject[num];
            var domDomain = foundObject['url'];
            var domDesc = foundObject['desc'];
            var domUser = foundObject['user'];


            var dateObj = new Date();
            var epoch = parseInt((dateObj.getTime())/1000);

            //to figure out collaborations 
            if(foundObject['originalId'] != foundObject['id'])
                foundObject['originalId'] = foundObject['id'];
            foundObject['id'] = Math.floor(Math.random()*1000000);
            foundObject['createdDate'] = epoch;

            var isFound = -1;
    //        isFound = isUniqueDomain(domDomain,domDesc,domUser);
    //       if(isFound==-1)
    //        {
                //Check uniquess?? not needed nah?
                ///////////////////////////////////////
                foundObject['user'] = loginVar.userName;


                domains[domains.length] = foundObject;
                foundArray[domains.length-1] = {};

                uploadDomain(domains.length-1); // now store the object to the server as the users;

                //foundArray.push(domains.length);
                //foundArray[domains.length]=new Array();
    //        }
    //       else
    //       {
    //            num = isFound;
    //        }
            display_View_Config_Sidebar(domains.length-1);
}

//to determine the uniqueness of wrapper
function isUniqueDomain(Domain,Desc,User) {

    var ct=0;

    for(var i in domains)
    {
        var domObj = domains[i];
        var domDomain = domObj['url'];
        var domDesc = domObj['desc'];
        var domUser = domObj['user'];

        if(domDomain == Domain && domDesc == Desc && domUser == User)
        {
//            alert('Unique!');
            return ct;
        }
        ct++;
    }

    return -1;
}

function selectFoundWrapper() {
    var selectedId = document.getElementById('SearchList').selectedItem.id;

    if(selectedId != null)
        select_search_result(selectedId);

}


