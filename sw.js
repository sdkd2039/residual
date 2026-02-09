// sw.js - ملف المتصفح
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || 'https://i.ibb.co/fYWfbWBQ/logo.png',
            badge: data.badge || 'https://i.ibb.co/fYWfbWBQ/logo.png',
            data: { url: data.data.url },
            vibrate: [200, 100, 200]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
