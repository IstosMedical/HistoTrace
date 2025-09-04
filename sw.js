self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("istos-install-cache").then(cache => {
      return cache.addAll([
        "Installation.html",
        "style.css",
        "script.js",
        "manifest.json",
        "icons/icon-192.jpg",
        "icons/icon-512.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
