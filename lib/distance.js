function calcDistance(lat1, lon1, lat2, lon2){

    var EARTH_R, Rad, radLat1, radLat2, radDist; 
    var distance, ret;

    EARTH_R = 6371000.0;
    Rad 		= Math.PI/180;
    radLat1 = Rad * lat1;
    radLat2 = Rad * lat2;
    radDist = Rad * (lon1 - lon2);

    distance = Math.sin(radLat1) * Math.sin(radLat2);
    distance = distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
    ret 		 = EARTH_R * Math.acos(distance);

    var rtn = Math.round(Math.round(ret) / 1000);
       if(rtn <= 0) {
           rtn = Math.round(ret) + " m";
       } else {
           rtn = rtn + " km";
       }
    return  rtn;
}

module.exports = calcDistance;