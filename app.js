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




// Handle Form Submission and Set Notifications

document.getElementById('notification-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];
  const dateTime = document.getElementById('date-time').value;

  const notificationData = {
    title,
    description,
    image,
    dateTime: new Date(dateTime).getTime(),
  };

  saveNotification(notificationData);
  displayNotifications();
});

function saveNotification(notificationData) {
  let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.push(notificationData);
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

function displayNotifications() {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const notificationsList = document.getElementById('notifications-list');
  notificationsList.innerHTML = '';

  notifications.forEach((notification) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${notification.title} - ${new Date(notification.dateTime).toLocaleString()}`;
    notificationsList.appendChild(listItem);
  });
}

function scheduleNotification(notification) {
  const now = Date.now();
  const delay = notification.dateTime - now;

  if (delay > 0) {
    setTimeout(() => {
      showNotification(notification);
    }, delay);
  }
}

function showNotification(notification) {
  const options = {
    body: notification.description,
    icon: notification.image ? URL.createObjectURL(notification.image) : 'icons/icon-192x192.png',
    badge: 'icons/icon-192x192.png',
  };

  new Notification(notification.title, options);
}

// Display notifications on page load
displayNotifications();


// Handle installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  deferredPrompt = event;
  deferredPrompt.prompt();
});
