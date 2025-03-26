// service-worker.js
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-192x192.png',
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
