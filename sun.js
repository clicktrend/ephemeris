// JavaScript by Peter Hayes http://www.aphayes.pwp.blueyonder.co.uk/
// Copyright 2001-2009
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page.

// Various functions for the Sun

// Nutation in longitude and obliquity, returns seconds

function nutation(obs) {
  var T=(jd(obs)-2451545.0)/36525.0;
  var T2=T*T;
  var T3=T2*T;
  var omega=rev(125.04452-1934.136261*T);
  var L=rev(280.4665+36000.7698*T);
  var LP=rev(218.3165+481267.8813*T);
  var deltaL=-17.20*sind(omega)-1.32*sind(2*L)-0.23*sind(2*LP)+0.21*sind(2*omega);
  var deltaO=9.20*cosd(omega)+0.57*cosd(2*L)+0.10*cosd(2*LP)-0.09*cosd(2*omega);
  return new Array(deltaL,deltaO);
}

// Obliquity of ecliptic

function obl_eql(obs) {
  var T=(jd(obs)-2451545.0)/36525;
  var T2=T*T;
  var T3=T2*T;
  var e0=23.0+(26.0/60.0)+(21.448-46.8150*T-0.00059*T2+0.001813*T3)/3600.0;
  var nut=nutation(obs);
  var e=e0+nut[1]/3600.0;
  return e;
}

// Eccentricity of Earths Orbit

function earth_ecc(obs) {
  var T=(jd(obs)-2451545.0)/36525;
  var T2=T*T;
  var T3=T2*T;
  var e=0.016708617-0.000042037*T-0.0000001236*T2;
  return e;
}

// The equation of time function returns minutes

function EoT(obs) {
  var sun_xyz=new Array(0.0,0.0,0.0);
  var earth_xyz=helios(planets[2],obs);
  var radec=radecr(sun_xyz,earth_xyz,obs);
  var T=(jd(obs)-2451545.0)/365250;
  var T2=T*T;
  var T3=T2*T;
  var T4=T3*T;
  var T5=T4*T;
  var L0=rev(280.4664567+360007.6982779*T+0.03032028*T2+
             T3/49931.0-T4/15299.0-T5/1988000.0);
  var nut=nutation(obs);
  var delta=nut[0]/3600.0;
  var e=obl_eql(obs);
  var E=4*(L0-0.0057183-(radec[0]*15.0)+delta*cosd(e));
  while (E < -1440) E+=1440;
  while (E > 1440) E-=1440;
  return E;
}

// Sun rise/set
// obs is the observer
// twilight is one of the following
// for actual rise and set -0.833
// for civil rise and set -6.0
// for nautical rise and set -12.0
// for astronomical rise and set -18.0

function sunrise(obs,twilight) {
  // obs is a reference variable make a copy
  var obscopy=new Object();
  for (var i in obs) obscopy[i] = obs[i];
  var riseset=new Array("","");
  obscopy.hours=12;
  obscopy.minutes=0;
  obscopy.seconds=0;
  lst=local_sidereal(obscopy);
  earth_xyz=helios(planets[2],obscopy);
  sun_xyz=new Array(0.0,0.0,0.0);
  radec=radecr(sun_xyz,earth_xyz,obscopy);
  var UTsun=12.0+radec[0]-lst;
  if (UTsun < 0.0) UTsun+=24.0;
  if (UTsun > 24.0) UTsun-=24.0;
  cosLHA=(sind(twilight)-sind(obs.latitude)*sind(radec[1])) /
           (cosd(obs.latitude)*cosd(radec[1]));
  // Check for midnight sun and midday night.
  if (cosLHA > 1.0) {
    riseset[0]="----";
    riseset[1]="----";
  } else if (cosLHA < -1.0) {
    riseset[0]="++++";
    riseset[1]="++++";
  } else {
  // rise/set times allowing for not today.
    lha=acosd(cosLHA)/15.0;
    if ((UTsun-lha) < 0.0) {
      riseset[0]=hmstring(24.0+UTsun-lha);
    } else {
      riseset[0]=hmstring(UTsun-lha);
    }
    if ((UTsun+lha) > 24.0) {
      riseset[1]=hmstring(UTsun+lha-24.0);
    } else {
      riseset[1]=hmstring(UTsun+lha);
    }
  }
  return(riseset);
}


