// sw.js

const PRECACHE_NAME = 'precache-v1';
const PRECACHE_URLS = [
  '',
  '/', // Add the URLs of your app's main pages
  '/experiments',
  // Add more URLs of assets to be precached
  '/fonts/apercu/apercu-regular-pro.woff2',
  '/fonts/apercu/apercu-bold-pro.woff2',
  '/fonts/apercu/apercu-medium-pro.woff2',
  '/fonts/apercu/apercu-light-pro.woff2',
  '/fonts/apercu/apercu-mono-pro.woff2',
  '/fonts/apercu/apercu-mono-pro.woff2',
  '/fonts/Montserrat.ttf',  
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// ... (add other event listeners for fetch, activate, etc.)
