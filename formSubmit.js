// formSubmit.js
import { reloadImages } from './imageFix.js';
import sponsorCampaigns from './sponsorCampaigns.js';

window.sponsorCampaigns = sponsorCampaigns;
window.submittedCampaigns = new Set();

const sponsorOptinText = `spaaractief_ja directdeals_ja qliqs_ja outspot_ja onlineacties_ja aownu_ja betervrouw_ja ipay_ja cashbackkorting_ja cashhier_ja myclics_ja seniorenvoordeelpas_ja favorieteacties_ja spaaronline_ja cashbackacties_ja woolsocks_ja dealdonkey_ja centmail_ja`;

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('accept-sponsors-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      sessionStorage.setItem('sponsor_optin', sponsorOptinText);
    });
  }

  const day = document.getElementById("dob-day");
  const month = document.getElementById("dob-month");
  const year = document.getElementById("dob-year");

  if (day) {
    day.addEventListener("input", () => {
      if (day.value.length === 2 || parseInt(day.value[0], 10) >= 4) month.focus();
    });
  }

  if (month) {
    month.addEventListener("input", () => {
      if (month.value.length === 2 || parseInt(month.value[0], 10) >= 2) year.focus();
    });
  }
});

export function buildPayload(campaign, options = { includeSponsors: true }) {
  const urlParams = new URLSearchParams(window.location.search);
  const t_id = urlParams.get("t_id") || crypto.randomUUID();
  const aff_id = urlParams.get('aff_id') || '';
  const sub_id = urlParams.get('sub_id') || '';
  const offer_id = urlParams.get('offer_id') || '';

  // Zorg ervoor dat de URL altijd correct is
  const url = `${window.location.origin}${window.location.pathname}?status=online`;
  console.log("✅ URL met status=online:", url);

  // Sla de URL op in sessionStorage voor later gebruik
  sessionStorage.setItem('campaign_url', url);

  // Controleer of de URL correct is
  if (!url.includes('?status=online')) {
    console.error("❌ URL heeft geen status=online:", url);
    throw new Error("URL moet status=online bevatten");
  }

  const dob_day = sessionStorage.getItem('dob_day');
  const dob_month = sessionStorage.getItem('dob_month');
  const dob_year = sessionStorage.getItem('dob_year');
  const dob_iso = dob_year && dob_month && dob_day
    ? `${dob_year.padStart(4, '0')}-${dob_month.padStart(2, '0')}-${dob_day.padStart(2, '0')}`
    : '';

  const isShortForm = campaign.cid === 925;

  const payload = {
    cid: campaign.cid,
    sid: campaign.sid,
    t_id,
    gender: sessionStorage.getItem('gender'),
    firstname: sessionStorage.getItem('firstname'),
    lastname: sessionStorage.getItem('lastname'),
    email: sessionStorage.getItem('email'),
    dob_day,
    dob_month,
    dob_year,
    f_5_dob: dob_iso,
    campaignId: Object.keys(sponsorCampaigns).find(key => sponsorCampaigns[key].cid === campaign.cid),
    f_1453_campagne_url: url,
    f_1684_sub_id: sub_id || '',
    f_1685_aff_id: aff_id || '',
    f_1687_offer_id: offer_id || ''
  };

  // Log de tracking parameters
  console.log("🎯 Tracking parameters:", {
    f_1684_sub_id: payload.f_1684_sub_id,
    f_1685_aff_id: payload.f_1685_aff_id,
    f_1687_offer_id: payload.f_1687_offer_id
  });

  // Log de payload voordat we verder gaan
  console.log("📦 Payload opgebouwd:", {
    ...payload,
    f_1453_campagne_url: payload.f_1453_campagne_url
  });

  if (!isShortForm) {
    payload.postcode = sessionStorage.getItem('postcode') || '';
    payload.straat = sessionStorage.getItem('straat') || '';
    payload.huisnummer = sessionStorage.getItem('huisnummer') || '';
    payload.woonplaats = sessionStorage.getItem('woonplaats') || '';
    payload.telefoon = sessionStorage.getItem('telefoon') || '';
  }

  if (campaign.coregAnswerKey) {
    payload.f_2014_coreg_answer = sessionStorage.getItem(campaign.coregAnswerKey) || '';
  }

  if (campaign.cid === 925 && options.includeSponsors) {
    const optin = sessionStorage.getItem('sponsor_optin');
    if (optin) {
      payload.f_2047_EM_CO_sponsors = optin;
    }
  }

  console.log("📦 Payload opgebouwd voor:", campaign.cid, payload);
  return payload;
}
// buildPayload is niet nodig in window object, wordt direct gebruikt in initFlow.js

