// كود ملف sw.js المطور لجميع البطاقات
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('push', (event) => {
    // تعريف تواريخ المناسبات (توقيت مكة)
    const events = [
        { name: "شهر رمضان المبارك 🌙", date: "2026-02-18T00:00:00Z" },
        { name: "عيد الفطر المبارك ✨", date: "2026-03-20T00:00:00Z" },
        { name: "عشر ذي الحجة 🙌", date: "2026-05-18T00:00:00Z" },
        { name: "عيد الأضحى المبارك 🐑", date: "2026-05-27T00:00:00Z" }
    ];

    const now = new Date().getTime();
    let title = "تطبيق المتبقي";
    let body = event.data ? event.data.text() : "تنبيه من التطبيق";

    // فحص كل البطاقات: هل اقتربت إحداها (بقي أقل من يوم)؟
    events.forEach(ev => {
        const eventTime = new Date(ev.date).getTime();
        const diff = eventTime - now;

        // إذا بقي أقل من 24 ساعة وأكثر من صفر
        if (diff > 0 && diff <= 86400000) {
            title = `اقترب الموعد: ${ev.name}`;
            body = `بقي أقل من يوم على ${ev.name}، تقبل الله منا ومنكم صالح الأعمال.`;
        }
    });

    const options = {
        body: body,
        icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        badge: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        vibrate: [300, 100, 300],
        data: { url: 'https://sdkd2039.github.io/residual/' }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// عند الضغط على الإشعار يفتح الموقع
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
