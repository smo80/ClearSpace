
window.addEventListener('message', function(event) {
    if (event.source === window && event.data && event.data.type === 'websiteAdded') {
      chrome.runtime.sendMessage({ type: 'websiteAdded' });
    }
  });