function doSun(obs,repeat) {
// doSun creates the Sun window
// obs is the observer
// repeat = 0 only do for 1 day
// repeat = 1 do for several days
// repeat = 3 do for the full month

  var oname=sitename();
  var i;
  var obscopy=new Object(); for (var i in obs) obscopy[i] = obs[i];
  var sun_xyz=new Array(0.0,0.0,0.0);
  // var pwin=window.open("","sun","left="+window.screenX+",top="+window.screenY+
  //                               ",menubar,scrollbars,resizable");
  var pwin=window.open("","sun","menubar,scrollbars,resizable");
  with (pwin.document) {
    writeln("<html>");
    writeln("<head>");
    writeln("<title>Javascript Ephemeris - Sun</title>");
    writeln("<link href=\"default.css\" rel=stylesheet type=\"text/css\" />");
    writeln("</head>");
    writeln("<body>");
    write("<center><h2>Sun details for "+oname);
    if (repeat==0) {
      writeln("<br>Date = "+datestring(obscopy));
      writeln(" Time = "+timestring(obscopy,false)+"</h2>");
    } else {
     writeln("<br>Time = "+timestring(obscopy,false)+"</h2>");
    }
    writeln("<table class=\"fixed_bluebox\" border=\"1\" cellpadding=\"5\"");
    writeln("<tr>");
    if (repeat>=1) {
      writeln("<TD align=center>Date</TD>");
    }
    writeln("<td align=center>RA</td>");
    writeln("<td align=center>&nbsp;&nbsp;Dec&nbsp;&nbsp;</td>");
    writeln("<td align=center>Altitude</td>");
    writeln("<td align=center>Azimuth</td>");
    writeln("<td align=center>Earth Distance</td>");
    writeln("<TD colspan=2 align=center>Sun Rise/Set</TD>");
    writeln("<TD colspan=2 align=center>Civil Dawn/Dusk</TD>");
    writeln("<TD colspan=2 align=center>Nautical Dawn/Dusk</TD>");
    writeln("<TD colspan=2 align=center>Astronomical Dawn/Dusk</TD>");
    var count=1;
    if (repeat>=1) {
      var lastdst=checkdst(obscopy);
      if (repeat==2) {
        var count=month_length[obscopy.month-1];
        obscopy.day=1;
        var firstdst=checkdst(obscopy);
        if (firstdst!=lastdst) {
           obscopy.tz+=(firstdst-lastdst);
           lastdst=firstdst;
           writeln("<TR><TH colspan=\"14\">Daylight savings setting corrected</TH></TR>");
        }
      } else {
        var count=document.table1.Times.selectedIndex+1;
      }
    }
    while (count>0) {
      writeln("<TR>");
      if (repeat>=1) writeln("<TD>"+datestring(obscopy)+"</TD>");
      var earth_xyz=helios(planets[2],obscopy);
      var radec=radecr(sun_xyz,earth_xyz,obscopy);
      var altaz=radtoaa(radec[0],radec[1],obscopy);
      writeln("<TD align=center>"+hmdstring(radec[0])+"</TD>");
      writeln("<TD align=center>"+anglestring(radec[1],false)+"</TD>");
      writeln("<TD align=center>"+anglestring(altaz[0],false)+"</TD>");
      writeln("<TD align=center>"+anglestring(altaz[1],true)+"</TD>");
      writeln("<TD align=center>"+Math.round(radec[2]*1000.0)/1000.0+"</TD>");
      // Do the various twilight definitions
      var twilight= new Array(-0.833,-6.0,-12.0,-18.0);
      var i;
      for (var i=0; i<4; i++) {
        riseset=sunrise(obscopy,twilight[i]);
        writeln("<TD align=center>"+riseset[0]+"</TD>");
        writeln("<TD align=center>"+riseset[1]+"</TD>");
      }
      writeln("</TR>");
      if (repeat==0) break;
      count-=1;
      if (repeat==1) {
        obscopy.day+=document.table1.Step.selectedIndex+1;
      } else {
        obscopy.day+=1;
      }
      if (obscopy.day > month_length[obscopy.month-1]) {
        obscopy.day-=month_length[obscopy.month-1];
        obscopy.month+=1; 
        if (obscopy.month==13) {
          obscopy.year+=1;
          obscopy.month=1;
        }
      }
      // check if the repeats cross daylight saving boundary
      var dst=checkdst(obscopy);
      if (lastdst != dst) {
        writeln("<TR><TH colspan=\"14\">Clocks Changed</TH></TR>");
        obscopy.tz+=(dst-lastdst);
        lastdst=dst;
      }
    }
    writeln("</TABLE><P>");
    writeln("<TABLE BORDER=1><TR>");
    write("<TD><A HREF=\"javascript:window.print()\">Print</A></TD>");
    write("<TD><A HREF=\"javascript:window.close()\">Close</A></TD>");
    writeln("</TR></TABLE></CENTER></BODY></HTML>");
    close();
  }
  pwin.focus();
}


