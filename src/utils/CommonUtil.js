/**
***对象转为URL查询参数（）
**/
const urlEncode = function (param, key, encode) {  
	if(param==null) return ''
	var paramStr = ''
	var t = typeof (param)
	if (t == 'string' || t == 'number' || t == 'boolean') {  
		paramStr = paramStr + '&' + key + '=' + ((encode == null || encode) ? encodeURI(param) : param)
	} else {  
		for (var i in param) {  
		  	var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
		  	paramStr = paramStr + urlEncode(param[i], k, encode)
		}
	} 
	return paramStr  
}

const deepCopy = function (sourceObj) {
	return JSON.parse(JSON.stringify(sourceObj))
}

const uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	})
}

export { urlEncode, uuid, deepCopy }
