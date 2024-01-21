document.addEventListener("DOMContentLoaded", function() {
    const openNewTabCheckbox = document.getElementById("openNewTabCheckbox");
    const usernameInput = document.getElementById("username");

    // Retrieve the checkbox state from storage and update the checkbox on popup load
    chrome.storage.local.get({ "openNewTabCheckbox": false }, function(result) {
        openNewTabCheckbox.checked = result.openNewTabCheckbox;
    });

    function openUrl(url) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const newTab = openNewTabCheckbox.checked;

            if (newTab) {
                chrome.tabs.create({ url: url });
            } else {
                chrome.tabs.update(tabs[0].id, { url: url });
            }
            window.close();
        });
    }

    function handleButtonClick(urlBuilder) {
        return function(event) {
            event.preventDefault();
            const username = usernameInput.value.trim();
            if (username === '') {
                return; // exit the function if the username is empty
            }
            const url = urlBuilder(username);
            openUrl(url);
        };
    }

    // Button event listeners
    document.getElementById("channelButton").addEventListener("submit", handleButtonClick(username => `https://twitch.tv/${username}`));
    document.getElementById("playerButton").addEventListener("click", handleButtonClick(username => `https://player.twitch.tv/?channel=${username}&parent=twitch.tv`));
    document.getElementById("chatButton").addEventListener("click", handleButtonClick(username => `https://www.twitch.tv/popout/${username}/chat`));

    // Save the checkbox state to storage when it changes
    openNewTabCheckbox.addEventListener("change", function() {
        const isChecked = openNewTabCheckbox.checked;

        chrome.storage.local.set({ "openNewTabCheckbox": isChecked }, function() {
            console.log("Open Twitch Channel - Checkbox state saved.");
        });
    });
});