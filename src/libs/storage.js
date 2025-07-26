import { useEffect, useState } from "react";

export function loadStorage(keys,ctx) {   
     
        function load(key,isjson=false) {
            let _storage = localStorage.getItem(key)
            if(_storage==null)return
            if(isjson)
            _storage = JSON.parse(_storage)
            ctx[key] = _storage
        }
        keys.map(([key,isjson])=>load(key,isjson))
    }


export function setStorage(key,value) {
 
    if(typeof(value))value = JSON.stringify(value)
    localStorage.setItem(key,value)
   
}



