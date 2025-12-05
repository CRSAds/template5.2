document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const affId = urlParams.get("aff_id") || "123";
  const offerId = urlParams.get("offer_id") || "234";
  const subId = urlParams.get("sub_id") || "345";

  // ---------------------------------------------
  // TRANSACTION ID + STORAGE
  // ---------------------------------------------
  function getTransactionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
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

  // ---------------------------------------------
  // VISIT REGISTRATION
  // ---------------------------------------------
  async function registerVisit() {
    const stored = localStorage.getItem("internalVisitId");
    if (stored) return stored;

    try {
      const res = await fetch(
        "https://cdn.909support.com/NL/4.1/assets/php/register_visit.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            clickId: transaction_id,
            affId,
            offerId,
            subId,
            subId2: subId,
          }),
        }
      );
      const data = await res.json();
      if (data.internalVisitId) {
        localStorage.setItem("internalVisitId", data.internalVisitId);
        return data.internalVisitId;
      }
    } catch (err) {
      console.error("Visit registration failed:", err);
    }
    return null;
  }

  const visitPromise = registerVisit();

  // ---------------------------------------------
  // POPUP CLOSER
  // ---------------------------------------------
  function closePopup() {
    const mask = document.querySelector(".popup-mask");
    if (mask) mask.style.display = "none";

    const pop = document.querySelector(
      ".tatsu-popup-container, section, .sp-section, .tatsu-section, .popup, .modal"
    );
    if (pop) pop.style.display = "none";

    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
  }

  // ---------------------------------------------
  // ON IVR READY (wait until #ivr-section is visible)
  // If #ivr-section doesn't exist → run immediately
  // ---------------------------------------------
  function onIVRReady(callback) {
    const ivrSection = document.getElementById("ivr-section");

    if (!ivrSection) {
      callback();
      return;
    }

    let fired = false;
    const check = setInterval(() => {
      const style = window.getComputedStyle(ivrSection);
      const visible =
        style.display !== "none" &&
        style.opacity !== "0" &&
        ivrSection.offsetHeight > 0;

      if (visible && !fired) {
        fired = true;
        clearInterval(check);
        callback();
      }
    }, 200);
  }

  // ---------------------------------------------
  // SPINNER ANIMATION (shared)
  // ---------------------------------------------
  function animatePinRevealSpinner(pin, targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;

    const pinStr = pin.toString().padStart(3, "0");
    const digits = container.querySelectorAll(".digit-inner");

    pinStr.split("").forEach((digit, index) => {
      const inner = digits[index];
      if (!inner) return;

      inner.innerHTML = "";
      for (let i = 0; i <= 9; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        inner.appendChild(span);
      }

      const offset = parseInt(digit, 10) * 64;
      setTimeout(() => {
        inner.style.transform = `translateY(-${offset}px)`;
      }, 100);
    });
  }

  // ---------------------------------------------
  // AUTO-DTMF — adds ,PIN to tel link
  // ---------------------------------------------
  function enableAutoDTMF(pincode, scope) {
    const root = scope || document;
    const callButtons = root.querySelectorAll(".ivr-call-btn");

    callButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        let telEl =
          btn.matches('a[href^="tel:"]')
            ? btn
            : btn.querySelector('a[href^="tel:"]') ||
              btn.closest('a[href^="tel:"]');

        if (!telEl) return;

        const num = (telEl.getAttribute("href") || "").replace("tel:", "").trim();
        if (!num) return;

        const telLink = `tel:${num},${pincode}`;
        window.location.href = telLink;

        setTimeout(closePopup, 8000);
      });
    });
  }

  // =============================================
  // MODE 1 — NIEUWE SPINNER MODE (#ivr-spinner)
  // =============================================
  function initSpinnerMode() {
    const root = document.getElementById("ivr-spinner");
    if (!root) return;

    const spinnerContainer = root.querySelector("#pin-container-spinner");
    const spinnerId = "pin-code-spinner";

    onIVRReady(() => {
      if (spinnerContainer) spinnerContainer.style.display = "block";

      visitPromise.then(async (internalVisitId) => {
        try {
          const res = await fetch(
            "https://cdn.909support.com/NL/4.1/stage/assets/php/request_pin.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                clickId: transaction_id,
                internalVisitId,
              }),
            }
          );

          const data = await res.json();
          if (data.pincode) {
            console.log("Spinner mode pincode:", data.pincode);
            animatePinRevealSpinner(data.pincode, spinnerId);
            enableAutoDTMF(data.pincode, root);
          }
        } catch (err) {
          console.error("Spinner mode PIN error:", err);
        }
      });
    });
  }

  // =============================================
  // MODE 2 — MANUAL PIN ENTRY (#ivr-manual)
  // =============================================
  function initManualPinMode() {
    const root = document.getElementById("ivr-manual");
    if (!root) return;

    const pinInputs = root.querySelectorAll(".pin-input");
    const combinedPin = root.querySelector("#pinCode");
    const submitBtn = root.querySelector("#submitPinButton");

    if (!pinInputs.length || !combinedPin || !submitBtn) return;

    onIVRReady(() => {
      root.style.display = "block";

      // Belangrijk: hier ook request_pin aanroepen,
      // zodat backend een PIN koppelt aan deze visit
      visitPromise.then(async (internalVisitId) => {
        try {
          const res = await fetch(
            "https://cdn.909support.com/NL/4.1/stage/assets/php/request_pin.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                clickId: transaction_id,
                internalVisitId,
              }),
            }
          );
          const data = await res.json();
          console.log("Manual mode request_pin response:", data);
          // Pincode tonen is hier niet nodig; IVR leest ’m op,
          // SubmitPin.php controleert hem server-side.
        } catch (err) {
          console.error("Manual mode request_pin error:", err);
        }
      });

      // Inputgedrag
      pinInputs.forEach((input, index) => {
        const original = input.getAttribute("placeholder") || "";

        input.addEventListener("focus", () => {
          input.dataset.placeholder = original;
          input.setAttribute("placeholder", "");
        });

        input.addEventListener("blur", () => {
          input.setAttribute("placeholder", input.dataset.placeholder || original);
        });

        input.addEventListener("input", () => {
          input.value = input.value.replace(/\D/g, "").slice(0, 1);

          const err = root.querySelector(".error-input");
          if (err) err.remove();
          localStorage.removeItem("errorShown");

          if (input.value && index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }

          updateCombined();
        });
      });

      function updateCombined() {
        const v1 = root.querySelector("#input1")?.value || "";
        const v2 = root.querySelector("#input2")?.value || "";
        const v3 = root.querySelector("#input3")?.value || "";
        combinedPin.value = v1 + v2 + v3;

        const evt = new Event("input", { bubbles: true });
        combinedPin.dispatchEvent(evt);
      }

      combinedPin.addEventListener("input", () => {
        const valid = /^\d{3}$/.test(combinedPin.value);
        submitBtn.disabled = !valid;
      });

      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        submitManualPin(combinedPin.value, submitBtn, root);
      });
    });
  }

  function submitManualPin(pinValue, submitBtn, root) {
    if (!/^\d{3}$/.test(pinValue)) return;

    const params = new URLSearchParams({
      affId: localStorage.getItem("aff_id") || "",
      offerId: localStorage.getItem("offer_id") || "",
      subId: localStorage.getItem("sub_id") || "",
      internalVisitId: localStorage.getItem("internalVisitId") || "",
      clickId: localStorage.getItem("t_id") || "",
      pin: pinValue,
      gameName: localStorage.getItem("gameName") || "",
    });

    fetch("https://cdn.909support.com/NL/4.1/stage/assets/php/SubmitPin.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Manual PIN submit response:", data);

        if (data.callId) {
          localStorage.setItem("callId", data.callId);

          const err = root.querySelector(".error-input");
          if (err) err.remove();
          localStorage.removeItem("errorShown");

          submitBtn.classList.add("loading");
          submitBtn.disabled = true;
        } else {
          // verkeerde pincode
          root.querySelectorAll(".pin-input").forEach((input) => (input.value = ""));
          submitBtn.blur();

          if (!localStorage.getItem("errorShown")) {
            const grid = root.querySelector(".inputGrid");
            if (grid) {
              const div = document.createElement("div");
              div.className = "error-input";
              div.textContent = "Onjuiste pincode";
              grid.insertAdjacentElement("afterend", div);
            }
            localStorage.setItem("errorShown", "true");
          }
        }

        if (data.returnUrl) {
          const url =
            `${data.returnUrl}?call_id=${encodeURIComponent(
              data.callId || ""
            )}` +
            `&t_id=${encodeURIComponent(localStorage.getItem("t_id") || "")}` +
            `&aff_id=${encodeURIComponent(localStorage.getItem("aff_id") || "")}` +
            `&offer_id=${encodeURIComponent(localStorage.getItem("offer_id") || "")}` +
            `&sub_id=${encodeURIComponent(localStorage.getItem("sub_id") || "")}`;
          window.open(url, "_blank");

          setTimeout(() => {
            const closeIcon = document.querySelector(".close-icon");
            if (closeIcon) closeIcon.click();
          }, 7500);
        }
      })
      .catch((err) => {
        console.error("Manual PIN submit error:", err);
      });
  }

  // =============================================
  // MODE 3 — LEGACY (#ivr-section + #ivr-mobile/#ivr-desktop)
  // =============================================
  function initLegacyMode() {
    const mobile = document.getElementById("ivr-mobile");
    const desktop = document.getElementById("ivr-desktop");
    const isMobile = window.innerWidth < 768;

    if (!mobile || !desktop) return;

    mobile.style.display = isMobile ? "block" : "none";
    desktop.style.display = isMobile ? "none" : "block";

    onIVRReady(() => {
      const containerId = isMobile ? "pin-container-mobile" : "pin-container-desktop";
      const spinnerId = isMobile ? "pin-code-spinner-mobile" : "pin-code-spinner-desktop";

      const c = document.getElementById(containerId);
      if (c) c.style.display = "block";

      visitPromise.then(async (internalVisitId) => {
        try {
          const res = await fetch(
            "https://cdn.909support.com/NL/4.1/stage/assets/php/request_pin.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                clickId: transaction_id,
                internalVisitId,
              }),
            }
          );

          const data = await res.json();
          if (data.pincode) {
            console.log("Legacy mode pincode:", data.pincode);
            animatePinRevealSpinner(data.pincode, spinnerId);
            enableAutoDTMF(data.pincode);
          }
        } catch (err) {
          console.error("Legacy PIN error:", err);
        }
      });
    });
  }

  // ---------------------------------------------
  // ACTIVATE MODES
  // ---------------------------------------------
  if (document.getElementById("ivr-spinner")) initSpinnerMode();
  if (document.getElementById("ivr-manual")) initManualPinMode();
  if (document.getElementById("ivr-section")) initLegacyMode();
});
