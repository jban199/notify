// Check for Notification API support
if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
}

// Request notification permission on page load
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                alert("Notifications are disabled. Enable them for the best experience.");
            }
        });
    }
    displayNotifications();
});

// Handle form submission to schedule notifications
document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();
    let imageUrl = document.getElementById('imageUrl').value.trim();
    let datetime = new Date(document.getElementById('datetime').value).getTime();

    if (!title || !description || isNaN(datetime)) {
        alert("Please fill in all required fields.");
        return;
    }

    if (datetime < Date.now()) {
        alert("Please choose a future time.");
        return;
    }

    let notification = { title, description, imageUrl, datetime };
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    scheduleNotification(notification);
    displayNotifications();

    document.getElementById('notificationForm').reset(); // Clear form
});

// Function to schedule a notification
function scheduleNotification(notification) {
    let delay = notification.datetime - Date.now();
    setTimeout(() => {
        showNotification(notification);
    }, delay);
}

// Function to show a notification
function showNotification(notification) {
    if (Notification.permission === "granted") {
        new Notification(notification.title, {
            body: notification.description,
            icon: notification.imageUrl || 'default-icon.png'
        });
    }
}

// Function to display scheduled notifications
function displayNotifications() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    let list = document.getElementById('notificationList');
    list.innerHTML = '';
    
    notifications.forEach((notification, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span>${notification.title} - ${new Date(notification.datetime).toLocaleString()}</span>
            <button onclick="deleteNotification(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Function to delete a notification
function deleteNotification(index) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    displayNotifications();
}

// Reschedule notifications on page load
window.addEventListener('load', () => {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => {
        if (notification.datetime > Date.now()) {
            scheduleNotification(notification);
        }
    });
});
