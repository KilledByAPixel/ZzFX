const cache = "zzfx-1.2.2";
const assets = [
  "./",
  "./index.html",
  "./icon.png",
  "./ZzFX.js",
  "./ZzFXMicro.js",
  "./wav.js",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cache).then(cache => {
      cache.addAll(assets)
    }).then(() => {
      return self.skipWaiting();
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== cache) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});