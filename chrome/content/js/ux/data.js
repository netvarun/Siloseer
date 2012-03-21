Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

//any changes here, one has to restart browser

var mainWindowOverlay = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);


//To Add: clearWrapper -> clear 'display' and 'generalized'

function saveTag(xpath)
{
    var my_array = new Array();

    var dateObj = new Date();
    var epoch = parseInt((dateObj.getTime())/1000);

    my_array['url']= mainWindowOverlay.content.document.location.href;			
    my_array['url'] =  my_array['url'];
    my_array['xpath'] = xpath;
    my_array['text'] =  getTextContent(xpath);
    my_array['time'] = epoch;

    //xpath already exists
    if(foundXPath(xpath,0))
    {
        return;
    }

    if(global_select.type==0 && global_select.nav_val!=-1)
    {
        navigationSelection(xpath,my_array);
    }
    else if(global_select.type==1 && global_select.con_val!=-1)
    {
        contentSelection(xpath,my_array);
    }
//    uploadDomain(global_select.domain);

}

function contentSelection(xpath,my_array) {
	var con_num = document.getElementById("con_label_num"+global_select.con_val);	

	//store node
	var len = domains[global_select.domain]['data'][global_select.con_val]['nodes'].length;

	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]={};
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['url'] = my_array['url'];
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['text'] = my_array['text'];
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['xpath'] = my_array['xpath'];
//	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['dom'] = my_array['dom'];

	con_num.textContent = 'Tags: ' + domains[global_select.domain]['data'][global_select.con_val]['nodes'].length;
}	

function navigationSelection(xpath,my_array) {
	
	var links_num;	
    var linksType='';

	if(global_select.nav_val==0)
	{
		//update GUI screen
		links_num = document.getElementById("content_links_num");
        linksType='content';
    }
    else if(global_select.nav_val==1)
    {
		links_num = document.getElementById("nav_links_num");
        linksType='nav';
    }

    var len = domains[global_select.domain]['links'][linksType].length;

    domains[global_select.domain]['links'][linksType][len] = {};
    domains[global_select.domain]['links'][linksType][len]['url']=my_array['url'];
    domains[global_select.domain]['links'][linksType][len]['xpath']=my_array['xpath'];
    domains[global_select.domain]['links'][linksType][len]['text']=my_array['text'];

    links_num.textContent = domains[global_select.domain]['links'][linksType].length;

    //alert(domains[global_select.domain]['links'][linksType][len]['xpath']);
}	

function getTextContent(xpath)
{
    LOG('getting textual content: data.js');
    var foundNodes = getNodesFromXPathString(xpath);
    for (var j in foundNodes)
    {
        return foundNodes[j].textContent;
    }
}

