// Download Food Lion Shopping History

// Display icon when on the Food Lion Shopping History page
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'shopping-history' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function downloadHistory(data) {
  downloadURI(
  	'data:text/csv;charset=utf-8;base64,' + window.btoa(data),
  	"foodlion-history.csv"
  );
}

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { text: "send_history" }, downloadHistory);
});
