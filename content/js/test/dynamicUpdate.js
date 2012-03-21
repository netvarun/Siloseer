Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var mainWindow = null;
mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

const STATE_START = Components.interfaces.nsIWebProgressListener.STATE_START;
const STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;
var myListener =
{
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onStateChange: function(aWebProgress, aRequest, aFlag, aStatus)
  {
   // If you use myListener for more than one tab/window, use
   // aWebProgress.DOMWindow to obtain the tab/window which triggers the state change
   if(aFlag & STATE_START)
   {
     // This fires when the load event is initiated
   }
   if(aFlag & STATE_STOP)
   {
     // This fires when the load finishes
   }
  },

  onLocationChange: function(aProgress, aRequest, aURI)
  {
   // This fires when the location bar changes; that is load event is confirmed
   // or when the user switches tabs. If you use myListener for more than one tab/window,
   // use aProgress.DOMWindow to obtain the tab/window which triggered the change.
      getURL();
  },

}			 

function startup() {
  // Sidebar is loading
  mainWindow.getBrowser().addProgressListener(myListener);
}

function getURL()
{
	var locations = document.getElementById("Domain_Url");
	var url = mainWindow.content.document.location.href;	
    alert(url);
	locations.value = mainWindow.content.document.location.href;	

}

window.addEventListener("load", startup, false);
