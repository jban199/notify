if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
}

document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let imageUrl = document.getElementById('imageUrl').value;
    let datetime = new Date(document.getElementById('datetime').value).getTime();

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
});

function scheduleNotification(notification) {
    let delay = notification.datetime - Date.now();
    setTimeout(() => {
        new Notification(notification.title, {
            body: notification.description,
            icon: notification.imageUrl || 'default-icon.png'
        });
    }, delay);
}

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

function deleteNotification(index) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    displayNotifications();
}

displayNotifications();
