/*
  COMMON_BITS
  By: Saad Azim
  Last Edit: 2017.05.09

  I made this basically to make coding a little easier for me. The initial ideas behind this were:
    a) using easy to understand names
    b) minimizing the chance for errors (i.e. the actual JS code to get an element by its ID, getElementById, appears only once)
    c) easy compression of data

  Released under GNU GPL 3.0
  ... er ... that's about it.
*/
var functionGetById
    ,functionGetByTag

    ,functionCreateElement


    ,functionAppendScript


    ,doc=document

    ;
functionGetById=function(strId){
  "use strict";
  return doc.getElementById(strId);
};
functionGetByTag=function(strTag){
  "use strict";
  return doc.getElementsByTagName(strTag);
};

functionCreateElement=function(strElement,strId){
  "use strict";
  var tmpElement=doc.createElement(strElement)
      ;
  if(strId){
    tmpElement.id=strId;
  }
  return tmpElement;
};

functionAppendScript=function(strSrc,domParent,functionOnLoad){
  "use strict";
  var domScript=functionCreateElement("script")
      ;
  domScript.type="text/javascript";
  domScript.src=strSrc;
  domScript.addEventListener("load",functionOnLoad,false);
  domParent.appendChild(domScript);
};
