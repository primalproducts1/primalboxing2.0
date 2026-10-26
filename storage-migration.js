/* Conserva ajustes y actividad de versiones anteriores en este mismo origen.
   Identifica el conjunto antiguo por su estructura, sin nombres de terceros.
   El navegador no permite migrar automáticamente datos entre dominios. */
(()=>{'use strict';try{
  window.PrimalLegacyStorageKeys=[];
  const keys=Object.keys(localStorage);
  for(const key of keys){
    if(key.startsWith('primal-')||!key.endsWith('-settings'))continue;
    let settings;try{settings=JSON.parse(localStorage.getItem(key));}catch{continue;}
    if(!settings||!('stance'in settings)||!('rounds'in settings)||!('gap'in settings)||!('focus'in settings))continue;
    const prefix=key.slice(0,-'settings'.length);
    for(const suffix of ['settings','history','language','audio-v3']){
      const old=prefix+suffix,value=localStorage.getItem(old),next='primal-'+suffix;
      if(value!==null)window.PrimalLegacyStorageKeys.push(old);
      if(value!==null&&localStorage.getItem(next)===null)localStorage.setItem(next,value);
    }
    break;
  }
}catch{ /* La app sigue funcionando sin almacenamiento. */ }} )();
