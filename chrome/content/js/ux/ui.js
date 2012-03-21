Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

/**
 * MouseOver action for all elements on the page:
 */
function inspectorMouseOver(e) {
    // NB: this doesn't work in IE (needs fix):
    var element = e.target;

    // Set outline:
    element.style.outline = '2px solid #f00';

    // Set last selected element so it can be 'deselected' on cancel.
    lastViewedElement = element;
}


/**
 * MouseOut event action for all elements
 */
function inspectorMouseOut(e) {
    // Remove outline from element:
    e.target.style.outline = '';
}


/**
 * Click action for hovered element
 */
function inspectorOnClick(e) {
    e.preventDefault();

    var selXPath = generateXPath(e.target);
    var selType = getTagType();
    var curUrl = getURL(); // get current url
    var newTag=0;
    if(!checkUrl())
    {
        alert('You are no longer on '+domains[global_select.domain]['url']);
        return false;
    }

    if(selType==-1)
    {
        if(e.target.tagName.toLowerCase() != 'a')
        {
            alert('You did not click a link node.');
            return false;
        }
    }


    if(!foundXPath(selXPath,0))
    {
        LOG(selXPath + ' Not found!');
        saveTag(selXPath);
        hilite("#ff3fff","#3EFB88");
    }
    else
    {
        hilite("","");
        var delSuccess = foundXPath(selXPath,1);    
        LOG('found: status of deletion of untagged xpath: ' + selXPath + '\n is '+ delSuccess);
    }

    markSelected(selType);

    //sync to the cloud
    uploadDomain(global_select.domain);

    //dynamically update the gui on number of tags
    resetTagData();

    updateUrlLists();

    return false;
}

function clearGen()
{
    var generalizedArray = domains[global_select.domain]['generalized'];
    //var str='';

    for(var i in generalizedArray)
    {
     //   str+=i+' ';
        delete generalizedArray[i];
    }

    //alert('deleting: ' + str);
}

function doGen()
{
    var generalized={};
    var dataArray = domains[global_select.domain]['data'];
    //[global_select.con_val]['nodes'];
    for(var i in dataArray)
    {
        generalized[i]={};

        var taggedXPaths = dataArray[i]['nodes'];
        var tempHolder={};
        var tempXPathArray = [];

        for(var j in taggedXPaths)
        {
            var tXPath = taggedXPaths[j]['xpath'];
            tempHolder[tXPath] = 1;

        }

        for(var k in tempHolder)
        {
            tempXPathArray.push(k);
        }

        generalized[i] = genSpecificArray(tempXPathArray);
    }

    var navTypes ={ 'content':1,'nav':1};

    for(var navType in navTypes)
    {
        var dataArray1 = domains[global_select.domain]['links'][navType];
        
        generalized[navType]={};

        var tempHolder1={};
        var tempXPathArray1 = [];
        for(var i in dataArray1)
        {
            var taggedXPath = dataArray1[i]['xpath'];
            tempHolder1[taggedXPath] = 1;
        }

        for(var k in tempHolder1)
        {
            tempXPathArray1.push(k);
        }

        generalized[navType] = genSpecificArray(tempXPathArray1);
    }

    domains[global_select.domain]['generalized'] = generalized;
}

//This function does both the finding (and also deletion) of xpaths
//if doFunc is 1 it does the deletion
//return true if found
function foundXPath(xpath,doFunc)
{
    var selType = getTagType();
    if(selType!=-1)
    {
        var dataArray = domains[global_select.domain]['data'][global_select.con_val]['nodes'];

        for(var i in dataArray)
        {
            //alert('found content : ' +dataArray[i]['xpath']);
            if(dataArray[i]['xpath'] == xpath)
            {
                LOG('Found content! at '+i);
            //if(doFunc==1) delete dataArray[i];
             if(doFunc==1) var remEle = dataArray.splice(i,1);
            return 1;
            }

        }
    }
    else
    {
        var navType='';
        if(global_select.nav_val==0)
        {
            navType='content';
        }
        else if(global_select.nav_val==1)
        {
            navType='nav';
        }
        var dataArray = domains[global_select.domain]['links'][navType];
        
        for(var i in dataArray)
        {
    //        alert('found nav : ' +dataArray[i]['xpath']);
            if(dataArray[i]['xpath'] == xpath)
            {
                //alert('Found in nav');
                if(doFunc==1) var remEle = dataArray.splice(i,1);
                    //delete dataArray[i];
                return 1;
            }
        }

    }

    return 0;
}

