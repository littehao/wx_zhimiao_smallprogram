
function formatNumber(price){
	let num = Number(price)
	if (num == 0) {
		return num.toFixed(2);
	} else if (price > 0 && num < 10000) {
		return num.toFixed(2);
	} else {
		return (num / 10000).toFixed(2) + '万';
	}
}

function transTime(times,format){
	const date = new Date(times * 1000)
	const year = date.getFullYear()
	let month = date.getMonth() + 1
	if(month < 10) month = '0' + month
	let day = date.getDate()
	if(day < 10) day = '0' + day
	let hour = date.getHours()
	if(hour < 10) hour = '0' + hour
	let minute = date.getMinutes()
	if(minute < 10) minute = '0' + minute
	let sencond = date.getSeconds()
	if(sencond < 10) sencond = '0' + sencond
	if(format == 'mm-dd hh:mm:ss'){
		return `${month}-${day} ${hour}:${minute}:${sencond}`
	} else if(format == 'yy-mm-dd hh:mm:ss'){
		return `${year}-${month}-${day} ${hour}:${minute}:${sencond}`
	} else if(format == 'hh:mm:ss'){
		return `${hour}:${minute}:${sencond}`
	}else if(format == 'hh:mm'){
		return `${hour}:${minute}`
	} else {
		return {
			year,
			month,
			day,
			hour,
			minute,
			sencond
		}
	}
	
}

//去空格
function trim(value) {
	return value.replace(/(^\s*)|(\s*$)/g, "");
}

//根据经纬度计算距离
function distance(lat1, lng1 ,location) {
	if(!lat1 || !lng1)return 0
	if(!location)return 0
	let lat2 = location.lat;
	let lng2 = location.lng;
	let rad1 = lat1 * Math.PI / 180.0;
	let rad2 = lat2 * Math.PI / 180.0;
	let a = rad1 - rad2;
	let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) *
		Math.cos(
			rad2) * Math.pow(
			Math.sin(b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	s = s.toString();
	s = s.substring(0, s.indexOf('.') + 2);
	return s
}


module.exports = {
  formatNumber,
  transTime,
  trim,
	distance
}
