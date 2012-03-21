Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

function updateUrlLists()
{
    var selType = getTagType();
    updateTaggedUrls();
    if(selType==-1)
        updateSuggestLists();
    updateGUILists();
}

function updateTaggedUrls()
{
    var urlListArray = domains[global_select.domain]['seeds'];
    var navTypes ={ 'content':1,'nav':1};

    var navUrlList={}
    var conUrlList={};

    for(var navType in navTypes)
    {
        var dataArray1 = domains[global_select.domain]['links'][navType];
    
        for(var i in dataArray1)
        {
            var taggedUrl = dataArray1[i]['url'];
            navUrlList[taggedUrl]=1;
            LOG('found nav link: ' + taggedUrl);
        }
    }

//    urlListArray['taggedNavUrls'] = navUrlList;
    pushUrl(navUrlList,'taggedNavUrls');

    var dataArray = domains[global_select.domain]['data'];
    //[global_select.con_val]['nodes'];
    for(var i in dataArray)
    {
        var taggedXPaths = dataArray[i]['nodes'];

        for(var j in taggedXPaths)
        {
            var conUrl = taggedXPaths[j]['url'];
            conUrlList[conUrl] =1;
            LOG('found con link: ' + conUrl);
        }
    }
    pushUrl(conUrlList,'taggedConUrls');

 //   urlListArray['taggedConUrls'] = conUrlList;
}

function updateSuggestLists()
{
    var selType1='';
    var selType2='';
    var navXpathArray=[];
    if(global_select.nav_val==0)
    {
        selType1='contentList';
        selType2='content';
    }
    else if(global_select.nav_val==1)
    {
        selType1='navList';
        selType2='nav';
    }

    var navUrls  = domains[global_select.domain]['seeds'];
    var navXPaths = domains[global_select.domain]['generalized'][selType2];

    for(var i in navXPaths)
    {
        navXpathArray.push(i);
    }

	var urlNodes = getNodesFromXPath(navXpathArray);
	var seenUrl = {};
    var cleanArray3=[];
	for(var i in urlNodes)
	{
		seenUrl[urlNodes[i].href]=1;
	}

    pushUrl(seenUrl,selType1);
}

function updateGUILists()
{
    var navTypes ={ 'taggedNavUrls':1,'navList':1,'taggedConUrls':1,'contentList':1};

    for(var listName in navTypes)
    {

        var list = document.getElementById(listName);
        //clear list
        while(list.getRowCount() != 0) {
            list.removeItemAt(0);
        }

        var urlList = domains[global_select.domain]['seeds'][listName];
        var ct=0;
        var cleanList={};
        for(var i in urlList)
        {
            cleanList[urlList[i]]=1;
            LOG('found ' + urlList[i] + ' with i = ' + i + ' and listname is ' + listName);
        }
        for(var i in cleanList)
        {
            //LOG('i is ' + i);

            if(typeof i === "undefined")
            {
                continue;
            }

            list.appendItem(i);	
            LOG('logging ' + i);
            ct++;
            if(ct>8) break;

            //debugging
            //list.removeItemAt(0);
            //var val = list.insertItemAt(0,urlNodes[i].href);
            //LOG('inserting ' + urlNodes[i].href);


        }
        LOG('listname is ' + listName + ' list row count is ' + list.getRowCount());
        LOG('ct is ' + ct);	
    }

}

function pushUrl(urlArray,bucket)
{
    var urlListArray = domains[global_select.domain]['seeds'];
    var tempArray={};
    
    var curCt=0;

    for(var i in urlListArray) curCt++;

    for(var i in urlArray)
    {
        tempArray[curCt]=i;
        curCt++;
    }

    urlListArray[bucket] = tempArray;

}

