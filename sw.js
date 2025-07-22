const CACHE_NAME = 'exam-app-cache-v3'; // ورژن کو اپڈیٹ کریں تاکہ نیا کیش بنے
const REPO_NAME = '/exam/';

const urlsToCache = [
  `${REPO_NAME}`,
  `${REPO_NAME}index.html`,
  `${REPO_NAME}manifest.json`,
  `${REPO_NAME}icon-192x192.png`, // روٹ میں موجود آئیکن
  `${REPO_NAME}icon-512x512.png`, // روٹ میں موجود آئیکن
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/unhinted/ttf/NotoNastaliqUrdu/NotoNastaliqUrdu-Regular.ttf'
];

// انسٹال ایونٹ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ایکٹیویٹ ایونٹ (پرانے کیش کو صاف کرنے کے لیے)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => cache !== CACHE_NAME)
        .map(cache => caches.delete(cache))
      );
    })
  );
});

// فیچ ایونٹ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
