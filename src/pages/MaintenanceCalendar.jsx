import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaWater,
  FaFilter,
  FaThermometerHalf,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const MaintenanceCalendar = () => {
  // Store tasks with localStorage persistence
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("maintenanceTasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Removed the fixed IDs
  });

  // New task form state
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    frequency: "weekly",
    icon: "water",
    aquariumId: "all",
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("maintenanceTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to calculate if task is due
  const calculateTaskStatus = (task) => {
    const lastDone = new Date(task.lastDone);
    const now = new Date();
    const daysSince = Math.floor((now - lastDone) / (1000 * 60 * 60 * 24));

    let dueInDays = 0;

    switch (task.frequency) {
      case "daily":
        dueInDays = 1;
        break;
      case "weekly":
        dueInDays = 7;
        break;
      case "biweekly":
        dueInDays = 14;
        break;
      case "monthly":
        dueInDays = 30;
        break;
      default:
        dueInDays = 7;
    }

    const status = daysSince >= dueInDays ? "due" : "ok";
    const daysUntilDue = dueInDays - daysSince;

    return { status, daysUntilDue, daysSince };
  };

  // Mark task as completed today
  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, lastDone: new Date().toISOString() }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Add new task
  const handleAddTask = () => {
    if (newTask.name.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      name: newTask.name,
      frequency: newTask.frequency,
      lastDone: new Date().toISOString(),
      icon: newTask.icon,
      aquariumId: newTask.aquariumId,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask({
      name: "",
      frequency: "weekly",
      icon: "water",
      aquariumId: "all",
    });
    setIsAddingTask(false);
  };

  // Get icon component based on name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "water":
        return <FaWater />;
      case "filter":
        return <FaFilter />;
      case "thermometer":
        return <FaThermometerHalf />;
      default:
        return <FaTools />;
    }
  };

  // Format frequency for display
  const formatFrequency = (freq) => {
    switch (freq) {
      case "daily":
        return "Diária";
      case "weekly":
        return "Semanal";
      case "biweekly":
        return "Quinzenal";
      case "monthly":
        return "Mensal";
      default:
        return freq;
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Calendário de Manutenção
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Organize e acompanhe todas as tarefas de manutenção do seu aquário
          para manter seu ecossistema aquático saudável.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-4 bg-blue-50 flex justify-between items-center border-b border-blue-100">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-2 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">
              Suas Tarefas de Manutenção
            </h2>
          </div>

          <button
            onClick={() => setIsAddingTask(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaPlus className="mr-1" /> Nova Tarefa
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              Você ainda não tem tarefas de manutenção. Adicione sua primeira
              tarefa clicando no botão "Nova Tarefa" acima.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => {
              const { status, daysUntilDue, daysSince } =
                calculateTaskStatus(task);
              return (
                <div
                  key={task.id}
                  className="p-5 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className={`mr-4 p-3 rounded-full ${
                        status === "due"
                          ? "bg-red-100 text-red-500"
                          : "bg-blue-100 text-blue-500"
                      }`}
                    >
                      {getIconComponent(task.icon)}
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800">{task.name}</h3>
                      <p className="text-sm text-gray-500">
                        Frequência: {formatFrequency(task.frequency)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 text-right">
                      {status === "due" ? (
                        <div className="flex items-center text-red-600">
                          <FaExclamationTriangle className="mr-1" />
                          <span>Atrasado {daysSince} dias</span>
                        </div>
                      ) : (
                        <div className="text-green-600">
                          Próxima em {daysUntilDue} dias
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Última: {new Date(task.lastDone).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => completeTask(task.id)}
                        title="Marcar como concluído"
                        className="p-2 bg-green-500 text-white rounded-l-md hover:bg-green-600"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        title="Excluir tarefa"
                        className="p-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="bg-blue-600 text-white p-4">
              <h3 className="text-lg font-semibold">
                Nova Tarefa de Manutenção
              </h3>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nome da Tarefa
                </label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ex: Troca de água"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Frequência</label>
                <select
                  value={newTask.frequency}
                  onChange={(e) =>
                    setNewTask({ ...newTask, frequency: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quinzenal</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ícone</label>
                <div className="grid grid-cols-4 gap-2">
                  {["water", "filter", "thermometer", "tools"].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewTask({ ...newTask, icon })}
                      className={`p-3 rounded-lg flex justify-center ${
                        newTask.icon === icon
                          ? "bg-blue-100 border-2 border-blue-500"
                          : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {getIconComponent(icon)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Adicionar Tarefa
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Dicas Para Manutenção
        </h3>

        <ul className="space-y-2">
          <li className="flex items-start">
            <FaWater className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              Realize trocas parciais de água (25-30%) semanalmente para manter
              os parâmetros estáveis.
            </span>
          </li>
          <li className="flex items-start">
            <FaFilter className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              Limpe o filtro mensalmente, mas nunca lave o material biológico em
              água tratada com cloro.
            </span>
          </li>
          <li className="flex items-start">
            <FaThermometerHalf className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              Verifique regularmente temperatura, pH, amônia e nitratos para
              garantir um ambiente saudável.
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MaintenanceCalendar;
