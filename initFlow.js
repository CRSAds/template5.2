// initFlow.js (NL versie, met dropdown coreg ondersteuning)
import { reloadImages } from './imageFix.js';
import { fetchLead, buildPayload } from './formSubmit.js';
import sponsorCampaigns from './sponsorCampaigns.js';
import setupSovendus from './setupSovendus.js';
import { fireFacebookLeadEventIfNeeded } from './facebookpixel.js';

const longFormCampaigns = [];
window.longFormCampaigns = longFormCampaigns;
let hasSubmittedShortForm = false;

function isSuspiciousLead(email) {
  const suspiciousPatterns = [
    /@teleworm\.us$/i,
    /michaeljm/i,
    /[a-z]{3,12}jm.*@/i,
    /[Mm]{3,}/
  ];
  return suspiciousPatterns.some(pattern => pattern.test(email));
}

function validateForm(form) {
  let valid = true;
  let messages = [];

  if (form.id === 'lead-form') {
    const gender = form.querySelector('input[name="gender"]:checked');
    const firstname = form.querySelector('#firstname')?.value.trim();
    const lastname = form.querySelector('#lastname')?.value.trim();
    const dob_day = form.querySelector('#dob-day')?.value.trim();
    const dob_month = form.querySelector('#dob-month')?.value.trim();
    const dob_year = form.querySelector('#dob-year')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();

    if (!gender) messages.push('Geslacht invullen');
    if (!firstname) messages.push('Voornaam invullen');
    if (!lastname) messages.push('Achternaam invullen');
    if (!dob_day || !dob_month || !dob_year) messages.push('Geboortedatum invullen');
    if (!email || !email.includes('@') || !email.includes('.')) {
      messages.push('Geldig e-mailadres invullen');
    }

    valid = messages.length === 0;
  }

  if (form.id === 'long-form') {
    const postcode = form.querySelector('#postcode')?.value.trim();
    const straat = form.querySelector('#straat')?.value.trim();
    const huisnummer = form.querySelector('#huisnummer')?.value.trim();
    const woonplaats = form.querySelector('#woonplaats')?.value.trim();
    const telefoon = form.querySelector('#telefoon')?.value.trim();

    if (!postcode) messages.push('Postcode invullen');
    if (!straat) messages.push('Straat invullen');
    if (!huisnummer) messages.push('Huisnummer invullen');
    if (!woonplaats) messages.push('Woonplaats invullen');
    if (!telefoon) messages.push('Telefoonnummer invullen');
    else if (telefoon.length > 11) messages.push('Telefoonnummer mag max. 11 tekens bevatten');

    valid = messages.length === 0;
  }

  if (!valid) {
    alert('Vul aub alle velden correct in:\n' + messages.join('\n'));
  }

  return valid;
}

