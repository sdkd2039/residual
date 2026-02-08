// ملف sw.js المحدث - تهنئة عشر ذي الحجة المعدلة
self.addEventListener('push', (event) => {
    const now = new Date().getTime();
    
    const events = [
        { 
            date: "2026-02-18T00:00:00Z", 
            name: "شهر رمضان المبارك", 
            msg: "تهنئ إدارة موقع المتبقي بقدوم شهر رمضان المبارك، تقبل الله منا ومنكم صالح الأعمال. 🌙" 
        },
        { 
            date: "2026-03-20T00:00:00Z", 
            name: "عيد الفطر المبارك", 
            msg: "يهنئكم موقع المتبقي بقدوم عيد الفطر المبارك، عساكم من عواده وتقبل الله طاعاتكم. ✨" 
        },
        { 
            date: "2026-05-18T00:00:00Z", 
            name: "عشر ذي الحجة", 
            // النص الذي طلبته 👇
            msg: "ضاعفوا فيها العمل الصالح وأفضل أيامها في عشر ذي الحجة 🌟" 
        },
        { 
            date: "2026-05-27T00:00:00Z", 
            name: "عيد الأضحى المبارك", 
            msg: "يهنئكم موقع المتبقي بقدوم عيد الأضحى المبارك، نفعنا الله وإياكم ببركة هذه الأيام. 🐑" 
        }
    ];

    let title = "موقع المتبقي";
    let body = "لديك تنبيه جديد من الموقع";

    events.forEach(ev => {
        const eventTime = new Date(ev.date).getTime();
        const diff = eventTime - now;

        if (diff > 0 && diff <= 86400000) {
            title = ev.name === "عشر ذي الحجة" ? "عشر ذي الحجة" : "تهنئة خاصة 🎉";
            body = ev.msg;
        }
    });

    const options = {
        body: body,
        icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        badge: 'https://i.ibb.co/fYWfbWBQ/logo.png',
        vibrate: [200, 100, 200, 100, 400],
        silent: false,
        data: { url: 'https://sdkd2039.github.io/residual/' }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
