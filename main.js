openInArchive = function(data){
  var url = data.linkUrl;
  chrome.tabs.create({url: "https://archive.ph/?run=1&url=" + encodeURIComponent(url)});
};

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
    id: 'archive_ph_link1',
    title: 'Archive Link',
    contexts:['link'],
  });

chrome.contextMenus.onClicked.addListener(openInArchive)
