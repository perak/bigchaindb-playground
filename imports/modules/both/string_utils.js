export const escapeRegEx = function (string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const replaceSubstrings = function(string, find, replace) {
	return string.replace(new RegExp(escapeRegEx(find), 'g'), replace);
};

export const joinStrings = function(stringArray, join) {
	var sep = join || ", ";
	var res = "";
	_.each(stringArray, function(str) {
		if(str) {
			if(res)
				res = res + sep;
			res = res + str;
		}		
	});
	return res;
};

export const convertToSlug = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

camelizeCssProperty = function(str) {
	var arr = str.split('-');
	for(var i=1; i<arr.length; i++) {
		arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
	}
	var res = arr.join('');
	return res;
};

export const cssStyleToObject = function(s) {
	var res = "";
	var rows = s.split(";");
	rows.map(function(row) {
		var cols = row.split(":");
		if(cols.length > 1) {
			if(res) {
				res += ",";
			}
			var name = camelizeCssProperty(cols[0].trim());
			var value = row.substring(cols[0].length + 1).trim();
			value = replaceSubstrings(value, "\"", "\\\"");
			res += "\"" + name + "\": \"" + value + "\"";
		}
	});
	var obj = JSON.parse("{" + res + "}");
	return obj;
};
