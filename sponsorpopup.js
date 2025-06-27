export const sponsorData = {
  heading: "Sponsors",
  intro: `Hieronder vindt u de sponsors van deze campagne welke u graag hun allerbeste deals en aanbiedingen willen laten zien. U kunt per sponsor aangeven of zij uw data mogen ontvangen, vink simpelweg het vakje naast of onder hun naam aan. Per sponsor is duidelijk aangegeven waarvoor zij contact met u willen opnemen, hoe vaak zij contact met u willen opnemen en via welke manier u gecontacteerd gaat worden (telefoon of email). Tevens staat er bij elke sponsor een link naar hun privacy voorwaarden. Wij raden aan dat u deze privacy voorwaarden doorneemt.`,
  sections: [
    {
      title: "📞 Telemarketing sponsors",
      sponsors: [
        {
          name: "My Collections",
          description: "My Collections biedt u vele voordelen: naast de voordelige kennismakingszending zijn ook de overige producten altijd zeer laag geprijsd! Daarnaast worden alle zendingen gemakkelijk bij u thuisbezorgd. My Collections biedt veel en vraagt weinig.",
          logo: "mycollections.png",
          address: "My Collections BV\nOosteinde 137\n2271 EE Voorburg\nNederland",
          privacyLink: "https://example.com/privacy-mc",
          checkboxLabel: "Ik deel mijn gegevens met My Collections"
        },
        {
          name: "Raadselgids",
          description: "Wij brengen elke dag verschillende exclusieve en vooral uitdagende games uit op onze platform die enkel voor onze leden gelden. U kunt dagelijks woordspellen of andere games spelen en verschillende prijzen verdienen.",
          logo: "raadselgids.png",
          address: "Premium Services B.V\nBredaseweg 185\n4872LA, Etten-Leur\nNederland",
          privacyLink: "https://example.com/privacy-rg",
          checkboxLabel: "Ik deel mijn gegevens met Raadselgids"
        },
        {
          name: "Consubeheer",
          description: "Bespaar met onze energie specialisten. Consubeheer biedt u de beste energiedeals aan van dit moment.",
          logo: "consubeheer.png",
          address: "Jan Rebelstraat 14A\n1069CC Amsterdam\nNederland",
          privacyLink: "https://example.com/privacy-consu",
          checkboxLabel: "Ik deel mijn gegevens met Consubeheer"
        }
      ]
    },
    {
      title: "📧 Email sponsors",
      sponsors: [
        {
          name: "Kiosk",
          description: "Ontvang nu de nieuwsbrief van Kiosk.nl met daarin de leukste artikelen, aanbiedingen en prijsvragen!",
          logo: "kiosk.png",
          address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
          privacyLink: "https://example.com/privacy-kiosk",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        },
        {
          name: "AD",
          description: "Ontvang dagelijks de nieuwsbrief van het Algemeen Dagblad met een overzicht van het belangrijkste nieuws.",
          logo: "ad.png",
          address: "DPG Media BV\nVan der Madeweg 40\n1114AM Amsterdam-Duivendrecht",
          privacyLink: "https://example.com/privacy-ad",
          checkboxLabel: "Ja. Ik wil de emailnieuwsbrief ontvangen"
        }
        // ... voeg hier meer sponsors toe
      ]
    }
  ]
};

window.renderSponsorPopup = function (container) {
  if (!container || !sponsorData) return;

  const html = sponsorData.sections.map(section => {
    const sponsorsHTML = section.sponsors.map(s => `
      <div class="sponsor-entry" style="margin-bottom:24px;">
        <h3>${s.name}</h3>
        <p>${s.description}</p>
        <img src="${s.logo}" alt="${s.name} logo" style="max-width:100px;margin:10px 0;">
        <p>${s.address}</p>
        <a href="${s.privacyLink}" target="_blank">Privacy Policy</a>
          <label><input type="checkbox" name="sponsor-${s.name}"> ${s.checkboxLabel}</label>
      </div>
    `).join('');

    return `
      <section>
        <h2>${section.title}</h2>
        ${section.description ? `<p>${section.description}</p>` : ''}
        ${sponsorsHTML}
      </section>
    `;
  }).join('');

  container.innerHTML = `
    <div class="sponsor-popup-content">
      <h1>${sponsorData.title}</h1>
      <p>${sponsorData.intro}</p>
      ${html}
    </div>
  `;
};
