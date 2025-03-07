export const initializeNotifications = async () => {
  if (!("Notification" in window)) {
    console.log("Este navegador não suporta notificações desktop");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const sendNotification = (title, options = {}) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options,
    });

    notification.onclick = function () {
      window.focus();
      notification.close();
    };

    // Registra a notificação no service worker se disponível
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          ...options,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          vibrate: [200, 100, 200],
          requireInteraction: true,
        });
      });
    }
  }
};
