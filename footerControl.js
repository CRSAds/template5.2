export function handleFooterDisplay() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  // ❌ Geen geldige status → blokkeer direct
  if (status !== "online" && status !== "live") {
    document.documentElement.innerHTML = `
      <head>
        <title>Campagne geblokkeerd</title>
        <style>
          body {
            padding: 40px;
            text-align: center;
            font-family: sans-serif;
            background-color: #e5ebff;
            color: #721c24;
          }
        </style>
      </head>
      <body>
        <h1>❌ Er gaat iets mis</h1>
        <p>Deze campagne is niet beschikbaar</p>
      </body>
    `;
    return;
  }

  // ✅ Status is geldig → voer normale logica uit
  const footerOnline = document.querySelector(".footeronline");
  const footerLive = document.querySelector(".footerlive");
  const ivrSection = document.querySelector(".ivr-section");

  if (footerOnline) footerOnline.style.display = "none";
  if (footerLive) footerLive.style.display = "none";

  if (status === "online") {
    if (footerOnline) footerOnline.style.display = "block";
    if (ivrSection) {
      ivrSection.parentNode.removeChild(ivrSection); // Hard verwijderen
    }
  } else if (status === "live") {
    if (footerLive) footerLive.style.display = "block";
    // IVR blijft zichtbaar
  }
}
