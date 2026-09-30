/**
 * app.js
 * Advanced interactive controller for QuoteVerse.
 * Includes:
 * - Non-consecutive random quote engine
 * - Particle canvas animation
 * - Confetti & sparkle physics
 * - Interactive 3D tilt effect
 * - Web Audio API procedural chime synthesizer
 * - LocalStorage Favorites management with slide drawer
 * - Category chips filtering & keyboard shortcuts
 */

// Core quote engine class (Maintains 100% backward compatibility with unit tests)
class QuoteApp {
  constructor(quotes) {
    this.quotes = quotes || [];
    this.currentIndex = -1;
    this.isAnimating = false;
    this.currentCategory = "all";
  }

  getFilteredQuotes() {
    if (this.currentCategory === "all") {
      return this.quotes;
    }
    return this.quotes.filter(
      q => q.category && q.category.toLowerCase() === this.currentCategory.toLowerCase()
    );
  }

  getRandomQuote() {
    const pool = this.getFilteredQuotes();
    if (!pool || pool.length === 0) return null;

    if (pool.length === 1) {
      this.currentIndex = 0;
      return pool[0];
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * pool.length);
    } while (nextIndex === this.currentIndex);

    this.currentIndex = nextIndex;
    return pool[nextIndex];
  }
}

// CommonJS export for Node test runner
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QuoteApp };
}

