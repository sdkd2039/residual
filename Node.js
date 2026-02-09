const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// مفاتيح VAPID خاصتك
const vapidKeys = {
  publicKey: 'YOUR_PUBLIC_VAPID_KEY',
  privateKey: 'YOUR_PRIVATE_VAPID_KEY'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(bodyParser.json());

let subscriptions = [];

const events = [
  {
    name: "شهر رمضان المبارك",
    date: "2026-02-18T00:00:00+03:00", // بداية رمضان (منتصف الليل)
    maghrib: "2026-02-17T18:00:00+03:00", // وقت المغرب قبل بداية رمضان بيوم
    preMsgAr: "تهنئ موقع المتبقي بقدوم شهر رمضان المبارك.",
    preMsgEn: "Al-Mutabaqi congratulates you on the arrival of Ramadan.",
    startMsgAr: "الآن.. نحن في شهر رمضان المبارك\nاللهم تقبل الصيام والقيام وصالح الأعمال 🌒",
    startMsgEn: "Now.. We are in Holy Ramadan\nO God, accept our fasting, prayers, and good deeds 🌒"
  },
  {
    name: "عيد الفطر المبارك",
    date: "2026-03-20T00:00:00+03:00", // بداية العيد (منتصف الليل)
    maghrib: "2026-03-19T18:00:00+03:00", // وقت المغرب قبل العيد بيوم
    preMsgAr: "يهنئكم موقع المتبقي بقدوم عيد الفطر المبارك.",
    preMsgEn: "Al-Mutabaqi congratulates you on the arrival of Eid al-Fitr.",
    startMsgAr: "الآن.. عيد الفطر المبارك\nتقبل الله منا ومنكم صالح الأعمال 🎈",
    startMsgEn: "Now.. It's Eid al-Fitr\nMay God accept from us and you good deeds 🎈"
  },
  {
    name: "عشر ذي الحجة",
    date: "2026-05-18T00:00:00+03:00",
    maghrib: "2026-05-17T18:00:00+03:00",
    preMsgAr: "موقع المتبقي يذكركم بقدوم عشر ذي الحجة المباركة.",
    preMsgEn: "Al-Mutabaqi reminds you of the coming of the blessed first ten days of Dhu al-Hijjah.",
    startMsgAr: "الآن.. عشر ذي الحجة\nضاعفوا فيها العمل الصالح وأفضل أيامها 🌟",
    startMsgEn: "Now.. The first ten days of Dhu al-Hijjah\nDouble your good deeds, best days 🌟"
  },
  {
    name: "عيد الأضحى المبارك",
    date: "2026-05-27T00:00:00+03:00",
    maghrib: "2026-05-26T18:00:00+03:00",
    preMsgAr: "يهنئكم موقع المتبقي بقدوم عيد الأضحى المبارك.",
    preMsgEn: "Al-Mutabaqi congratulates you on the arrival of Eid al-Adha.",
    startMsgAr: "الآن.. عيد الأضحى المبارك\nنفعنا الله وإياكم ببركة هذه الأيام 🐑",
    startMsgEn: "Now.. It's Eid al-Adha\nMay God bless us in these days 🐑"
  }
];

// استقبال الاشتراكات من المستخدمين
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// دالة لإرسال الإشعار مع دمج النص العربي والإنجليزي
function sendNotification(subscription, title, body) {
  const payload = {
    title: title,
    body: body,
    icon: 'https://i.ibb.co/fYWfbWBQ/logo.png',
    badge: 'https://i.ibb.co/fYWfbWBQ/logo.png',
    data: { url: 'https://sdkd2039.github.io/residual/' }
  };
  return webpush.sendNotification(subscription, JSON.stringify(payload)).catch(err => {
    if (err.statusCode === 410 || err.statusCode === 404) {
      subscriptions = subscriptions.filter(sub => sub !== subscription);
    }
  });
}

// فحص الوقت وإرسال الإشعارات المناسبة
function checkAndSendNotifications() {
  const now = new Date();

  subscriptions.forEach(subscription => {
    events.forEach(event => {
      const maghribTime = new Date(event.maghrib);
      const eventStartTime = new Date(event.date);

      // الإشعار قبل المناسبة بيوم عند المغرب (فرق أقل من دقيقة من الآن)
      if (Math.abs(now - maghribTime) < 60000) {
        const title = event.name;
        const body = `${event.preMsgAr}\n${event.preMsgEn}`;
        sendNotification(subscription, title, body);
      }

      // إشعار بداية المناسبة (منتصف الليل)
      if (Math.abs(now - eventStartTime) < 60000) {
        const title = event.name;
        const body = `${event.startMsgAr}\n${event.startMsgEn}`;
        sendNotification(subscription, title, body);
      }
    });
  });
}

setInterval(checkAndSendNotifications, 60000);

app.listen(port, () => {
  console.log(`Push server running on port ${port}`);
});