//var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
.createInstance(Components.interfaces.nsIXMLHttpRequest);

var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);


function checkId(id)
{
    for(var i in domains)
    {
        var domObj = domains[i];
        var domId = domObj['id'];

        if(domId == id)
        {
            return true;
        }
    }
    return false;
}

