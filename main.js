openInArchive = function(data) {
  var url = data.linkUrl;
  chrome.storage.sync.get({
      sameTab: true,
      backgroundNewTab: true,
      rightClickNewTab: true
    }).then((items) => {
    if (items.rightClickNewTab == true) {
      chrome.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url), active: !(items.backgroundNewTab)});
    } else {
      chrome.tabs.update({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url)});
    }
  });
};

archiveTab = function (tab) {
  chrome.storage.sync.get({
      sameTab: true,
      backgroundNewTab: true,
      rightClickNewTab: true
    }).then((items) => {
    if (items.sameTab == true) {
      chrome.tabs.update({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url)});
    } else {
      chrome.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url), active: !(items.backgroundNewTab)});
    }
  });
};

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
    id: 'archive_ph_link1',
    title: 'Archive Link',
    contexts:['link'],
  });

chrome.contextMenus.onClicked.addListener(openInArchive);

chrome.action.onClicked.addListener(archiveTab);
