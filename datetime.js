// JavaScript by Peter Hayes http://www.aphayes.pwp.blueyonder.co.uk/ephemeris/index.html
// Copyright 2001-2011
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page.

// Various date and time functions

// getFullYear returns a 4 digit year allowing for browser bugs
// now is a JavaScript date object which works from 1900
// assume that a date of 00 is actually a year 2000 bug NOT 1900

function getFullYear(now) {
  var year = now.getYear();
  if (year==0) {year=2000}
  if (year<1900) {year=year+1900}
  return year;
}

// Global variables

var month_length=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

function leapyear(year) {
  var leap=false;
  if (year % 4 == 0) leap = true;
  if (year % 100 ==0 ) leap = false;
  if (year % 400 == 0) leap = true;
  return leap;
}

// Attempt to discover if daylight saving time is on
function localdst() {
  var now=new Date();
  var tz=now.getTimezoneOffset();
  now.setMonth(0); var tz0 = now.getTimezoneOffset();
  now.setMonth(6); var tz6 = now.getTimezoneOffset();
  if (tz6 < tz0) { // Northern hemisphere with DST
    if (tz < tz0) return true;
  }
  if (tz0 < tz6) { // Southern hemisphere with DST
    if (tz < tz6) return true;
  }
  return false;
}

// The Julian date at 0 hours UT at Greenwich

function jd0(year,month,day) {
  var y  = year;
  var m = month;
  if (m < 3) {m += 12; y -= 1};
  var a = Math.floor(y/100);
  var b = 2-a+Math.floor(a/4);
  var j = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524.5;
  return j;
}

// The calendar date from julian date
// Returns year, month, day, day of week, hours, minutes, seconds

function jdtocd(jd) {
  var Z=Math.floor(jd+0.5);
  var F=jd+0.5-Z;
  if (Z < 2299161) {
    var A=Z;
  } else {
    var alpha=Math.floor((Z-1867216.25)/36524.25);
    var A=Z+1+alpha-Math.floor(alpha/4);
  }
  var B=A+1524;
  var C=Math.floor((B-122.1)/365.25);
  var D=Math.floor(365.25*C);
  var E=Math.floor((B-D)/30.6001);
  var d=B-D-Math.floor(30.6001*E)+F;
  if (E < 14) {
    var month=E-1;
  } else {
    var month=E-13;
  }
  if ( month>2) {
    var year=C-4716;
  } else {
    var year=C-4715;
  }
  var day=Math.floor(d);
  var h=(d-day)*24;
  var hours=Math.floor(h);
  var m=(h-hours)*60;
  var minutes=Math.floor(m);
  var seconds=Math.round((m-minutes)*60);
  if (seconds >= 60) {
    minutes=minutes+1;
    seconds=seconds-60;
  }
  if (minutes >= 60) {
    hours=hours+1;
    minutes=0;
  }
  var dw=Math.floor(jd+1.5)-7*Math.floor((jd+1.5)/7);
  return new Array(year,month,day,dw,hours,minutes,seconds);  
}

// sidereal time in hours for Greenwich

function g_sidereal(year,month,day) {
  var T=(jd0(year,month,day)-2451545.0)/36525;
  var res=100.46061837+T*(36000.770053608+T*(0.000387933-T/38710000.0));
  return rev(res)/15.0;
}


