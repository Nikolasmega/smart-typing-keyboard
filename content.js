// ── Smart Typing Keyboard v2.0 ── content script ──────────────────────────
// Keystroke Dynamics Engine: simulates real human dwell/flight times
// Automatically injected via content_scripts – no manual injection needed

let lastFocusedEl = null;
let stopFlag = false;
let typingActive = false;

// ── Track last focused input before popup steals focus ────────────────────
document.addEventListener('focusin', (e) => {
  const el = e.target;
  if (isTypeable(el)) {
    lastFocusedEl = el;
  }
}, true);

// ── ESC stops typing anywhere on page ────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && typingActive) {
    stopFlag = true;
    removeOverlay();
  }
}, true);

// ── Message listener ──────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'startTyping') {
    if (!lastFocusedEl || !isTypeable(lastFocusedEl)) {
      sendResponse({ ok: false, reason: 'no_field' });
      return true;
    }
    sendResponse({ ok: true });
    startWithCountdown(lastFocusedEl, msg.text, msg.minutes);
  }
  if (msg.action === 'stopTyping') {
    stopFlag = true;
    removeOverlay();
    sendResponse({ ok: true });
  }
  return true;
});

// ── Countdown overlay ─────────────────────────────────────────────────────
function startWithCountdown(el, text, minutes) {
  stopFlag = false;
  let sec = 5;
  const overlay = createOverlay(`⌛ Starting in ${sec}s… (ESC to cancel)`);
  const timer = setInterval(() => {
    sec--;
    if (stopFlag) { clearInterval(timer); removeOverlay(); return; }
    if (sec <= 0) {
      clearInterval(timer);
      updateOverlay('⌨️ Typing… ESC to stop');
      el.focus();
      runTyping(el, text, minutes);
    } else {
      updateOverlay(`⌛ Starting in ${sec}s… (ESC to cancel)`);
    }
  }, 1000);
}

// ── Keystroke Dynamics Engine ─────────────────────────────────────────────
async function runTyping(el, text, minutes) {
  typingActive = true;
  const isFastMode = minutes === 'fast';
  const baseFlightMs = isFastMode ? 35 : (minutes * 60 * 1000) / Math.max(text.length, 1);
  const avgKeyMs = isFastMode ? 90 : baseFlightMs;
  const totalMs = isFastMode ? (text.length * avgKeyMs) : (minutes * 60 * 1000);

  // Common English bigrams typed faster (15-25% reduction)
  const fastBigrams = new Set([
    'th','he','in','er','an','re','on','en','at','es',
    'ed','nd','to','or','ea','ti','ar','te','ng','al',
    'it','as','is','ha','et','se','ou','of','le','sa',
    'ro','de','st','io','ne','ra','nt','hi','ri','ld',
    'be','me','li','ce','wi','ca','we','si','ve','la'
  ]);

  let charIndex = 0;
  let totalTyped = 0;

  while (charIndex < text.length) {
    if (stopFlag) break;

    // ── Fatigue model: slow down slightly over time ──────────────────────
    const fatigue = isFastMode ? 1.0 : (1 + (charIndex / text.length) * 0.20);

    // ── Bigram speed boost ───────────────────────────────────────────────
    let bigramFactor = 1.0;
    if (charIndex > 0) {
      const bigram = (text[charIndex - 1] + text[charIndex]).toLowerCase();
      if (fastBigrams.has(bigram)) bigramFactor = isFastMode ? 0.90 : 0.80;
    }

    const char = text[charIndex];

    // ── 2% chance: typo → Backspace → correct char ──────────────────────
    if (Math.random() < 0.02 && char !== '\n' && char !== ' ') {
      const wrongChar = getAdjacentKey(char);
      await pressKey(el, wrongChar, isFastMode);
      await sleep(gaussRandom(isFastMode ? 80 : 120, isFastMode ? 20 : 40));
      await pressKey(el, 'Backspace', isFastMode);
      await sleep(gaussRandom(isFastMode ? 70 : 100, isFastMode ? 20 : 30));
    }

    // ── 4% micro-pause (thinking) ────────────────────────────────────────
    if (Math.random() < 0.04) {
      await sleep(gaussRandom(isFastMode ? 300 : 800, isFastMode ? 100 : 300));
    }

    // ── Insert the character ─────────────────────────────────────────────
    await pressKey(el, char, isFastMode);
    totalTyped++;

    // ── Flight time to next key ──────────────────────────────────────────
    let flight = gaussRandom(baseFlightMs, baseFlightMs * 0.35) * fatigue * bigramFactor;

    // Punctuation pause
    if (['.', '!', '?'].includes(char))  flight += isFastMode ? gaussRandom(150, 50) : gaussRandom(500, 150);
    else if ([',', ';', ':'].includes(char)) flight += isFastMode ? gaussRandom(80, 25) : gaussRandom(250, 80);
    else if (char === '\n')               flight += isFastMode ? gaussRandom(180, 60) : gaussRandom(600, 200);
    else if (char === ' ')               flight += isFastMode ? gaussRandom(25, 10) : gaussRandom(60, 20);

    flight = Math.max(isFastMode ? 10 : 20, flight); // never below 10ms for fast mode

    await sleep(flight);
    charIndex++;

    // Update progress
    const pct = Math.round((charIndex / text.length) * 100);
    const remaining = Math.round((totalMs - (totalTyped * avgKeyMs)) / 1000);
    updateOverlay(`⌨️ ${pct}% typed… ESC to stop`);
  }

  typingActive = false;
  if (!stopFlag) {
    updateOverlay('✅ Done!');
    setTimeout(removeOverlay, 2500);
  } else {
    removeOverlay();
  }
}

