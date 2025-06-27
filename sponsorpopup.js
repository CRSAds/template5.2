const imageBaseUrl = "https://template5-2.vercel.app/assets/sponsorlogo/";

window.renderSponsorPopup = function (container) {
  const sponsorData = {
    heading: "Sponsors",
    intro: `Hieronder vindt u de sponsors van deze campagne welke u graag hun allerbeste deals en aanbiedingen willen laten zien. U kunt per sponsor aangeven of zij uw data mogen ontvangen, vink simpelweg het vakje naast of onder hun naam aan. Per sponsor is duidelijk aangegeven waarvoor zij contact met u willen opnemen, hoe vaak zij contact met u willen opnemen en via welke manier u gecontacteerd gaat worden (telefoon of email). Tevens staat er bij elke sponsor een link naar hun privacy voorwaarden. Wij raden aan dat u deze privacy voorwaarden doorneemt.`,
    sections: [
      {
        title: "\ud83d\udcde Telemarketing sponsors",
        sponsors: [
          {
            name: "My Collections",
            description: "My Collections biedt u vele voordelen...",
            logo: "mycollections.png",
            address: "My Collections BV\nOosteinde 137\n2271 EE Voorburg\nNederland",
            privacyLink: "https://example.com/privacy-mc",
            checkboxLabel: "Ik deel mijn gegevens met My Collections"
          },
          {
            name: "Raadselgids",
            description: "Wij brengen elke dag...",
            logo: "raadselgids.png",
            address: "Premium Services B.V\nBredaseweg 185\n4872LA, Etten-Leur\nNederland",
            privacyLink: "https://example.com/privacy-rg",
            checkboxLabel: "Ik deel mijn gegevens met Raadselgids"
          },
          {
            name: "Consubeheer",
            description: "Bespaar met onze energie specialisten...",
            logo: "consubeheer.png",
            address: "Jan Rebelstraat 14A\n1069CC Amsterdam\nNederland",
            privacyLink: "https://example.com/privacy-consu",
            checkboxLabel: "Ik deel mijn gegevens met Consubeheer"
          }
        ]
      },
      {
        title: "\ud83d\udce7 Email sponsors",
        sponsors: [
          {
            name: "Kiosk",
            description: "Ontvang nu de nieuwsbrief van Kiosk.nl...",
            logo: "kiosk.png",
            address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
            privacyLink: "https://example.com/privacy-kiosk",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "AD",
            description: "Ontvang dagelijks de nieuwsbrief van het AD...",
            logo: "ad.png",
            address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
            privacyLink: "https://example.com/privacy-ad",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "De Volkskrant",
            description: "Ontvang dagelijks per email...",
            logo: "devolkskrant.png",
            address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
            privacyLink: "https://example.com/privacy-devolkskrant",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Spaar Actief",
            description: "Heb jij al gehoord over de beste cashback site...",
            logo: "spaaractief.png",
            address: "Spaaractief B.V.\nPostbus 216\n9600 AE, Hoogezand",
            privacyLink: "https://example.com/privacy-spaaractief",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Direct Deals",
            description: "Direct Deals: de digitale nieuwsbrief...",
            logo: "directdeals.png",
            address: "Lead2Sale\nGestelsestraat 28\n5615 LE Eindhoven\nNederland",
            privacyLink: "https://example.com/privacy-directdeals",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Qliqs",
            description: "Krijg cashback op je online aankopen...",
            logo: "qliqs.png",
            address: "Postbus 216\n9600 AE, Hoogezand",
            privacyLink: "https://example.com/privacy-qliqs",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          },
          {
            name: "Outspot",
            description: "Outspot is een online aanbiedingensite...",
            logo: "outspot.png",
            address: "Dorp 16\n9830 Sint-Martens-Latem\nBelgi\u00eb",
            privacyLink: "https://example.com/privacy-outspot",
            checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
           {
          name: "OnlineActies",
          description: "Onlineacties.com verbindt consumenten met interessante aanbiedingen van  uiteenlopende bedrijven. De aanbiedingen worden direct op de internetpagina aangeboden of later via e-mail, sms, whatsapp of telefoon.",
          logo: "assets/sponsorlogo/onlineacties.png",
          address: "Papaverweg 177\n1032 KE Amsterdam",
          privacyLink: "https://example.com/privacy-onlineacties",
          checkboxLabel: "Ja. Ik deel mijn gegevens met Online Acties"
        },
        {
          name: "AOW.nu",
          description: "AOW.nu mag u benaderen via email over het laatste AOW-nieuws, zoals AOW-bedragen, vakantiegeld, de stand van zaken bij de grootste pensioenfondsen en speciale (voordeel)acties voor 65-plussers.",
          logo: "assets/sponsorlogo/aownu.png",
          address: "Tiengemetenstraat 19\n5628 KM Eindhoven",
          privacyLink: "https://example.com/privacy-aow",
          checkboxLabel: "Ja. Ik deel mijn gegevens met AOW.nu"
        },
        {
          name: "BeterVrouw",
          description: "BeterVROUW is dé gratis wekelijkse nieuwsbrief voor vrouwen in Nederland met daarin onder andere inspirerende artikelen, uitgaanstips, exclusieve aanbiedingen, opinie peilingen en jouw week horoscoop.",
          logo: "assets/sponsorlogo/betervrouw.png",
          address: "Papaverweg 177\n1032 KE Amsterdam",
          privacyLink: "https://example.com/privacy-betervrouw",
          checkboxLabel: "Ja. Ik deel mijn gegevens met Beter Vrouw"
        },
        {
          name: "iPay",
          description: "OrangeBuddies is gespecialiseerd in online cashback & loyalty portals met als doel toegevoegde waarde te bieden voor zowel consumenten als adverteerders.",
          logo: "assets/sponsorlogo/ipay.png",
          address: "Bruggestraat 49-2\n3841 CM Harderwijk",
          privacyLink: "https://example.com/privacy-ipay",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cashback Korting",
          description: "CashbackKorting is hét startpunt voor online shoppen met korting. Met een aanbod van ruim 35.000 webshops, uitgebreide winkelinformatie, producttrends, inspiratie en korting bij alle aangesloten webshops.",
          logo: "assets/sponsorlogo/cashbackkorting.png",
          address: "Deventerweg 1C\n3843 GA Harderwijk",
          privacyLink: "https://example.com/privacy-cbk",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cash Hier",
          description: "Hier krijg je betaalt voor elke muisklik, je kunt bijvoorbeeld dagelijks klikken op advertenties, meedoen aan acties, aankopen met cashback doen en vergeet de referrals niet.",
          logo: "assets/sponsorlogo/cashhier.png",
          address: "Postbus 216\n9600 AE, Hoogezand",
          privacyLink: "https://example.com/privacy-cashhier",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "MyClics",
          description: "MyClics is een online loyaliteitsprogramma. Maak snel een account aan, en je kunt direct beginnen met online geld verdienen en besparen.",
          logo: "assets/sponsorlogo/myclics.png",
          address: "Postbus 216\n9600 AE, Hoogezand",
          privacyLink: "https://example.com/privacy-myclics",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Seniorenvoordeelpas",
          description: "Online shoppen via Seniorenvoordeelpas werkt eenvoudig: wanneer u via onze website een aankoop doet, ontvangen wij een verkoopcommissie van de webshop, die wij aan u teruggeven.",
          logo: "assets/sponsorlogo/seniorenvoordeelpas.png",
          address: "Deventerweg 1C\n3843 GA\nHarderwijk",
          privacyLink: "https://example.com/privacy-svp",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Favoriete Acties",
          description: "Blijf altijd op de hoogte van de beste aanbiedingen! Schrijf je in en ontvang regelmatig de scherpste deals direct in je inbox.",
          logo: "assets/sponsorlogo/favorieteacties.png",
          address: "Weena 788\n3014 DA\nRotterdam",
          privacyLink: "https://example.com/privacy-favorieteacties",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Spaar Online",
          description: "Verdien en bespaar op je online aankopen en breng vrienden en/of familie aan. Verdien ook geld door te klikken op banners en emails.",
          logo: "assets/sponsorlogo/spaaronline.png",
          address: "Postbus 15\n5750AA DEURNE\nNederland",
          privacyLink: "https://example.com/privacy-spaaronline",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Cashback Acties",
          description: "Bij Cashback acties begrijpen we dat iedereen op zoek is naar de beste deals en besparingen. Daarom bieden we een eenvoudige en effectieve manier om geld terug te krijgen bij uw online aankopen.",
          logo: "assets/sponsorlogo/cashbackacties.png",
          address: "Postbus 15\n5750AA DEURNE\nNederland",
          privacyLink: "https://example.com/privacy-cba",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Woolsocks",
          description: "Woolsocks mag u benaderen via email met informatie en promoties gerelateerd aan de Woolstocks producten en diensten.",
          logo: "assets/sponsorlogo/woolsocks.png",
          address: "Woolsocks AG\nNeustadtstrasse 7\n6003 Luzern\nSwitzerland",
          privacyLink: "https://example.com/privacy-woolsocks",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Dealdonkey",
          description: "DealDonkey is het online platform om dagelijks de scherpste dagdeals te scoren. Dealdonkey stuurt een dagelijkse nieuwsbrief met de scherpste en meest voordelige aanbiedingen.",
          logo: "assets/sponsorlogo/dealdonkey.png",
          address: "DealDonkey\nHaverstraat 31\n2153 GB\nNieuw-Vennep\nKvK: 52030873",
          privacyLink: "https://example.com/privacy-dealdonkey",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "Yuccies",
          description: "Yuccies biedt een online spaarprogramma, waarmee Gebruikers geld kunnen verdienen door bijvoorbeeld het lezen van commerciële e-mails of het uitproberen van producten.",
          logo: "assets/sponsorlogo/yuccies.png",
          address: "CY Online B.V.\nH.o.d.n. Yuccies\nPostbus 161\n1440 AD Purmerend",
          privacyLink: "https://example.com/privacy-yuccies",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
          }
        ]
      }
    ]
  };

  if (!container) return;

  const html = sponsorData.sections.map(section => {
    const sponsorsHTML = section.sponsors.map(s => `
      <div class="sponsor-entry" style="margin-bottom:24px;">
        <h3>${s.name}</h3>
        <p>${s.description}</p>
        <img src="${imageBaseUrl + s.logo}" alt="${s.name} logo" style="max-width:100px;margin:10px 0;">
        <p>${s.address.replace(/\n/g, '<br>')}</p>
        <a href="${s.privacyLink}" target="_blank">Privacy Policy</a><br>
        <label><input type="checkbox" name="sponsor-${s.name}"> ${s.checkboxLabel}</label>
      </div>
    `).join('');

    return `
      <section>
        <h2>${section.title}</h2>
        ${sponsorsHTML}
      </section>
    `;
  }).join('');

  container.innerHTML = `
    <div class="sponsor-popup-content">
      <h1>${sponsorData.heading}</h1>
      <p>${sponsorData.intro}</p>
      ${html}
    </div>
  `;
};
