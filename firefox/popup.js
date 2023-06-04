document.addEventListener("DOMContentLoaded", function () {
  const openNewTabCheckbox = document.getElementById("openNewTabCheckbox");

  // Retrieve the checkbox state from storage and update the checkbox on popup load
  browser.storage.local.get("openNewTabCheckbox").then(function (result) {
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

    browser.storage.local.set({ openNewTabCheckbox: isChecked }).then(function () {
      console.log("Open Twitch Channel - Checkbox state saved.");
    });
  });

  function openUrl(url) {
    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
      browser.storage.local.get("openNewTabCheckbox").then(function (result) {
        const newTab = result.openNewTabCheckbox || false;

        if (newTab) {
          browser.tabs.create({ url: url });
        } else {
          browser.tabs.update(tabs[0].id, { url: url });
        }
        window.close();
      });
    });
  }
});
