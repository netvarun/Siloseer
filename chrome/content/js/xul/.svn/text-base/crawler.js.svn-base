//Clean up
//Streamlime make OOP
//See why urls not being printed at end
//Add gui
//-depth to crawl
//-start url
//crawl only TLD
//crawl only HTML pages

//if content xpath is null, use link xpath as navigation
//single page content extraction
//separate hashes for content crawling and links crawling

//single xpath only -> handle extraction
//controlling crawl depth
//wait for page to fully load - testing?

var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

/*
var hwindow = Components.classes["@mozilla.org/appshell/appShellService;1"]
                .getService(Components.interfaces.nsIAppShellService)
                .hiddenDOMWindow; 
*/

var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);
							 
var urlhash = new Array(); // urls that have been seen
var urlq = new Array();				

var navLinks = new Array();
var contentNavLinks = new Array();
var contentLinks = new Array();

var CALL=0;	
var start=0;
var max_visited;
var visitCount=0;
var crawl_depth_val=0;

var foundData = new Array();
//var foundArray = new Array();

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
     checkContent();
     extractLinks();

   }
  },
  

  onLocationChange: function(aProgress, aRequest, aURI)
  {
        
   // This fires when the location bar changes; that is load event is confirmed
   // or when the user switches tabs. If you use myListener for more than one tab/window,
   // use aProgress.DOMWindow to obtain the tab/window which triggered the change.
  },
        onProgressChange: function(aWebProgress, aRequest, curSelf, maxSelf, curTot, maxTot) { },
        onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) { },
        onSecurityChange: function(aWebProgress, aRequest, aState) { }

}
		 

function getURL()
{
	var locations = document.getElementById("current_url");
	locations.value = mainWindow.content.document.location.href;	

}

function beforeCrawl()
{
	//var display_status = document.getElementById("status");
	//display_status.value = "Welcome to Siloseer";	  	
	var dom_name = document.getElementById("domain_name");
	dom_name.textContent = 'Domain: ' + domains[global_select.domain]['url'];	
	var dom_desc = document.getElementById("domain_desc");
	dom_desc.textContent = 'Description: ' + domains[global_select.domain]['desc'];	
	
}

function prepareCrawl()
{
	startup();
    debugArray();
	storeGenXpath();
	
	addUrl();
	//checkLinks();
	start=1;
	
	crawl_depth_val = document.getElementById("crawl_depth").value;	
	
	//alert(crawl_depth_val);

	var start_but = document.getElementById("start_button");
	start_but.disabled = true;
	
	var depth_scale = document.getElementById("crawl_depth");
	depth_scale.disabled = true;	
	
	var xulTarget = document.getElementById("target_num_urls");
	xulTarget.textContent = crawl_depth_val;	

	
	/*
	for(var i in contentLinks)
	{
		alert('content = ' + i);
	}
	*/
	
	visitCount=0;
	startCrawl();
}

function getLinks()
{
	var allLinks = mainWindow.content.document.links;
	var found_links = document.getElementById("found_urls");
	found_links.value = "Found "+allLinks.length+" outgoing links";
}

function startup() {
  // Sidebar is loading
  mainWindow.getBrowser().addProgressListener(myListener);

	 //setXPathText1("varun"); 
}

function restartCrawl()
{
	start=1;
	urlq=[];
	urlhash=[];
	CALL=0;
	
	var crawl_depth_val = document.getElementById("crawl_depth");
	max_visited = document.getElementById("crawl_depth").value;
	
	var display_status = document.getElementById("status");
	display_status.value = "SiloSeer Crawler is running";	
	
	var start_able = document.getElementById("start_button");
	start_able.disabled = true;
	
	var depth_scale = document.getElementById("crawl_depth");
	depth_scale.disabled = true;
	
	//alert('max CALL is '+max_visited)
	
	mainWindow.content.wrappedJSObject.location=mainWindow.content.document.location.href;
	startCrawl();
}


function stopCrawl()
{
	start=0;
	
	var display_status = document.getElementById("status");
	display_status.value = "Crawl has stopped";	
	
	var start_able = document.getElementById("start_button");
	start_able.disabled = false;	
	
	var depth_scale = document.getElementById("crawl_depth");
	depth_scale.disabled = false;	
}

