const syncBtn = document.getElementById('syncBtn');

syncBtn.addEventListener('click', () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.sync.register('sync-data')
        .then(() => {
          console.log('Background sync registered');
          showSyncNotification('Sync registered. Data will be updated when online.');
        })
        .catch((err) => {
          console.log('Background sync registration failed:', err);
        });
    });
  } else {
    console.log('Background sync not supported');
    showSyncNotification('Background sync not supported in this browser');
  }
});

function showSyncNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Sync Status', {
      body: message,
      icon: '/icons/icon-96x96.png'
    });
  }
}
