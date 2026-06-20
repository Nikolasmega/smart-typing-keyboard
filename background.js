// Background service worker – minimal, no injection logic needed
// content.js is injected automatically via manifest content_scripts

chrome.runtime.onInstalled.addListener(() => {
  console.log('[STK v2.0] Installed');
});