export async function fetchLead(payload) {
  // Eerst de URL controleren en loggen
  console.log("📦 URL voordat verzonden:", {
    ...payload,
    f_1453_campagne_url: payload.f_1453_campagne_url
  });
  
  if (!payload.f_1453_campagne_url) {
    console.error("❌ Geen f_1453_campagne_url gevonden!");
    return Promise.reject(new Error("Geen campagne URL gevonden"));
  }

  // Controleer of de URL correct is
  if (!payload.f_1453_campagne_url?.includes('?status=online')) {
    console.error("❌ URL mist status=online voordat verzonden:", payload.f_1453_campagne_url);
    return Promise.reject(new Error("URL mist status=online"));
  }

  // Extra logging voor tracking parameters
  console.log("🎯 Tracking parameters voordat verzonden:", {
    f_1684_sub_id: payload.f_1684_sub_id,
    f_1685_aff_id: payload.f_1685_aff_id,
    f_1687_offer_id: payload.f_1687_offer_id
  });

  // Controleer of de lead al is verzonden
  const key = `${payload.cid}_${payload.sid}`;
  if (window.submittedCampaigns.has(key)) {
    console.log("✅ Lead al verzonden, overslaan");
    return Promise.resolve({ skipped: true });
  }

  window.submittedCampaigns.add(key);

  try {
    // Cache uitschakelen voor API call
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("✅ API antwoord:", result);
    
    return result;
  } catch (error) {
    console.error("❌ Fout bij API call:", error);
    throw error;
  }

  console.log("📤 Verzenden naar API:", {
    ...payload,
    f_1453_campagne_url: payload.f_1453_campagne_url
  });
  
  // Extra logging voor f_1453_campagne_url
  console.log("✅ f_1453_campagne_url:", payload.f_1453_campagne_url);

  return fetch('https://template5-1.vercel.app/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Lead verzonden:", data);
      return data;
    })
    .catch(err => {
      console.error("❌ Verzendfout:", err);
      throw err;
    });
}
// fetchLead is niet nodig in window object, wordt direct gebruikt in initFlow.js

export function validateLongForm(form) {
  let valid = true;
  let messages = [];

  const fields = ['postcode', 'straat', 'huisnummer', 'woonplaats', 'telefoon'];
  const maxPhone = 11;

  fields.forEach(id => {
    const val = form.querySelector(`#${id}`)?.value.trim();
    if (!val) messages.push(id);
    if (id === 'telefoon' && val && val.length > maxPhone) {
      messages.push('Telefoonnummer mag max. 11 tekens bevatten');
    }
  });

  if (messages.length > 0) {
    alert('Vul aub alle velden correct in:\n' + messages.join('\n'));
    valid = false;
  }

  return valid;
}

export function setupFormSubmit() {
  const btn = document.getElementById('submit-long-form');
  const section = document.getElementById('long-form-section');
  if (!btn || !section) return;

  btn.addEventListener('click', () => {
    const form = section.querySelector('form');
    if (!validateLongForm(form)) return;

    ['postcode', 'straat', 'huisnummer', 'woonplaats', 'telefoon'].forEach(id => {
      const val = document.getElementById(id)?.value.trim();
      if (val) sessionStorage.setItem(id, val);
    });

    if (Array.isArray(window.longFormCampaigns)) {
      window.longFormCampaigns.forEach(campaign => {
        const answer = sessionStorage.getItem(campaign.coregAnswerKey || '');
        const isPositive = answer && ['ja', 'yes', 'akkoord'].some(word =>
          answer.toLowerCase().includes(word)
        );

        console.log("📨 Long form verwerking:", {
          campaignId: campaign.cid,
          coregAnswerKey: campaign.coregAnswerKey,
          antwoord: answer,
          isPositive
        });

        if (isPositive) {
          const payload = buildPayload(campaign);
          fetchLead(payload);
        } else {
          console.log(`⛔️ Lead NIET verstuurd voor ${campaign.cid} → antwoord was:`, answer);
        }
      });
    }

    section.style.display = 'none';
    const steps = Array.from(document.querySelectorAll('.flow-section, .coreg-section'));
    const idx = steps.findIndex(s => s.id === 'long-form-section');
    const next = steps[idx + 1];

    if (next) {
      next.classList.remove('hide-on-live');
      next.style.removeProperty('display');
      reloadImages(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
