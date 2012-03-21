function elementsById(id){
  var nodes = [];
  var tmpNode = document.getElementById(id);
  while(tmpNode){
    nodes.push(tmpNode);
    tmpNode.id = "";
    tmpNode = document.getElementById(id);
  }
  for(var x=0; x<nodes .length; x++){
    nodes[x].id = id;
  }
  return nodes;
}

function StringBuffer() { 
   this.buffer = []; 
 } 

 StringBuffer.prototype.append = function append(string) { 
   this.buffer.push(string); 
   return this; 
 }; 

 StringBuffer.prototype.toString = function toString() { 
   return this.buffer.join(""); 
 }; 


//Decryption
function b64_to_utf8( str ) {
            //return decodeURIComponent(escape(window.atob( str )));
            LOG('trying to decrypt: ' + str);
            //return decodeURIComponent(escape(Aes.Ctr.decrypt(str,password,128)));
            var ans= decodeURIComponent(unescape(str));
            LOG('decrypted: '+ ans);
            return ans;
            //return window.atob(str);
}

//Encryption
function utf8_to_b64( str ) {
            //return window.btoa(unescape(encodeURIComponent( str )));
            //return Aes.Ctr.encrypt(unescape(encodeURIComponent( str )),password,128);
            return escape(encodeURIComponent( str ));
            //return window.btoa(str);
}

function urlTLD(url) {
    var regex1 = /http[s]?:\/\//;
    var regex2 = /^www\./;
    var regex3 = /(.*?)\/.*/;
    url = url.replace(regex1,"");
    url = url.replace(regex2,"");
    url = url.replace(regex3,"$1");

    return url.toLowerCase();

}

function updateProfile() {
    document.getElementById('boldStuff').textContent = loginVar.userName;
    var userLink = document.getElementById('userProfileLink');
    var usermd5  = MD5(loginVar.userName);
    var crawlUrl = serverUrl+'user.pl?u='+usermd5;

    userLink.removeAttribute("onclick");
    //userLink.setAttribute("onclick","alert('hello world');");
    
    userLink.setAttribute("onclick","mainWindow.content.wrappedJSObject.location='"+crawlUrl+"'");
    //userLink.setAttribute("href",crawlUrl);


}
