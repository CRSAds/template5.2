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
