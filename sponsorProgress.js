document.addEventListener("DOMContentLoaded", () => {
  const sponsorSteps = Array.from(document.querySelectorAll('.sponsor-step'));
  if (!sponsorSteps.length) return;

  const total = sponsorSteps.length;
  const wrapper = document.createElement('div');
  wrapper.id = 'sponsor-progress-wrapper';
  wrapper.innerHTML = `
    <div id="sponsor-progress-text">
      Voor toegang tot de volgende stap: vul onderstaande vragen in
    </div>
    <div id="sponsor-progress-container">
      <div id="sponsor-progress-fill"></div>
      <div id="sponsor-progress-stars">
        ${Array.from({ length: total }).map(() => "<span>⭐</span>").join('')}
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const fill = document.getElementById('sponsor-progress-fill');
  const label = document.getElementById('sponsor-progress-text');
  const stars = Array.from(document.querySelectorAll('#sponsor-progress-stars span'));

  function updateProgress(index) {
    const percent = Math.round(((index + 1) / total) * 100);
    fill.style.width = `${percent}%`;
    label.textContent = `Voor toegang tot de volgende stap: ${index + 1}/${total}`;

    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  const observer = new MutationObserver(() => {
    setTimeout(() => {
      const visible = sponsorSteps.find(s => s.offsetParent !== null);
      if (visible) {
        const index = sponsorSteps.indexOf(visible);
        updateProgress(index);
        wrapper.style.display = 'block';
      } else {
        wrapper.style.display = 'none';
      }
    }, 30);
  });

  observer.observe(document.body, { attributes: true, childList: true, subtree: true });

  setTimeout(() => {
    const visible = sponsorSteps.find(s => s.offsetParent !== null);
    if (visible) {
      const index = sponsorSteps.indexOf(visible);
      updateProgress(index);
      wrapper.style.display = 'block';
    }
  }, 100);
});
