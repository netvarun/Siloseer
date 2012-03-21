
function autoStart()
{
    
    if(!checkUrl())
    {
        alert('You are no longer on '+domains[global_select.domain]['url']);
        return;
    }
    
    var textNodes = callTraverseDOMTree();

    navAuto(textNodes);
    select_nav_type('nav_links_box',1); // unselect nav

    var seenTags =autoServer();

    //alert('seentags: ' + JSON.stringify(seenTags));

    if(!("name" in seenTags))
        titleH(textNodes);

    if(!("phone" in seenTags))
        phoneH(textNodes);

    if(!("address" in seenTags))
        addressH(textNodes);

    //if(!("price" in seenTags))
    //    priceH(textNodes);
}

function navAuto(textNodes)
{
    var matched=0;

    for(var i in textNodes)
    {
        var parentNode = textNodes[i].parentNode;
        var tagName = parentNode.tagName.toLowerCase();

        if(tagName == 'a')
        {
            var content = textNodes[i].textContent.replace(/^\s+|\s+$/g,"").toLowerCase();

            if((/^\d+$/.test(content)))
            {
                //LOG('num = ' + content + ' i = ' + i);

                if(i>0)
                {
                    var prevContent = textNodes[i-1].textContent.replace(/^\s+|\s+$/g,"");
                    var prevPrevContent="";
                    if(i>1) prevPrevContent = textNodes[i-2].textContent.replace(/^\s+|\s+$/g,"");

                    var num1 = parseInt(content); var num2 = parseInt(prevContent); var num3 = parseInt(prevPrevContent);

                 //   LOG('num content = ' + content + ' num1 = ' + num1 + ' num2 = ' + num2 + ' num3 = ' + num3 + ' i = ' + i);

                    if((num1 == (num2+1)) || (num2 == (num3+1)))
                    {
                        if(matched<2) {
                            autoMarkNav(parentNode);
                            matched++;
                        }
                    }
                }
            }

            if(content == 'prev' || content == 'previous' || content =='next' || content =='back')
            {
                if(matched<2) {
                    autoMarkNav(parentNode);
                    matched++;
                }
            }
        }
                    
        //LOG('Xpath: '+generateXPath(textNodes[i].parentNode));
            
    } 

}

function autoMarkNav(node)
{
    var foundXpath = generateXPath(node);
    untoggleAll();
    select_nav_type('nav_links_box',1);

    if(!foundXPath(foundXpath,0))
    {
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

function conAuto(textNodes)
{
    var ct=0;
    for(var i in textNodes)
    {
        ct++;
        var parentNode = textNodes[i].parentNode;
        var content = parentNode.tagName.toLowerCase();
/*
        if(content == 'a')
        {
            LOG(textNodes[i].textContent+' ct = ' + ct);
        } 
*/
        if(textNodes[i].textContent.length > 100)
        {
            LOG(textNodes[i].textContent+' ct = ' + ct);
            LOG('Xpath: '+generateXPath(textNodes[i]));
        }
    }

}

