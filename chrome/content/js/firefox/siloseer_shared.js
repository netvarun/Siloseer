var EXPORTED_SYMBOLS =
["domains","global_select","nodeHash","LOG","startUrls","foundArray","$sqlite","myDBFile","loginVar","resetVar","serverUrl","isNode","password","jsObject","checkDomains"];

var domains = new Array();
//var domains = {};

var nodeHash = new Array();

var startUrls = new Array();

//var foundArray = new Array();
var foundArray = {};

var jsObject= {};

var myDBFile = 'siloseer.sqlite';

var loginVar = {
    loginStatus: 0,
    firstSync:0,
    userName: ''
};

//var serverUrl = 'http://localhost/perl/';
var serverUrl = 'http://www.siloseer.com/perl/';
var password = 'L0ck it up saf3';


//Content or navigation links - > view_config for navigation tab
var global_select = {
	type: 0, // content or navigation. 0 for navigation 1 for content
	nav_val: 0,
	con_val: 0,
	domain: 0 // which wrapper is currently active
};

function resetVar() {

    domains.length=0;
    nodeHash.length=0;
    startUrls.length=0;
    foundArray.length=0;

    global_select.type=0;
    global_select.nav_val=0;
    global_select.con_val=0;
    global_select.domain=0;

}

function checkDomains() {
//  var navConNodes = domains[0]['links']['content'];

    //for(var i=0;i<navConNodes.length-1;i++) {
       // LOG('shared con i = ' + i + ' : ' + navConNodes[i]['text'] + ' html content: ' + navConNodes[i]['dom'].innerHTML ); // this actually works -> ['text']

      //LOG('shared isnode ConPredict = ' + isNode(navConNodes[i]['dom']) + ' text content = ' + navConNodes[i]['dom'].innerHTML);

//      var XPath1 = generateXPath(navConNodes[i]['dom']);
//      var XPath2 = generateXPath(navConNodes[i+1]['dom']);
//      alert('navcon xpath1 = ' + XPath1 + ' xpath2 = ' + XPath2);
    //}



}

function LOG(msg) {
  var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
                                 .getService(Components.interfaces.nsIConsoleService);
  consoleService.logStringMessage(msg);
}

function isNode(o){
      return (
          typeof Node === "object" ? o instanceof Node : 
              typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
                );
}

//http://codesnippets.joyent.com/posts/show/1030
