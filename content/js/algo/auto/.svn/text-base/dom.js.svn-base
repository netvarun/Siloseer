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
    var textNodes = getTextNodesIn(node);
    textNodes.sort(function(a, b) {
            return a.textContent.replace(/^\s+|\s+$/g,"") == b.textContent.replace(/^\s+|\s+$/g,"")
            ? 0
            : (a.textContent.replace(/^\s+|\s+$/g,"") > b.textContent.replace(/^\s+|\s+$/g,"") ? 1 : -1);
            });

    return textNodes;
}

function getTextNodesIn(node, includeWhitespaceNodes) {
    var textNodes = [], whitespace = /^\s*$/;

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return textNodes;
}


function getDocTitle()
{
    return  mainWindowAuto.content.document.title;

}
