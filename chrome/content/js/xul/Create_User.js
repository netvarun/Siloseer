Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
.createInstance(Components.interfaces.nsIXMLHttpRequest);

var jsObject;

function create_user()
{
    var user = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var md5ied_pwd = MD5(pwd);

    //alert(md5ied_pwd);

    //var lastArray = domains[domains.length-1];
    //var jsied =  JSON.stringify({lastArray: lastArray});
    //LOG("stringify " + jsied + " " + url);

    var url=serverUrl+'create.pl';
   // ?'u='+user+'&p='+pwd+'&n='+name+'&e='+email;

    request.onload = function(aEvent) {
        var jsonString = aEvent.target.responseText;
        LOG('success: '+jsonString);
        jsObject = JSON.parse(jsonString);
        if(jsObject['success']=='1')
        {
          alert('Hi ' + user + '. You have successfully logged in.');
          loginVar.loginStatus=1;
          loginVar.userName = user;
        }
        else
        {
            alert('Error: Most probably user already exists!');
        }
    };
    request.onerror = function(aEvent) {
        LOG('Error: '+aEvent.target.status);
    };
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send('u='+user+'&p='+md5ied_pwd+'&n='+name+'&e='+email);

    if(loginVar.loginStatus == 1)
    {
        display_View_Main_Sidebar();
    }

    //update_list("Test","Varun","http://google.com/");


}


