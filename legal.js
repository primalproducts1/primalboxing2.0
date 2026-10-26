(()=>{'use strict';
const cfg=window.PRIMAL_LEGAL||{},key='primal-legal-acceptance';
for(const el of document.querySelectorAll('[data-legal]'))el.textContent=cfg[el.dataset.legal]||'';
for(const el of document.querySelectorAll('[data-contact]')){el.textContent=cfg.email||'';el.href='mailto:'+(cfg.email||'');}
if(cfg.legalName)for(const el of document.querySelectorAll('[data-owner]'))el.textContent=cfg.legalName;
if(cfg.notificationAddress)for(const el of document.querySelectorAll('[data-address]'))el.textContent=cfg.notificationAddress;
if(cfg.legalName&&cfg.notificationAddress)document.querySelector('[data-incomplete]')?.remove();
if(!document.getElementById('start'))return;
const english=()=>window.PrimalI18n?.lang==='en',t=(es,en)=>english()?en:es;
let accepted=false,pending=null;
try{accepted=JSON.parse(localStorage.getItem(key)||'null')?.version===cfg.version;}catch{}
const gate=document.createElement('dialog');gate.className='legal-dialog';gate.id='legalWelcome';gate.setAttribute('aria-labelledby','legalWelcomeTitle');document.body.append(gate);
function showGate(target){
 pending=target;
 gate.innerHTML=`<h2 id="legalWelcomeTitle">${t('Antes de tu primer round','Before your first round')}</h2><p>${t('Entrena a tu ritmo y detente si sientes dolor, mareo o malestar. Esta herramienta no sustituye a un entrenador ni la orientación médica.','Train at your own pace. Stop if you feel pain, dizziness or discomfort. This tool does not replace a coach or medical advice.')}</p><p>${t('Tu actividad se guarda en este navegador. La cámara y el micrófono son opcionales.','Your activity is stored in this browser. Camera and microphone access are optional.')}</p><p><a href="legal.html#terminos" target="_blank" rel="noopener">${t('Términos de uso','Terms of use (Spanish)')}</a> · <a href="legal.html#privacidad" target="_blank" rel="noopener">${t('Privacidad','Privacy (Spanish)')}</a> · <a href="legal.html#seguridad" target="_blank" rel="noopener">${t('Seguridad','Safety (Spanish)')}</a></p><label><input type="checkbox" id="legalAcceptCheck"><span>${t('Tengo 18 años o más, acepto los términos de uso y he leído las precauciones de entrenamiento.','I am 18 or older, accept the terms of use and have read the training precautions.')}</span></label><div class="legal-actions"><button type="button" id="legalCancel">${t('Ahora no','Not now')}</button><button type="button" class="primary" id="legalAccept" disabled>${t('Aceptar y continuar','Accept and continue')}</button></div>`;
 gate.querySelector('#legalAcceptCheck').onchange=e=>gate.querySelector('#legalAccept').disabled=!e.target.checked;
 gate.querySelector('#legalCancel').onclick=()=>{pending=null;gate.close();};
 gate.querySelector('#legalAccept').onclick=()=>{
  if(!gate.querySelector('#legalAcceptCheck').checked)return;
  accepted=true;try{localStorage.setItem(key,JSON.stringify({version:cfg.version,acceptedAt:new Date().toISOString()}));}catch{}
  const target=pending;pending=null;gate.close();target?.click();
 };
 gate.showModal();
}
gate.addEventListener('cancel',()=>{pending=null;});
document.addEventListener('click',e=>{
 const target=e.target.closest?.('#start,#recordStart');
 if(!target||accepted)return;
 e.preventDefault();e.stopImmediatePropagation();showGate(target);
},true);
// Do not let the trainer's space shortcut run behind a legal dialog.
document.addEventListener('keydown',e=>{if(e.code==='Space'&&document.querySelector('.legal-dialog[open]'))e.stopImmediatePropagation();},true);
const privacy=document.createElement('dialog');privacy.className='legal-dialog';privacy.id='legalPrivacy';privacy.setAttribute('aria-labelledby','privacyTitle');document.body.append(privacy);
document.getElementById('privacyControls').onclick=()=>{
 if(!['idle','done','paused'].includes(clock.state))pause(t('Sesión en pausa.','Workout paused.'));
 privacy.innerHTML=`<h2 id="privacyTitle">${t('Tus datos en este dispositivo','Your data on this device')}</h2><p>${t('Puedes borrar ajustes, idioma, actividad, trofeos y aceptación de términos de PRIMAL. Esta acción no se puede deshacer.','You can erase PRIMAL settings, language, activity, trophies and terms acceptance. This cannot be undone.')}</p><p>${t('No elimina videos descargados, archivos compartidos, permisos de cámara ni mensajes de correo. Para revocar permisos, usa los ajustes del navegador.','It does not delete downloaded videos, shared files, camera permissions or emails. Revoke permissions in your browser settings.')}</p><p>${t('Guarda tu video antes de continuar: la página se recargará.','Save your video first: the page will reload.')}</p><p class="legal-status" role="status"></p><div class="legal-actions"><button type="button" id="privacyClose">${t('Cerrar','Close')}</button><button type="button" id="privacyErase">${t('Borrar datos de PRIMAL','Erase PRIMAL data')}</button></div>`;
 privacy.querySelector('#privacyClose').onclick=()=>privacy.close();
 privacy.querySelector('#privacyErase').onclick=()=>{
  if(window.PrimalRecorder?.active){privacy.querySelector('[role=status]').textContent=t('Detén y guarda la grabación antes de borrar tus datos.','Stop and save the recording before erasing your data.');return;}
  if(!confirm(t('¿Borrar los datos de PRIMAL en este navegador? Se perderán los trofeos y la actividad.','Erase PRIMAL data in this browser? Trophies and activity will be lost.')))return;
  try{
   const keys=['primal-settings','primal-history','primal-language','primal-audio-v3','primal-technique-default-v1','primal-club-v1','primal-championships-v1','primal-championships-workout-backup-v1',key,...(window.PrimalLegacyStorageKeys||[])];
   for(const k of new Set(keys)){localStorage.removeItem(k);sessionStorage.removeItem(k);}
   accepted=false;location.reload();
  }catch{privacy.querySelector('[role=status]').textContent=t('El navegador no permitió borrar los datos. Puedes hacerlo desde los ajustes del sitio.','The browser did not allow deletion. Use the browser site settings.');}
 };
 privacy.showModal();
};
})();
