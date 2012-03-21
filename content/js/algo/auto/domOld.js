Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

var mainWindowAuto = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

function callTraverseDOMTree()
{
    var node = mainWindowAuto.content.document.documentElement;
    var rootXpath = generateXPath(node);
    //alert(rootXpath);

    traverseDOMTree(node,1);
}

function traverseDOMTree(currentElement, depth)
{
  var badTags=new Array("script","style","title","button","textarea","img");
  if (currentElement)
  {
    var j;
    var tagName=currentElement.tagName;
    var childNodes = currentElement.childNodes;

    //if(currentElement.nodeValue.length<40 && currentElement.nodeValue.length>1)    
    
    if (!tagName)
    {
        if(currentElement.nodeValue)
        {
            var str = currentElement.nodeValue;
            str = str.replace(/\s+/g,'');
            
            for(var k=0;k<badTags.length;k++)
            {
				if(currentElement.parentNode.nodeName.toLowerCase() == badTags[k])
				{
					//$(currentElement).remove ();
					return;
				}
			}
            
            if(str.length > 4)
            {			
			
				var saveElement = currentElement;
				
				var zipReg = "\\b(\\d{5})\\b|\\b(^\\d{5}-\\d{4})\\b";
				var stateReg =
				"\\b(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])\\b";

				var patt1=new RegExp(zipReg);
				var patt2=new RegExp(stateReg,"i");				
				
				//|| !( patt1.test(saveElement.parentNode.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," ")) && patt2.test(saveElement.parentNode.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," "))) 
				while((saveElement.parentNode.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," ").length<60
				&& saveElement.parentNode.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," ").length > 4) )
				{
					saveElement = saveElement.parentNode;
					
				}
				
				//if(saveElement.textContent.search("Mountain")!=-1)
				//{
				//	LOG("checking: " + saveElement.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," "));
				//}

				
				if( patt1.test(saveElement.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," ")) && patt2.test(saveElement.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," ")))
				{
				//	LOG("iteration: " + saveElement.textContent.replace(new RegExp("\\s+","g")," ").replace(new RegExp("\\n","g")," "));
					$(saveElement).css("backgroundColor", "#ff3fff");
				}
							

  //          alert(generateXPath(currentElement));
               
                //alert(currentElement.parentNode.nodeName + " " + currentElement.nodeValue);
               // LOG("leaf val is " + currentElement.nodeValue);

            }
        }
    }

    var i=0;
    var currentElementChild=currentElement.childNodes[i];
    while (currentElementChild)
    {
      traverseDOMTree(currentElementChild, depth+1);
      i++;
      currentElementChild=currentElement.childNodes[i];
    }
    currentElement=0;
  }
}