export default function initFlow() {
  const params = new URLSearchParams(window.location.search);
  const statusParam = params.get('status');

  const longFormSection = document.getElementById('long-form-section');
  if (longFormSection) {
    longFormSection.style.display = 'none';
    longFormSection.setAttribute('data-displayed', 'false');
  }

  const steps = Array.from(document.querySelectorAll('.flow-section, .coreg-section'))
    .filter(step => {
      if (statusParam === 'online') {
        return !step.classList.contains('status-live') && !step.classList.contains('ivr-section');
      }
      if (statusParam === 'live') return true;
      return false;
    });

  longFormCampaigns.length = 0;

  if (!window.location.hostname.includes("swipepages.com")) {
    steps.forEach((el, i) => el.style.display = i === 0 ? 'block' : 'none');
    document.querySelectorAll('.hide-on-live, #long-form-section').forEach(el => {
      el.style.display = 'none';
    });
  }

  steps.forEach((step, stepIndex) => {
    // --- Flow-next knoppen (ook final coreg, skip, etc) ---
    step.querySelectorAll('.flow-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const skipNext = btn.classList.contains('skip-next-section');
        const isFinalCoreg = btn.classList.contains('final-coreg');

        if (isFinalCoreg && longFormCampaigns.length === 0) {
          step.style.display = 'none';
          const next = steps[stepIndex + 2];
          if (next) {
            next.style.display = 'block';
            reloadImages(next);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const campaignId = step.id?.startsWith('campaign-') ? step.id : null;
        const campaign = sponsorCampaigns[campaignId];

        if (campaign?.coregAnswerKey && btn.classList.contains('sponsor-next')) {
          sessionStorage.setItem(campaign.coregAnswerKey, btn.innerText.trim());
        }

        if (step.id === 'voorwaarden-section' && !btn.id) {
          sessionStorage.removeItem('sponsor_optin');
        }

        const form = step.querySelector('form');
        const isShortForm = form?.id === 'lead-form';

        if (form && !validateForm(form)) return;

        if (form) {
          const gender = form.querySelector('input[name="gender"]:checked')?.value || '';
          const firstname = form.querySelector('#firstname')?.value.trim() || '';
          const lastname = form.querySelector('#lastname')?.value.trim() || '';
          const dob_day = form.querySelector('#dob-day')?.value || '';
          const dob_month = form.querySelector('#dob-month')?.value || '';
          const dob_year = form.querySelector('#dob-year')?.value || '';
          const email = form.querySelector('#email')?.value.trim() || '';
          const urlParams = new URLSearchParams(window.location.search);
          const t_id = urlParams.get('t_id') || crypto.randomUUID();

          sessionStorage.setItem('gender', gender);
          sessionStorage.setItem('firstname', firstname);
          sessionStorage.setItem('lastname', lastname);
          sessionStorage.setItem('dob_day', dob_day);
          sessionStorage.setItem('dob_month', dob_month);
          sessionStorage.setItem('dob_year', dob_year);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('t_id', t_id);

          if (isShortForm && !hasSubmittedShortForm) {
            hasSubmittedShortForm = true;
            const includeSponsors = !(step.id === 'voorwaarden-section' && !btn.id);
            const payload = buildPayload(sponsorCampaigns["campaign-leadsnl"], { includeSponsors });

            console.log("📦 Payload voor verzending:", payload);

            if (!payload.f_1453_campagne_url?.includes('?status=online')) {
              console.error("❌ URL mist status=online:", payload.f_1453_campagne_url);
              return;
            }

            if (isSuspiciousLead(email)) {
              console.warn("⛔ Verdachte lead geblokkeerd (short form):", email);
              step.style.display = 'none';
              const next = skipNext ? steps[stepIndex + 2] : steps[stepIndex + 1];
              if (next) {
                next.style.display = 'block';
                reloadImages(next);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              return;
            }

            fetchLead(payload).then(() => {
              fireFacebookLeadEventIfNeeded();
              step.style.display = 'none';
              const next = skipNext ? steps[stepIndex + 2] : steps[stepIndex + 1];
              if (next) {
                next.style.display = 'block';
                reloadImages(next);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            });
          }

          if (form.id === 'long-form') {
            const payload = buildPayload(longFormCampaigns[0]);
            fetchLead(payload);
          }
        }

        step.style.display = 'none';
        const next = skipNext ? steps[stepIndex + 2] : steps[stepIndex + 1];
        if (next) {
          next.style.display = 'block';
          reloadImages(next);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

// --- Sponsor-optin knoppen (JA-knoppen coreg, met multi-cid support) ---
step.querySelectorAll('.sponsor-optin').forEach(button => {
  button.addEventListener('click', () => {
    const campaignId = button.id;
    const campaign = sponsorCampaigns[campaignId];
    if (!campaign) return;

    const answer = button.innerText.toLowerCase();
    const isPositive = ['ja', 'yes', 'akkoord'].some(word => answer.includes(word));

    // Verzamel alle campagne sleutels die doorgestuurd moeten worden
    let campaignKeys = [campaignId];
    if (isPositive && Array.isArray(campaign.forwardTo)) {
      campaignKeys = campaign.forwardTo;
    }

    // Zet het antwoord op alle relevante coregAnswerKey’s
    campaignKeys.forEach(key => {
      const c = sponsorCampaigns[key];
      if (c && c.coregAnswerKey) {
        sessionStorage.setItem(c.coregAnswerKey, answer);
      }
    });

    // Voeg alle requiresLongForm campagnes toe aan longFormCampaigns
    campaignKeys.forEach(key => {
      const c = sponsorCampaigns[key];
      if (c && c.requiresLongForm && isPositive) {
        if (!longFormCampaigns.find(item => item.cid === c.cid)) {
          longFormCampaigns.push(c);
        }
      } else if (c && !c.requiresLongForm && isPositive) {
        const coregPayload = buildPayload(c);
        const email = sessionStorage.getItem('email') || '';
        if (!isSuspiciousLead(email)) {
          fetchLead(coregPayload);
        }
      }
    });

    // Volgende stap tonen
    step.style.display = 'none';
    const next = steps[steps.indexOf(step) + 1];
    if (next) {
      next.style.display = 'block';
      reloadImages(next);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

  // Dropdwon handler  
  step.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', () => {
    const selectedValue = select.value;
    if (!selectedValue) return;

    // Check: zit deze key in sponsorCampaigns? Dan is het een directe lead (multi-campaign)
    const campaign = sponsorCampaigns[selectedValue];
    if (campaign && campaign.alwaysSend) {
      // Sla antwoord op (option tekst in sessionStorage)
      sessionStorage.setItem(`dropdown_answer_${selectedValue}`, select.options[select.selectedIndex].text);

      // Verstuur de lead
      const payload = buildPayload(campaign);
      fetchLead(payload);

      // Schakel door naar volgende sectie
      step.style.display = 'none';
      const next = steps[steps.indexOf(step) + 1];
      if (next) {
        next.style.display = 'block';
        reloadImages(next);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Anders reguliere dropdown zoals trefzeker
    const campaignKey = select.getAttribute('data-dropdown-campaign') || select.id;
    const coregCampaign = sponsorCampaigns[campaignKey];
    if (coregCampaign && coregCampaign.answerFieldKey) {
      sessionStorage.setItem(`dropdown_answer_${campaignKey}`, selectedValue);

      if (coregCampaign.requiresLongForm) {
        if (!longFormCampaigns.find(c => c.cid === coregCampaign.cid)) {
          longFormCampaigns.push(coregCampaign);
        }
      }

      step.style.display = 'none';
      const next = steps[steps.indexOf(step) + 1];
      if (next) {
        next.style.display = 'block';
        reloadImages(next);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

  });

  // ========== Multi-step coreg logic ================
  Object.entries(sponsorCampaigns).forEach(([campaignId, config]) => {
    if (config.hasCoregFlow && config.coregAnswerKey) {
      initGenericCoregSponsorFlow(campaignId, config.coregAnswerKey);
    }
  });

  // ========== Sovendus doorschakeling ============
  const sovendusSection = document.getElementById('sovendus-section');
  const nextAfterSovendus = sovendusSection?.nextElementSibling;

  if (sovendusSection && nextAfterSovendus) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);

          setupSovendus();

          setTimeout(() => {
            sovendusSection.style.display = 'none';
            nextAfterSovendus.style.display = 'block';
            reloadImages(nextAfterSovendus);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 10000);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(sovendusSection);
  }
}

// ========== MULTI-STEP COREG LOGICA ================
const coregAnswers = {};
window.coregAnswers = coregAnswers;

function initGenericCoregSponsorFlow(sponsorId, coregAnswerKey) {
  coregAnswers[sponsorId] = [];

  const allSections = document.querySelectorAll(`[id^="campaign-${sponsorId}"]`);
  allSections.forEach(section => {
    const buttons = section.querySelectorAll('.flow-next');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const answerText = button.innerText.trim();
        coregAnswers[sponsorId].push(answerText);

        if (!button.classList.contains('sponsor-next')) return;

        let nextStepId = '';
        button.classList.forEach(cls => {
          if (cls.startsWith('next-step-')) {
            nextStepId = cls.replace('next-step-', '');
          }
        });

        section.style.display = 'none';

        if (nextStepId) {
          const nextSection = document.getElementById(nextStepId);
          if (nextSection) {
            nextSection.style.display = 'block';
          } else {
            handleGenericNextCoregSponsor(sponsorId, coregAnswerKey);
          }
        } else {
          handleGenericNextCoregSponsor(sponsorId, coregAnswerKey);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  });
}

function handleGenericNextCoregSponsor(sponsorId, coregAnswerKey) {
  const combinedAnswer = coregAnswers[sponsorId].join(' - ');
  sessionStorage.setItem(coregAnswerKey, combinedAnswer);

  const currentCoregSection = document.querySelector(`.coreg-section[style*="display: block"]`);
  const flowNextBtn = currentCoregSection?.querySelector('.flow-next');
  flowNextBtn?.click();

  setTimeout(() => checkIfLongFormShouldBeShown(), 100);
}

function checkIfLongFormShouldBeShown() {
  const longFormSection = document.getElementById('long-form-section');
  const alreadyShown = longFormSection?.getAttribute('data-displayed') === 'true';
  const remainingCoregs = Array.from(document.querySelectorAll('.coreg-section'))
    .filter(s => window.getComputedStyle(s).display !== 'none');

  if (remainingCoregs.length > 0 || alreadyShown) return;

  if (longFormCampaigns.length > 0) {
    longFormSection.style.display = 'block';
    longFormSection.setAttribute('data-displayed', 'true');
    reloadImages(longFormSection);
  } else {
    const next = longFormSection?.nextElementSibling;
    if (next) {
      next.style.display = 'block';
      reloadImages(next);
    }
  }
}
