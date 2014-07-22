// JavaScript by Peter Hayes http://www.aphayes.pwp.blueyonder.co.uk/
// Copyright 2001-2013
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page.

// The place definitions and function
// latitude is degrees:minutes:seconds, ns is 0 for north and 1 for south
// longitude is degrees:minutes:seconds, we is 0 for west and 1 for east
// zone is the correction in minutes from local time to UT (GMT) without daylight saving,
// west of Greenwich is positive.
// The daylight saving start and end (dss and dse) are strings month:week:day
// where month is 1:12, day is 0-6 (0=Sunday) and week is 1-5.
// week 1 is the first week containing 'day' and week 5 means the last occurence
// of day in the month (same as the Unix TZ rules).
// Set the string to a null string if you don't know the rules.
// Some sites taken from the stellarium database
// /Applications/Stellarium.app/Contents/Resources/data/cities_Earth.fab

function place(name,latitude,ns,longitude,we,zone,dss,dse) {
  this.name      = name;
  this.latitude  = latitude;
  this.ns        = ns;
  this.longitude = longitude;
  this.we        = we;
  this.zone      = zone;
  this.dss       = dss;
  this.dse       = dse;
}

// A selection of places

var atlas = new Array(
  new place("GB:Greenwich","51:28:38",0,"00:00:00",0,0,"3:5:0","10:5:0"),
  new place("A:Vienna","48:13:00",0,"16:22:00",1,-60,"3:5:0","10:5:0"),
  new place("B:Brussels","50:50:00",0,"4:21:00",1,-60,"3:5:0","10:5:0"),
  new place("CH:Berne","46:55:00",0,"07:25:00",1,-60,"3:5:0","10:5:0"),
  new place("CH:Genève","46:12:00",0,"06:10:00",1,-60,"3:5:0","10:5:0"),
  new place("CH:Lausanne","46:32:00",0,"06:40:00",1,-60,"3:5:0","10:5:0"),
  new place("CH:Zurich","47:22:40",0,"08:33:04",1,-60,"3:5:0","10:5:0"),
  new place("DE:Berlin","52:31:00",0,"13:19:59",1,-60,"3:5:0","10:5:0"),
  new place("DE:Frankfurt am Main","50:06:00",0,"8:41:00",1,-60,"3:5:0","10:5:0"),
  new place("DE:Hamburg","53:33:00",0,"10:00:00",1,-60,"3:5:0","10:5:0"),
  new place("DE:Munich","48:08:00",0,"11:35:00",1,-60,"3:5:0","10:5:0"),
  new place("DK:Aalborg","57:03:00",0,"9:51:00",1,-60,"3:5:0","10:5:0"),
  new place("DK:Århus","56:10:00",0,"10:13:00",1,-60,"3:5:0","10:5:0"),
  new place("DK:Copenhagen","55:43:00",0,"12:34:00",1,-60,"3:5:0","10:5:0"),
  new place("ES:Barcelona","41:18:07",0,"02:05:31",0,-60,"3:5:0","10:5:0"),
  new place("ES:Madrid","40:25:00",0,"03:42:00",0,-60,"3:5:0","10:5:0"),
  new place("ES:Malaga","36:43:00",0,"04:25:00",0,-60,"3:5:0","10:5:0"),
  new place("ES:Las Palmas","28:08:00",0,"15:27:00",0,60,"3:5:0","10:5:0"),
  new place("FR:Bordeaux","44:50:00",0,"0:34:00",0,-60,"3:5:0","10:5:0"),
  new place("FR:Brest","48:24:00",0,"4:30:00",0,-60,"3:5:0","10:5:0"),
  new place("FR:Calais","50:57:00",0,"1:52:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Lille","50:38:00",0,"03:04:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Marseille","43:18:00",0,"5:22:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Nice","43:42:00",0,"07:16:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Orléans","47:54:00",0,"01:54:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Paris","48:48:00",0,"02:14:00",1,-60,"3:5:0","10:5:0"),
  new place("FR:Strasbourg","48:35:00",0,"7:45:00",1,-60,"3:5:0","10:5:0"),
  new place("FI:Helsinki","60:08:00",0,"25:00:00",1,-120,"3:5:0","10:5:0"),
  new place("GR:Athens","38:01:36",0,"23:44:00",1,-120,"3:5:0","10:5:0"),
  new place("GB:Aberdeen","57:12:00",0,"02:12:00",0,0,"3:5:0","10:5:0"),
  new place("GB:Birmingham","52:28:59",0,"01:52:59",0,0,"3:5:0","10:5:0"),
  new place("GB:Belfast","54:37:48",0,"05:52:12",0,0,"3:5:0","10:5:0"),
  new place("GB:Bristol","51:28:59",0,"02:38:59",0,0,"3:5:0","10:5:0"),
  new place("GB:Cambridge","52:10:00",0,"00:06:00",0,0,"3:5:0","10:5:0"),
  new place("GB:Cardiff","51:30:00",0,"03:12:00",0,0,"3:5:0","10:5:0"),
  new place("GB:Cheltenham","51:52:52",0,"02:06:48",0,0,"3:5:0","10:5:0"),
  new place("GB:Edinburgh","55:55:48",0,"03:13:48",0,0,"3:5:0","10:5:0"),
  new place("GB:Manchester","53:30:00",0,"01:45:00",0,0,"3:5:0","10:5:0"),
  new place("GB:London","51:30:00",0,"00:10:12",0,0,"3:5:0","10:5:0"),
  new place("HR:Zagreb","45:48:00",0,"15:58:00",1,-60,"3:5:0","10:5:0"),
  new place("IT:Rome","41:53:00",0,"12:30:00",1,-60,"3:5:0","10:5:0"),
  new place("IT:Milan","45:28:00",0,"9:12:00",1,-60,"3:5:0","10:5:0"),
  new place("IT:Palermo","38:08:00",0,"13:23:00",1,-60,"3:5:0","10:5:0"),
  new place("IE:Dublin","53:19:48",0,"06:15:00",0,0,"3:5:0","10:5:0"),
  new place("IS:Reykjavik","64:09:00",0,"21:58:00",0,60,"3:5:0","10:5:0"),
  new place("LU:Luxembourg","49:36:00",0,"6:09:00",1,-60,"3:5:0","10:5:0"),
  new place("NO:Bergen","60:21:00",0,"5:20:00",1,-60,"3:5:0","10:5:0"),
  new place("NO:Oslo","59:56:00",0,"10:45:00",1,-60,"3:5:0","10:5:0"),
  new place("NO:Tromsø","69:70:00",0,"19:00:00",1,-60,"3:5:0","10:5:0"),
  new place("NL:Amsterdam","52:22:23",0,"4:53:33",1,-60,"3:5:0","10:5:0"),
  new place("NL:Apeldoorn","52:13:00",0,"5:57:00",1,-60,"3:5:0","10:5:0"),
  new place("NL:Maastricht","50:51:00",0,"5:04:00",1,-60,"3:5:0","10:5:0"),
  new place("NL:Groningen","53:13:00",0,"6:33:00",1,-60,"3:5:0","10:5:0"),
  new place("NL:The Hague","52:05:00",0,"4:29:00",1,-60,"3:5:0","10:5:0"),
  new place("PT:Lisbon","38:44:00",0,"9:08:00",0,0,"3:5:0","10:5:0"),
  new place("PL:Warszawa","52:15:00",0,"21:00:00",1,-60,"3:5:0","10:5:0"),
  new place("RO:Bucharest","44:25:00",0,"26:07:00",1,-120,"3:5:0","10:5:0"),
  new place("RU:Irkutsk","52:18:00",0,"104:15:00",1,-480,"3:5:0","10:5:0"),
  new place("RU:Moscow","55:45:00",0,"37:35:00",1,-180,"3:5:0","10:5:0"),
  new place("RU:Omsk","55:00:00",0,"73:22:00",1,-360,"3:5:0","10:5:0"),
  new place("SE:Gothenburg","57:43:00",0,"11:58:00",1,-60,"3:5:0","10:5:0"),
  new place("SE:Stockholm","59:35:00",0,"18:06:00",1,-60,"3:5:0","10:5:0"),
// Canada assume DST rules same as USA until checked
  new place("CA:Calgary","51:02:42",0,"114:03:26",0,420,"03:2:0","11:1:0"),
// USA daylight saving changes
// 1966 -2006 first Sunday in April to last Sunday in October
// 2007 -     second Sunday in March to first Sunday in November 
  new place("US:Aledo TX","32:44:25",0,"97:39:59",0,360,"03:2:0","11:1:0"),
  new place("US:Anchorage","61:10:00",0,"149:53:00",0,540,"03:2:0","11:1:0"),
  new place("US:Dallas","32:48:00",0,"96:48:00",0,360,"03:2:0","11:1:0"),
  new place("US:Denver","39:45:00",0,"104:59:00",0,420,"03:2:0","11:1:0"),
  new place("US:Honolulu","21:19:00",0,"157:86:00",0,600,"03:2:0","11:1:0"),
  new place("US:Los Angeles","34:03:15",0,"118:14:28",0,480,"03:2:0","11:1:0"),
  new place("US:Miami","25:47:00",0,"80:20:00",0,300,"03:2:0","11:1:0"),
  new place("US:Minneapolis","44:58:01",0,"93:15:00",0,360,"03:2:0","11:1:0"),
  new place("US:Muskegon Mi.","43:15:49",0,"86:01:25",0,300,"03:2:0","11:1:0"),
  new place("US:Seattle","47:36:00",0,"122:19:00",0,480,"03:2:0","11:1:0"),
  new place("US:Washington DC","38:53:51",0,"77:00:33",0,300,"03:2:0","11:1:0"),

  new place("AU:Melbourne","37:48:00",1,"144:58:00",1,-600,"10:5:0","03:5:0"),
  new place("AU:Perth","31:58:00",1,"115:49:00",1,-480,"10:5:0","03:5:0"),
  new place("BR:Rio de Janeiro","22:54:00",1,"43:16:00",0,180,"",""),
  new place("ZA:Cape Town","33:56",1,"18:25",1,-120,"","")
);

