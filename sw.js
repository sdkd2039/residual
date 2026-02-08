// ملف sw.js - نظام التنبيهات الذكي لموقع المتبقي
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('push', (event) => {
    const now = new Date().getTime();
    
    // قائمة المناسبات مع رسائل التهنئة المخصصة لكل واحدة
    const events = [
        { 
            date: "2026-02-18T00:00:00Z", 
            name: "شهر رمضان المبارك", 
            msg: "تهنئكم إدارة موقع المتبقي بقدوم شهر رمضان المبارك، تقبل الله منا ومنكم صالح الأعمال. 🌙" 
        },
        { 
            date: "2026-03-20T00:00:00Z", 
            name: "عيد الفطر المبارك", 
            msg: "يهنئكم موقع المتبقي بقدوم عيد الفطر المبارك، عساكم من عواده وتقبل الله طاعاتكم. ✨" 
        },
        { 
            date: "2026-05-18T00:00:00Z", 
            name: "عشر ذي الحجة", 
            msg: "موقع المتبقي يذكركم ببدء خير أيام الدنيا (عشر ذي الحجة)، ضاعفوا فيها العمل الصالح. 🙌" 
        },
        { 
            date: "2026-05-27T00:00:00Z", 
            name: "عيد الأضحى المبارك", 
            msg: "يهنئكم موقع المتبقي بقدوم عيد الأضحى المبارك، نفعنا الله وإياكم ببركة هذه الأيام. 🐑" 
        }
    ];

    let title = "موقع المتبقي";
    let body = event.data ? event.data.text() : "تنبيه جديد من الموقع";

    // فحص المناسبات: إذا بقي أقل من 24 ساعة على أي مناسبة
    events.forEach(ev => {
        const eventTime = new Date(ev.date).getTime();
        const diff = eventTime - now;

        if (diff > 0 && diff <= 86400000) {
            title = "تهنئة خاصة 🎉";
            body = ev.msg;
        }
    });

    const options = {
        body: body,
        icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        badge: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        vibrate: [200, 100, 200, 100, 400],
        data: { url: 'https://sdkd2039.github.io/residual/' }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// عند الضغط على الإشعار يتم فتح الموقع فوراً
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
