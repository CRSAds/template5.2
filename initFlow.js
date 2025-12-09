import { reloadImages } from './imageFix.js';
import { fetchLead, buildPayload } from './formSubmit.js';
import originalSponsorCampaigns from './sponsorCampaigns.js';
import setupSovendus from './setupSovendus.js';
import { fireFacebookLeadEventIfNeeded } from './facebookpixel.js';

// =============================================================
// ✅ FLOW LOGGING (vereenvoudigd + sectie-class based)
// =============================================================

const FLOW_LOG_ENDPOINT =
  window.FLOW_LOG_ENDPOINT ||
  "https://globalcoregflow-nl.vercel.app/api/flow-log.js";

function sendFlowLog(event) {
  try {
    fetch(FLOW_LOG_ENDPOINT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        ts: Date.now(),
        url: window.location.href,
        ua: navigator.userAgent
      })
    });
  } catch (e) {}
}

// 🔥 NIEUW: log sectiezichtbaarheid op basis van class `log-*`
function logSectionVisible(section) {
  if (!section) return;

  const cls = Array.from(section.classList).find(c => c.startsWith("log-"));
  if (!cls) return; // geen logging voor deze sectie

  const clean = cls.replace("log-", "");       // log-coreg → coreg
  const eventName = `${clean}_visible`;        // → coreg_visible

  sendFlowLog(eventName);
}

// =============================================================
// Split-campagnes (originele code)
// =============================================================

function selectSplitCampaigns(campaigns) {
  const groups = {};

  Object.entries(campaigns).forEach(([key, campaign]) => {
    if (campaign.splitGroup) {
      if (!groups[campaign.splitGroup]) groups[campaign.splitGroup] = [];
      groups[campaign.splitGroup].push({ ...campaign, key });
    }
  });

  const selectedKeys = new Set();
  const selected = {};

  Object.entries(groups).forEach(([groupName, variants]) => {
    const r = Math.random() * 100;
    let total = 0;
    for (const variant of variants) {
      total += variant.splitPercentage || 0;
      if (r <= total && !selectedKeys.has(groupName)) {
        selected[variant.key] = variant;
        selectedKeys.add(groupName);
        break;
      }
    }
  });

  const finalCampaigns = { ...campaigns };
  Object.keys(campaigns).forEach(key => {
    const campaign = campaigns[key];
    if (campaign.splitGroup && !selected[key]) {
      delete finalCampaigns[key];
    }
  });

  return finalCampaigns;
}

const sponsorCampaigns = selectSplitCampaigns(originalSponsorCampaigns);
window.sponsorCampaigns = sponsorCampaigns;

if (sponsorCampaigns["campaign-raadselgids-b"]) {
  sponsorCampaigns["campaign-raadselgids"] =
    sponsorCampaigns["campaign-raadselgids-b"];
}

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

// =============================================================
// VALIDATIE — originele code
// =============================================================

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

// =============================================================
// MAIN FLOW — volledige originele logica, alleen logging vervangen
// =============================================================

export default function initFlow() {
  
  const params = new URLSearchParams(window.location.search);
  const statusParam = params.get('status');

  const longFormSection = document.getElementById('long-form-section');
  if (longFormSection) {
    longFormSection.style.display = 'none';
    longFormSection.setAttribute('data-displayed', 'false');
  }

  const steps = Array.from(
    document.querySelectorAll('.flow-section, .coreg-section')
  ).filter(step => {
    if (statusParam === 'online') {
      return !step.classList.contains('status-live') &&
             !step.classList.contains('ivr-section');
    }
    return true;
  });

  longFormCampaigns.length = 0;

  // Eerste sectie tonen + logging
  if (!window.location.hostname.includes("swipepages.com")) {
    steps.forEach((el, i) => {
      el.style.display = i === 0 ? 'block' : 'none';
      if (i === 0) logSectionVisible(el);
    });
    document.querySelectorAll('.hide-on-live, #long-form-section')
      .forEach(el => el.style.display = 'none');
  }

  steps.forEach((step, stepIndex) => {

    // BUTTON NEXT
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
            logSectionVisible(next);
          }
          return;
        }

        const form = step.querySelector('form');

        if (form && !validateForm(form)) return;

        // Shortform verzenden
        if (form?.id === 'lead-form') {
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

          if (!hasSubmittedShortForm) {
            hasSubmittedShortForm = true;
            const includeSponsors = !(step.id === 'voorwaarden-section' && !btn.id);

            const payload = buildPayload(
              sponsorCampaigns["campaign-leadsnl"],
              { includeSponsors }
            );

            if (!isSuspiciousLead(email)) {
              fetchLead(payload).then(() => {
                fireFacebookLeadEventIfNeeded();
              });
            }
          }
        }

        // GA NAAR VOLGENDE SECTIE
        step.style.display = 'none';

        const next = skipNext ? steps[stepIndex + 2] : steps[stepIndex + 1];

        if (next) {
          next.style.display = 'block';
          reloadImages(next);
          logSectionVisible(next);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // SPONSOR OPTIN
    step.querySelectorAll('.sponsor-optin').forEach(button => {
      button.addEventListener('click', () => {

        step.style.display = 'none';
        const next = steps[steps.indexOf(step) + 1];

        if (next) {
          next.style.display = 'block';
          reloadImages(next);
          logSectionVisible(next);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // DROPDOWNS
    step.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', () => {

        step.style.display = 'none';
        const next = steps[steps.indexOf(step) + 1];

        if (next) {
          next.style.display = 'block';
          reloadImages(next);
          logSectionVisible(next);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  });

  // SOVENDUS
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
            logSectionVisible(nextAfterSovendus);
          }, 10000);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(sovendusSection);
  }
}