// The observatory object holds local date and time,
// timezone correction in minutes with daylight saving if applicable,
// latitude and longitude  NOTE Meeus uses West positive for longitude and zone
// The IAU convention of East being positive was adopted in 1982
// we will use the IAU convention for options passed via the URL and convert

function observatory(place,now) {
  this.name = place.name;
  this.year = now.getFullYear();
  this.month = now.getMonth()+1;
  this.day = now.getDate();
  this.hours = now.getHours();
  this.minutes = now.getMinutes();
  this.seconds = now.getSeconds();
  this.tz = place.zone;
  this.latitude = parsecol(place.latitude); if (place.ns == 1) { this.latitude=-this.latitude; }
  this.longitude = parsecol(place.longitude); if (place.we == 1) { this.longitude=-this.longitude; }
}

// the actual observer
var now = new Date();
var observer  = new observatory(atlas[0],now);

// Site name returns name and latitude / longitude as a string

function sitename() {
  var sname=observer.name;
  var latd=Math.abs(observer.latitude);
  var latdi=Math.floor(latd);
  sname+=((latdi < 10) ? " 0" : " ") + latdi;
  latm=60*(latd-latdi); latmi=Math.floor(latm);
  sname+=((latmi < 10) ? ":0" : ":") + latmi;
  lats=60*(latm-latmi); latsi=Math.floor(lats);
  sname+=((latsi < 10) ? ":0" : ":") + latsi;
  sname+=((observer.latitude >= 0) ? "N " : "S ");
  var longd=Math.abs(observer.longitude);
  var longdi=Math.floor(longd);
  sname+=((longdi < 10) ? "0" : "") + longdi;
  longm=60*(longd-longdi); longmi=Math.floor(longm);
  sname+=((longmi < 10) ? ":0" : ":") + longmi;
  longs=60*(longm-longmi); longsi=Math.floor(longs);
  sname+=((longsi < 10) ? ":0" : ":") + longsi;
  sname+=((observer.longitude >= 0) ? "W" : "E");
  return sname;
}

