const imageBaseUrl = "https://template5-2.vercel.app/assets/sponsorlogo/";

window.renderSponsorPopup = function (container) {
  const sponsorData = {
    heading: "Sponsors",
    intro: `Hieronder vindt u de sponsors van deze campagne welke u graag hun allerbeste deals en aanbiedingen willen laten zien. Per sponsor is duidelijk aangegeven waarvoor zij contact met u willen opnemen, hoe vaak zij contact met u willen opnemen en via welke manier u gecontacteerd gaat worden (telefoon of email). Tevens staat er bij elke sponsor een link naar hun privacy voorwaarden. Wij raden aan dat u deze privacy voorwaarden doorneemt.`,
    sections: [
      {
        title: "\ud83d\udce7 Email sponsors",
        sponsors: [
          {
          name: "Outspot",
          description: "Outspot is een online aanbiedingensite met dagelijkse nieuwe deals op het gebied van reizen, gadgets, mode en meer.",
          logo: "outspot.png",
          address: "Dorp 16\n9830 Sint-Martens-Latem\nBelgië",
          privacyLink: "https://www.outspot.be/nl/privacybeleid",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
          {
          name: "OnlineActies",
          description: "Onlineacties.com verbindt consumenten met interessante aanbiedingen van  uiteenlopende bedrijven. De aanbiedingen worden direct op de internetpagina aangeboden of later via e-mail, sms, whatsapp of telefoon.",
          logo: "onlineacties.png",
          address: "Papaverweg 177\n1032 KE Amsterdam",
          privacyLink: "https://www.onlineacties.com/",
          checkboxLabel: "Ja. Ik deel mijn gegevens met Online Acties"
        },
        {
          name: "MyClics",
          description: "MyClics is een online loyaliteitsprogramma. Maak snel een account aan, en je kunt direct beginnen met online geld verdienen en besparen.",
          logo: "myclics.png",
          address: "Postbus 216\n9600 AE, Hoogezand",
          privacyLink: "https://www.myclics.nl/pages/privacy-policy/",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Dealdonkey",
          description: "DealDonkey is het online platform om dagelijks de scherpste dagdeals te scoren. Dealdonkey stuurt een dagelijkse nieuwsbrief met de scherpste en meest voordelige aanbiedingen.",
          logo: "dealdonkey.png",
          address: "DealDonkey\nHaverstraat 31\n2153 GB\nNieuw-Vennep\nKvK: 52030873",
          privacyLink: "https://woolsocks.eu/privacy-and-cookie-statement/index.html",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Yuccies",
          description: "Yuccies biedt een online spaarprogramma, waarmee Gebruikers geld kunnen verdienen door bijvoorbeeld het lezen van commerciële e-mails of het uitproberen van producten.",
          logo: "yuccies.png",
          address: "CY Online B.V.\nH.o.d.n. Yuccies\nPostbus 161\n1440 AD Purmerend",
          privacyLink: "https://www.yuccies.nl/pages/privacy-policy/",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          }
        ]
      }
    ]
  };

 if (!container) return;

 // ---- Sponsor Entry HTML ----
  const sponsorsHTML = section =>
    section.sponsors.map((s, i) => `
      <div class="sponsor-entry" style="
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 0 0 26px 0;
        margin: 0;
        position: relative;
        flex-direction: row;
        background: none;
      ">
        <img src="${imageBaseUrl + s.logo}" alt="${s.name} logo"
          style="max-width:60px;max-height:46px;flex-shrink:0;border-radius:8px;box-shadow:0 1px 8px #0001;margin-top:4px;">
        <div style="flex:1;">
          <h3 style="margin:0 0 4px 0;font-size:1.10rem;font-weight:700;letter-spacing:0.01em;color:#183963;">
            ${s.name}
          </h3>
          <div style="font-size:.97rem;margin-bottom:5px;color:#364150;line-height:1.38;">
            ${s.description}
          </div>
          <div style="font-size:.89rem;color:#7a889a;white-space:pre-line;margin-bottom:4px;">
            ${s.address}
          </div>
          <a href="${s.privacyLink}" target="_blank"
            style="display:inline-block;margin-top:2px;font-size:.89rem;color:#1666af;text-decoration:underline;">
            Privacy Policy
          </a>
        </div>
        ${i !== section.sponsors.length-1
          ? `<div class="sponsor-separator"></div>`
          : ''}
      </div>
    `).join('');

  // ---- Sectie met blauwe titelbalk ----
  const sectionHTML = section => `
    <section style="
      margin-bottom:38px;
      background: #fff;
      border-radius:18px;
      box-shadow:0 2px 16px #0001;
      padding:0 0 0 0;
      overflow:hidden;
    ">
      <div style="
        background: linear-gradient(90deg, #2172b8 0%, #185389 100%);
        color: #fff;
        font-size: 1.09rem;
        font-weight: 800;
        letter-spacing:0.04em;
        padding: 14px 24px 13px 20px;
        margin: 0 0 22px 0;
        text-transform: uppercase;
        border-radius:18px 18px 0 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #18538930;
      ">
        ${section.title}
      </div>
      <div style="padding:18px 18px 12px 18px;">
        ${sponsorsHTML(section)}
      </div>
    </section>
  `;

  // ---- Introblok ----
  container.innerHTML = `
    <div class="sponsor-popup-content" style="max-width:630px;margin:32px auto 0 auto;">
      <div style="
        background: #fff;
        border-radius:18px;
        box-shadow:0 2px 16px #0001;
        padding: 28px 26px 24px 26px;
        margin-bottom:44px;">
        <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:10px;color:#213753;">${sponsorData.heading}</h1>
        <p style="font-size:1rem;margin-bottom:0;color:#485262;line-height:1.55;">
          ${sponsorData.intro}
        </p>
      </div>
      ${sponsorData.sections.map(sectionHTML).join('')}
    </div>
  `;

  // ---- CSS-injectie voor separator ----
  if (!document.getElementById('sponsor-separator-style')) {
    const style = document.createElement('style');
    style.id = 'sponsor-separator-style';
    style.textContent = `
      .sponsor-entry .sponsor-separator {
        position: absolute;
        left: 0; right: 0;
        bottom: -11px;
        height: 0;
        border-top: 2px solid #d4e3ef;
        width: 100%;
        margin: 0;
      }
      .sponsor-entry:not(:last-child) { margin-bottom:34px !important; }
    `;
    document.head.appendChild(style);
  }
};
