self.addEventListener('push', (event) => {
    // التأكد من وجود بيانات في التنبيه المرسل، وإلا وضع نص افتراضي
    let msg = "تنبيه جديد من تطبيق المتبقي";
    if (event.data) {
        msg = event.data.text();
    }

    const options = {
        body: msg,
        icon: 'https://i.ibb.co/fYWfbWBQ/logo.png', // استخدم الرابط المباشر للصورة لضمان ظهورها
        badge: 'https://i.ibb.co/fYWfbWBQ/logo.png', // أيقونة صغيرة تظهر في شريط التنبيهات
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {action: 'explore', title: 'فتح الموقع'}
        ]
    };

    event.waitUntil(
        self.registration.showNotification('تطبيق المتبقي', options)
    );
});

// فتح الموقع عند الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://sdkd2039.github.io/residual/')
    );
});
