export const initializeNotifications = async () => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("Este navegador não suporta notificações");
    return false;
  }

  // Check if permission was already granted
  if (Notification.permission === "granted") {
    return true;
  }

  // Request permission
  try {
    const permission = await Notification.requestPermission();
    const supported = permission === "granted";

    // Store the preference in localStorage
    localStorage.setItem("notificationsEnabled", supported);

    return supported;
  } catch (error) {
    console.error("Erro ao solicitar permissão:", error);
    return false;
  }
};

export const sendNotification = (title, options = {}) => {
  // Check if notifications are enabled in localStorage
  const notificationsEnabled =
    localStorage.getItem("notificationsEnabled") === "true";

  if (!notificationsEnabled) return;

  try {
    // For mobile devices, use the Notifications API if available
    if (Notification.permission === "granted") {
      // Create notification
      const notification = new Notification(title, {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        vibrate: [200, 100, 200], // Vibration pattern for mobile
        renotify: true, // Allow multiple notifications
        tag: options.tag || "aquarium-notification", // Group similar notifications
        ...options,
      });

      // Handle notification click
      notification.onclick = function () {
        // Focus on window if it exists
        if (window.focus) window.focus();

        // Close notification
        notification.close();

        // Handle specific actions based on notification type
        if (options.url) {
          window.location.href = options.url;
        }
      };
    }

    // For PWA and mobile support, also use the serviceWorker if available
    if ("serviceWorker" in navigator && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          vibrate: [200, 100, 200],
          renotify: true,
          tag: options.tag || "aquarium-notification",
          actions: options.actions || [],
          data: {
            url: options.url,
            dateOfArrival: Date.now(),
            ...options.data,
          },
          ...options,
        });
      });
    }
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
};

// Add a helper function to check if notifications are supported and enabled
export const areNotificationsSupported = () => {
  return "Notification" in window && Notification.permission === "granted";
};
