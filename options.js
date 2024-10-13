// Saves options to chrome.storage
const saveOptions = () => {
  const sameTab = document.getElementById('same-tab').checked;

  chrome.storage.sync.set(
    { sameTab: sameTab },
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { sameTab: true },
    (items) => {
      console.log('options items:');
      console.log(items);
      document.getElementById('same-tab').checked = items.sameTab;
    }
  );
};

const closeOptions = () => {
  console.log('closing');
  window.close();
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('same-tab').addEventListener('click', saveOptions);
document.getElementById('close-button').addEventListener('click', closeOptions);
