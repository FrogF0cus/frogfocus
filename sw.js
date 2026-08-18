/* ============================================================================
   Frog Focus — Service Worker
   ----------------------------------------------------------------------------
   Makes the app installable (PWA) and — the important part — displays web-push
   notifications that the SERVER schedules, so "Focus complete" still arrives
   even when the tab is closed or the phone's browser was backgrounded.

   The push payload comes from server.js POST /api/push/schedule:
     { title, body, icon, url, tag, badge }
   ============================================================================ */

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (err) { /* non-JSON payload */ }

  const title = data.title || 'Frog Focus';
  const options = {
    body: data.body || 'Your timer finished — hop on back!',
    icon: data.icon || 'images/icon-192.png',
    badge: data.badge || 'images/icon-192.png',
    tag: data.tag || 'frog-focus',
    renotify: true,
    vibrate: [120, 60, 120],
    data: { url: data.url || '/' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil((async function () {
    const resolvedTarget = new URL(target, self.registration.scope);
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if ('focus' in client) {
        await client.focus();
        // Only navigate when the client is NOT already on the target URL.
        // A navigate() to the current URL forces a full page reload, which
        // tears down the AudioContext mid-playback and cuts the voice off
        // the instant the app opens. If it already matches, just focus it.
        const clientUrl = new URL(client.url);
        if (clientUrl.pathname !== resolvedTarget.pathname || clientUrl.search !== resolvedTarget.search) {
          try { await client.navigate(target); } catch (err) { /* same-origin navigate can throw on about:blank */ }
        }
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});
