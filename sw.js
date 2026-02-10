const events = [
  { 
    nameAr: "شهر رمضان المبارك", nameEn: "Holy Ramadan",
    date: "2026-02-18T00:00:00+03:00",
    preTime: "2026-02-17T18:30:00+03:00", // 6:30 PM
    preAr: "تهنئ موقع المتبقي بقدوم شهر رمضان المبارك، تقبل الله الصيام والقيام وصالح الأعمال 🌒",
    preEn: "Al-Mutabaqi congratulates you on the arrival of Ramadan, may Allah accept your fasting and deeds 🌒",
    startAr: "بدأ شهر رمضان، قال النبي ﷺ: 'تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً' 🌙",
    startEn: "Ramadan has started, the Prophet ﷺ said: 'Take Suhoor, for in Suhoor there is blessing' 🌙"
  },
  { 
    nameAr: "عيد الفطر المبارك", nameEn: "Eid al-Fitr",
    date: "2026-03-20T00:00:00+03:00",
    preTime: "2026-03-19T18:55:00+03:00", // 6:55 PM
    preAr: "تهنئ موقع المتبقي بقدوم عيد الفطر المبارك، وأعاده الله باليمن والبركات 🎈",
    preEn: "Al-Mutabaqi congratulates you on the arrival of Eid al-Fitr, may Allah bring it back with blessings 🎈",
    startAr: "بدأ عيد الفطر، 'كان رسول الله ﷺ لا يغدو يوم الفطر حتى يأكل تمرات، ويأكلهن وترًا' ✨",
    startEn: "Eid al-Fitr started, 'The Messenger of Allah ﷺ would not go out on Eid al-Fitr until he had eaten some dates' ✨"
  },
  { 
    nameAr: "عشر ذي الحجة", nameEn: "10 Days of Dhu al-Hijjah",
    date: "2026-05-18T00:00:00+03:00",
    preTime: "2026-05-17T19:00:00+03:00", // 7:00 PM
    preAr: "بدأت العشر فهي أفضل أيام الدنيا وضاعفوا فيها بالأعمال الصالحة 🌟",
    preEn: "The ten days have started, the best days of the world, so redouble your good deeds 🌟",
    startAr: "بدأ شهر ذي الحجة، قال ﷺ: 'ما من أيام العمل الصالح فيها أحب إلى الله من هذه الأيام'، كبروا، هللوا.. 🕋",
    startEn: "Dhu al-Hijjah started, the Prophet ﷺ said: 'There are no days in which righteous deeds are more beloved to Allah than these days' 🕋"
  },
  { 
    nameAr: "عيد الأضحى المبارك", nameEn: "Eid al-Adha",
    date: "2026-05-27T00:00:00+03:00",
    preTime: "2026-05-26T19:00:00+03:00", // 7:00 PM
    preAr: "يهنئ موقع المتبقي بقدوم عيد الأضحى المبارك، تقبل الله منا ومنكم صالح الأعمال 🎈",
    preEn: "Al-Mutabaqi congratulates you on the arrival of Eid al-Adha, may Allah accept from us and you 🎈",
    startAr: "بدأ عيد الأضحى، قال ﷺ: 'مَا عَمِلَ ابْنُ آدَمَ يَوْمَ النَّحْرِ عَمَلاً أَحَبَّ إِلَى اللهِ كَمِنْ إِهْرَاقِ الدَّمِ' 🐑",
    startEn: "Eid al-Adha started, the Prophet ﷺ said: 'A human does no deed on the day of sacrifice dearer to Allah than shedding blood' 🐑"
  }
];

self.addEventListener('install', (e) => self.skipWaiting());

setInterval(() => {
  const now = new Date();
  
  events.forEach(ev => {
    const preTime = new Date(ev.preTime);
    const startTime = new Date(ev.date);
    
    // 1. فحص إشعار ما قبل المناسبة (المغرب حسب ساعتك)
    if (Math.abs(now - preTime) < 30000) {
      showNotify(ev.nameAr, `${ev.preAr}\n\n${ev.preEn}`);
    }

    // 2. فحص إشعار بداية المناسبة (12:00 ص)
    if (Math.abs(now - preTime) < 60000) { ... }
if (Math.abs(now - startTime) < 60000) { ... }


function showNotify(title, message) {
  self.registration.showNotification(title, {
    body: message,
    icon: 'https://i.ibb.co/fzPfcMp0/small-logo.png',
    badge: 'https://i.ibb.co/fzPfcMp0/small-logo.png',
    vibrate: [200, 100, 200],
    data: { url: 'https://sdkd2039.github.io/residual/' }
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || 'https://sdkd2039.github.io/residual/'));
});