/*
  COMMON_BITS
  By: Saad Azim
  Last Edit: 2017.12.14

  I made this basically to make coding a little easier for me. The initial ideas behind this were:
    a) using easy to understand names
    b) minimizing the chance for errors (i.e. the actual JS code to get an element by its ID, getElementById, appears only once)
    c) easy compression of data

  Released under GNU GPL 3.0
  ... er ... that's about it.
*/

/*jslint es6:true,this:true*/
const doc=document
      //Standard bits, wrapped in functions
      ,functionGetById=function(strId){
        "use strict";
        return doc.getElementById(strId);
      }
      ,functionGetByTag=function(strTag){
        "use strict";
        return doc.getElementsByTagName(strTag);
      }
      ,functionGetByClass=function(strClass){
        "use strict";
        return doc.getElementsByClassName(strClass);
      }

      ,functionCreateElement=function(strElement,strId){
        "use strict";
        var tmpElement=doc.createElement(strElement)
            ;
        if(strId){
          tmpElement.id=strId;
        }
        return tmpElement;
      }
      ,functionAppendScript=function(strSrc,domParent,functionOnLoad){
        "use strict";
        var domScript=functionCreateElement("script")
            ;
        domScript.type="text/javascript";
        domScript.src=strSrc;
        domScript.addEventListener("load",functionOnLoad,false);
        domParent.appendChild(domScript);
      }

      //XHR request, now wrapped in promises
      ,functionXHR=function(strUrl,formData,functionResponse){
        "use strict";
        //Make a promise object, with resolve(success) & reject(error)
        return new Promise(function(resolve,reject){
          //Actual XHR bits
          const xhr=new XMLHttpRequest();
          xhr.open("POST",strUrl,true);
          //Standard load & error bits, but instead of functions as response, resolve & reject are set
          xhr.onload=function(){
            if(this.status>=200 && this.status<300){
              resolve(xhr.response);
            }else{
              reject('{"status":"'+this.status+'","statusText":"'+xhr.statusText+'"}');
            }
          };
          xhr.onerror=function(){
            reject('{"status":"'+this.status+'","statusText":"'+xhr.statusText+'"}');
          };
          xhr.send(formData);
        //The responses are called via .then() and .catch()
        }).then(function(strResponse){
          functionResponse(strResponse);
        })
        .catch(function(strResponse){
          functionResponse(strResponse);
        });
      }
      ;
