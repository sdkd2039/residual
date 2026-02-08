self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request));
});

// الكود الجديد لاستقبال الإشعارات في الخلفية
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'تنبيه جديد من المتبقي';
    event.waitUntil(
        self.registration.showNotification('المتبقي', {
            body: data,
            icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
            vibrate: [200, 100, 200]
        })
    );
});
