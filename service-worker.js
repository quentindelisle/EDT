// Incrémenter ce numéro à CHAQUE déploiement notable (en même temps que APP_VERSION
// dans index.html) : c'est ce qui force les appareils ayant installé la PWA à
// récupérer la nouvelle version au lieu de rester bloqués sur un cache périmé.
const CACHE_NAME = 'edt-eps-pwa-v10';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo-edt-eps.png',
  './assets/icons/favicon-32.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-192.png',
  './assets/icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  // data.json (planning publié pour les collègues, voir publishData()/tryFetchPublished() dans index.html)
  // doit TOUJOURS être revérifié en réseau : jamais servi depuis le cache en priorité, sinon les
  // nouvelles publications n'apparaîtraient jamais tant que le cache n'expire pas.
  if (event.request.url.endsWith('/data.json') || event.request.url.endsWith('data.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => cached))
  );
});
