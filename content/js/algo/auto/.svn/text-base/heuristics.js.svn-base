
function titleH(textNodes)
{
    var docTitle = getDocTitle();
    docTitle = normalizeString(docTitle);

//    alert('title = ' + docTitle);

    for(var i in textNodes)
    {
        var parentNode = textNodes[i].parentNode;
        var textContent = parentNode.textContent;
        var tagName = parentNode.tagName.toLowerCase();

        if(tagName == 'span' || tagName == 'div' || tagName == 'b' || /^h\d+$/.test(tagName))
        {
            if((/\breview\b/i).test(textContent)) continue;  // bad words

            if(gotHParent(parentNode))
            {
                textContent = normalizeString(textContent);
                //LOG('tagname: ' + tagName + ' content: ' + textContent);
                if((docTitle.indexOf(textContent)!= -1 || docTitle == textContent)&&(textContent.length>8))
                {
                    LOG(textContent + ' is a substring of ' + docTitle);
                    var conNum = addAutoElement("Name","Name");
                    autoMarkCon(parentNode,conNum);
                    break;
                }
            }
        }
    }
}

function gotHParent(node)
{
    do {
        //if(typeof node =='undefined') return 0;
        if(!node.tagName) return 0;
        var nodeTag = node.tagName.toLowerCase();
        LOG('node tagname: ' + nodeTag);
        if(/^h\d+/.test(nodeTag)) return 1;
        node = node.parentNode;
    }while(1);
    return 0;
}    

function phoneH(textNodes)
{
    for(var i in textNodes)
    {
        var parentNode = textNodes[i].parentNode;
        var textContent = parentNode.textContent.toLowerCase();
        textContent = textContent.replace(/telephone/i,"");
        textContent = textContent.replace(/tel/i,"");
        textContent = normalizeString(textContent);

        var tagName = parentNode.tagName.toLowerCase();

        if(tagName == 'span' || tagName == 'div' || tagName == 'b' || /^h\d+$/.test(tagName) || tagName=='p')
        {
            if(textContent.length>8 && textContent.length < 15 && /^\d+$/.test(textContent))
            {
                var conNum = addAutoElement("Phone","Phone");
                autoMarkCon(parentNode,conNum);
            }
        }
    }

}

function addressH(textNodes)
{
    var zipReg = "\\b(\\d{5})\\b|\\b(^\\d{5}-\\d{4})\\b";
    var stateReg =
        "\\b(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])\\b";

    var patt1=new RegExp(zipReg);
    var patt2=new RegExp(stateReg,"i");

    var found=0;
    var saveNode;

    for(var i in textNodes)
    {
        var parentNode = textNodes[i].parentNode;
        var htmlText = parentNode.innerHTML;
        //ht
        //var textContent = parentNode.textContent.toLowerCase();
        var textContent = htmlText.replace(/<[^>]*>/g," ");
        textContent = textContent.toLowerCase();

        textContent = textContent.replace(/\n/g,""); // remove newlines
        textContent = textContent.replace(/\s+/g," "); //whitespaces
        //textContent = normalizeString(textContent);

        var tagName = parentNode.tagName.toLowerCase();

        if(tagName == 'span' || tagName == 'div' || tagName == 'b' || /^h\d+$/.test(tagName) || tagName=='p')
        {
         //   LOG('found: ' + textContent);
            if(patt1.test(textContent) && patt2.test(textContent))
            {
                //alert('matched: ' + textContent);
                savNode = parentNode;
                var curNode = parentNode.parentNode;
                while(curNode)
                {
                    var curText = curNode.textContent;
                    curText = curText.replace(/\n/g,""); // remove newlines
                    curText = curText.replace(/^\s+|\s+$/g,""); //whitespaces

                    if(curText.length < 60 && curText.length > 4)
                    {
                        saveNode = curNode;
                        curNode = curNode.parentNode;
                        found=1;
                    }
                    else break;
                }
            }
        }

        if(found) break;
    }

    if(found)
    {
        var conNum = addAutoElement("Address","Address");
        autoMarkCon(saveNode,conNum);
    }
}

function normalizeString(str)
{
    str = str.toLowerCase();
    str = str.replace(/\n/g,""); // remove newlines
    //str = str.replace(/^\s+|\s+$/g,""); //whitespaces
    str = str.replace(/\W/g,'');

    return str;
}

function autoMarkCon(node,num)
{
    var foundXpath = generateXPath(node);
    untoggleAll();
    select_content_type(num);

    //alert('saving ' + foundXpath);

    if(!foundXPath(foundXpath,0))
    {
        //alert('saving ' + num);
        //alert('hello world');
        //alert('global domain: ' + global_select.domain);
        saveTag(foundXpath);
//        markSelected(getTagType());
        markEverything();

        //sync to the cloud
        uploadDomain(global_select.domain);

        //dynamically update the gui on number of tags
        resetTagData(); 
        updateUrlLists();
    }
}
