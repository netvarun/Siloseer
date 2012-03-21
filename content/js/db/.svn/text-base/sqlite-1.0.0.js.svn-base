/*
 * sqlite 1.0.0
 *
 * Copyright (c) 2009 Arash Karimzadeh (arashkarimzadeh.com)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: June 27 2009
 */
var SQLite = function(db,options){
	var defaults = {
		location: "AChrom"
	}
	for(var i in options)
		defaults[i] = options[i];
	var file = Components
					.classes["@mozilla.org/file/directory_service;1"]
					.getService(Components.interfaces.nsIProperties)
					.get(defaults.location, Components.interfaces.nsIFile);
	file.append(db);
	var storageService = Components
							.classes["@mozilla.org/storage/service;1"]
							.getService(Components.interfaces.mozIStorageService);
	this.conObject = storageService.openDatabase(file);
	return this;
}
SQLite.prototype = {
	execute: function(cmd){
		var statement = this.conObject.createStatement(cmd);
		var cols = statement.columnCount,
			rows = [],
			colNames = [],
			colTypes = [];
		if (cols>0) {
			while(statement.executeStep()){
				var row = {};
				for(col=0;col<cols;col++){
					if(colNames[col]==undefined){
						colNames[col]=statement.getColumnName(col);
						colTypes[col]=statement.getTypeOfIndex(col);
					}
					switch (colTypes[col]){
						case 0:
							value = null; break;
						case 1:
							value = statement.getInt64(col); break;
						case 2:
							value = statement.getDouble(col); break;
						case 3:
							value = statement.getUTF8String(col); break;
						case 4:
							value = statement.getBlob(col); break;
					}
					row[colNames[col]] = value;
				}
				rows.push(row); 
			}
		}else{
			statement.execute();
		}
		statement.reset();
		if(rows.length>0)
			return rows;
		return this.conObject.lastInsertRowID;				
	},
	createMethod: function(command){
		var query = command;
		return function(params){
					var cmd = query;
					for(var i in params)
						cmd = cmd.replace('{'+i+'}',params[i]);
					return this.execute(cmd);
				}
	},
	extend: function(commands){
		for(var i in commands)
			commands[i] = this.createMethod(commands[i]);
		for(var i in commands)
			this[i] = commands[i];
	}
}