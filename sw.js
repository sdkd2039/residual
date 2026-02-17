const eventsData = [
    { id: 'ramadan', date: "2026-02-18T00:00:00+03:00", preTime: "2026-02-17T18:30:00+03:00", title: "شهر رمضان المبارك 🌒", preMsg: "تهنئة بقدوم شهر رمضان، تقبل الله منا ومنكم 🌙", startMsg: "بدأ شهر رمضان.. مبارك عليكم 🌙" },
    { id: 'eid1', date: "2026-03-20T00:00:00+03:00", preTime: "2026-03-19T18:55:00+03:00", title: "عيد الفطر المبارك 🎈", preMsg: "غداً أول أيام عيد الفطر، كل عام وأنتم بخير ✨", startMsg: "بدأ عيد الفطر.. تقبل الله طاعتكم 🎊" },
    { id: 'hajj', date: "2026-05-18T00:00:00+03:00", preTime: "2026-05-17T19:00:00+03:00", title: "عشر ذي الحجة 🕋", preMsg: "غداً تبدأ أفضل أيام الدنيا.. استثمروا أوقاتكم 🌟", startMsg: "بدأت العشر من ذي الحجة.. كبروا وهللوا 🕋" },
    { id: 'eid2', date: "2026-05-27T00:00:00+03:00", preTime: "2026-05-26T19:00:00+03:00", title: "عيد الأضحى المبارك 🐑", preMsg: "غداً يوم النحر.. عيد أضحى مبارك مقدماً 🎈", startMsg: "بدأ عيد الأضحى.. كل عام وأنتم بخير 🐑" }
];

self.addEventListener('install', () => self.skipWaiting());

setInterval(() => {
    const now = new Date();
    eventsData.forEach(ev => {
        const diffPre = now - new Date(ev.preTime);
        const diffStart = now - new Date(ev.date);

        if (diffPre >= 0 && diffPre < 60000) {
            triggerPush(ev.title, ev.preMsg, ev.id + "_pre");
        }
        if (diffStart >= 0 && diffStart < 60000) {
            triggerPush(ev.title, ev.startMsg, ev.id + "_start");
        }
    });
}, 60000);

function triggerPush(title, body, tag) {
    self.registration.showNotification(title, { 
        body: body, 
        icon: 'https://i.ibb.co/fzPfcMp0/small-logo.png', 
        tag: tag, 
        vibrate: [200, 100, 200] 
    });
}

self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        triggerPush(data.title, data.body, data.tag);
    }
});
