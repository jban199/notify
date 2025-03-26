// app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed', error);
      });
  });
}

// Request permission for push notifications
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Permission request failed', error);
  }
}

requestNotificationPermission();
