Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");
var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]  
               .createInstance(Components.interfaces.nsIXMLHttpRequest);  


function getAutoTag()
{
    var url=serverUrl+'getAutoFields.pl?url='+domains[global_select.domain]['url'];
    var bool=0;

    var jsObject;

    request.onload = function(aEvent) {
        var jsonString = aEvent.target.responseText;
    //alert('autojson: ' + jsonString);
        jsObject = JSON.parse(jsonString);
    };
    request.onerror = function(aEvent) {
        LOG('Error: '+aEvent.target.status);
    };
    request.open("GET", url, false);
    request.send(null);

    return jsObject;

    //update_list("Test","Varun","http://google.com/");

}

function autoServer()
{
    var autoJson = getAutoTag();

    var seenTags={};

    //alert(JSON.stringify(autoJson));

    for(var i in autoJson)
    {
        var lblName = autoJson[i]['name'];
        var lblType = autoJson[i]['type'];
        var lblXpath = autoJson[i]['xpath'];
        seenTags[lblName.toLowerCase()]=1;
        var doPush =1;
        if(i !='conLinks')
        {
            var conNum=-1;

            if(getNodesFromXPathString(lblXpath).length >=1)
                conNum = addAutoElement(lblName,lblType);

            //alert('name: ' + lblName + ' type: ' + lblType);

            untoggleAll();
            if(conNum!=-1)
                select_content_type(conNum);

        }
        else
        {
            untoggleAll();
            select_nav_type('content_links_box',0); // unselect nav

            var conArray = domains[global_select.domain]['generalized']['content'];
            var conCt=0;
            for(var j in conArray)
                conCt++;
            if(conCt >=2 )  doPush = 0;
        }
        if(doPush)
        {
            var foundNodes = getNodesFromXPathString(lblXpath);
            for (var j in foundNodes)
            {
                if(j>1) break;
                var genXPath = generateXPath(foundNodes[j]);
//                alert('genxpath = ' + genXPath + ' j = ' + j);
                saveTag(genXPath);
            }
        }
    }

    markEverything();
    //sync to the cloud                                                                                
    uploadDomain(global_select.domain);                                                                
    //dynamically update the gui on number of tags                                                     
    resetTagData();
    updateUrlLists();    

    return seenTags;
}

function addAutoElement(lblName,lblType) {
    var data_array = domains[global_select.domain]['data'];
    var data_array_len = 0;

    for(var k in data_array)
    {
        if(data_array[k]['name'] == lblName && data_array[k]['type'] == lblType)
        {
            return k;
        }

        data_array_len++;
    }

//    var label_array = new Array();
    var label_array = {};

    label_array['name'] = lblName;
    label_array['type'] = lblType;
    label_array['nodes'] = [];
    label_array['xpath'] = [];

    data_array[data_array_len]=label_array;

    hideBox();
    resetTagData();

    return data_array_len;
}



