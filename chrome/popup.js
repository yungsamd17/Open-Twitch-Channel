document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("changeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function if the username is empty
    }
    let url = "https://player.twitch.tv/?channel=" + username + "&parent=twitch.tv";
    chrome.tabs.create({ url: url });
    window.close();
  });
  document.getElementById("username").focus();
});