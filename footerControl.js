// footerControl.js

export function handleFooterDisplay() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  const footerOnline = document.querySelector(".footeronline");
  const footerLive = document.querySelector(".footerlive");
  const ivrSection = document.getElementById("ivr-section");

  // Alles verbergen bij start
  if (footerOnline) footerOnline.style.display = "none";
  if (footerLive) footerLive.style.display = "none";

  // Logica per status
  if (status === "online") {
    if (footerOnline) footerOnline.style.display = "block";
    if (ivrSection) ivrSection.remove(); // volledig verwijderen uit DOM
  } else if (status === "live") {
    if (footerLive) footerLive.style.display = "block";
    // ivr-section blijft zichtbaar
  } else {
    // Blokkeer toegang
    document.body.innerHTML = `
      <div style="padding:40px; text-align:center; font-family:sans-serif;">
        <h1>❌ Toegang niet toegestaan</h1>
        <p>Deze campagne is alleen beschikbaar via een geldige kanaal-URL.</p>
      </div>
    `;
    document.body.style.backgroundColor = "#f8d7da";
    document.body.style.color = "#721c24";
  }
}
