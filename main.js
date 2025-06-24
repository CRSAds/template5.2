// main.js
import { handleFooterDisplay } from './footerControl.js';
import initFlow from './initFlow.js';
import { setupFormSubmit } from './formSubmit.js';
import { setupImageFix } from './imageFix.js';

setupImageFix();
handleFooterDisplay();
initFlow();
setupFormSubmit();
