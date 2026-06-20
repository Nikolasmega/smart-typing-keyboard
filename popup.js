let minutes = null;

const txt      = document.getElementById('txt');
const stats    = document.getElementById('stats');
const info     = document.getElementById('info');
const startBtn = document.getElementById('startBtn');
const stopBtn  = document.getElementById('stopBtn');
const status   = document.getElementById('status');

// ── Text input ────────────────────────────────────────────────────────────
txt.addEventListener('input', () => {
  stats.textContent = `Characters: ${txt.value.length}`;
  updateInfo();
});

// ── Time buttons ──────────────────────────────────────────────────────────
document.querySelectorAll('.tb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tb').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    minutes = btn.dataset.m === 'fast' ? 'fast' : parseInt(btn.dataset.m);
    updateInfo();
  });
});

function updateInfo() {
  if (!minutes || !txt.value.length) {
    info.innerHTML = 'Select time and paste text to see speed.';
    startBtn.disabled = true;
    return;
  }
  if (minutes === 'fast') {
    info.innerHTML  = `<span>⚡ Pro Typist</span> · ~140 WPM · ~11.6 chars/sec`;
  } else {
    const totalSec  = minutes * 60;
    const cps       = (txt.value.length / totalSec).toFixed(3);
    const msPerChar = Math.round(totalSec / txt.value.length * 1000);
    const wpm       = Math.round(txt.value.length / 5 / minutes);
    info.innerHTML  = `<span>~${wpm} WPM</span> · ${cps} chars/sec · ${msPerChar}ms avg per key`;
  }
  startBtn.disabled = false;
}

// ── Start ─────────────────────────────────────────────────────────────────
startBtn.addEventListener('click', async () => {
  if (!minutes || !txt.value.trim()) {
    setStatus('Paste text and select a time.', 'err');
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) { setStatus('No active tab found.', 'err'); return; }

  // content.js is already auto-injected via manifest content_scripts
  // Just send message directly
  chrome.tabs.sendMessage(tab.id,
    { action: 'startTyping', text: txt.value, minutes },
    (res) => {
      if (chrome.runtime.lastError || !res) {
        // Content script not loaded yet on this tab – inject once then retry
        chrome.scripting.executeScript(
          { target: { tabId: tab.id }, files: ['content.js'] },
          () => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id,
                { action: 'startTyping', text: txt.value, minutes },
                (res2) => {
                  if (!res2 || !res2.ok) {
                    setStatus('⚠️ Click your text field FIRST, then press Start.', 'err');
                    return;
                  }
                  onStarted();
                }
              );
            }, 200);
          }
        );
        return;
      }
      if (!res.ok) {
        setStatus('⚠️ Click the text field on the page first!', 'err');
        return;
      }
      onStarted();
    }
  );
});

function onStarted() {
  setStatus('✅ 5s countdown started — switch to the page!', 'ok');
  startBtn.disabled = true;
  stopBtn.disabled  = false;
  // Auto-close popup so focus returns to page
  setTimeout(() => window.close(), 800);
}

// ── Stop ──────────────────────────────────────────────────────────────────
stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) chrome.tabs.sendMessage(tab.id, { action: 'stopTyping' });
  stopBtn.disabled  = true;
  startBtn.disabled = false;
  setStatus('Stopped.', '');
});

// ── Completion notification ───────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'typingDone') {
    stopBtn.disabled  = true;
    startBtn.disabled = false;
    setStatus('✅ Typing complete!', 'ok');
  }
});

function setStatus(msg, cls) {
  status.textContent = msg;
  status.className   = cls;
}