function checkLinks()
{
  var dArray = domains[global_select.domain]['data'];
  var navConNodes = domains[global_select.domain]['links']['content'];
  var navNavNodes = domains[global_select.domain]['links']['nav'];	
  
  for(var i in navConNodes)
  {
	  alert('navcon url is ' + i + ': ' + navConNodes[i]['url']);
	}
	
  for(var i in navNavNodes)
  {
	  alert('navnav url is ' + i +': ' + navNavNodes[i]['url']);
	}	
	
	for(var i in dArray)  
	{
		var curNodes = dArray[i]['nodes'];
		 
		for(var j=0;j<curNodes.length;j++)
		{
			
			alert('cur nodes i = ' + i + ' j = ' + j + ' ' + curNodes[j]['url']);	
		}
	}
	
}

//gets url from what is displayed on sidebar
function addUrl()
{
  var dArray = domains[global_select.domain]['data'];
  var navConNodes = domains[global_select.domain]['links']['content'];
  var navNavNodes = domains[global_select.domain]['links']['nav'];	
  var ct=0;
    
  for(var i in navConNodes)
  {
	  var nodeUrl = navConNodes[i]['url'];

	  ct++;
	  
	  if(!(nodeUrl in urlhash)&&nodeUrl!=undefined)
	  {
	 	urlhash[nodeUrl]=0;
		urlq.push(nodeUrl);
		//LOG('pushing content navigation links ' + nodeUrl + ' into crawl q.');	  
	  }		
		contentNavLinks[nodeUrl] = 0; // store it as contentNavLinks
		
		
  }
  ct=0;
  //LOG('navconnodes len is ' + ct);
  for(var i in navNavNodes)
  {
	  var nodeUrl = navNavNodes[i]['url'];
	  ct++;
	  
	  if(!(nodeUrl in urlhash)&&nodeUrl!=undefined)
	  {
	 	urlhash[nodeUrl]=0;
		urlq.push(nodeUrl);
		//LOG('pushing navigation url ' + nodeUrl + ' into crawl q.');	
	  }		
		navLinks[nodeUrl] = 0; // store it as navLinks
  }
  
  ct=0;
  //LOG('navnavnodes len is ' + ct);
  
	for(var i in dArray)  
	{
		var curNodes = dArray[i]['nodes'];
		 
		for(var j=0;j<curNodes.length;j++)
		{
			ct++;
			
			var nodeUrl = curNodes[j]['url'];

			if(!(nodeUrl in urlhash)&&nodeUrl!=undefined)
			{
				urlhash[nodeUrl]=0;
				urlq.push(nodeUrl);
				
			}		
			contentLinks[nodeUrl] = 0; // store it as navLinks	
			//LOG('pushing actual content url ' + nodeUrl + ' into crawl q.');	
		}
	}		
	
	for(var i in urlhash)
	{
		//LOG('urls in hash is ' + i);
	}
	for(var i in urlq)
	{
		//LOG('urls in q is ' + urlq[i]);
	}	
	//LOG('urlq in startcrawl len is ' + urlq.length);
	
	//alert('urlq start len is ' + urlq.length);

}

