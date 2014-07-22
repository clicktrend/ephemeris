// JavaScript by Peter Hayes
// http://www.aphayes.pwp.blueyonder.co.uk/
// Copyright 2001-2008
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page.

// Utility functions

// datestring provides a locale independent format

function datestring(obs) {
  var datestr = "";  datestr += obs.year;
  datestr += ((obs.month < 10) ? ":0" : ":") + obs.month;
  datestr += ((obs.day < 10) ? ":0" : ":") + obs.day;
  return datestr;
}

// UTstring returns UT as a string

function UTstring(obs) {
  var hours   = obs.hours;
  var minutes = obs.minutes;
  var seconds = obs.seconds;
  minutes+=obs.tz;
  hours+=Math.floor(minutes/60.0);
  minutes=minutes-Math.floor(minutes/60.0)*60;
  while (hours > 24) { hours-=24; }
  while (hours < 0) { hours+=24; }
  var timestr = ((hours < 10) ? "0" : "") + hours;
  timestr    += ((minutes < 10) ? ":0" : ":") + minutes;
  timestr    += ((seconds < 10) ? ":0" : ":") + seconds;
  return timestr;
}

// timestring returns civil or local time as a string

function timestring(obs,local) {
  var hours   = obs.hours;
  var minutes = obs.minutes;
  var seconds = obs.seconds;
  if (local) {
    // Correct for zone time including DST
    minutes+=obs.tz;
    // correct for longitude to nearest second
    seconds=Math.round(seconds-240*obs.longitude);
    while (seconds < 0 ) { seconds+=60; minutes-=1; }
    while (seconds >= 60 ) { seconds-=60; minutes+=1; }
    // Put the daylight saving correction back
    minutes-=checkdst(observer);
    while (minutes < 0 ) { minutes+=60; hours-=1; }
    while (minutes >= 60 ) { minutes-=60; hours+=1; }
    while (hours > 24 ) hours-=24;
    while (hours < 0 ) hours+=24;
  }
  var timestr = ((hours < 10) ? "0" : "") + hours;
  timestr    += ((minutes < 10) ? ":0" : ":") + minutes;
  timestr    += ((seconds < 10) ? ":0" : ":") + seconds;
  return timestr;
}

// hmstring and hmsstring converts hours to a : separated string

function hmsstring(t) {
  var hours = Math.abs(t);
  var minutes = 60.0*(hours-Math.floor(hours));
  hours=Math.floor(hours);
  var seconds = Math.round(60.0*(minutes-Math.floor(minutes)));
  minutes=Math.floor(minutes);
  if (seconds >= 60) { minutes+=1; seconds-=60; }
  if (minutes >= 60) { hours+=1; minutes-=60; }
  if (hours >= 24) { hours-=24; }
  var hmsstr=(t < 0) ? "-" : "";
  hmsstr+=((hours < 10) ? "0" : "" )+hours;
  hmsstr+=((minutes < 10) ? ":0" : ":" )+minutes;
  hmsstr+=((seconds < 10) ? ":0" : ":" )+seconds;
  return hmsstr;
}

function hmstring(t) {
  var hours = Math.abs(t);
  var minutes = Math.round(60.0*(hours-Math.floor(hours)));
  hours=Math.floor(hours);
  if (minutes >= 60) { hours+=1; minutes-=60; }
  if (hours >= 24) { hours-=24; }
  var hmstr=(t < 0) ? "-" : "";
  hmstr+=((hours < 10) ? "0" : "" )+hours;
  hmstr+=((minutes < 10) ? ":0" : ":" )+minutes;
  return hmstr;
}

// hmdstring returns hours minutes as hh:mm.m used to print RA

function hmdstring(t) {
  var hours = Math.abs(t);
  var minutes = 60.0*(hours-Math.floor(hours));
  hours=Math.floor(hours);
  if (minutes >= 60) { hours+=1; minutes-=60; }
  if (hours >= 24) { hours-=24; }
  var hmstr=(t < 0) ? "-" : "";
  hmstr+=((hours < 10) ? "0" : "" )+hours;
  hmstr+=((Math.floor(minutes) < 10) ? ":0" : ":" )+Math.floor(minutes);
  hmstr+="."+Math.floor(10*(minutes-Math.floor(minutes)));
  return hmstr;
}


// llstring returns latitude or longitude as degrees:minutes:seconds without sign

function llstring(a) {
  var deg=Math.abs(a);
  var min=(60.0*(deg-Math.floor(deg)));
  var sec=Math.floor(60.0*(min-Math.floor(min)));
  var dmsstr="";
  deg=Math.floor(deg); min=Math.floor(min); sec=Math.floor(sec);
  dmsstr+=((deg < 10) ? "0" : "" )+deg;
  dmsstr+=((min < 10) ? ":0" : ":" )+min;
  dmsstr+=((sec < 10) ? ":0" : ":" )+sec;
  return dmsstr;
}

// anglestring return angle as degrees:minutes
// circle is true for range between 0 and 360 and false for -90 to +90

function anglestring(a,circle) {
  var ar=Math.round(a*60)/60;
  var deg=Math.abs(ar);
  var min=Math.round(60.0*(deg-Math.floor(deg)));
  if (min >= 60) { deg+=1; min=0; }
  var anglestr="";
  if (!circle) anglestr+=(ar < 0 ? "-" : "+");
  if (circle) anglestr+=((Math.floor(deg) < 100) ? "0" : "" );
  anglestr+=((Math.floor(deg) < 10) ? "0" : "" )+Math.floor(deg);
  anglestr+=((min < 10) ? ":0" : ":" )+(min);
  return anglestr;
}

// parsecol converts deg:min:sec or hr:min:sec to a number

function parsecol(str) {
  var col1=str.indexOf(":");
  var col2=str.lastIndexOf(":");
  if (col1 < 0) return parseInt(str);
  if (str.substring(0,1) == "-") {
    var res=parseInt(str.substring(1,col1),10);
  } else {
    var res=parseInt(str.substring(0,col1),10);
  }
  if (col2 > col1) {
    res+=(parseInt(str.substring(col1+1,col2),10)/60.0) +
         (parseInt(str.substring(col2+1,str.length),10)/3600.0);
  } else {
    res+=(parseInt(str.substring(col1+1,str.length),10)/60.0);
  }
  if (str.substring(0,1) == "-") {
    return -res;
  } else {
    return res;
  }
}


