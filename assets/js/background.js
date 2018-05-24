let contexts = ["page"];
let title = "Producthunt helper";
let domainPattern = ["*://*.producthunt.com/@*/followers", "*://*.producthunt.com/@*/following"];

contexts.forEach(function(context) {
    chrome.contextMenus.create({
        "title": "Follow",
        "contexts": [context],
        "onclick": sendFollow,
        "documentUrlPatterns": domainPattern
    });
    chrome.contextMenus.create({
        "title": "Unfollow",
        "contexts": [context],
        "onclick": sendUnfollow,
        "documentUrlPatterns": domainPattern
    });
});

function sendFollow() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "follow"
        }, function(response) {});
    });
}

function sendUnfollow() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "unfollow"
        }, function(response) {});
    });
}