Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");
var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);

var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

function untoggleAll()
{
	$(document.getElementById('content_links_box')).css("backgroundColor", "");
	$(document.getElementById('nav_links_box')).css("backgroundColor", "");

	var cloneReadRootNodes = elementsById('clonereadroot');
	
	global_select.type=-1; // Set flag saying content selection has been chosen
    global_select.nav_val=-1;
    global_select.con_val = -1;

	for(var i=0;i<cloneReadRootNodes.length;i++)
	{
		$(cloneReadRootNodes[i]).css("backgroundColor", "");
	}
}

//this is the onclick for navigation links
//toggles highlight between navigation and content links
function select_nav_type(name,num)
{
	//var newFields = document.getElementById('View_Config_Navigation').childNodes;

    var newField = document.getElementById(name);
	$(document.getElementById('content_links_box')).css("backgroundColor", "");
	$(document.getElementById('nav_links_box')).css("backgroundColor", "");

	global_select.type=0; // Set flag saying navigation selection has been chosen

	//alert('num is  ' + num + ' global is ' + global_select.nav_val);
	if(global_select.nav_val==num)
	{
		global_select.nav_val=-1; // nothing is selected
		//$(newFields[2+num]).css("backgroundColor", ""); // 2+num directly selects node id

		$(newField).css("backgroundColor", ""); // 2+num directly selects node id
	}
	else
	{	
		global_select.nav_val = num;
		//$(newFields[2+num]).css("backgroundColor", "#ff3fff");		
		
		$(newField).css("backgroundColor", "#ff3fff"); // 2+num directly selects node id
	}

    sidebarTagSelected();
}

//this is the onclick for content data tagging
function select_content_type(num)
{
	var cloneReadRootNodes = elementsById('clonereadroot');
	
	global_select.type=1; // Set flag saying content selection has been chosen
	
	for(var i=0;i<cloneReadRootNodes.length;i++)
	{
		$(cloneReadRootNodes[i]).css("backgroundColor", "");
	}
	
	if(global_select.con_val==num) //indicates that its already been selected hence unselect
	{
		global_select.con_val=-1; // nothing is selected
		$(cloneReadRootNodes[num]).css("backgroundColor", ""); // 2+num directly selects node id
	}
	else
	{	
		global_select.con_val = num;
		$(cloneReadRootNodes[num]).css("backgroundColor", "#ff3fff");		
	}
	
    sidebarTagSelected();
}


//start displaying values
function get_link_vals()
{
	//Navigation panel data
	var con_num = document.getElementById("content_links_num");
	con_num.textContent = domains[global_select.domain]['links']['content'].length;
			
	var nav_num = document.getElementById("nav_links_num");
	nav_num.textContent = domains[global_select.domain]['links']['nav'].length;
	
	var dom_name = document.getElementById("domain_name");
	dom_name.textContent = 'Domain: ' + domains[global_select.domain]['url'];
	
	moreFields(); // Content panel data

}

//Displaying tagged data for content panel in View Config
function moreFields() {
		
	var dArray = domains[global_select.domain]['data'];

    var sortedKeys = [];
    for(var i in dArray)
        sortedKeys.push(parseInt(i));
    sortedKeys.sort();

	//for(var i in dArray)
    for(var n=0;n<sortedKeys.length;n++)
	{        
        var i=sortedKeys[n]+'';
		var newFields = document.getElementById('readroot').cloneNode(true);
		
		newFields.id = 'clonereadroot';
		newFields.style.display = 'block';
		
		var newField = newFields.childNodes;
		
		//alert('main len is ' + dArray.length +' name is ' + dArray[i]['name'] + ' newfield len is ' + newField.length);
		
		for (var j=0;j<newField.length-1;j++) {
			var theName = newField[j].id;
			
			if(theName == "con_label")
			{
				newField[j].textContent = 'Name : '+dArray[i]['name'];

				newField[j].removeAttribute("onclick");
				newField[j].setAttribute("onclick","select_content_type("+i+")");
			}
				
					
			if(theName == "con_label_type")
				newField[j].textContent = 'Type : ' + dArray[i]['type'];
				
			if(theName == "con_label_num")
			{
				newField[j].id = 'con_label_num'+i;	
				newField[j].textContent = 'Tags: ' + dArray[i]['nodes'].length;
			}			
			
		} 	
		
		var insertHere = document.getElementById('writeroot');
		insertHere.parentNode.insertBefore(newFields,insertHere);
	}
}

function gotoURL(url) {
	mainWindow.content.wrappedJSObject.location=url;
	//alert(url);
}

function clearWrapper() {
    var dataArray = domains[global_select.domain]['data'];

    for(var i in dataArray)
    {
        dataArray[i]['nodes'].length=0;
        dataArray[i]['xpath'].length=0;
    }

    var linkArray = domains[global_select.domain]['links'];

    for(var i in linkArray)
    {
        linkArray[i].length=0;
    }

    resetTagData();
}

function resetTagData() {
    removeAllContentTags();
    get_link_vals(); // reset all vals
}

function removeAllContentTags() {
    
    var label_child = elementsById('clonereadroot');

    for(var i=0;i<label_child.length;i++)
    {
        label_child[i].parentNode.removeChild(label_child[i]);
    }
}

function addElement() {
    var data_array = domains[global_select.domain]['data'];
    var data_array_len = 0;

    for(var k in data_array)
    {
        data_array_len++;
    }


//    var label_array = new Array();
    var label_array = {};

    label_array['name'] = document.getElementById("Label_Name").value;
    label_array['type'] = document.getElementById("Label_Type").label;
    label_array['nodes'] = [];
    label_array['xpath'] = [];

    data_array[data_array_len]=label_array;

    hideBox();
    resetTagData();
}

function displayBox() {
            document.getElementById("labelroot").style.display = 'block';
            document.getElementById("Create_New_Label").label = 'Cancel';
            document.getElementById("Create_New_Label").removeAttribute("oncommand");
            document.getElementById("Create_New_Label").setAttribute("oncommand","hideBox()");
}

function hideBox() {
            document.getElementById("labelroot").style.display = 'none';
            document.getElementById("Create_New_Label").label = 'New Element';
            document.getElementById("Create_New_Label").removeAttribute("oncommand");
            document.getElementById("Create_New_Label").setAttribute("oncommand","displayBox()");

}

function removeElement(lblName,lblType) {
    var data_array = domains[global_select.domain]['data'];
    var data_array_len = 0;

    lblName = lblName.replace(/^Name : /,"");
    lblType = lblType.replace(/^Type : /,"");

    //alert('deleting ' + lblName + ' and ' + lblType);
    for(var k in data_array)
    {
        if(data_array[k]['name'] == lblName && data_array[k]['type'] == lblType)
        {
            delete data_array[k];
            break;
        }
    }

    markEverything();
    //sync to the cloud
    uploadDomain(global_select.domain);
    resetTagData();

}