// Check DST is an attempt to check daylight saving, its not perfect.
// Returns 0 or -60 that is amount to remove to get to zone time.

function checkdst(obs) {
  // We only know daylight saving if in the atlas
  with (document.table1) {
    if ((Place.selectedIndex < 0) || (Place.selectedIndex >= atlas.length))
      return 0;
    var dss=atlas[Place.selectedIndex].dss;
    var dse=atlas[Place.selectedIndex].dse;
    var ns=atlas[Place.selectedIndex].ns;
  }
  if (dss.length==0) return 0;
  if (dse.length==0) return 0;
  // parse the daylight saving start & end dates
  var col1=dss.indexOf(":");
  var col2=dss.lastIndexOf(":");
  var col3=dss.length;
  var dssm=parseInt(dss.substring(0,col1),10);
  var dssw=parseInt(dss.substring(col1+1,col2),10);
  var dssd=parseInt(dss.substring(col2+1,col3),10);
  col1=dse.indexOf(":");
  col2=dse.lastIndexOf(":");
  col3=dse.length;
  var dsem=parseInt(dse.substring(0,col1),10);
  var dsew=parseInt(dse.substring(col1+1,col2),10);
  var dsed=parseInt(dse.substring(col2+1,col3),10);
  // Length of months
  // year,month,day and day of week
  var jdt=jd0(obs.year,obs.month,obs.day);
  var ymd=jdtocd(jdt);
  // first day of month - we need to know day of week
  var fymd=jdtocd(jdt-ymd[2]+1);
  // look for daylight saving / summertime changes
  // first the simple month checks
  // Test for the northern hemisphere
  if (ns==0) {
    if ((ymd[1]>dssm) && (ymd[1]<dsem)) return -60;
    if ((ymd[1]<dssm) || (ymd[1]>dsem)) return 0;
  } else{
  // Southern hemisphere, New years day is summer.
    if ((ymd[1]>dssm) || (ymd[1]<dsem)) return -60;
    if ((ymd[1]<dssm) && (ymd[1]>dsem)) return 0;
  }
  // check if we are in month of change over
  if (ymd[1]==dssm) { // month of start of summer time
    // date of change over
    var ddd=dssd-fymd[3]+1;
    ddd=ddd+7*(dssw);
    while (ddd>month_length[ymd[1]-1]) ddd-=7;
    if (ymd[2]<ddd) return 0;
    // assume its past the change time, its impossible
    // to know if the change has occured.
    return -60;
  } 
  if (ymd[1]==dsem) { // month of end of summer time
    // date of change over
    var ddd=dsed-fymd[3]+1;
//    alert("first ddd="+ddd);
    ddd=ddd+7*(dsew);
//    alert("next ddd="+ddd);
    while (ddd>month_length[ymd[1]-1]) ddd-=7;
//    alert("last ddd="+ddd);
    if (ymd[2]<ddd) return -60;
    // see comment above for start time
    return 0;
  }
  return 0;
}

