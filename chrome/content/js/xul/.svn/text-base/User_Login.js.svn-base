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

function user_login()
{
    var user = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    var md5ied_pwd = MD5(pwd);
    var usermd5 = MD5(user);
    do_login(user,md5ied_pwd);

    if(loginVar.loginStatus == 1)
    {
        alert('Hi ' + user + '. You have successfully logged in.');
        var userUrl = serverUrl + 'user.pl?u='+usermd5;
        //alert(userUrl);
        mainWindow.content.wrappedJSObject.location=userUrl;
        display_View_Main_Sidebar();
    }
    else
    {
        alert('Incorrect account Details. Please Try Again!');
    }
}

function do_login(user,pwd)
{

    //var lastArray = domains[domains.length-1];
    //var jsied =  JSON.stringify({lastArray: lastArray});
    //LOG("stringify " + jsied + " " + url);

    var url=serverUrl+'login.pl';
    //?u='+user+'&p='+pwd;

    request.onload = function(aEvent) {
        var jsonString = aEvent.target.responseText;
        LOG('success: '+jsonString);
        jsObject = JSON.parse(jsonString);
        if(jsObject['success']=='1')
        {
          loginVar.loginStatus=1;
          loginVar.userName = user;
        }
        else
        {
        }
    };
    request.onerror = function(aEvent) {
        LOG('Error: '+aEvent.target.status);
    };
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send('u='+user+'&p='+pwd);

}

function isLoggedIn()
{
    if(loginVar.loginStatus == 1)
    {
//       var usermd5 = MD5(loginVar.userName);
//        var userUrl = serverUrl + 'user.pl?u='+usermd5;
//        mainWindow.content.wrappedJSObject.location=userUrl;
        display_View_Main_Sidebar();
    }
}

function logout_user()
{
    loginVar.loginStatus = 0;
    loginVar.userName = '';
    loginVar.firstSync = 0;

    resetVar();

    display_User_Login_Sidebar();
}

function display_user()
{

    var userLabel = document.getElementById("Logged_User");
    userLabel.value = 'Welcome ' + loginVar.userName;

}



