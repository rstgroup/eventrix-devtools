chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const iconName = 'eventrix_';
    chrome.browserAction.setIcon({
        tabId: tabId,
        path: {
            '16': 'images/'+ iconName + '16x16.png',
            '32': 'images/' + iconName + '32x32.png',
            '48': 'images/' + iconName + '48x48.png',
            '128': 'images/' + iconName + '128x128.png',
        },
    });
});