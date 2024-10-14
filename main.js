openInArchive = function(data){
  var url = data.linkUrl;
  browser.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url), active: false});
};

archiveTab = function (tab) {
  browser.storage.sync.get({ sameTab: true }).then((items) => {
    if (items.sameTab == true) {
      browser.tabs.update({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url)});
    } else {
      browser.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url), active: false});
    }
  });
};


browser.contextMenus.removeAll();

browser.contextMenus.create({
    id: 'archive_ph_link1',
    title: 'Archive Link',
    contexts:['link'],
  });

browser.contextMenus.onClicked.addListener(openInArchive);

browser.action.onClicked.addListener(archiveTab);
