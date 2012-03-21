//var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var mainWindow = null;
mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

//cleanup -> foundArray
//are these variables required??

//addElement in View_Config.js
function add_domain()
{
	var url = document.getElementById("Domain_Url").value;
	var wrapperName = document.getElementById("Domain_Name").value;
	var d = document.getElementById("Domain_Description").value;
	
	//var domain_hash = new Array();
    var domain_hash = {};

    var curCt=0;
    var dateObj = new Date();
    var epoch = parseInt((dateObj.getTime())/1000);
	
	domain_hash['url'] = url;
	domain_hash['name'] = wrapperName;
	domain_hash['id'] = Math.floor(Math.random()*1000000); // hack
    domain_hash['createdDate'] = epoch;
	domain_hash['originalId'] = domain_hash['id'];
	domain_hash['user'] = loginVar.userName;
	domain_hash['desc'] = d;
	domain_hash['data']={};

    domain_hash['generalized']={};

    domain_hash['seeds']={}; // to store seed urls
    domain_hash['seeds']['taggedNavUrls']={};
    domain_hash['seeds']['navList']={};
    domain_hash['seeds']['taggedConUrls']={};
    domain_hash['seeds']['contentList']={}; 

    domain_hash['links']={};
	domain_hash['links']['nav']=[]; // nodes
	domain_hash['links']['nav_xpath']=[];

	domain_hash['links']['content']=[]; // nodes
	domain_hash['links']['content_xpath']=[];
	
	domains.push(domain_hash);

    //To be removed??
	//foundArray.push(domains.length-1);
	//foundArray[domains.length-1]={};
    foundArray[domains.length-1] = {};
	
	var label_child = elementsById('clone_Label_Name');
	var type_child = elementsById('clone_Label_Type');
	
	//var data_array = new Array();
	var data_array = {};
	
	//get all added labels data
	for(var i=0;i<label_child.length;i++)
	{
		var label_array = {};
		
		label_array['name'] = label_child[i].value;
		label_array['type'] = type_child[i].label;
		label_array['nodes'] = []; 
		label_array['xpath'] = []; // marked for removal
		
		data_array[i]=label_array;

	}
	
	domains[domains.length-1]['data']=data_array; // what does this do?
	//domains[curCt]['data']=data_array; // what does this do?

    ///////////////////////////////////
    //Upload created domain onto server
    uploadDomain(domains.length-1);
	
	
}

function moreFields() {
        
        var newFields = document.getElementById('readroot').cloneNode(true);
        
        newFields.id = 'clonereadroot';
        newFields.style.display = 'block';
        
        var newField = newFields.childNodes;
        
		
        for (var i=0;i<newField.length;i++) {
                var theName = newField[i].id;
                if (theName)
                        newField[i].id = "clone_" + theName;

                // if(newField[i].tagName == "menulist")
                 //{
					// newField[i].childNodes[0].id = "clone_Label_Type";
				// }                 
                 
        }
        
        var insertHere = document.getElementById('writeroot');
        insertHere.parentNode.insertBefore(newFields,insertHere);
}

function getURL()
{
	var locations = document.getElementById("Domain_Url");
	var url = mainWindow.content.document.location.href;	
    url = urlTLD(url);
	locations.value = url;
}