function crawlDone()
{
	var srcFile = createFile(domains[global_select.domain]['url']);
	
	//alert(srcFile.path); //alert path of file
	
	var csvString=""; // whole data is a CSV string
	var headerString="";
	
	var start_but = document.getElementById("start_button");
	start_but.disabled = false;	
	
	var depth_scale = document.getElementById("crawl_depth");
	depth_scale.disabled = false;		
	
	var urlHash=[];
	var urlDump=[];

	for(var i in foundArray[global_select.domain])
	{
		//alert('name = ' + i);
		headerString+= i+"\t";
		urlHash[i] = [];
		
		for(var k in foundArray[global_select.domain][i])
		{
			if(!urlHash[i][foundArray[global_select.domain][i][k]['url']])
				urlHash[i][foundArray[global_select.domain][i][k]['url']] = foundArray[global_select.domain][i][k]['data'] + ",";
			else
				urlHash[i][foundArray[global_select.domain][i][k]['url']] += foundArray[global_select.domain][i][k]['data'] + ",";
			
			urlDump[foundArray[global_select.domain][i][k]['url']]=0;
		}
		
	}
	
	headerString+="\n";
	
	//Write to the file
    if(!FileIO.write(srcFile, headerString)) 
    { 
       throw Error("Failed to write to " + srcFile.path); 
    } 	
	
	for(var j in urlDump)
	{
		var recWrite="";
		
		for(var i in urlHash) //each attribute
		{
			if(urlHash[i][j])
			{
				//alert('i = ' + i + ' k = ' + k + ' val is ' + urlHash[i][k]);
				recWrite+=urlHash[i][j].substring(0, urlHash[i][j].length-1)+"\t";
			}
			else
			{
				recWrite+="\t";
			}
			
		}
		
		// Strip out all line breaks.
		recWrite = recWrite.replace(
		// Replace out the new line character.
		new RegExp( "\\n", "g" ),
		""
		);
		recWrite+="\n";
		
		//recWrite+="\n";
		if(!FileIO.write(srcFile, recWrite,'a')) 
		{ 
		   throw Error("Failed to write to " + srcFile.path); 
		} 			
		
	}

	//Allow user to download the file
	var crawlfileEl = document.getElementById("crawlFile");
	crawlfileEl.removeAttribute("onclick");
	
	var srcPath = srcFile.path;
	srcPath.replace(/\//g,'\\/');

	crawlfileEl.setAttribute("onclick","window\.open(\"file://"+srcPath+"\")");    
	crawlfileEl.removeAttribute("hidden");
	crawlfileEl.setAttribute("hidden","false");  
	
	 
}

function startCrawl()
{
	function next() {
        
        var currentUrl = urlq.shift();
        urlhash[currentUrl]=1;
        setTimeout(gotoURL,8000,currentUrl, next);
   
		var xul_Qsize = document.getElementById("urlsinq");
		xul_Qsize.textContent = urlq.length;    
		var xul_next = document.getElementById("next_url");
		xul_next.textContent = currentUrl;  		
    }
    next();
}


function gotoURL(gUrl, next) {
	
	//if(visitCount<=4&&urlq.length>0)
	if(visitCount<=(crawl_depth_val-1)&&urlq.length>0)
	{
		if(gUrl)
		{
            gUrl = b64_to_utf8(gUrl);
			mainWindow.content.wrappedJSObject.location=gUrl;
			//checkContent();
			visitCount++;
			//setDesc(current_url,gUrl);		
			var xulEle = document.getElementById("current_url");
			xulEle.textContent = gUrl;
			var xulVisit = document.getElementById("visited_urls");
			xulVisit.textContent =visitCount;			
			
		}
		next();
	}
	else
	{
		
		crawlDone();
	}
}

function extractLinks()
{
	var aNode = mainWindow.content.document.documentElement.ownerDocument;
  var navConXPath = domains[global_select.domain]['links']['content_xpath'];
  var navNavXPath = domains[global_select.domain]['links']['nav_xpath']; 
  
  var navConct=0;
  var navNavct=0;
    
  for(var i in navConXPath)
  {
	  var nodeXPath = navConXPath[i];
	  
	var found = eval_xpath(aNode, nodeXPath);	
	
	//alert('xpath is ' + curXPath[j]);
	//alert('found len is ' + found.length);
	for(var k in found)
	{
		//alert('extracted content is ' + found[k].textContent);
			var nodeUrl	= found[k].href;
	  
		  if(!(nodeUrl in urlhash)&&nodeUrl!=undefined)
		  {
			urlhash[nodeUrl]=0;
			urlq.push(nodeUrl);
			navConct++;
			LOG('pushing content navigation links ' + nodeUrl + ' into crawl q.');	  
		  }		
			contentLinks[nodeUrl] = 0; // store it as contentNavLinks
	}
		
		
  }
  
  for(var i in navNavXPath)
  {
	  var nodeXPath = navNavXPath[i];
	  
	var found = eval_xpath(aNode, nodeXPath);	
	
	//alert('xpath is ' + curXPath[j]);
	//alert('found len is ' + found.length);
	for(var k in found)
	{
		//alert('extracted content is ' + found[k].textContent);
			var nodeUrl	= found[k].href;
	  
		  if(!(nodeUrl in urlhash)&&nodeUrl!=undefined)
		  {
			urlhash[nodeUrl]=0;
			urlq.push(nodeUrl);
			//alert('pushing navigation url ' + nodeUrl + ' into crawl q.');	
			navNavct++;
		  }		
			navLinks[nodeUrl] = 0; // store it as navLinks
	}
  }
  
	var xul_con = document.getElementById("num_content_links_discov");
	xul_con.textContent = navConct;  
	
	var xul_nav = document.getElementById("num_nav_links_discov");
	xul_nav.textContent = navNavct;  	
	
	getLinks();
  	
}


function checkContent()
{
	//alert('currenturl is ' + mainWindow.content.document.location.href);
	if(mainWindow.content.document.location.href in contentLinks)
	{
		//alert('checkcontent1');
		var dArray = domains[global_select.domain]['data'];
		var aNode = mainWindow.content.document.documentElement.ownerDocument;
		//alert('currenturl ' + mainWindow.content.document.location.href + ' found in contentlinks');
		for(var i in dArray)  
		{
			var curXPath = dArray[i]['xpath'];		
			//alert('name = ' + dArray[i]['name']);
			//dArray[i]['name']
			
			//if(!(dArray[i]['name'] in foundArray))
			//	foundArray[(dArray[i]['name'])]=[];
			
			//alert('curxpath len is ' + curXPath.length);
			
			for(var j=0;j<curXPath.length;j++)
			{
                var arrayCt=0;
				var found = eval_xpath(aNode, curXPath[j]);	
				
				//alert('xpath is ' + curXPath[j]);
				//alert('found len is ' + found.length);
				for(var k in found)
				{
					//alert('extracted content is ' + found[k].textContent);
					if(!(found[k].textContent in foundData))
					{
                        var myArray = {};
						myArray['url']=mainWindow.content.document.location.href;
						myArray['data'] = found[k].textContent;

						foundData[found[k].textContent] = 0; // keep track of content pieces found

                        LOG('crawler.js checkcontent() name:' + dArray[i]['name'] + ' globalselect name is: ' +
                        global_select.domain);
                        LOG('crawler.js : val: ' + myArray['data']);
                        LOG('ARray len above: ');
                        LOG('crawler.js : len: ' + arrayCt);
						//alert('zero data = ' + foundArray[global_select.domain][dArray[i]['name']][0]['data']);
						//foundArray[global_select.domain][(dArray[i]['name'])][arrayCt] = {};
						foundArray[global_select.domain][(dArray[i]['name'])].push(myArray);
                        arrayCt++;
					}
				}
			}
		}

	}	
	
}

function debugArray()
{
    for(var i in foundArray)
    {
        for(var j in foundArray[i])
        {
            alert('Found vals are i= ' + i + ' j = ' + j + ' val: ' + foundArray[i][j]);
        }
    }
}


function storeGenXpath()
{
  var dArray = domains[global_select.domain]['data'];
  var navConNodes = domains[global_select.domain]['links']['content'];
  var navNavNodes = domains[global_select.domain]['links']['nav'];
  var navConXPath = domains[global_select.domain]['links']['content_xpath'];
  var navNavXPath = domains[global_select.domain]['links']['nav_xpath']; 
  
  navConXPath.length=0;
  navNavXPath.length=0; 
  
  //Get generalized content and navigation xpath links
  
	for(var i=0;i<navConNodes.length-1;i++) {
	  var XPath1 = navConNodes[i]['xpath'];
	  var XPath2 = navConNodes[i+1]['xpath'];
	  
		var result_align = do_alignment(XPath1,XPath2); 
		
		navConXPath.push(result_align);	
		//LOG('pushing generalized content xpath ' + result_align);	
	}
	
	if(navConNodes.length==1) navConXPath.push(navConNodes[0]['xpath']);
	
	for(var i=0;i<navNavNodes.length-1;i++) {
	  var XPath1 = navNavNodes[i]['xpath'];
	  var XPath2 = navNavNodes[i+1]['xpath'];
	  
		var result_align = do_alignment(XPath1,XPath2); // do pairwise alignment -> return xpath string
		navNavXPath.push(result_align);
		//LOG('pushing generalized navigation xpath ' + result_align);	 
	}	
	
	if(navNavNodes.length==1) navNavXPath.push(navNavNodes[0]['xpath']);	

	//Get generalized content xpath
	
	for(var i in dArray)  
	{
        //domains[global_select.domain]['data'][global_select.con_val]['nodes'][len]['xpath']
		var curNodes = dArray[i]['nodes'];
		var curXPath = dArray[i]['xpath'];
		
        //LOG('crawler.js storeGenXpath: darray[name]='+ dArray[i]['name'] + ' :globalselectname: ' + global_select.domain);
        //LOG('crawler.js Creating: 
		foundArray[global_select.domain][(dArray[i]['name'])]= [];
		
		curXPath.length=0;
		
		//for(var j=0;j<curNodes.length;j++)
			//alert(curNodes[j].textContent);
		 
		for(var j=0;j<curNodes.length-1;j++)
		{
			var XPath1 = curNodes[j]['xpath'];
			var XPath2 = curNodes[j+1]['xpath'];
			
			//alert('xpath1 = ' + XPath1 + ' xpath2 = ' + XPath2);
	  
			var result_align = do_alignment(XPath1,XPath2); // do pairwise alignment -> return xpath string
			//alert('i = ' + i + ' j = ' + j + ' val = ' + result_align);
			curXPath.push(result_align);		
			//LOG('pushing generalized content xpath ' + result_align);	 
		}
		
		if(curNodes.length==1) curXPath.push(generateXPath(curNodes[0]['xpath']));
	}	 
}


