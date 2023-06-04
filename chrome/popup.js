document.addEventListener("DOMContentLoaded", function () {
  const openNewTabCheckbox = document.getElementById("openNewTabCheckbox");

  // Retrieve the checkbox state from storage and update the checkbox on popup load
  chrome.storage.local.get(["openNewTabCheckbox"], function (result) {
    openNewTabCheckbox.checked = result.openNewTabCheckbox || false;
  });

  document.getElementById("playerButton").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function if the username is empty
    }
    let url = "https://player.twitch.tv/?channel=" + username + "&parent=twitch.tv";
    openUrl(url);
  });

  document.getElementById("chatButton").addEventListener("click", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function if the username is empty
    }
    let url = "https://www.twitch.tv/popout/" + username + "/chat";
    openUrl(url);
  });

  document.getElementById("channelButton").addEventListener("click", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    if (username === '') {
      return; // exit the function if the username is empty
    }
    let url = "https://twitch.tv/" + username;
    openUrl(url);
  });

  // Save the checkbox state to storage when it changes
  openNewTabCheckbox.addEventListener("change", function () {
    const isChecked = openNewTabCheckbox.checked;

    chrome.storage.local.set({ openNewTabCheckbox: isChecked }, function () {
      console.log("Open Twitch Channel - Checkbox state saved.");
    });
  });

  function openUrl(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.get(["openNewTabCheckbox"], function (result) {
        const newTab = result.openNewTabCheckbox || false;

        if (newTab) {
          chrome.tabs.create({ url: url });
        } else {
          chrome.tabs.update(tabs[0].id, { url: url });
        }
        window.close();
      });
    });
  }
});

// Prevent focus loss when clicking off of text input
window.addEventListener('DOMContentLoaded', function() {
  var inputElement = document.getElementById('username');
  inputElement.focus();
  inputElement.addEventListener('blur', function() {
    inputElement.focus();
  });
});
