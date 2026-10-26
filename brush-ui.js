/* Presentation only: move the existing controls, preserving IDs and listeners. */
(()=>{'use strict';
const t=(es,en)=>window.PrimalI18n?.lang==='en'?en:es;
function fold(node,es,en){if(!node)return;const details=document.createElement('details');details.className='ui-options';const summary=document.createElement('summary');details.append(summary);node.before(details);details.append(node);const label=()=>{summary.textContent=t(es,en);};label();document.addEventListener('primal-language-change',label);return details;}
fold(document.getElementById('musicDock'),'Música y volumen','Music and volume');
fold(document.querySelector('.execution-control'),'Ajustar pausa entre combinaciones','Adjust time between combinations');
const sheet=document.querySelector('#recordSheet .sheet-body');
if(sheet){const hints=[...sheet.querySelectorAll(':scope > .record-hint')];const details=document.createElement('details');details.className='ui-options';const summary=document.createElement('summary');details.append(summary);const privacy=sheet.querySelector('.record-privacy');sheet.insertBefore(details,privacy);hints.forEach(n=>details.append(n));const label=()=>summary.textContent=t('Cómo funciona la grabación','How recording works');label();document.addEventListener('primal-language-change',label);}
})();
