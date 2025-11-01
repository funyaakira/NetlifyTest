const CACHE_NAME = 'hello-world-cache-v1';
// オフライン時に表示させたいファイル（ページ本体とアイコン）
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// 1. インストール処理 (ファイルをキャッシュする)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. リクエストへの割り込み (キャッシュにあればそれを返す)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにあればキャッシュから返し、なければ通信する
        return response || fetch(event.request);
      })
  );
});