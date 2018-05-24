import Popup from './services/frontend/popup.js';

window.producthunt_bot = new Popup();

chrome.runtime.onMessage.addListener(
    function(response, sender, sendResponse) {
        if (response.action == "follow") {
            window.producthunt_bot._doAction("follow");
        }

        if (response.action == "unfollow") {
            window.producthunt_bot._doAction("unfollow");
        }
    }
)