
//JUST DiSPLAY domains array
//nothing significant here
//downloading of user's wrappers from server is in ff-sidebar.js
//creation of wrapper is Create_Domain.js

var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

var mask=0;
var choice=0;

function moreFields() {
	
	var counter=0;
        
	while(1)
	{
		if(domains[counter]==undefined)
			break;
		counter++;
	}
	
	for(var j=0;j<counter;j++)
	{        
		var newFields = document.getElementById('readroot').cloneNode(true);
		
		newFields.id = 'clonereadroot';
		newFields.style.display = 'block';
		
		var newField = newFields.childNodes;
		
		for (var i=0;i<newField.length;i++) {
			var theName = newField[i].id;
			if (theName)
			{
				if(theName == "domainname_info")
					newField[i].textContent = domains[j]['url'];
					
				if(theName == "domaindesc_info")
					newField[i].textContent = domains[j]['desc'];
					
				if(theName == "editbuttons")
				{
					//newField[i].childNodes[2].removeAttribute("oncommand"); // num was 2 before
					newField[i].childNodes[0].removeAttribute("oncommand");
					newField[i].childNodes[0].setAttribute("oncommand","display_View_Config_Sidebar("+j+")");	
				}					
				
				if(theName == "managebuttons")
				{
                    var wrapperId = domains[j]['id'];
                    var usermd5  = MD5(loginVar.userName);
                    var crawlUrl = serverUrl+'runCrawl.pl?'+'u='+usermd5+'&wId='+wrapperId;

					newField[i].childNodes[0].removeAttribute("oncommand");
					newField[i].childNodes[0].setAttribute("oncommand","mainWindow.content.wrappedJSObject.location='"+crawlUrl+"'");
					//newField[i].childNodes[1].removeAttribute("oncommand");
					//newField[i].childNodes[1].setAttribute("oncommand","alert("+j+")");	
				}
			
			} 	 
		}		
		
		var insertHere = document.getElementById('writeroot');
		insertHere.parentNode.insertBefore(newFields,insertHere);
	}
}


