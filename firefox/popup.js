document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("playerButton").addEventListener("submit", function (event) {
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

  document.getElementById("chatButton").addEventListener("click", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function if the username is empty
    }
    let url = "https://www.twitch.tv/popout/" + username + "/chat";
    chrome.tabs.create({ url: url });
    window.close();
  });

  document.getElementById("channelButton").addEventListener("click", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function of the username it empty
    }
    let url = "https://twitch.tv/" + username;
    chrome.tabs.create({ url: url });
    window.close();
  });
});
