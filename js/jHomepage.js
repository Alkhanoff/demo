/**
* Set Homepage Link plugin
*
* Copyright (c) 2009 Bibby Chung
* Blog: http://bibby.be
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* just for ie and firefox
*
* @example 
* $('#Button1').click(function() {
*  $.setHomepage('http://google.com');
* }); 
*/

jQuery.extend({
setHomepage: function(url) {
if (document.all) {
 document.body.style.behavior = 'url(#default#homepage)';
 document.body.setHomePage(url);
}
else if (window.sidebar) {
 if (window.netscape) {
  try {
   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  }
  catch (e) {
   var strTemp = '';
   strTemp += "this action was aviod by your browser,";
   strTemp += "if you want to enable,please enter about:config in your address line,";
   strTemp += "and change the value of signed.applets.codebase_principal_support to true";
   alert(strTemp);
  }
 }
 var prefs = Components.classes['@mozilla.org/preferences-service;1']
     .getService(Components.interfaces.nsIPrefBranch);
 prefs.setCharPref('browser.startup.homepage', url);
}
}
});