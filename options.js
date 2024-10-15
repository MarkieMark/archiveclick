// Saves options to chrome.storage
const saveOptions = () => {
  const sameTab = document.getElementById('same-tab').checked;
  const backgroundNewTab = document.getElementById('background-new-tab').checked;
  const rightClickNewTab = document.getElementById('right-click-new-tab').checked;

  chrome.storage.sync.set(
    {
      sameTab: sameTab,
      backgroundNewTab: backgroundNewTab,
      rightClickNewTab: rightClickNewTab
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');;
      status.textContent = 'Option saved.';
      setTimeout(() => {
        status.innerHTML = '&nbsp;';
      }, 750);
    }
  );
};

// Restores checkbox state using the stored preferences
const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      sameTab: true,
      backgroundNewTab: true,
      rightClickNewTab: true
    },
    (items) => {
      console.log('options items:');
      console.log(items);
      document.getElementById('same-tab').checked = items.sameTab;
      document.getElementById('background-new-tab').checked = items.backgroundNewTab;
      document.getElementById('right-click-new-tab').checked = items.rightClickNewTab;
    }
  );
};

const closeOptions = () => {
  window.close();
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('same-tab').addEventListener('click', saveOptions);
document.getElementById('background-new-tab').addEventListener('click', saveOptions);
document.getElementById('right-click-new-tab').addEventListener('click', saveOptions);
document.getElementById('close-button').addEventListener('click', closeOptions);
