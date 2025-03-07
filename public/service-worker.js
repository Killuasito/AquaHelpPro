self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Aquarium Manager", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      if (windowClients.length > 0) {
        windowClients[0].focus();
      } else {
        clients.openWindow("/");
      }
    })
  );
});
