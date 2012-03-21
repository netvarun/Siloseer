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
	 
       if(checkUrl())
       {
           //alert('url checked');
           sidebarTagSelected();
       }
   }
  },
  

  onLocationChange: function(aProgress, aRequest, aURI)
  {
	
   // This fires when the location bar changes; that is load event is confirmed
   // or when the user switches tabs. If you use myListener for more than one tab/window,
   // use aProgress.DOMWindow to obtain the tab/window which triggered the change.
  },

}


function getURL()
{
	var url = mainWindow.content.document.location.href;	
    return url;
}

function checkUrl()
{
    var domainName = domains[global_select.domain]['url'];
    var str = getURL();
    str = urlTLD(str);

    if(domainName.toLowerCase() ==str)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function sidebarTagSelected() {
   
    //alert('type: ' + global_select.type + ' nav_val ' + global_select.nav_val + ' con_val '+  global_select.con_val + ' domain ' +   global_select.domain);

    //no label has been selected
    if((global_select.type==0 && global_select.nav_val==-1)||(global_select.type==1 && global_select.con_val==-1))
    {
        unLoadUITagging();
        if(checkUrl())
        {
            markEverything();
        }
    }
    else
    {
        //display all tags for selected label
        if(checkUrl())
        {
            markSelected(getTagType());
        }
        loadUITagging();
    }

}

function loadUITagging()
{
    mainWindow.content.document.addEventListener("mouseover", inspectorMouseOver, true);
    mainWindow.content.document.addEventListener("mouseout", inspectorMouseOut, true);
    mainWindow.content.document.addEventListener("click", inspectorOnClick, true);
}


function unLoadUITagging()
{
    mainWindow.content.document.removeEventListener("mouseover", inspectorMouseOver, true);
    mainWindow.content.document.removeEventListener("mouseout", inspectorMouseOut, true);
    mainWindow.content.document.removeEventListener("click", inspectorOnClick, true);

    // Remove outline on last-selected element:
//    lastViewedElement.style.outline = 'none';
}

function getTagType()
{
    if(global_select.type==0 && global_select.nav_val!=-1)
    {
        return -1;
        /*
        if(global_select.nav_val==0)
        {
            return "conLinks";
        }
        else if(global_select.nav_val==1)
        {
            return "navLinks";
        }
        */
    }
    else if(global_select.type==1 && global_select.con_val!=-1)
    {
        return global_select.con_val;

    }
    else
    {
        return -2;
    }

}

function clearState()
{
    global_select.type=0;
    global_select.nav_val=0;
    global_select.con_val=0;
    global_select.domain=0;
    unLoadUITagging();
}



function startup() {
  // Sidebar is loading
  mainWindow.getBrowser().addProgressListener(myListener);

}

window.addEventListener("load", startup, false);
