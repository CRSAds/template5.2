const imageBaseUrl = "https://template5-2.vercel.app/assets/sponsorlogo/";

window.renderSponsorPopup = function (container) {
  const sponsorData = {
    heading: "Sponsors",
    intro: `Hieronder vindt u de sponsors van deze campagne welke u graag hun allerbeste deals en aanbiedingen willen laten zien. Per sponsor is duidelijk aangegeven waarvoor zij contact met u willen opnemen, hoe vaak zij contact met u willen opnemen en via welke manier u gecontacteerd gaat worden (telefoon of email). Tevens staat er bij elke sponsor een link naar hun privacy voorwaarden. Wij raden aan dat u deze privacy voorwaarden doorneemt.`,
    sections: [
      {
        title: "\ud83d\udcde Telemarketing sponsors",
        sponsors: [
          {
            name: "My Collections",
            description: "My Collections biedt u vele voordelige verzamelpakketten. Wij stellen u een vraag binnen deze pagina of u geïnteresseerd bent in een aanbod.",
            logo: "mycollections.png",
            address: "My Collections BV\nOosteinde 137\n2271 EE Voorburg\nNederland",
            privacyLink: "https://mycollections.com/nl/klantenservice/privacy-statement",
            checkboxLabel: "Ik deel mijn gegevens met My Collections"
          },
          {
            name: "Beter Abonnement",
            description: "Op deze pagina biedt Callsolution BV u – onder de naam Beter Abonnement – de kans op een gepersonaliseerde besparing én een energieaanbieding namens Eneco. Indien u (een van) de vragen positief beantwoordt, kan het zijn dat u telefonisch wordt benaderd om het aanbod verder toe te lichten.",
            logo: "beterabonnement.png",
            address: "Callsolution BV\nTouwslager 5\n3861 SP, Nijkerk\nNederland",
            privacyLink: "https://www.beterabonnement.nl/privacybeleid/",
            checkboxLabel: "Ik deel mijn gegevens met Beter Abonnement"
          },
          {
            name: "Raadselgids",
            description: "De leukste puzzelboeken vindt je bij Raadselgids. Wij stellen u een vraag binnen deze pagina of u geïnteresseerd bent in een aanbod.",
            logo: "raadselgids.png",
            address: "Premium Services B.V\nBredaseweg 185\n4872LA, Etten-Leur\nNederland",
            privacyLink: "https://raadselgids.com/privacy-verklaring",
            checkboxLabel: "Ik deel mijn gegevens met Raadselgids"
          },
          {
            name: "Consubeheer",
            description: "Bespaar met onze energie specialisten. Wij stellen u een vraag binnen deze pagina of u geïnteresseerd bent in een aanbod.",
            logo: "consubeheer.png",
            address: "Jan Rebelstraat 14A\n1069CC Amsterdam\nNederland",
            privacyLink: "https://raadselgids.com/privacy-verklaring",
            checkboxLabel: "Ik deel mijn gegevens met Consubeheer"
          }
        ]
      },
      {
        title: "\ud83d\udce7 Email sponsors",
        sponsors: [
        {
  name: "Kiosk",
  description: "Ontvang nu de nieuwsbrief van Kiosk.nl met daarin de leukste artikelen, aanbiedingen en prijsvragen!",
  logo: "kiosk.png",
  address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
  privacyLink: "https://privacy.dpgmedia.nl/nl/document/privacy-policy",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "AD",
  description: "Ontvang dagelijks de nieuwsbrief van het Algemeen Dagblad met een overzicht van het belangrijkste nieuws.",
  logo: "ad.png",
  address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
  privacyLink: "https://privacy.dpgmedia.nl/nl/document/privacy-policy",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "De Volkskrant",
  description: "Ontvang dagelijks per email het laatste nieuws, scherpe analyses en achtergrondverhalen van de Volkskrant.",
  logo: "devolkskrant.png",
  address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
  privacyLink: "https://privacy.dpgmedia.nl/nl/document/privacy-policy",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "Brand New Day",
  description: "Brand New Day is een Nederlandse bank die gespecialiseerd is in pensioen- en beleggingsproducten.",
  logo: "Logo_BND.png",
  address: "BrandNewDay Bank N.V.\nHoogoorddreef 15\n1101 BA Amsterdam",
  privacyLink: "https://new.brandnewday.nl/privacy-en-cookiestatement/",
  checkboxLabel: "Ja. Brand New Day mag mij via e-mail benaderen met aanbiedingen over pensioen- en beleggingsproducten."
},
{
  name: "Direct Verdiend",
  description: "DirectVerdiend mag u benaderen via email over kortingen en aanbiedingen om u te helpen met sparen en besparen.",
  logo: "directverdiend.png",
  address: "RSA Online Leads BV.\nDe Eglantier 404\n7329DL Apeldoorn",
  privacyLink: "https://www.directverdiend.nl/artikelen/geen-category/privacy-statement",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "Spaar Actief",
  description: "SpaarActief is een van de populairste cashbackwebsites in Nederland. Verdien geld door aankopen, klikken of inschrijven.",
  logo: "spaaractief.png",
  address: "Spaaractief B.V.\nPostbus 216\n9600 AE, Hoogezand",
  privacyLink: "https://www.snelverdienen.nl/pages/privacy-policy/",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "Direct Deals",
  description: "Direct Deals: de digitale nieuwsbrief met exclusieve deals en aanbiedingen rechtstreeks in je inbox.",
  logo: "directdeals.png",
  address: "Lead2Sale\nGestelsestraat 28\n5615 LE Eindhoven\nNederland",
  privacyLink: "http://www.direct-deals.nl/privacy/",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
{
  name: "Qliqs",
  description: "Krijg cashback op je online aankopen, ontvang beloningen voor het bekijken van aanbiedingen en meer met Qliqs.",
  logo: "qliqs.png",
  address: "Postbus 216\n9600 AE, Hoogezand",
  privacyLink: "https://www.qlics.nl/pages/privacy-policy/",
  checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
},
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
          name: "AOW.nu",
          description: "AOW.nu mag u benaderen via email over het laatste AOW-nieuws, zoals AOW-bedragen, vakantiegeld, de stand van zaken bij de grootste pensioenfondsen en speciale (voordeel)acties voor 65-plussers.",
          logo: "aownu.png",
          address: "Tiengemetenstraat 19\n5628 KM Eindhoven",
          privacyLink: "https://www.aow.nu/privacyverklaring-eu/",
          checkboxLabel: "Ja. Ik deel mijn gegevens met AOW.nu"
        },
        {
          name: "BeterVrouw",
          description: "BeterVROUW is dé gratis wekelijkse nieuwsbrief voor vrouwen in Nederland met daarin onder andere inspirerende artikelen, uitgaanstips, exclusieve aanbiedingen, opinie peilingen en jouw week horoscoop.",
          logo: "betervrouw.png",
          address: "Papaverweg 177\n1032 KE Amsterdam",
          privacyLink: "https://betervrouw.nl/",
          checkboxLabel: "Ja. Ik deel mijn gegevens met Beter Vrouw"
        },
        {
          name: "iPay",
          description: "OrangeBuddies is gespecialiseerd in online cashback & loyalty portals met als doel toegevoegde waarde te bieden voor zowel consumenten als adverteerders.",
          logo: "ipay.png",
          address: "Bruggestraat 49-2\n3841 CM Harderwijk",
          privacyLink: "https://www.ipay.nl/static/privacy",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cashback Korting",
          description: "CashbackKorting is hét startpunt voor online shoppen met korting. Met een aanbod van ruim 35.000 webshops, uitgebreide winkelinformatie, producttrends, inspiratie en korting bij alle aangesloten webshops.",
          logo: "cashbackkorting.png",
          address: "Deventerweg 1C\n3843 GA Harderwijk",
          privacyLink: "https://www.cashbackkorting.nl/privacy",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cash Hier",
          description: "Hier krijg je betaalt voor elke muisklik, je kunt bijvoorbeeld dagelijks klikken op advertenties, meedoen aan acties, aankopen met cashback doen en vergeet de referrals niet.",
          logo: "cashhier.png",
          address: "Postbus 216\n9600 AE, Hoogezand",
          privacyLink: "https://www.cashhier.nl/pages/privacy-policy/",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "ClickToBuy",
          description: "Al sinds januari 2011 zijn onze inkopers dagelijks op jacht naar de beste aanbiedingen rechtstreeks van de fabriek. Ontvang onze dagelijkse koopjes alert met de nieuwste en beste tijdelijke aanbiedingen!",
          logo: "clicktobuy.png",
          address: "Rota IM\nSingel 6 B\n4357BW Domburg\nKvK: 60536179",
          privacyLink: "https://www.clicktobuy.nl/pages/privacy-policy",
          checkboxLabel: "Ja. Ik wil de dagelijkse koopjes alert ontvangen"
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
          name: "Seniorenvoordeelpas",
          description: "Online shoppen via Seniorenvoordeelpas werkt eenvoudig: wanneer u via onze website een aankoop doet, ontvangen wij een verkoopcommissie van de webshop, die wij aan u teruggeven.",
          logo: "seniorenvoordeelpas.png",
          address: "Deventerweg 1C\n3843 GA\nHarderwijk",
          privacyLink: "https://www.seniorenvoordeelpas.nl/privacy-statementnl",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Favoriete Acties",
          description: "Blijf altijd op de hoogte van de beste aanbiedingen! Schrijf je in en ontvang regelmatig de scherpste deals direct in je inbox.",
          logo: "favorieteacties.png",
          address: "Weena 788\n3014 DA\nRotterdam",
          privacyLink: "https://favorieteacties.nl/privacy",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Spaar Online",
          description: "Verdien en bespaar op je online aankopen en breng vrienden en/of familie aan. Verdien ook geld door te klikken op banners en emails.",
          logo: "spaaronline.png",
          address: "Postbus 15\n5750AA DEURNE\nNederland",
          privacyLink: "https://www.spaar-online.nl/pages/privacy-policy/",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cashback Acties",
          description: "Bij Cashback acties begrijpen we dat iedereen op zoek is naar de beste deals en besparingen. Daarom bieden we een eenvoudige en effectieve manier om geld terug te krijgen bij uw online aankopen.",
          logo: "cashbackacties.png",
          address: "Postbus 15\n5750AA DEURNE\nNederland",
          privacyLink: "https://www.cashbackacties.nl/pages/privacy-policy/",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Woolsocks",
          description: "Woolsocks mag u benaderen via email met informatie en promoties gerelateerd aan de Woolstocks producten en diensten.",
          logo: "woolsocks.png",
          address: "Woolsocks AG\nNeustadtstrasse 7\n6003 Luzern\nSwitzerland",
          privacyLink: "https://woolsocks.eu/privacy-and-cookie-statement/index.html",
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
