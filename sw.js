self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

// استقبال التنبيه وعرضه
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'تنبيه من تطبيق المتبقي';
    const options = {
        body: data,
        icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        badge: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('المتبقي', options));
});

// فتح الموقع عند الضغط على التنبيه
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('https://sdkd2039.github.io/residual/'));
});