function hilite(color1,color2)
{
    var xpathArray={};
    xpathArray = getAllXpath();
    var properArray=[];

    for(var i in xpathArray)
        properArray.push(i);

   //Highlighting all captured nodes 
    for(var i in domains[global_select.domain]['generalized'])
    {
        var nodeArray = domains[global_select.domain]['generalized'][i];

        for(var j in nodeArray)
        {
            var foundNodes = getNodesFromXPathString(j);
            for (var j in foundNodes)
                $(foundNodes[j]).css("backgroundColor", color2);
        }
    }

    //Highlighting selected nodes
    //LOG('hiliting class text in ui.js inside hilite');
    var foundNodesMain = getNodesFromXPath(properArray);
    for (var j in foundNodesMain)
        $(foundNodesMain[j]).css("backgroundColor", color1);

    
}

function getAllXpath()
{
    var xpathArray={};

    //remove all content xpaths
    var dataArray1 = domains[global_select.domain]['data'];
    
   // [global_select.con_val]['nodes'];
    for(var i in dataArray1)
    {
        var fXPath = dataArray1[i]['nodes'];
        for(var j in fXPath)
        {
            var d1xpath = fXPath[j]['xpath'];
            //LOG('getting in main: '+ d1xpath);
            xpathArray[d1xpath] = 1;
        }
    }

    //remove all navigation xpaths
    var dataArray2 = domains[global_select.domain]['links']['nav'];
    for(var i in dataArray2)
    {
        var fXPath = dataArray2[i]['xpath'];
        //LOG('getting in nav links: '+ fXPath);
        xpathArray[fXPath] = 1;
    }

    //remove all navigation xpaths
    var dataArray3 = domains[global_select.domain]['links']['content'];
    for(var i in dataArray3)
    {
        var fXPath = dataArray3[i]['xpath'];
        LOG('getting in content links: '+ fXPath);
        xpathArray[fXPath] = 1;
    }

    return xpathArray;


}

function genSpecificArray(tempXPathArray)
{
    var genArray = {};

    for(var i=0;i<tempXPathArray.length-1;i++)
    {
        var XPath1 = tempXPathArray[i];
        var XPath2 = tempXPathArray[i+1];

        var result_align = do_alignment(XPath1,XPath2); // do pairwise alignment -> return xpath string
        //genArray.push(result_align);
        genArray[result_align] = 1;
    }

    if(tempXPathArray.length==1)
    {
        genArray[tempXPathArray[0]]=1;
    }

    return genArray;

}

function markEverything()
{
    //alert('marking everything');
    hilite("","");
    clearGen();
    doGen();
    hilite("#ff3fff","#3EFB88");
}

function markSelected(tagType)
{
    //Content data tags/labels
    var selType;
    if(tagType>=0)
    {
        selType = global_select.con_val;
    }
    else if(tagType==-1)
    {
        if(global_select.nav_val==0)
        {
            selType='content';
        }
        else if(global_select.nav_val==1)
        {
            selType='nav';
        }
    }
    else
    {
        return;
    }

    hilite("","");
    clearGen();
    doGen();

   //Highlighting all captured nodes 
    var nodeArray = domains[global_select.domain]['generalized'][selType];

    for(var j in nodeArray)
    {
//        alert('selType: ' + selType + ' marking ' + j);
        var foundNodes = getNodesFromXPathString(j);
        for (var j in foundNodes)
        {
            $(foundNodes[j]).css("backgroundColor", "#3EFB88");
            LOG('found ' + selType + ' node: ' + foundNodes[j].textContent);
        }
    }

    if(tagType!=-1)
    {
        var dataArray1 = domains[global_select.domain]['data'][global_select.con_val]['nodes'];

        for(var j in dataArray1)
        {
            var d1xpath = dataArray1[j]['xpath'];
            var foundNodes = getNodesFromXPathString(d1xpath);
            for (var j in foundNodes)
                $(foundNodes[j]).css("backgroundColor", "#ff3fff");

        }
    }
    else
    {
        //remove all navigation xpaths
        var dataArray2 = domains[global_select.domain]['links'][selType];
        for(var i in dataArray2)
        {
            var fXPath = dataArray2[i]['xpath'];
            var foundNodes = getNodesFromXPathString(fXPath);
            for (var j in foundNodes)
                $(foundNodes[j]).css("backgroundColor", "#ff3fff");

        }

    }



}

