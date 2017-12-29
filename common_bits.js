/*
  COMMON_BITS
  By: Saad Azim
  Last Edit: 2017.12.29

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
      ,functionGetById=function(){
        'use strict';
        return doc.getElementById(arguments[0]);
      }
      ,functionGetByTag=function(){
        'use strict';
        return doc.getElementsByTagName(arguments[0]);
      }
      ,functionGetByClass=function(){
        'use strict';
        return doc.getElementsByClassName(arguments[0]);
      }

      ,functionClearClass=function(){
        'use strict';
        var tmpElement=arguments[0];
        tmpElement.classList.remove(arguments[1]);
      }
      ,functionSetClass=function(){
        'use strict';
        var tmpElement=arguments[0];
        //Clean up the classname in case there are duplicates
        functionClearClass(tmpElement,arguments[1]);
        tmpElement.classList.add(arguments[1]);
      }

      ,functionExterminate=function(){
        'use strict';
        var tmpElement=arguments[0];
        tmpElement.parentNode.removeChild(tmpElement);
      }

      ,functionSetAttributes=function(){
        'use strict';
        //Can't make changes to arguments[0], needs to copy object to a temporary variable and set attributes for that
        var tmpElement=arguments[0];
        arguments[1].forEach(function(attribute){
        tmpElement.setAttribute(attribute[0],attribute[1]);
        });
        return tmpElement;
      }

      ,functionCreateElement=function(){
        'use strict';
        //arguments[0]=DOM Element
        //arguments[1]=ID
        //arguments[2]=Attributes
        //arguments[3]=Class
        var tmpElement=doc.createElement(arguments[0])
            ;
        if(arguments[1] && arguments[1]!==null){
          tmpElement.id=arguments[1];
        }
        if(arguments[2] && arguments[2].length>0){
          tmpElement=functionSetAttributes(tmpElement,arguments[2]);
        }
        if(arguments[3]){
          tmpElement.className=arguments[3];
        }
        return tmpElement;
      }

      ,functionAppendText=function(){
        'use strict';
        var tmpObject=arguments[0];
        tmpObject.innerHTML+=arguments[1];
      }
      ,functionPrependText=function(){
        'use strict';
        var tmpObject=arguments[0];
        tmpObject.innerHTML=arguments[1]+tmpObject.innerHTML;
      }

      ,functionAppendFormData=function(){
        'use strict';
        var tmpFormData=new FormData();
        arguments[0].forEach(function(data){
          tmpFormData.append(data[0],data[1]);
        });
        return tmpFormData;
      }

      ,functionAppendScript=function(strSrc,domParent,functionOnLoad){
        'use strict';
        var domScript=functionCreateElement('script')
            ;
        domScript.type='text/javascript';
        domScript.src=strSrc;
        domScript.addEventListener('load',functionOnLoad,false);
        domParent.appendChild(domScript);
      }


      ,functionBuild=function(){
        'use strict';
        var bit=arguments[0]
            ,tmpElement
            ,tmpParent
            ,tmpId
            ,tmpAttribute
            ,tmpBubble
            ;
        tmpId=bit.id || null;
        tmpAttribute=bit.attributes || null;

        tmpElement=functionCreateElement(bit.type,tmpId,tmpAttribute,bit.grade);

        tmpElement.innerHTML=bit.txt || null;
        tmpElement.style.display=bit.display || null;

        if(bit.listener){
          tmpBubble=bit.listener.bubble || false;
          tmpElement.addEventListener(bit.listener.type,bit.listener.response,tmpBubble);
        }

        if(bit.domParent.tag){
          tmpParent=(bit.domParent.index)?functionGetByTag(bit.domParent.tag)[bit.domParent.index]:functionGetByTag(bit.domParent.tag)[0];
        }else if(bit.domParent.id){
          tmpParent=functionGetById(bit.domParent.id);
        }else if(bit.domParent.grade){
          tmpParent=(bit.domParent.index)?functionGetByClass(bit.domParent.grade)[bit.domParent.index]:functionGetByClass(bit.domParent.grade)[0]; 
        }

        if(bit.prepend){
          tmpParent.prepend(tmpElement);
        }else{
          tmpParent.appendChild(tmpElement);
        }

        tmpElement=null;
      }

      //XHR request, now wrapped in promises
      ,functionXHR=function(strUrl,formData,functionResponse){
        'use strict';
        //Make a promise object, with resolve(success) & reject(error)
        return new Promise(function(resolve,reject){
          //Actual XHR bits
          const xhr=new XMLHttpRequest();
          xhr.open('POST',strUrl,true);
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
          //functionResponse(strResponse);
          console.log('Error...');
          console.log(strResponse);
        });
      }
      ;
