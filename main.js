openInArchive = function(data) {
  var url = data.linkUrl;
  var shift = (data.modifiers.indexOf('Shift') > -1);
  var ctrl = ((data.modifiers.indexOf('Ctrl') > -1) || (data.modifiers.indexOf('MacCtrl') > -1));
  browser.storage.sync.get({
      sameTab: true,
      backgroundNewTab: true,
      rightClickNewTab: true
    }).then((items) => {
    if (items.rightClickNewTab != shift) {
      browser.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url), active: (items.backgroundNewTab == ctrl)});
    } else {
      browser.tabs.update({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url)});
    }
  });
};

archiveTab = function (tab, data) {
  var shift = (data.modifiers.indexOf('Shift') > -1);
  var ctrl = ((data.modifiers.indexOf('Ctrl') > -1) || (data.modifiers.indexOf('MacCtrl') > -1));
  browser.storage.sync.get({
      sameTab: true,
      backgroundNewTab: true,
      rightClickNewTab: true
    }).then((items) => {
    if (items.sameTab != shift) {
      browser.tabs.update({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url)});
    } else {
      browser.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(tab.url), active: (items.backgroundNewTab == ctrl)});
    }
  });
};


browser.contextMenus.removeAll();

browser.contextMenus.create({
  id: 'archive_ph_link1',
  title: 'Archive Link',
  contexts: ['link'],
});

browser.contextMenus.onClicked.addListener(openInArchive);

browser.action.onClicked.addListener(archiveTab);
