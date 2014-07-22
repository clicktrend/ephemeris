// JavaScript by Peter Hayes http://www.peter-hayes.freeserve.co.uk/
// Copyright 2001-2004
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page.

// radsep returns the angular separation of 2 objects given RA and dec.

function radsep(ra1,dec1,ra2,dec2){
  var sdec1=sind(dec1);
  var cdec1=cosd(dec1);
  var sdec2=sind(dec2);
  var cdec2=cosd(dec2);
  var angular_separation=acosd(sdec1*sdec2+cdec1*cdec2*cosd(15.0*(ra1-ra2)));
  return angular_separation;
}

function radpos(ra,dec) {
  this.ra=ra;
  this.dec=dec;
}

function doAngles(obs) {
  var obscopy=new Object();
  for (var i in obs) obscopy[i] = obs[i];
  obscopy.hours=12;
  obscopy.minutes=0;
  obscopy.seconds=0;
  var oname=sitename();

  // ra and dec of each object
  var radecs = new Array();

  // sun's position
  var sun_xyz=new Array(0.0,0.0,0.0);
  var earth_xyz=helios(planets[2],obs);
  var radec=radecr(sun_xyz,earth_xyz,obs);
  radecs[0]=new radpos(radec[0],radec[1]);

  // moon's position
  var moontab=MoonPos(obs);
  radecs[1]=new radpos(moontab[0],moontab[1]);

  // planets positions - i is an offset for the tables so earth is skipped
  var i=2;
  for (var p=0;p<8;p++) {
    if (p==2) { 
      i=1;
    } else {
      var planet_xyz = helios(planets[p],obs);
      radec=radecr(planet_xyz,earth_xyz,obs);
      radecs[i+p] = new radpos(radec[0],radec[1]);
    }
  }

  // User defined object specified by RA/Dec table entry
  var ra=parsecol(document.table1.ra.value);
  var dec=parsecol(document.table1.dec.value);
  radecs[9] = new radpos(ra,dec);
  // Now print the table
  var awin=window.open("","Angles","menubar,scrollbars,resizable");
  with (awin.document) {
    writeln("<HTML>");
    writeln("<HEAD>");
    writeln("<TITLE>Astronomy Javascript Angles</TITLE>");
    writeln("<link href=\"default.css\" rel=stylesheet type=\"text/css\"/>");
    writeln("</HEAD>");
    writeln("<BODY>");
    writeln("<CENTER>");
    write("<H2>");
    write("Angular Separations for "+oname+"<BR>");
    write("Date = "+datestring(obs)+" ");
    write("Time = "+timestring(obs,false));
    writeln("</H2>");
    writeln("<table  class=\"fixed_bluebox\" border=\"1\" cellpadding=\"5\"");
    // i is offset for the planet table to get the names
    i=2;
    writeln("<TR>");
    writeln("<TD align=center>&nbsp</TD>");
    for (var p=0; p<10; p++) {
      if (p==0) {
        writeln("<TD align=center><B>Sun</B></TD>");
      } else {
        if (p==1) {
          writeln("<TD align=center><B>Moon</B></TD>");
        } else {
          if (p==9) {
            writeln("<TD align=center><B>User defined</B></TD>");
          } else {
            if (p==4) i=1;
            writeln("<TD align=center><B>"+planets[p-i].name+"</B></TD>");
          }
        }
      }
    }
    i=2;
    for (var p=0; p<10; p++) {
      if (p==0) {
        writeln("<TR><TD align=center><B>Sun</B></TD>");
      } else {
        if (p==1) {
          writeln("<TR><TD align=center><B>Moon</B></TD>");
        } else {
          if (p==9) {
            writeln("<TR><TD align=center><B>User defined</B></TD>");
          } else {
            if (p==4) i=1;
            writeln("<TR><TD align=center><B>"+planets[p-i].name+"</B></TD>");
          }
        }
      }
      for (var q=0; q<10 ;q++){
      if (p==q) {
        writeln("<TD align=center>&nbsp</TD>");
      } else {
        var sep=radsep(radecs[p].ra,radecs[p].dec,radecs[q].ra,radecs[q].dec);
        writeln("<TD align=center>"+anglestring(sep,true)+"</TD>");
      }
    }
  }

  writeln("</TABLE><P>");
  writeln("<A HREF=\"javascript:window.close()\">close window</A>");
  writeln("</CENTER></BODY></HTML>");
  close();
  }
  awin.focus();
}


