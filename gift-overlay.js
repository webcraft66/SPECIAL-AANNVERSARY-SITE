// Virtual Gift Overlay for Acute Couple Anniversary

(function () {
  const btnUnlockGift = document.getElementById('btnUnlockGift');
  const giftModalEl = document.getElementById('giftModal');
  const giftContent = document.getElementById('giftContent');
  const giftConfetti = document.getElementById('giftConfetti');
  if (!btnUnlockGift || !giftModalEl || !giftContent || !giftConfetti) return;

  let giftOpened = false;

  function ensureGiftKeyframes() {
    if (document.getElementById('giftKeyframes')) return;
    const style = document.createElement('style');
    style.id = 'giftKeyframes';
    style.textContent = `
      @keyframes giftPop {
        0% { transform: translateY(12px) scale(.7); opacity: 0; }
        60% { transform: translateY(-4px) scale(1.05); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes sparkleFall {
        0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function spawnGiftSparkles(count = 70) {
    giftConfetti.innerHTML = '';
    const colors = ['#4ea3ff', '#7bd4ff', '#ff7bd3', '#ff2d6a', '#ffd700', '#00ff88'];

    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.style.cssText = `
        position:absolute;
        left:${Math.random() * 100}%;
        top:0;
        width:${Math.random() * 8 + 6}px;
        height:${Math.random() * 8 + 6}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '6px' : '50%'};
        opacity:.95;
        animation: sparkleFall ${Math.random() * 0.9 + 0.9}s linear forwards;
        filter: drop-shadow(0 0 10px rgba(255,45,106,.35));
        transform: rotate(${Math.random() * 360}deg);
      `;
      frag.appendChild(s);
    }

    giftConfetti.appendChild(frag);
    setTimeout(() => {
      giftConfetti.innerHTML = '';
    }, 2200);
  }

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    ensureGiftKeyframes();

    giftContent.innerHTML = `
      <div class="gift-card">
        <div class="gift-badge">🎁 Virtual Gift Unlocked</div>
        <h3 class="gift-title">A little “something” for your heart 💗</h3>
        <p class="gift-text">Whenever you miss me, just open this page again. The love stays.</p>
        <div class="gift-lines">
          <div>❤️ Your smile = my favorite movie</div>
          <div>✨ Your love = my safe place</div>
          <div>💫 Forever starts with you</div>
        </div>
      </div>
    `;

    spawnGiftSparkles();

    const modal = window.bootstrap ? window.bootstrap.Modal.getOrCreateInstance(giftModalEl) : null;
    if (modal) modal.show();

    // fire simple heart burst via existing FX (if you later add it)
  }

  btnUnlockGift.addEventListener('click', openGift);
})();

