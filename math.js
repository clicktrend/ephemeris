// JavaScript by Peter Hayes Copyright 2001-2005
// This code is made freely available but please keep this notice.
// I accept no liability for any errors in my coding but please
// let me know of any errors you find. My address is on my home page
// http://www.aphayes.pwp.blueyonder.co.uk/

// Extensions to the Math routines - Trig routines in degrees

function rev(angle){return angle-Math.floor(angle/360.0)*360.0;}
function sind(angle){return Math.sin((angle*Math.PI)/180.0);}
function cosd(angle){return Math.cos((angle*Math.PI)/180.0);}
function tand(angle){return Math.tan((angle*Math.PI)/180.0);}
function asind(c){return (180.0/Math.PI)*Math.asin(c);}
function acosd(c){return (180.0/Math.PI)*Math.acos(c);}
function atan2d(y,x){return (180.0/Math.PI)*Math.atan(y/x)-180.0*(x<0);}

// Functions used for converting Basic code
function SGN(x) { return (x<0)?-1:+1; }

// Routines from Dennis Allen www.stargazing.net/mas

//
//    This function returns the integer of a number.
//
function intr(num) {
  with (Math) {
    var n = floor(abs(num)) ; if (num < 0) n = n * -1
  }
  return n
}
//
//    This function returns a numeric value.
//
function NumFloat(num) {
  with (Math) {
    var temp = parseFloat(num)
    if (!(temp > 0 || temp < 0 || temp == 0)) temp = 0
  }
  return temp
}


