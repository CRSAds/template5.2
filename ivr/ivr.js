document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const affId = urlParams.get("aff_id") || "123";
  const offerId = urlParams.get("offer_id") || "234";
  const subId = urlParams.get("sub_id") || "345";

  function getTransactionId() {
    if (crypto && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const transaction_id = urlParams.get("t_id") || getTransactionId();
  localStorage.setItem("t_id", transaction_id);
  localStorage.setItem("aff_id", affId);
  localStorage.setItem("offer_id", offerId);
  localStorage.setItem("sub_id", subId);

  const isMobile = window.innerWidth < 768;
  document.getElementById("ivr-mobile").style.display = isMobile ? "block" : "none";
  document.getElementById("ivr-desktop").style.display = isMobile ? "none" : "block";

  async function registerVisit() {
    const stored = localStorage.getItem("internalVisitId");
    if (stored) return stored;

    try {
      const res = await fetch("https://cdn.909support.com/NL/4.1/assets/php/register_visit.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          clickId: transaction_id,
          affId,
          offerId,
          subId,
          subId2: subId
        })
      });
      const data = await res.json();
      if (data.internalVisitId) {
        localStorage.setItem("internalVisitId", data.internalVisitId);
        return data.internalVisitId;
      }
    } catch (err) {
      console.error("Visit registration failed", err);
    }
    return null;
  }

  const visitPromise = registerVisit();

  function animatePinRevealSpinner(pin, targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;

    const digits = container.querySelectorAll(".digit-inner");
    const pinStr = pin.toString().padStart(3, "0");

    pinStr.split("").forEach((digit, index) => {
      const inner = digits[index];
      inner.innerHTML = "";
      for (let i = 0; i <= 9; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        inner.appendChild(span);
      }
      const targetOffset = parseInt(digit, 10) * 64;
      setTimeout(() => {
        inner.style.transform = `translateY(-${targetOffset}px)`;
      }, 100);
    });
  }

  // ✅ Popup sluiten
  function closePopup() {
    const mask = document.querySelector('.popup-mask');
    if (mask) mask.style.display = 'none';

    const pop = document.querySelector('.tatsu-popup-container, section, .sp-section, .tatsu-section, .popup, .modal');
    if (pop) pop.style.display = 'none';

    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  // 🔥 SwipePages-proof DTMF activator
  function enableAutoDTMF(pincode) {
    const callButtons = document.querySelectorAll(".ivr-call-btn");

    callButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        let telEl =
          btn.matches('a[href^="tel:"]')
            ? btn
            : btn.querySelector('a[href^="tel:"]') ||
              btn.closest('a[href^="tel:"]');

        if (!telEl) {
          console.warn("⚠ Geen telefoonlink gevonden binnen .ivr-call-btn");
          return;
        }

        const originalHref = telEl.getAttribute("href") || "";
        const cleanNumber = originalHref.replace("tel:", "").trim();

        if (!cleanNumber) {
          console.warn("⚠ Geen geldig telefoonnummer gevonden op .ivr-call-btn");
          return;
        }

        const telLink = `tel:${cleanNumber},${pincode}`;
        console.log("→ Nieuwe tel-link:", telLink);

        // Start call
        window.location.href = telLink;

        // ⏳ Popup sluiten na 5 seconden
        setTimeout(closePopup, 5000);
      });
    });
  }

  function waitForIVRSectionAndShowPin() {
    let ivrShown = false;
    const checkInterval = setInterval(() => {
      const ivrSection = document.getElementById("ivr-section");
      if (!ivrSection) return;

      const style = window.getComputedStyle(ivrSection);
      const isVisible =
        style && style.display !== "none" && style.opacity !== "0" && ivrSection.offsetHeight > 0;

      if (isVisible && !ivrShown) {
        ivrShown = true;
        clearInterval(checkInterval);

        const containerId = isMobile ? "pin-container-mobile" : "pin-container-desktop";
        const spinnerId = isMobile ? "pin-code-spinner-mobile" : "pin-code-spinner-desktop";

        document.getElementById(containerId).style.display = "block";

        visitPromise.then(async (internalVisitId) => {
          const res = await fetch("https://cdn.909support.com/NL/4.1/stage/assets/php/request_pin.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              clickId: transaction_id,
              internalVisitId
            })
          });
          const data = await res.json();

          if (data.pincode) {
            animatePinRevealSpinner(data.pincode, spinnerId);
            enableAutoDTMF(data.pincode);
          }
        });
      }
    }, 200);
  }

  waitForIVRSectionAndShowPin();
});