// The Julian date at observer time

function jd(obs) {
  var j = jd0(obs.year,obs.month,obs.day);
  j+=(obs.hours+((obs.minutes+obs.tz)/60.0)+(obs.seconds/3600.0))/24;
  return j;
}

// sidereal time in hours for observer

function local_sidereal(obs) {
  var res=g_sidereal(obs.year,obs.month,obs.day);
  res+=1.00273790935*(obs.hours+(obs.minutes+obs.tz+(obs.seconds/60.0))/60.0);
  res-=obs.longitude/15.0;
  while (res < 0) res+=24.0;
  while (res > 24) res-=24.0;
  return res;
}

// radtoaa converts ra and dec to altitude and azimuth

function radtoaa(ra,dec,obs) {
  var lst=local_sidereal(obs);
  var x=cosd(15.0*(lst-ra))*cosd(dec);
  var y=sind(15.0*(lst-ra))*cosd(dec);
  var z=sind(dec);
  // rotate so z is the local zenith
  var xhor=x*sind(obs.latitude)-z*cosd(obs.latitude);
  var yhor=y;
  var zhor=x*cosd(obs.latitude)+z*sind(obs.latitude);
  var azimuth=rev(atan2d(yhor,xhor)+180.0); // so 0 degrees is north
  var altitude=atan2d(zhor,Math.sqrt(xhor*xhor+yhor*yhor));
  return new Array(altitude,azimuth);
}

// aatorad converts alt and azimuth to ra and dec

function aatorad(alt,az,obs) {
  var lst=local_sidereal(obs)
  var lat=obs.latitude
  var j=sind(alt)*sind(lat)+cosd(alt)*cosd(lat)*cosd(az);
  var dec=asind(j);
  j=(sind(alt)-sind(lat)*sind(dec))/(cosd(lat)*cosd(dec));
  var s=acosd(j);
  j=sind(az);
  if (j>0) s=360-s;
  var ra=lst-s/15;
  if (ra<0) ra+=24;
  if (ra>=24) ra-=24;
  return new Array(ra,dec);
}

