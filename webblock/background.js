// background.js

let blockedWebsitesPatterns = [];

function updateBlockedWebsites() {
  fetch('http://localhost:3000/api/blocked-websites')
    .then(response => response.json())
    .then(data => {
      blockedWebsitesPatterns = data.blockedWebsites.map(site => {
        let pattern = site;
        if (!pattern.startsWith('http')) {
          pattern = '*://*.' + pattern + '/*';
        }
        return pattern;
      });
      refreshWebRequestListener();
    });
}

function refreshWebRequestListener() {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }
  if (blockedWebsitesPatterns.length > 0) {
    chrome.webRequest.onBeforeRequest.addListener(
      blockRequest,
      { urls: blockedWebsitesPatterns },
      ["blocking"]
    );
  }
}

function blockRequest(details) {
  return { cancel: true };
}

// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'websiteAdded') {
    updateBlockedWebsites();
  }
});

updateBlockedWebsites();
setInterval(updateBlockedWebsites, 1000); // Update every 1 second