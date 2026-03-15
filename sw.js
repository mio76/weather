// sw.js
const CACHE_NAME = 'weather-cache-v1';

const urlsToCache = [
  '/weather/',
  '/weather/index.html',
  '/weather/icon-192.png',
  '/weather/icon-512.png'
];
// Подія install спрацьовує при першій установці Service Worker.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});
// Подія fetch перехоплює всі мережеві запити, які робить програма.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});