// Habit Duel service worker: shows reminder notifications.
const q = new URL(self.location).searchParams, API = q.get('api'), K = q.get('k');
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let t = 'Habit Duel', b = 'Time to check in on your habits.', tag = 'habit-duel';
    try {
      const s = await self.registration.pushManager.getSubscription();
      const j = await (await fetch(API + '/api/pending?k=' + encodeURIComponent(K) + '&e=' + encodeURIComponent(s.endpoint))).json();
      if (j.title) { t = j.title; b = j.body; tag = j.tag || tag; }
    } catch (x) {}
    await self.registration.showNotification(t, { body: b, icon: 'icon-192.png', tag });
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(l => l.length ? l[0].focus() : clients.openWindow('./')));
});
