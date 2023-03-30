document.addEventListener("DOMContentLoaded", function() {
  var changeButton = document.getElementById("changeButton");
  changeButton.addEventListener("click", function() {
    var url = "https://player.twitch.tv/?channel=xqc&parent=twitch.tv";
    var username = document.getElementById("username").value;
    var newUrl = url.replace(/xqc/, username);
    chrome.tabs.create({ url: newUrl });
  });
});
