import { useState, useEffect, useCallback, useRef } from "react";
import {
  initializeNotifications,
  sendNotification,
} from "../services/notificationService";

export const useAquariumUpdates = (aquarium) => {
  const [updates, setUpdates] = useState([]);
  const lastCheckRef = useRef(new Date());

  const checkUpdates = useCallback(() => {
    if (!aquarium) return;

    const now = new Date();
    const lastUpdate = new Date(aquarium.lastUpdated);
    const daysSinceUpdate = Math.floor(
      (now - lastUpdate) / (1000 * 60 * 60 * 24)
    );

    setUpdates((prevUpdates) => {
      // Limpa notificações antigas
      const filteredUpdates = prevUpdates.filter(
        (update) =>
          new Date(update.date) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      );

      const newUpdates = [...filteredUpdates];

      // Verifica pH
      if (aquarium.waterPh < 6.5 || aquarium.waterPh > 7.5) {
        const message = `${aquarium.aquariumName}: pH fora da faixa ideal (${aquarium.waterPh})`;
        sendNotification("Alerta de pH", {
          body: message,
          tag: `ph-${aquarium.id}`,
          requireInteraction: true,
        });
        newUpdates.unshift({
          id: Date.now(),
          type: "warning",
          message,
          date: new Date().toISOString(),
          priority: "high",
        });
      }

      // Verifica temperatura
      if (aquarium.temperature < 24 || aquarium.temperature > 28) {
        const message = `${aquarium.aquariumName}: Temperatura fora da faixa ideal (${aquarium.temperature}°C)`;
        sendNotification("Alerta de Temperatura", {
          body: message,
          tag: `temp-${aquarium.id}`,
          requireInteraction: true,
        });
        newUpdates.unshift({
          id: Date.now() + 1,
          type: "warning",
          message,
          date: new Date().toISOString(),
          priority: "high",
        });
      }

      // Verifica troca de água
      if (daysSinceUpdate >= 7) {
        const message = `${aquarium.aquariumName}: Troca de água atrasada há ${daysSinceUpdate} dias`;
        sendNotification("Manutenção Necessária", {
          body: message,
          tag: `water-${aquarium.id}`,
          requireInteraction: true,
        });
        newUpdates.unshift({
          id: Date.now() + 2,
          type: "alert",
          message,
          date: new Date().toISOString(),
          priority: "urgent",
        });
      } else if (daysSinceUpdate === 6) {
        const message = `${aquarium.aquariumName}: Troca de água necessária em breve`;
        sendNotification("Lembrete de Manutenção", {
          body: message,
          tag: `water-reminder-${aquarium.id}`,
          requireInteraction: false,
        });
        newUpdates.unshift({
          id: Date.now() + 3,
          type: "info",
          message,
          date: new Date().toISOString(),
          priority: "medium",
        });
      }

      return newUpdates;
    });

    lastCheckRef.current = now;
    localStorage.setItem(`lastCheck-${aquarium?.id}`, now.toISOString());
  }, [aquarium]);

  // Initialize notifications
  useEffect(() => {
    initializeNotifications();
  }, []);

  // Set up interval for checks
  useEffect(() => {
    if (!aquarium) return;

    checkUpdates();
    const interval = setInterval(checkUpdates, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [aquarium, checkUpdates]);

  return {
    updates,
    clearUpdate: useCallback(
      (id) => setUpdates((prev) => prev.filter((u) => u.id !== id)),
      []
    ),
  };
};
