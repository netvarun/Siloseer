Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

function getNodesFromXPath(XPathArray)
{
	//result align refers to the xpath
	var root_path = mainWindow.content.document.documentElement.ownerDocument;
	var genNodes = []; // generated Node array
	
    LOG('calling from xptahstringarray');
	for(var i=0;i<XPathArray.length;i++)
	{
		var result_align = XPathArray[i];
		//alert('i is ' + i+' val is ' + result_align);
		var foundNodes = eval_xpath(root_path, result_align); // get generated nodes from aligned xpath
		genNodes = genNodes.concat(foundNodes);
	}

	return genNodes;
}

function getNodesFromXPathString(str)
{
    var root_path = mainWindow.content.document.documentElement.ownerDocument;
    var genNodes = []; // generated Node array

    var result_align = str;
    LOG('calling from xptahstring');
    var foundNodes = eval_xpath(root_path, result_align); // get generated nodes from aligned xpath

    return foundNodes;

}

function eval_xpath(aNode, aExpr) 
{
  var xpe = new XPathEvaluator();

  //alert('xpath debug anode: ' + aNode + ' - ' + isNode(aNode) + ' aexpr: ' + aExpr);

  var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    aNode.documentElement : aNode.ownerDocument.documentElement);
  LOG('xpath.js aExpr is ' + aExpr + ' node is ' + aNode.textContent);
  var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
		found.push(res);
	
  return found;
}


function generateXPath(aNode) {
    return walkUp1(aNode,0,99);
}


function walkUp1(node, depth, maxDepth)
{
    //log(depth+" node:"+node.nodeName +" aSentinel:"+aSentinel.nodeName);
	//alert('walkup');
	
    var str = "";
    if(!node) return "";
    //if(node==aSentinel) return ".";
    if((node.parentNode) && (depth < maxDepth)) {
        str += walkUp1(node.parentNode, depth + 1, maxDepth);
    }
    //log(node+'  '+node.nodeName +'  type:'+node.nodeType+ ' exp:'+Node.ELEMENT_NODE);
    switch (node.nodeType) {
        case Node.ELEMENT_NODE:{
                var nname = node.localName;
                var conditions = [];
                var hasid = false;
                if (node.hasAttribute('class')) conditions.push("@class='"+node.getAttribute('class')+"'");
                if (node.hasAttribute('id')) {
                    conditions.push("@id='"+node.getAttribute('id')+"'");
                    hasid = true;
                }
                    
                //not identified by id?
                if(!hasid){
                    var index = siblingIndex1(node);
                    //more than one sibling?
                    if (index) {
                        //are there also other conditions?
                        if (conditions.length>0) conditions.push('position()='+index);
                        else conditions.push(index);
                    }
    
                }
                str += "/"+nname;
                
                if(conditions.length>0){
                    str+="[";
                    for(var i=0;i<conditions.length; i++){
                        if (i>0) str+=' and ';
                        str+=conditions[i];
                    }
                    str+="]";
                }
                break;
            }
        case Node.DOCUMENT_NODE:{
            break;
        }
        case Node.TEXT_NODE:{
            //str='string('+str+')';
            str+='/text()';
            var index = siblingIndex1(node);
            if (index) str+="["+index+"]";
            break;
        }
        
    }
    return str;            
}

// gets index of aNode (relative to other same-tag siblings)
// first position = 1; returns null if the component is the only one 
function siblingIndex1(aNode){
    var siblings = aNode.parentNode.childNodes;
    var allCount = 0;
    var position;

    if (aNode.nodeType==Node.ELEMENT_NODE){
        var name = aNode.nodeName;
        for (var i=0; i<siblings.length; i++){
            var node = siblings.item(i);
            if (node.nodeType==Node.ELEMENT_NODE){
                if (node.nodeName == name) allCount++;  //nodeName includes namespace
                if (node == aNode) position = allCount;
            }
        }
    }
    else if (aNode.nodeType==Node.TEXT_NODE){
        for (var i=0; i<siblings.length; i++){
            var node = siblings.item(i);
            if (node.nodeType==Node.TEXT_NODE){
                allCount++;
                if (node == aNode) position = allCount;
            }
        }
    }
    if (allCount>1) return position;
    return null
}


