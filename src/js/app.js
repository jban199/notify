
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful');
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New service worker found');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Update available
                console.log('New content is available; please refresh.');
                showUpdateNotification();
              } else {
                // Content is cached for the first time
                console.log('Content is cached for offline use.');
              }
            }
          });
        });
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install button
  installBtn.style.display = 'block';
  
  installBtn.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      deferredPrompt = null;
      // Hide the install button
      installBtn.style.display = 'none';
    });
  });
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  installBtn.style.display = 'none';
  deferredPrompt = null;
});

// Network status
const offlineStatus = document.getElementById('offlineStatus');

window.addEventListener('online', () => {
  offlineStatus.textContent = '';
  offlineStatus.style.display = 'none';
  console.log('You are now online');
});

window.addEventListener('offline', () => {
  offlineStatus.textContent = 'You are currently offline. Some features may not be available.';
  offlineStatus.style.display = 'block';
  console.log('You are now offline');
});

// Initial check
if (!navigator.onLine) {
  offlineStatus.textContent = 'You are currently offline. Some features may not be available.';
  offlineStatus.style.display = 'block';
}

// Update notification
function showUpdateNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification('Update Available', {
      body: 'A new version is available. Click to refresh.',
      icon: '/icons/icon-96x96.png'
    });
    
    notification.onclick = () => {
      window.location.reload();
    };
  }
}

// Initialize other modules
import './notifications.js';
import './sync.js';
import './db.js';
