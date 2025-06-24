// main.js
// Vroege status-check voordat imports worden geladen
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

// 1. Funnel mag alleen geladen worden bij status=online of status=live
if (!status || !['online', 'live'].includes(status)) {
  document.body.innerHTML = '<div style="text-align:center; padding:40px; font-size:20px;">Deze pagina is niet beschikbaar zonder geldige status-extensie.</div>';
  return;
}

// 2. Toon juiste footer op basis van status
const footerOnline = document.querySelector('.footeronline');
const footerLive = document.querySelector('.footerlive');
if (footerOnline) footerOnline.style.display = status === 'online' ? 'block' : 'none';
if (footerLive) footerLive.style.display = status === 'live' ? 'block' : 'none';

// 3. Verberg IVR-sectie bij status=online
const ivrSection = document.getElementById('ivr-section');
if (ivrSection) {
  ivrSection.style.display = status === 'live' ? 'block' : 'none';
}

// 4. Verberg alle sections met hide-on-live class bij status=live
if (status === 'live') {
  document.querySelectorAll('.hide-on-live').forEach(el => {
    el.style.display = 'none';
  });
}

import { handleFooterDisplay } from './footerControl.js';
import initFlow from './initFlow.js';
import { setupFormSubmit } from './formSubmit.js';
import { setupImageFix } from './imageFix.js';

setupImageFix();
handleFooterDisplay();
initFlow();
setupFormSubmit();
