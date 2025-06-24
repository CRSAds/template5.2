# Template5.2 – Swipe Pages Funnel Engine

**Leadgeneratiecampagnes via SwipePages + Vercel + Databowl + Memory Game + Sovendus + IVR**

---

## 🔍 Overzicht

Template5.2 is een geavanceerd frontend-framework voor leadgeneratiecampagnes, gebouwd met als doel om complete funnels te draaien binnen één SwipePages-URL. Het project combineert interactieve elementen (zoals memory games, IVR, en Sovendus-plugins) met dynamische leadverwerking en tracking.

De code is geschreven in JavaScript (ES6 modules), gehost op Vercel, en wordt geïntegreerd in SwipePages via `<script>` en `<link>` tags.

---

## 🌐 Architectuur

- **Frontend-bouwsteen**: SwipePages (https://app.swipepages.com/)
- **Hosting**: Vercel (e.g. https://template5-2.vercel.app/)
- **Codebeheer**: GitHub (`CRSAds/template5.2`)
- **Backend API-verwerking**: via `/api/submit.js` (→ Databowl) en `/api/sovendus.js`
- **Beveiliging**: Anti-fraude checks op IP-adres en e-mailadres
- **Interactieve elementen**:
  - Memory Game (met thematische iconensets)
  - IVR-sectie met PIN-animatie
  - Sovendus voordeelmodule

---

## 🧩 Funnelopbouw in SwipePages

Elke SwipePages-campagne bestaat uit een serie `<section>`-blokken met specifieke `class`-namen:

| Sectie-type         | Class              | Doel |
|---------------------|--------------------|------|
| Short Form          | `.flow-section`    | Initieel leadformulier |
| Coreg Sponsors      | `.coreg-section`   | JA/NEE-vragen per sponsor |
| Long Form           | `#long-form-section` | Aanvullende adresgegevens |
| Memory Game         | Embed-blok (Vercel) | Game als activator voor engagement |
| IVR                 | `#ivr-section`     | Telefonische PIN-verificatie |
| Sovendus            | `#sovendus-section`| Aanbiedingsframe van Sovendus |
| Bedankpagina        | `.flow-section`    | Funnel-afsluiting |

De logica wordt aangestuurd via `main.js` en modules zoals `initFlow.js`, `formSubmit.js`, `memory.js` en `ivr.js`.

---

## 📁 Projectstructuur

|----------------------------|---------|
| `/assets/`                 | Icons voor memory game |
| `/api/submit.js`           | POST-lead naar Databowl (incl. fraudecheck) |
| `/api/sovendus.js`         | Token ophalen voor Sovendus |
| `/main.js`                 | Initieert de flow, formulierlogica, game en IVR |
| `/initFlow.js`             | Leidt de stappenstructuur in SwipePages |
| `/formSubmit.js`           | Bouwt payloads en handelt lead submit af |
| `/ivr/ivr.js` + `ivr.css`  | Beheer en weergave van PIN |
| `/memory.js` + `memorygame.css` | Game-ervaring met thematische kaarten |
| `/setupSovendus.js`        | Zet iframe op voor Sovendus-voordeel |
| `/sponsorCampaigns.js`     | Definitie van alle actieve sponsorcampagnes |

---

## ✅ Status en Toekomst

Deze versie is stabiel en in productie voor Nederlandstalige funnels. Voor internationale varianten (UK, BE, etc.) kan de structuur hergebruikt worden door vertalingen en campagnecodes aan te passen.

> Zie ook: https://template5-2.vercel.app/

---

## 📬 Vragen of feedback?

Neem contact op via:
- **E-mail**: yuri@crsadvertising.com
- **Werkruimte**: Werkruimte van Yuri Schouten