// Browser Implementation
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const quotes = typeof QUOTES_DATA !== "undefined" ? QUOTES_DATA : [];
    const app = new QuoteApp(quotes);

    // ==========================================
    // DOM Element References
    // ==========================================
    const quoteTextEl = document.getElementById("quote-text");
    const quoteAuthorEl = document.getElementById("quote-author");
    const quoteCategoryEl = document.getElementById("quote-category");
    const quoteCard = document.getElementById("quote-card");
    const tiltContainer = document.getElementById("tilt-container");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    const copyQuoteBtn = document.getElementById("copy-quote-btn");
    const copyDefaultIcon = document.getElementById("copy-default-icon");
    const copyCheckIcon = document.getElementById("copy-check-icon");
    const tweetQuoteBtn = document.getElementById("tweet-quote-btn");
    const speakQuoteBtn = document.getElementById("speak-quote-btn");
    const likeQuoteBtn = document.getElementById("like-quote-btn");
    const categoryChipsContainer = document.getElementById("category-chips");
    const categorySelect = document.getElementById("category-select");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-icon");
    const soundToggleBtn = document.getElementById("sound-toggle-btn");
    const soundOnIcon = document.getElementById("sound-on-icon");
    const soundOffIcon = document.getElementById("sound-off-icon");
    const favoritesToggleBtn = document.getElementById("favorites-toggle-btn");
    const favoritesDrawer = document.getElementById("favorites-drawer");
    const drawerBackdrop = document.getElementById("drawer-backdrop");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const favoritesList = document.getElementById("favorites-list");
    const favCountBadge = document.getElementById("fav-count-badge");
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");

    let currentQuote = null;
    let soundEnabled = localStorage.getItem("quoteverse_sound") !== "false";
    let favorites = JSON.parse(localStorage.getItem("quoteverse_favorites") || "[]");

    // ==========================================
    // Procedural Web Audio API Sound Chime
    // ==========================================
    let audioCtx = null;
    function playChime(type = "quote") {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const notes = type === "quote" ? [523.25, 659.25, 783.99] : [659.25, 880.00];

        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.38);
        });
      } catch (err) {
        // AudioContext silent fallback
      }
    }

    function updateSoundButtonUI() {
      if (!soundToggleBtn) return;
      if (soundEnabled) {
        soundOnIcon.style.display = "block";
        soundOffIcon.style.display = "none";
        soundToggleBtn.setAttribute("title", "Sound Effects: ON");
      } else {
        soundOnIcon.style.display = "none";
        soundOffIcon.style.display = "block";
        soundToggleBtn.setAttribute("title", "Sound Effects: MUTED");
      }
    }
    updateSoundButtonUI();

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem("quoteverse_sound", soundEnabled);
        updateSoundButtonUI();
        if (soundEnabled) playChime("action");
      });
    }

    // ==========================================
    // Interactive Background Particle Canvas
    // ==========================================
    const pCanvas = document.getElementById("particles-canvas");
    if (pCanvas) {
      const pCtx = pCanvas.getContext("2d");
      let width, height;
      const particles = [];
      const particleCount = 45;

      function resizeParticles() {
        width = pCanvas.width = window.innerWidth;
        height = pCanvas.height = window.innerHeight;
      }
      resizeParticles();
      window.addEventListener("resize", resizeParticles);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          alpha: Math.random() * 0.6 + 0.2
        });
      }

      function drawParticles() {
        pCtx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const baseColor = isDark ? "165, 180, 252" : "99, 102, 241";

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          pCtx.fillStyle = `rgba(${baseColor}, ${p.alpha})`;
          pCtx.fill();
        });

        requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    // ==========================================
    // Confetti / Sparkle Physics Burst
    // ==========================================
    const confettiCanvas = document.getElementById("confetti-canvas");
    let confettiParticles = [];
    if (confettiCanvas) {
      const cCtx = confettiCanvas.getContext("2d");
      function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }
      resizeConfetti();
      window.addEventListener("resize", resizeConfetti);

      function spawnBurst(originX, originY) {
        const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#fbbf24"];
        for (let i = 0; i < 28; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          confettiParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2.5,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.025 + 0.015
          });
        }
      }

      function updateConfetti() {
        cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
          const p = confettiParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.14; // gravity
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            confettiParticles.splice(i, 1);
          } else {
            cCtx.beginPath();
            cCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            cCtx.fillStyle = p.color;
            cCtx.globalAlpha = p.alpha;
            cCtx.fill();
            cCtx.globalAlpha = 1;
          }
        }
        requestAnimationFrame(updateConfetti);
      }
      updateConfetti();
      window.spawnBurst = spawnBurst;
    }

    // ==========================================
    // Interactive 3D Card Tilt Effect
    // ==========================================
    if (tiltContainer && window.matchMedia("(hover: hover)").matches) {
      quoteCard.addEventListener("mousemove", (e) => {
        const rect = quoteCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6.5;
        const rotateY = ((x - centerX) / centerX) * 6.5;

        tiltContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      quoteCard.addEventListener("mouseleave", () => {
        tiltContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    }

    // ==========================================
    // Toast Notification Feedback
    // ==========================================
    function showToast(message, duration = 2400) {
      if (!toast) return;
      if (toastText) toastText.textContent = message;
      toast.classList.add("show");
      clearTimeout(toast.timeoutId);
      toast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
      }, duration);
    }

    // ==========================================
    // Category Chips Filtering
    // ==========================================
    function populateCategories() {
      const categories = ["all", ...new Set(quotes.map(q => q.category.toLowerCase()))];

      // Populate Chip Bar
      if (categoryChipsContainer) {
        categoryChipsContainer.innerHTML = categories
          .map(cat => {
            const label = cat === "all" ? "All Quotes" : cat.charAt(0).toUpperCase() + cat.slice(1);
            const activeClass = cat === app.currentCategory ? "active" : "";
            return `<button class="category-chip ${activeClass}" data-category="${cat}">${label}</button>`;
          })
          .join("");

        categoryChipsContainer.querySelectorAll(".category-chip").forEach(chip => {
          chip.addEventListener("click", () => {
            const cat = chip.getAttribute("data-category");
            if (cat === app.currentCategory) return;

            categoryChipsContainer.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            app.currentCategory = cat;
            if (categorySelect) categorySelect.value = cat;
            app.currentIndex = -1;
            displayNewQuote(false);
          });
        });
      }

      // Hidden accessible fallback select
      if (categorySelect) {
        categorySelect.innerHTML = categories
          .map(cat => `<option value="${cat}">${cat}</option>`)
          .join("");
        categorySelect.addEventListener("change", (e) => {
          app.currentCategory = e.target.value;
          app.currentIndex = -1;
          displayNewQuote(false);
        });
      }
    }

    // ==========================================
    // Display Random Quote (Smooth Transition)
    // ==========================================
    function displayNewQuote(withBurst = true) {
      if (app.isAnimating) return;

      const quote = app.getRandomQuote();
      if (!quote) return;

      currentQuote = quote;
      app.isAnimating = true;

      // Micro audio feedback
      playChime("quote");

      // Optional sparkle burst from "New Quote" button
      if (withBurst && window.spawnBurst && newQuoteBtn) {
        const rect = newQuoteBtn.getBoundingClientRect();
        window.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      newQuoteBtn.setAttribute("disabled", "true");
      quoteCard.classList.add("quote-exit");

      setTimeout(() => {
        quoteTextEl.textContent = `“${quote.text}”`;
        quoteAuthorEl.textContent = `— ${quote.author}`;
        if (quoteCategoryEl) {
          quoteCategoryEl.textContent = quote.category;
        }

        updateLikeButtonState();

        quoteCard.classList.remove("quote-exit");
        quoteCard.classList.add("quote-enter");

        setTimeout(() => {
          quoteCard.classList.remove("quote-enter");
          app.isAnimating = false;
          newQuoteBtn.removeAttribute("disabled");
        }, 320);
      }, 200);
    }

    // ==========================================
    // Favorites Management System
    // ==========================================
    function isCurrentQuoteFavorited() {
      if (!currentQuote) return false;
      return favorites.some(fav => fav.text === currentQuote.text);
    }

    function updateLikeButtonState() {
      if (!likeQuoteBtn) return;
      if (isCurrentQuoteFavorited()) {
        likeQuoteBtn.classList.add("liked");
        likeQuoteBtn.setAttribute("title", "Remove from Favorites");
      } else {
        likeQuoteBtn.classList.remove("liked");
        likeQuoteBtn.setAttribute("title", "Save to Favorites");
      }
      updateFavoritesBadge();
    }

    function updateFavoritesBadge() {
      if (!favCountBadge) return;
      if (favorites.length > 0) {
        favCountBadge.textContent = favorites.length;
        favCountBadge.style.display = "flex";
      } else {
        favCountBadge.style.display = "none";
      }
    }

    function toggleFavorite() {
      if (!currentQuote) return;
      const index = favorites.findIndex(fav => fav.text === currentQuote.text);

      if (index >= 0) {
        favorites.splice(index, 1);
        showToast("Removed from favorites");
      } else {
        favorites.push({ ...currentQuote, savedAt: Date.now() });
        showToast("Saved to favorites!");
        playChime("action");

        if (window.spawnBurst && likeQuoteBtn) {
          const rect = likeQuoteBtn.getBoundingClientRect();
          window.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }

      localStorage.setItem("quoteverse_favorites", JSON.stringify(favorites));
      updateLikeButtonState();
      renderFavoritesDrawer();
    }

    function renderFavoritesDrawer() {
      if (!favoritesList) return;
      if (favorites.length === 0) {
        favoritesList.innerHTML = `
          <div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <p><strong>No favorites yet</strong><br>Click the heart icon on any quote to collect your favorites here.</p>
          </div>
        `;
        return;
      }

      favoritesList.innerHTML = favorites
        .map((fav, i) => `
          <div class="fav-card">
            <p class="fav-quote-text">“${fav.text}”</p>
            <div class="fav-card-footer">
              <span class="fav-author">— ${fav.author}</span>
              <div class="fav-actions">
                <button class="fav-action-btn" title="Copy quote" onclick="window.copySpecificQuote('${encodeURIComponent(fav.text)}', '${encodeURIComponent(fav.author)}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
                <button class="fav-action-btn delete" title="Delete" onclick="window.removeFavoriteAt(${i})">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `)
        .join("");
    }

    window.removeFavoriteAt = function(idx) {
      favorites.splice(idx, 1);
      localStorage.setItem("quoteverse_favorites", JSON.stringify(favorites));
      updateLikeButtonState();
      renderFavoritesDrawer();
      showToast("Quote removed");
    };

    window.copySpecificQuote = async function(encText, encAuthor) {
      const text = decodeURIComponent(encText);
      const author = decodeURIComponent(encAuthor);
      await copyTextToClipboard(`"${text}" — ${author}`);
      showToast("Quote copied to clipboard!");
    };

    function openFavoritesDrawer() {
      renderFavoritesDrawer();
      favoritesDrawer.classList.add("open");
      drawerBackdrop.classList.add("open");
    }

    function closeFavoritesDrawer() {
      favoritesDrawer.classList.remove("open");
      drawerBackdrop.classList.remove("open");
    }

    if (favoritesToggleBtn) favoritesToggleBtn.addEventListener("click", openFavoritesDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeFavoritesDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeFavoritesDrawer);

    // ==========================================
    // Copy to Clipboard with Icon Morph
    // ==========================================
    async function copyTextToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    }

    async function copyCurrentQuote() {
      if (!currentQuote) return;
      const formatted = `"${currentQuote.text}" — ${currentQuote.author}`;
      try {
        await copyTextToClipboard(formatted);
        playChime("action");
        showToast("Quote copied to clipboard!");

        if (copyQuoteBtn && copyDefaultIcon && copyCheckIcon) {
          copyQuoteBtn.classList.add("copied");
          copyDefaultIcon.style.display = "none";
          copyCheckIcon.style.display = "block";

          setTimeout(() => {
            copyQuoteBtn.classList.remove("copied");
            copyDefaultIcon.style.display = "block";
            copyCheckIcon.style.display = "none";
          }, 1800);
        }
      } catch (err) {
        showToast("Unable to copy to clipboard.");
      }
    }

    // ==========================================
    // Tweet / Share on X
    // ==========================================
    function tweetCurrentQuote() {
      if (!currentQuote) return;
      const text = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`);
      const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=quotes,dailyinspiration`;
      window.open(tweetUrl, "_blank", "noopener,noreferrer");
    }

    // ==========================================
    // Text-to-Speech (Equalizer Animation)
    // ==========================================
    function speakCurrentQuote() {
      if (!currentQuote) return;
      if (!("speechSynthesis" in window)) {
        showToast("Speech synthesis is not supported on this browser.");
        return;
      }

      window.speechSynthesis.cancel();
      const textToRead = `${currentQuote.text}. By ${currentQuote.author}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      speakQuoteBtn.classList.add("speaking");
      utterance.onend = () => speakQuoteBtn.classList.remove("speaking");
      utterance.onerror = () => speakQuoteBtn.classList.remove("speaking");

      window.speechSynthesis.speak(utterance);
    }

    // ==========================================
    // Theme Switcher (Dark / Light Mode)
    // ==========================================
    function setupTheme() {
      const savedTheme = localStorage.getItem("quoteverse_theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const activeTheme = savedTheme || (prefersDark ? "dark" : "light");

      document.documentElement.setAttribute("data-theme", activeTheme);
      updateThemeIcon(activeTheme);

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
          const current = document.documentElement.getAttribute("data-theme");
          const next = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("quoteverse_theme", next);
          updateThemeIcon(next);
        });
      }
    }

    function updateThemeIcon(theme) {
      if (!themeIcon) return;
      if (theme === "dark") {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
        themeToggleBtn.setAttribute("title", "Switch to Light Mode");
      } else {
        themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
      }
    }

    // ==========================================
    // Event Listeners & Keyboard Shortcuts
    // ==========================================
    if (newQuoteBtn) newQuoteBtn.addEventListener("click", () => displayNewQuote(true));
    if (copyQuoteBtn) copyQuoteBtn.addEventListener("click", copyCurrentQuote);
    if (tweetQuoteBtn) tweetQuoteBtn.addEventListener("click", tweetCurrentQuote);
    if (speakQuoteBtn) speakQuoteBtn.addEventListener("click", speakCurrentQuote);
    if (likeQuoteBtn) likeQuoteBtn.addEventListener("click", toggleFavorite);

    document.addEventListener("keydown", (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        displayNewQuote(true);
      } else if (e.key === "c" || e.key === "C") {
        copyCurrentQuote();
      } else if (e.key === "l" || e.key === "L") {
        toggleFavorite();
      } else if (e.key === "Escape") {
        closeFavoritesDrawer();
      }
    });

    // ==========================================
    // App Initialization
    // ==========================================
    setupTheme();
    populateCategories();
    updateFavoritesBadge();
    displayNewQuote(false); // Requirement 1 & 12: Generate random quote automatically on start
  });
}
