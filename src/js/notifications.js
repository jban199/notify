const notifyBtn = document.getElementById('notifyBtn');

// Request notification permission
notifyBtn.addEventListener('click', () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        showWelcomeNotification();
      } else {
        console.log('Notification permission denied');
      }
    });
  } else {
    console.log('This browser does not support notifications');
  }
});

function showWelcomeNotification() {
  if ('serviceWorker' in navigator && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('Welcome to PWA Boilerplate', {
        body: 'Thank you for enabling notifications!',
        icon: '/icons/icon-96x96.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
          url: '/'
        }
      });
    });
  }
}

// Periodic sync (for newer browsers)
if ('periodicSync' in navigator && 'serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.periodicSync.register('update-content', {
      minInterval: 24 * 60 * 60 * 1000 // 1 day
    }).then(() => {
      console.log('Periodic sync registered');
    }).catch((err) => {
      console.log('Periodic sync registration failed:', err);
    });
  });
}
