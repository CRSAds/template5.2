// main.js
import initFlow from './initFlow.js';
import { setupFormSubmit } from './formSubmit.js';
import { setupImageFix } from './imageFix.js';
import { handleFooterDisplay } from './footerControl.js';

setupImageFix();
handleFooterDisplay();
initFlow();
setupFormSubmit();
