Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

//any changes here, one has to restart browser

var mainWindowOverlay = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"]
             .createInstance(Components.interfaces.nsIDOMParser);
             // optionally, call parser.init(principal, documentURI, baseURI);
var serializer = Components.classes["@mozilla.org/xmlextras/xmlserializer;1"].createInstance(Components.interfaces.nsIDOMSerializer);

//only for Navigation links
function select_element(){
			
	var clickedNode=gContextMenu.target;
	var sidebarDoc= document.getElementById("sidebar").contentDocument;   			
    var somethingSelected=0;
	//alert('global sel links is ' + global_select.nav_val);
	
	if(global_select.type==0)
	{
		if(clickedNode.tagName == 'A')
		{
            //only filter out hyper links for the navigation right clicks
            //GRRRR
			navigationSelection(clickedNode,sidebarDoc);
			LOG('You clicked a link node');
            somethingSelected=1;
		}
		else
		{
			LOG('You did NOT click a link node');
		}
		
	}
	else if(global_select.type==1)
	{
		contentSelection(clickedNode,sidebarDoc);
        somethingSelected=1;
	}
	
	//Can be later commented out
	//nodeHash[global_select.domain][generateXPath(clickedNode)] = mainWindowOverlay.content.document.location.href;
//    alert(mainWindowOverlay.content.document.location.href);

    if(somethingSelected==1)
    {
        //insert to history
        //update wrapper
        uploadDomain(global_select.domain);

       // var l1 = domains[global_select.domain];
       // var js1 =  JSON.stringify({l1: l1});
       // alert(js1);

    }
        
}		


function contentSelection(clickedNode,sidebarDoc) {
		
	
	var con_num = sidebarDoc.getElementById("con_label_num"+global_select.con_val);	
	var my_array= new Array();
	
	my_array['dom'] = clickedNode;
    //my_array['string'] = utf8_to_b64(serializer.serializeToString(my_array['dom']));
	my_array['url']= mainWindowOverlay.content.document.location.href;
    my_array['url'] =  utf8_to_b64(my_array['url']);
    my_array['xpath'] =  generateXPath(my_array['dom']);
    my_array['text'] =  utf8_to_b64(my_array['dom'].textContent);

	//highlight in page
	$(clickedNode).css("backgroundColor", "#ff3fff");
	
	//store node
	var len = domains[global_select.domain]['data'][global_select.con_val]['nodes'].length;
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]={};

	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['url'] = my_array['url'];
	//domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['string'] = my_array['string'];
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['text'] = my_array['text'];
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['xpath'] = my_array['xpath'];
	domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['dom'] = my_array['dom'];
	
	con_num.textContent = 'Tags: ' + domains[global_select.domain]['data'][global_select.con_val]['nodes'].length;


}	

function navigationSelection(clickedNode,sidebarDoc) {
	
	var links_num;	
	var my_array= new Array();	
	
	//Content
	if(global_select.nav_val==0)
	{
		//update GUI screen
		links_num = sidebarDoc.getElementById("content_links_num");
		
		my_array['dom'] = clickedNode;
        //my_array['string'] = utf8_to_b64(serializer.serializeToString(my_array['dom']));
		my_array['url']= mainWindowOverlay.content.document.location.href;			
        my_array['url'] =  utf8_to_b64(my_array['url']);
        my_array['xpath'] =  generateXPath(my_array['dom']);
        my_array['text'] =  utf8_to_b64(my_array['dom'].textContent);

		//highlight in page
		$(clickedNode).css("backgroundColor", "#ff3fff");

		//store node
		//domains[global_select.domain]['links']['content'].push(clickedNode);

		var len = domains[global_select.domain]['links']['content'].length;
		domains[global_select.domain]['links']['content'][len] = {};

		//domains[global_select.domain]['links']['content'][len]=my_array;

		domains[global_select.domain]['links']['content'][len]['dom']=my_array['dom'];
        domains[global_select.domain]['links']['content'][len]['url']=my_array['url'];
        //domains[global_select.domain]['links']['content'][len]['string']=my_array['string'];
        domains[global_select.domain]['links']['content'][len]['xpath']=my_array['xpath'];
        domains[global_select.domain]['links']['content'][len]['text']=my_array['text'];
		
		links_num.textContent = domains[global_select.domain]['links']['content'].length;
		//alert('links num val is ' + links_num.textContent);
	}
	else if(global_select.nav_val==1) // Navigation links
	{
		//update GUI screen
		links_num = sidebarDoc.getElementById("nav_links_num");
		
		my_array['dom'] = clickedNode;
        //my_array['string'] = utf8_to_b64(serializer.serializeToString(my_array['dom']));
        //alert(my_array['string']);
		my_array['url']= mainWindowOverlay.content.document.location.href;				
        my_array['url'] =  utf8_to_b64(my_array['url']);
        my_array['xpath'] =  generateXPath(my_array['dom']);
        my_array['text'] =  utf8_to_b64(my_array['dom'].textContent);
		
		$(clickedNode).css("backgroundColor", "#ff3fff");

		//domains[global_select.domain]['links']['nav'].push(clickedNode);	
		var len = domains[global_select.domain]['links']['nav'].length;
		domains[global_select.domain]['links']['nav'][len] = {};

		domains[global_select.domain]['links']['nav'][len]['dom']=my_array['dom'];
        domains[global_select.domain]['links']['nav'][len]['url']=my_array['url'];
        //domains[global_select.domain]['links']['nav'][len]['string']=my_array['string'];
        domains[global_select.domain]['links']['nav'][len]['xpath']=my_array['xpath'];
        domains[global_select.domain]['links']['nav'][len]['text']=my_array['text'];

		//domains[global_select.domain]['links']['nav'][len]=my_array;

        //alert('len in nav is ' + len);
        //alert('url is ' + domains[global_select.domain]['links']['nav'][len]['url']);
			
		links_num.textContent = domains[global_select.domain]['links']['nav'].length;	
		//alert('links num val is ' + links_num.textContent);
	}	
}	


