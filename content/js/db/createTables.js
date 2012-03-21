var siloseer_Sidebar_Handle = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
Components.utils.import("resource://siloseer_gui/js/firefox/siloseer_shared.js");

function createTables() {
	
	// some example SQL queries:
	var myCreateDomainTableQuery = 'CREATE TABLE IF NOT EXISTS domains (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT,desc TEXT);';
	var myCreateLabelTableQuery = 'CREATE TABLE IF NOT EXISTS labels (id INTEGER PRIMARY KEY AUTOINCREMENT, domaindID INTEGER, name TEXT,typeIndex INTEGER);';
		
	$sqlite.cmd(myDBFile,myCreateDomainTableQuery);
	//$sqlite.cmd(myDBFile,myCreateLabelTableQuery);
}

//loadtables values into domains
