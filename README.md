# QuoteVerse — Live Animated Random Quote Experience

A visually stunning, high-performance web application featuring dynamic live background animations, interactive 3D card tilt, particle physics, procedural audio synthesis, and a bookmarked favorites system.

---

## 🌟 Live Interactive UI/UX Upgrades

- **🌌 Live Aurora Mesh & Particle Canvas:** Ambient floating radial glow combined with an interactive HTML5 canvas rendering floating ambient stardust particles.
- **✨ Confetti & Sparkle Physics Burst:** Clicking "New Quote" or "Like" shoots out a dynamic particle burst directly from the button.
- **🎴 Interactive 3D Card Tilt:** The glassmorphism card tracks mouse movement and smoothly tilts in 3D perspective with realistic specular lighting highlights.
- **🔔 Procedural Web Audio Synth Chime:** Produces a soothing ethereal bell chime (C5-E5-G5 harmonic sweep) using the native browser Web Audio API—completely local, zero MP3 files needed. Includes a sound mute/unmute toggle.
- **❤️ Favorites System & Slide-Out Drawer:** Bookmark quotes to your favorites with an animated heart bounce. Saved in `localStorage` and accessible via a sleek slide-out drawer with one-click copy and deletion.
- **🏷️ Interactive Category Chip Pills:** Quick-filter quotes across Wisdom, Inspiration, Courage, Motivation, and Creativity with active glowing indicators.
- **🎙️ Voice Speech with Equalizer Animation:** Uses the Web Speech API to read quotes aloud with an animated 3-bar sound wave equalizer.
- **📋 Icon Morph Copy Animation:** The clipboard icon transforms into a green checkmark when copied, accompanied by an animated toast notification.
- **🌓 Dark & Light Mode:** Seamless transition between dark space aurora and clean frosted glass daylight themes.
- **⌨️ Keyboard Shortcuts:**
  - <kbd>Space</kbd> — Generate New Quote
  - <kbd>C</kbd> — Copy Quote
  - <kbd>L</kbd> — Like / Save to Favorites
  - <kbd>Esc</kbd> — Close Favorites Drawer

---

## 📋 Requirements & Feature Checklist

| # | Requirement | Implementation Details | Status |
|---|---|---|---|
| **1** | Display a random quote on app launch | `displayNewQuote()` triggers automatically during `DOMContentLoaded`. | ✅ Implemented |
| **2** | Clearly visible "New Quote" button | High-energy gradient button with animated light shimmer reflection and rotating dice icon. | ✅ Implemented |
| **3** | Display a different quote on every click | Clicking "New Quote" calls `getRandomQuote()`, which selects an unpredictable new quote. | ✅ Implemented |
| **4** | Show quote text & author name | Prominent typography with semantic `<blockquote>` for text and `<cite>` for author with verified badge. | ✅ Implemented |
| **5** | Include at least 15–20 quotes | **30 curated quotes** stored locally in `js/quotes.js` across multiple disciplines. | ✅ Implemented (30 Quotes) |
| **6** | Avoid consecutive duplicates | Loop condition `while (nextIndex === this.currentIndex)` prevents the same quote from appearing twice consecutively. | ✅ Implemented |
| **7** | Clean, modern, minimal UI | Glassmorphism 2.0 card, specular highlights, aurora glow, soft shadows, and clean visual hierarchy. | ✅ Implemented |
| **8** | Prominent quote text & distinguishable author | Fluid responsive typography (`clamp()`), distinct font weight, and author displayed with verification badge. | ✅ Implemented |
| **9** | Smooth transition/animation | Two-stage animation: `quote-exit` (blur & slide up) and `quote-enter` (cinematic focus reveal). | ✅ Implemented |
| **10** | Fully responsive layout | Fluid layout and CSS Media Queries adapting seamlessly to Mobile (<680px), Tablet, and Desktop. | ✅ Implemented |
| **11** | Zero external API dependency | Quotes are bundled in `js/quotes.js` and loaded offline immediately. | ✅ Implemented |
| **12** | Automatic quote on start | Triggered immediately when the DOM finishes loading. | ✅ Implemented |
| **13** | Reliable "New Quote" button | Debounced during animation transitions to guarantee reliable execution without race conditions. | ✅ Implemented |
| **14** | High contrast & good typography | Accessible color contrasts, custom fonts ('Outfit' & 'Plus Jakarta Sans'), and Dark/Light modes. | ✅ Implemented |

---

## 📁 Project Structure

```text
random quote generatorCA/
├── index.html              # Modern semantic structure with canvas layers & slide drawer
├── css/
│   └── style.css           # Glassmorphism, aurora glow, keyframes, 3D tilt, and responsive design
├── js/
│   ├── quotes.js           # Local dataset of 30 curated quotes with authors & categories
│   └── app.js              # Particles, confetti physics, 3D tilt, Web Audio chime, and favorites
├── tests/
│   └── quote-logic.test.js # Automated unit tests verifying non-consecutive randomization
└── README.md               # Documentation and execution guide
```

---

## 🧪 Automated Test Verification

Run the test suite via Node.js:
```bash
node tests/quote-logic.test.js
```

**Output:**
```text
=========================================
 Running Random Quote Generator Test Suite 
=========================================

   (Found 30 quotes)
✅ PASS: Dataset contains at least 15-20 quotes
✅ PASS: Every quote contains non-empty 'text' and 'author'
✅ PASS: QuoteApp initializes and returns a valid quote on first call
✅ PASS: getRandomQuote() never produces consecutive duplicates across 1,000 iterations
✅ PASS: All quotes are stored locally and accessible without network
✅ PASS: Category filtering works properly and respects non-consecutive rule
✅ PASS: Handles edge case of single quote gracefully without infinite loop

Results: 7/7 tests passed.
```

---

## 🚀 How to Run

### Direct Browser Open (Zero install)
Simply double-click [`index.html`](index.html) in your file manager or browser.

### Local HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Open: [http://localhost:8000](http://localhost:8000)
