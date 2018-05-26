chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "send_history")) {
    var x = document.getElementsByClassName("shopping-history-item");
    var csv = '"Date","Item","Price"\n';
    for (i = 0; i < x.length; i++) {
      var dates = x[i].querySelectorAll("[data-transaction-date]");
      var date = dates[0].getAttribute("data-transaction-date");
      var items = x[i].querySelectorAll(".single-item");
      for (j = 0; j < items.length; j++) {
        var item = items[j].querySelector(".item-name").innerHTML.trim();
        var price = items[j].querySelector(".price").innerHTML;
        csv += '"' + date + '","' + item + '","' + price + '"\n';
      }
    }
    sendResponse(csv);
  }
});
