const imageBaseUrl = "https://template5-2.vercel.app/assets/sponsorlogo/";

window.renderSponsorPopupSelectie = function (container) {
  const sponsorData = {
    heading: "Sponsors",
    intro: `Hieronder vindt u de sponsors van deze campagne welke u graag hun allerbeste deals en aanbiedingen willen laten zien. Per sponsor is duidelijk aangegeven waarvoor zij contact met u willen opnemen, hoe vaak zij contact met u willen opnemen en via welke manier u gecontacteerd gaat worden (telefoon of email). Tevens staat er bij elke sponsor een link naar hun privacy voorwaarden. Wij raden aan dat u deze privacy voorwaarden doorneemt.`,
    sections: [
      {
        title: "📞 Telemarketing sponsors",
        sponsors: [
          {
            name: "Trefzeker",
            description: "Bij Trefzeker Adviesgroep staan we voor dienstverlening die jou helpt het maximale uit de energiemarkt te halen, zonder zorgen en met een focus op heldere communicatie. Trefzeker stelt u een vraag op deze pagina. Alleen bij een positief antwoord worden uw gegevens gedeeld.",
            logo: "trefzeker.png",
            address: "Trefzeker Adviesgroep BV<br>Dalsteindreef 141<br>1112 XJ Diemen<br>Nederland",
            privacyLink: "https://tref-zeker.com/privacyverklaring/",
            checkboxLabel: "Trefzeker stelt u een vraag op deze pagina. Alleen bij een positief antwoord worden uw gegevens gedeeld."
          }
        ]
      },
      {
        title: "📧 Email sponsors",
        sponsors: [
          {
            name: "Outspot",
            description: "Outspot is een online aanbiedingensite met dagelijkse nieuwe deals op het gebied van reizen, gadgets, mode en meer.",
            logo: "outspot.png",
            address: "Dorp 16<br>9830 Sint-Martens-Latem<br>België",
            privacyLink: "https://www.outspot.be/nl/privacybeleid",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "OnlineActies",
            description: "Onlineacties.com verbindt consumenten met interessante aanbiedingen van uiteenlopende bedrijven. De aanbiedingen worden direct op de internetpagina aangeboden of later via e-mail, sms, whatsapp of telefoon.",
            logo: "onlineacties.png",
            address: "Papaverweg 177<br>1032 KE Amsterdam",
            privacyLink: "https://www.onlineacties.com/",
            checkboxLabel: "Ja. Ik deel mijn gegevens met Online Acties"
          },
          {
            name: "MyClics",
            description: "MyClics is een online loyaliteitsprogramma. Maak snel een account aan, en je kunt direct beginnen met online geld verdienen en besparen.",
            logo: "myclics.png",
            address: "Postbus 216<br>9600 AE, Hoogezand",
            privacyLink: "https://www.myclics.nl/pages/privacy-policy/",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Dealdonkey",
            description: "DealDonkey is het online platform om dagelijks de scherpste dagdeals te scoren. Dealdonkey stuurt een dagelijkse nieuwsbrief met de scherpste en meest voordelige aanbiedingen.",
            logo: "dealdonkey.png",
            address: "DealDonkey<br>Haverstraat 31<br>2153 GB<br>Nieuw-Vennep<br>KvK: 52030873",
            privacyLink: "https://woolsocks.eu/privacy-and-cookie-statement/index.html",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Yuccies",
            description: "Yuccies biedt een online spaarprogramma, waarmee Gebruikers geld kunnen verdienen door bijvoorbeeld het lezen van commerciële e-mails of het uitproberen van producten.",
            logo: "yuccies.png",
            address: "CY Online B.V.<br>H.o.d.n. Yuccies<br>Postbus 161<br>1440 AD Purmerend",
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
      <div class="sponsor-entry">
        <div class="sponsor-left">
          <img src="${imageBaseUrl + s.logo}" alt="${s.name} logo" class="sponsor-logo" />
          <div class="sponsor-address">${s.address}</div>
        </div>
        <div class="sponsor-content">
          <h3>${s.name}</h3>
          <div class="sponsor-description">${s.description}</div>
          <a href="${s.privacyLink}" target="_blank" class="sponsor-privacy">Privacy Policy</a>
        </div>
        ${i !== section.sponsors.length-1 ? `<div class="sponsor-separator"></div>` : ''}
      </div>
    `).join('');

  // ---- Sectie met blauwe titelbalk ----
  const sectionHTML = section => `
    <section>
      <div class="sponsor-section-title">
        ${section.title}
      </div>
      <div class="sponsor-section-list">
        ${sponsorsHTML(section)}
      </div>
    </section>
  `;

  // ---- Introblok ----
  container.innerHTML = `
    <div class="sponsor-popup-content">
      <div class="sponsor-intro">
        <h1>${sponsorData.heading}</h1>
        <p>${sponsorData.intro}</p>
      </div>
      ${sponsorData.sections.map(sectionHTML).join('')}
    </div>
  `;
};
