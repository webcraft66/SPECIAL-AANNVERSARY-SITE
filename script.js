// Acute Couple Anniversary - Surprise + Gallery Modal

(function () {
  const envelopeShell = document.getElementById('envelopeShell');
  const revealSub = document.getElementById('revealSub');
  const typewriterText = document.getElementById('twText');
  const confettiLayer = document.getElementById('confettiLayer');

  const btnNext = document.getElementById('btnNext');
  const btnUnlockAll = document.getElementById('btnUnlockAll');
  const galleryGrid = document.getElementById('galleryGrid');

  const coupleImg = document.getElementById('coupleImg');
  const coupleVid = document.getElementById('coupleVid');

  const mediaModalEl = document.getElementById('mediaModal');
  const modalMedia = document.getElementById('modalMedia');

  const headerBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');

  const btnConfetti = document.getElementById('btnConfetti');
  const btnReplay = document.getElementById('btnReplay');

  if (!envelopeShell) return;

  // Letter content lines
  const lines = [
    "My love ❤️,",
    "On our anniversary, I just want you to know:",
    "Every cute moment… every tough day… it all feels beautiful because it’s you.",
    "You are my calm, my courage, and my forever.",
    "Until time ends, I choose you." ,
    "Happy Anniversary 💗"
  ];

  let opened = false;
  let lineIndex = 0;
  let typingTimer = null;

  function clearTyping() {
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = null;
  }

  function typeLine(text, done) {
    clearTyping();
    typewriterText.textContent = '';
    let i = 0;

    const step = () => {
      i++;
      typewriterText.textContent = text.slice(0, i);
      if (i >= text.length) {
        if (typeof done === 'function') done();
        return;
      }
      typingTimer = setTimeout(step, 14);
    };

    step();
  }

  function openEnvelope() {
    opened = true;
    envelopeShell.classList.add('is-open');

    revealSub.textContent = 'Revealing…';

    lineIndex = 0;
    typeLine(lines[lineIndex], () => {
      lineIndex++;
      revealSub.textContent = 'Tap “Reveal next line”';
    });
  }

  function revealNext() {
    if (!opened) return openEnvelope();
    if (lineIndex >= lines.length) return;

    typeLine(lines[lineIndex], () => {
      lineIndex++;
      if (lineIndex >= lines.length) {
        revealSub.textContent = 'Unlocked all 💌';
      } else {
        revealSub.textContent = 'Keep going…';
      }
    });
  }

  function unlockAll() {
    if (!opened) openEnvelope();

    let idx = lineIndex;
    const revealAll = () => {
      if (idx >= lines.length) {
        revealSub.textContent = 'Unlocked all 💌';
        return;
      }
      typeLine(lines[idx], () => {
        idx++;
        lineIndex = idx;
        setTimeout(revealAll, 120);
      });
    };

    revealSub.textContent = 'Unlocking…';
    revealAll();
  }

  // Confetti / surprise hearts
  function spawnConfetti(count = 90) {
    if (!confettiLayer) return;

    const colors = ['#4ea3ff', '#7bd4ff', '#ff7bd3', '#ff2d6a', '#ffd700', '#00ff88'];

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.style.cssText = `
        position:absolute;
        left:${Math.random() * 100}%;
        top:-10px;
        width:${Math.random() * 10 + 6}px;
        height: ${Math.random() * 10 + 6}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '6px' : '50%'};
        opacity:.95;
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${Math.random() * 1.1 + 1.1}s linear forwards;
      `;
      c.dataset.conf = '1';
      frag.appendChild(c);
    }

    // keyframes once
    if (!document.getElementById('confettiKeyframes')) {
      const style = document.createElement('style');
      style.id = 'confettiKeyframes';
      style.textContent = `
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120vh) rotate(760deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    confettiLayer.appendChild(frag);

    setTimeout(() => {
      const nodes = confettiLayer.querySelectorAll('[data-conf="1"]');
      nodes.forEach(n => n.remove());
    }, 2500);
  }

  function showModalMedia(kind) {
    // Stop video if switching
    if (coupleVid) {
      coupleVid.pause();
      coupleVid.currentTime = 0;
    }

    // Bootstrap modal
    const modal = window.bootstrap ? window.bootstrap.Modal.getOrCreateInstance(mediaModalEl) : null;

    modalMedia.innerHTML = '';

    if (kind === 'image') {
      headerBadge && (headerBadge.textContent = 'Gallery');
      modalTitle && (modalTitle.textContent = 'Our moment');

      const img = document.createElement('img');
      img.src = coupleImg?.src || 'couple-image.jpg';
      img.alt = 'Couple';
      modalMedia.appendChild(img);

      if (modal) modal.show();
    }

    if (kind === 'video') {
      headerBadge && (headerBadge.textContent = 'Gallery');
      modalTitle && (modalTitle.textContent = 'Playing…');

      // Use the same local sources inside modal for reliable play
      const v = document.createElement('video');
      v.controls = true;
      v.playsInline = true;
      v.muted = true;
      v.preload = 'metadata';
      v.autoplay = true;

      const s1 = document.createElement('source');
      s1.src = 'LOVU.mp4';
      s1.type = 'video/mp4';

      const s2 = document.createElement('source');
      s2.src = 'LOVU.webm';
      s2.type = 'video/webm';

      v.appendChild(s1);
      v.appendChild(s2);


      modalMedia.appendChild(v);

      if (modal) modal.show();

      // attempt autoplay
      setTimeout(() => {
        v.play().catch(() => {});
      }, 250);

      v.addEventListener('ended', () => {
        // keep it
      });
    }
  }

  // Gallery tile click handlers
  function setupGallery() {
    const tileImage = document.getElementById('tileImage');
    const tileVideo = document.getElementById('tileVideo');

    if (tileImage) {
      tileImage.addEventListener('click', (e) => {
        e.preventDefault();
        showModalMedia('image');
      });
    }

    if (tileVideo) {
      tileVideo.addEventListener('click', (e) => {
        e.preventDefault();
        showModalMedia('video');
      });
    }

    // Quick mobile: pause preview when user taps elsewhere
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && coupleVid) {
        coupleVid.pause();
      }
    });
  }

  // Events
  btnNext && btnNext.addEventListener('click', revealNext);
  btnUnlockAll && btnUnlockAll.addEventListener('click', unlockAll);

  envelopeShell.addEventListener('click', () => {
    if (!opened) return openEnvelope();
    revealNext();
    if (lineIndex === 1) {
      // first click after open already typed; keep fun
    }
  });

  envelopeShell.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!opened) openEnvelope();
      else revealNext();
    }
  });

  btnConfetti && btnConfetti.addEventListener('click', () => spawnConfetti());

  btnReplay && btnReplay.addEventListener('click', () => {
    // reset letter
    opened = false;
    lineIndex = 0;
    clearTyping();
    envelopeShell.classList.remove('is-open');
    revealSub.textContent = 'Waiting…';
    typewriterText.textContent = '';

    // reset media
    if (modalMedia) modalMedia.innerHTML = '';
  });

  // Keyboard shortcuts for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // clear modal media to stop any playback
      if (modalMedia) modalMedia.innerHTML = '';
    }
  });

  setupGallery();
})();