// ── Simulate a single keypress with realistic dwell time ──────────────────
async function pressKey(el, key, isFastMode = false) {
  const isChar = key.length === 1;
  const dwellTime = isFastMode ? gaussRandom(55, 15) : gaussRandom(85, 28); // realistic hold duration

  // keydown
  el.dispatchEvent(new KeyboardEvent('keydown', {
    key,
    code: getCode(key),
    bubbles: true,
    cancelable: true
  }));

  // Insert character mid-dwell (as browser does natively)
  if (isChar) {
    insertChar(el, key);
  } else if (key === 'Backspace') {
    deleteChar(el);
  }

  await sleep(dwellTime);

  // keyup
  el.dispatchEvent(new KeyboardEvent('keyup', {
    key,
    code: getCode(key),
    bubbles: true,
    cancelable: true
  }));
}

// ── Insert a character into the element ──────────────────────────────────
function insertChar(el, char) {
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    const s = el.selectionStart || 0;
    const e = el.selectionEnd || 0;
    el.value = el.value.slice(0, s) + char + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s + 1;
    el.dispatchEvent(new InputEvent('input', {
      inputType: 'insertText',
      data: char,
      bubbles: true,
      cancelable: false
    }));
  } else if (el.isContentEditable) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const node = document.createTextNode(char);
      range.insertNode(node);
      range.setStartAfter(node);
      range.setEndAfter(node);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    el.dispatchEvent(new InputEvent('input', {
      inputType: 'insertText',
      data: char,
      bubbles: true
    }));
  }
}

// ── Delete last char (Backspace) ──────────────────────────────────────────
function deleteChar(el) {
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    const s = el.selectionStart;
    if (s > 0) {
      el.value = el.value.slice(0, s - 1) + el.value.slice(s);
      el.selectionStart = el.selectionEnd = s - 1;
      el.dispatchEvent(new InputEvent('input', {
        inputType: 'deleteContentBackward',
        bubbles: true
      }));
    }
  }
}

// ── Adjacent QWERTY key for typo simulation ───────────────────────────────
function getAdjacentKey(char) {
  const adj = {
    a:'s',b:'v',c:'x',d:'s',e:'r',f:'g',g:'h',h:'j',i:'o',j:'k',
    k:'l',l:'k',m:'n',n:'m',o:'p',p:'o',q:'w',r:'e',s:'a',t:'r',
    u:'y',v:'b',w:'q',x:'c',y:'u',z:'x'
  };
  return adj[char.toLowerCase()] || char;
}

// ── Key code mapper ───────────────────────────────────────────────────────
function getCode(key) {
  if (key === ' ')  return 'Space';
  if (key === '\n') return 'Enter';
  if (key === 'Backspace') return 'Backspace';
  if (key.length === 1) return `Key${key.toUpperCase()}`;
  return key;
}

// ── Gaussian random number ────────────────────────────────────────────────
function gaussRandom(mean, std) {
  // Box-Muller transform
  const u1 = Math.random(), u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return Math.max(0, mean + z * std);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, Math.max(0, ms)));
}

function isTypeable(el) {
  if (!el) return false;
  if (el.tagName === 'TEXTAREA') return true;
  if (el.tagName === 'INPUT') {
    const t = (el.type || 'text').toLowerCase();
    return ['text','email','search','url','tel','number','password',''].includes(t);
  }
  return el.isContentEditable === true || el.contentEditable === 'true';
}

// ── Overlay helpers ───────────────────────────────────────────────────────
function createOverlay(msg) {
  removeOverlay();
  const div = document.createElement('div');
  div.id = '__stk_overlay__';
  div.textContent = msg;
  Object.assign(div.style, {
    position: 'fixed', top: '16px', right: '16px', zIndex: '2147483647',
    background: 'rgba(30,30,30,0.92)', color: '#fff',
    padding: '10px 16px', borderRadius: '8px',
    fontSize: '13px', fontFamily: 'monospace',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    pointerEvents: 'none', userSelect: 'none',
    maxWidth: '240px', lineHeight: '1.4'
  });
  document.body.appendChild(div);
  return div;
}

function updateOverlay(msg) {
  const el = document.getElementById('__stk_overlay__');
  if (el) el.textContent = msg;
}

function removeOverlay() {
  const el = document.getElementById('__stk_overlay__');
  if (el) el.remove();
}

console.log('[STK v2.0] Ready – keystroke dynamics engine loaded');
