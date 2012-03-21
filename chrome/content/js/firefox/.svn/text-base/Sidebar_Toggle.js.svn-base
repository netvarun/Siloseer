var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

function display_Create_Domain_Sidebar()
{
//	alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function") siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_Create_Domain",true);
	
}

function display_View_Domain_Sidebar()
{
	//alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function") siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_View_Domain",true);
	//global_num = num;
    //toggleSidebar("viewSidebar_View_Domain",true);
	
}

function display_View_Config_Sidebar(num)
{
	global_select.domain = num;
	//alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function") siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_View_Config",true);
	
}

function display_View_Main_Sidebar()
{
    //if(typeof siloseer_Sidebar_Handle.activeWindow == 'undefined' || siloseer_Sidebar_Handle.activeWindow == null)
    //{
      //  var sidebarWindow = document.getElementById("sidebar").contentWindow;

        //siloseerWindow.toggleSidebar("viewSidebar_siloseer_gui",true);

    //}
    //else
    //{
        if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function") 
            siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_siloseer_gui",true);
    //}
	
}

function display_Search_Wrapper_Sidebar()
{
	//alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function")
        siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_Search_Wrapper",true);
	
}

function display_View_Crawl(num)
{
	global_select.domain = num;
	//alert('loc is '+document.location.href);
	//alert(Dumper(domains));
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function") siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_View_Crawl",true);
	
}

//For users

function display_User_Login_Sidebar()
{
	//alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function")
        siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_User_Login",true);
	
}

function display_Create_User_Sidebar()
{
	//alert('loc is '+document.location.href);
	if(typeof siloseer_Sidebar_Handle.activeWindow.toggleSidebar == "function")
        siloseer_Sidebar_Handle.activeWindow.toggleSidebar("viewSidebar_Create_User",true);
	
}
