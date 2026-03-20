const CACHE_NAME = 'nonogram-v2'; // שינינו מ-v1 ל-v2
const ASSETS = [
  './',
  './index.html',
  './engine.js',
  './levels.js',
  './manifest.json', // כדאי שיהיה ב-Cache
  './sprite1.jpg',
  './logo1.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});