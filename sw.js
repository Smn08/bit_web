const CACHE_NAME = 'business-it-v1';
const urlsToCache = [
  '/',
  '/css/bit-custom.css',
  '/components/header.html',
  '/components/footer.html',
  '/images/logo_cyberbit.png',
  'https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css',
  'https://cdn.tailwindcss.com/3.4.16'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэшированную версию или делаем сетевой запрос
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Обновление кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
