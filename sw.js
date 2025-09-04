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
