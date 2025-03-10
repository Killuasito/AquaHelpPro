import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFish,
  FaThermometerHalf,
  FaFlask,
  FaTint,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSort,
  FaPlus,
  FaArrowLeft,
  FaFilter,
  FaChartLine,
  FaInfoCircle,
  FaTimes,
  FaSortAmountUp,
  FaSortAmountDown,
  FaFont,
  FaCalendarAlt,
  FaRuler,
  FaChevronDown,
  FaSave,
  FaStopwatch,
  FaNotesMedical,
  FaChartArea,
  FaClipboardCheck,
  FaBell,
  FaExclamationCircle,
  FaCheckCircle, // Add this import
  FaExclamationTriangle, // Add this import if not already present
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAquariumUpdates } from "../hooks/useAquariumUpdates";

const ViewAquariumsPage = () => {
  const navigate = useNavigate();
  const [aquariums, setAquariums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAquarium, setSelectedAquarium] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAquarium, setEditingAquarium] = useState(null);
  const [showHealthStatus, setShowHealthStatus] = useState(false);
  const [parameterHistory, setParameterHistory] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [quickNotes, setQuickNotes] = useState(() => {
    const savedNotes = localStorage.getItem(`aquarium-notes`);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const addQuickNote = (aquariumId, note) => {
    const newNote = {
      id: Date.now(),
      aquariumId,
      content: note,
      date: new Date().toISOString(),
    };
    setQuickNotes((prev) => [newNote, ...prev]);
  };

  const deleteQuickNote = (noteId) => {
    setQuickNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`aquarium-notes`, JSON.stringify(quickNotes));
  }, [quickNotes]);

  // Load aquariums from localStorage on component mount
  useEffect(() => {
    const savedAquariums = JSON.parse(
      localStorage.getItem("aquariums") || "[]"
    );
    setAquariums(savedAquariums);
  }, []);

  // Filter aquariums based on search term and type
  const filteredAquariums = aquariums.filter((aquarium) => {
    const matchesSearch = aquarium.aquariumName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || aquarium.aquariumType === filterType;
    return matchesSearch && matchesType;
  });

  // Sort aquariums based on sort option
  const sortedAquariums = [...filteredAquariums].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.aquariumName.localeCompare(b.aquariumName);
        break;
      case "size":
        comparison = parseFloat(a.capacity) - parseFloat(b.capacity);
        break;
      case "createdAt":
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Delete aquarium
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este aquário?"
    );
    if (confirmDelete) {
      const updatedAquariums = aquariums.filter(
        (aquarium) => aquarium.id !== id
      );
      setAquariums(updatedAquariums);
      localStorage.setItem("aquariums", JSON.stringify(updatedAquariums));
      setSelectedAquarium(null);
    }
  };

  // Edit aquarium
  const handleEdit = (id) => {
    const aquarium = aquariums.find((a) => a.id === id);
    setEditingAquarium(aquarium);
    setIsEditMode(true);
  };

  // Save edited aquarium
  const handleSaveEdit = (updatedAquarium) => {
    const updatedAquariums = aquariums.map((aquarium) =>
      aquarium.id === updatedAquarium.id ? updatedAquarium : aquarium
    );
    setAquariums(updatedAquariums);
    localStorage.setItem("aquariums", JSON.stringify(updatedAquariums));
    setIsEditMode(false);
    setEditingAquarium(null);
    setSelectedAquarium(updatedAquarium); // Update the selected aquarium view
  };

  // Get aquarium type label
  const getAquariumTypeLabel = (type) => {
    const types = {
      freshwater: "Água Doce",
      saltwater: "Água Salgada",
      brackish: "Água Salobra",
      planted: "Plantado",
    };
    return types[type] || type;
  };

  // Get color based on aquarium type
  const getTypeColor = (type) => {
    const colors = {
      freshwater: "blue",
      saltwater: "indigo",
      brackish: "purple",
      planted: "green",
    };
    return colors[type] || "blue";
  };

  const typeColorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      hover: "hover:bg-blue-200",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      border: "border-indigo-200",
      hover: "hover:bg-indigo-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
      hover: "hover:bg-purple-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      hover: "hover:bg-green-200",
    },
  };

  // Função para verificar status de saúde do aquário
  const checkAquariumHealth = (aquarium) => {
    if (!aquarium) return { status: "unknown", issues: [] };

    const issues = [];
    const now = new Date();
    const lastUpdate = new Date(aquarium.lastUpdated);
    const daysSinceUpdate = Math.floor(
      (now - lastUpdate) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceUpdate > 7) {
      issues.push("Parâmetros não atualizados há mais de 7 dias");
    }
    if (aquarium.temperature < 24 || aquarium.temperature > 28) {
      issues.push("Temperatura fora da faixa ideal");
    }
    if (aquarium.waterPh < 6.5 || aquarium.waterPh > 7.5) {
      issues.push("pH fora da faixa ideal");
    }

    return {
      status: issues.length === 0 ? "healthy" : "attention",
      issues,
    };
  };

  const getMaintenanceAlerts = (aquarium) => {
    const alerts = [];
    const now = new Date();
    const lastUpdate = new Date(aquarium.lastUpdated);
    const daysSinceUpdate = Math.floor(
      (now - lastUpdate) / (1000 * 60 * 60 * 24)
    );

    // Alerta de troca de água
    const waterChangeAlert = {
      icon: <FaStopwatch className="text-orange-500" />,
      title: "Troca de Água",
      value: "",
      description: "",
      status: "normal",
    };

    if (daysSinceUpdate >= 7) {
      waterChangeAlert.value = "Atrasada";
      waterChangeAlert.description = `Última troca há ${daysSinceUpdate} dias`;
      waterChangeAlert.status = "danger";
    } else {
      const daysUntil = 7 - daysSinceUpdate;
      waterChangeAlert.value = `Em ${daysUntil} dias`;
      waterChangeAlert.description = "Troca parcial de água programada";
    }
    alerts.push(waterChangeAlert);

    // Alerta de parâmetros
    const paramsAlert = {
      icon: <FaChartArea className="text-blue-500" />,
      title: "Parâmetros",
      value: "",
      description: "",
      status: "normal",
    };

    if (aquarium.waterPh < 6.5 || aquarium.waterPh > 7.5) {
      paramsAlert.value = "Atenção";
      paramsAlert.description = "pH fora da faixa ideal";
      paramsAlert.status = "warning";
    }
    if (aquarium.temperature < 24 || aquarium.temperature > 28) {
      paramsAlert.value = "Atenção";
      paramsAlert.description = paramsAlert.description
        ? `${paramsAlert.description}, temperatura fora da faixa`
        : "Temperatura fora da faixa ideal";
      paramsAlert.status = "warning";
    }
    if (paramsAlert.status === "normal") {
      paramsAlert.value = "Normais";
      paramsAlert.description = "Parâmetros dentro da faixa ideal";
    }
    alerts.push(paramsAlert);

    // Alerta de manutenção do filtro
    const filterAlert = {
      icon: <FaClipboardCheck className="text-green-500" />,
      title: "Manutenção do Filtro",
      value: "",
      description: "",
      status: "normal",
    };

    if (daysSinceUpdate >= 30) {
      filterAlert.value = "Necessária";
      filterAlert.description = "Manutenção do filtro recomendada";
      filterAlert.status = "warning";
    } else {
      const daysUntil = 30 - daysSinceUpdate;
      filterAlert.value = `Em ${daysUntil} dias`;
      filterAlert.description = "Próxima manutenção programada";
    }
    alerts.push(filterAlert);

    return alerts;
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-12 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block bg-blue-100 p-4 rounded-full mb-4"
        >
          <FaFish className="text-4xl text-blue-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-blue-800 mb-3">Meus Aquários</h1>
        <p className="text-blue-600 max-w-2xl mx-auto">
          Visualize e gerencie seus aquários cadastrados. Monitore parâmetros e
          mantenha controle sobre o histórico de manutenção.
        </p>
      </div>

      {/* Stats cards at the top */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total de Aquários"
          value={aquariums.length}
          icon={<FaFish className="text-blue-500" />}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Espécies"
          value={getUniqueSpeciesCount(aquariums)}
          icon={<FaFish className="text-indigo-500" />}
          color="bg-gradient-to-r from-indigo-500 to-indigo-600"
        />
        <StatsCard
          title="Volume Total"
          value={`${getTotalCapacity(aquariums)}L`}
          icon={<FaFlask className="text-purple-500" />}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Última Atualização"
          value={getLatestUpdateDate(aquariums)}
          icon={<FaChartLine className="text-green-500" />}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-64 mb-4 md:mb-0 group">
            <input
              type="text"
              placeholder="Buscar aquário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                transition-all duration-200"
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400
                group-hover:text-blue-500 transition-colors duration-200"
            >
              <FaSearch className="text-lg" />
            </motion.div>

            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
                  hover:text-gray-600 focus:outline-none"
                aria-label="Clear search"
              >
                <FaTimes />
              </motion.button>
            )}
          </div>
        </div>

        {/* Enhanced Sorting Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
            <FaSort className="mr-2" /> Ordenar Aquários
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSortBy("name")}
              className={`px-4 py-2 rounded-md transition-all flex items-center ${
                sortBy === "name"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaFont className="mr-2" /> Nome
              {sortBy === "name" && (
                <FaChevronDown
                  className={`ml-1 transition-transform ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            <button
              onClick={() => setSortBy("size")}
              className={`px-4 py-2 rounded-md transition-all flex items-center ${
                sortBy === "size"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaRuler className="mr-2" /> Tamanho
              {sortBy === "size" && (
                <FaChevronDown
                  className={`ml-1 transition-transform ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            <button
              onClick={() => setSortBy("createdAt")}
              className={`px-4 py-2 rounded-md transition-all flex items-center ${
                sortBy === "createdAt"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaCalendarAlt className="mr-2" /> Data de Criação
              {sortBy === "createdAt" && (
                <FaChevronDown
                  className={`ml-1 transition-transform ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            <div className="ml-auto">
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all flex items-center"
                title={
                  sortOrder === "asc"
                    ? "Ordenar Decrescente"
                    : "Ordenar Crescente"
                }
              >
                <span className="mr-2">Ordem:</span>
                {sortOrder === "asc" ? (
                  <FaSortAmountDown className="text-blue-600" />
                ) : (
                  <FaSortAmountUp className="text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isFiltersVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 border-t mt-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700">Filtrar por tipo:</span>
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-full ${
                  filterType === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType("freshwater")}
                className={`px-3 py-1 rounded-full ${
                  filterType === "freshwater"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                Água Doce
              </button>
              <button
                onClick={() => setFilterType("saltwater")}
                className={`px-3 py-1 rounded-full ${
                  filterType === "saltwater"
                    ? "bg-indigo-500 text-white"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                Água Salgada
              </button>
              <button
                onClick={() => setFilterType("brackish")}
                className={`px-3 py-1 rounded-full ${
                  filterType === "brackish"
                    ? "bg-purple-500 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                Água Salobra
              </button>
              <button
                onClick={() => setFilterType("planted")}
                className={`px-3 py-1 rounded-full ${
                  filterType === "planted"
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Plantado
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {selectedAquarium ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setSelectedAquarium(null)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Voltar para lista
          </button>
          <DetailView
            aquarium={selectedAquarium}
            getAquariumTypeLabel={getAquariumTypeLabel}
            getTypeColor={getTypeColor}
            typeColorClasses={typeColorClasses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            checkAquariumHealth={checkAquariumHealth} // Pass the function as prop
            getMaintenanceAlerts={getMaintenanceAlerts} // Add this line
            quickNotes={quickNotes.filter(
              (note) => note.aquariumId === selectedAquarium.id
            )}
            onAddNote={addQuickNote}
            onDeleteNote={deleteQuickNote}
          />
        </motion.div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAquariums.length > 0 ? (
              sortedAquariums.map((aquarium) => (
                <AquariumCard
                  key={aquarium.id}
                  aquarium={aquarium}
                  onClick={() => setSelectedAquarium(aquarium)}
                  typeLabel={getAquariumTypeLabel(aquarium.aquariumType)}
                  typeColor={getTypeColor(aquarium.aquariumType)}
                  colorClasses={
                    typeColorClasses[getTypeColor(aquarium.aquariumType)]
                  }
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500 text-lg">
                  {searchTerm || filterType !== "all"
                    ? "Nenhum aquário encontrado com os filtros atuais."
                    : "Você ainda não tem aquários registrados."}
                </p>
                <Link
                  to="/register"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Registrar Novo Aquário
                </Link>
              </div>
            )}
          </div>

          {/* Add New Button */}
          <div className="mt-10 text-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center mx-auto"
              >
                <FaPlus className="mr-2" /> Registrar Novo Aquário
              </motion.button>
            </Link>
          </div>
        </>
      )}

      {/* Add EditAquariumModal component */}
      <AnimatePresence>
        {isEditMode && (
          <EditAquariumModal
            aquarium={editingAquarium}
            onClose={() => setIsEditMode(false)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StatsCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-4 rounded-lg text-white ${color} shadow-lg`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </motion.div>
);

const AquariumCard = ({
  aquarium,
  onClick,
  typeLabel,
  typeColor,
  colorClasses,
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden border-l-4 ${colorClasses.border}`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-blue-800 truncate pr-2">
            {aquarium.aquariumName}
          </h3>
          <span
            className={`px-2 py-1 ${colorClasses.bg} ${colorClasses.text} text-xs rounded-full`}
          >
            {typeLabel}
          </span>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center">
            <FaFlask className={`mr-2 ${colorClasses.text}`} />
            <span>{aquarium.capacity} litros</span>
          </div>
          <div className="flex items-center">
            <FaThermometerHalf className={`mr-2 ${colorClasses.text}`} />
            <span>{aquarium.temperature}°C</span>
          </div>
          <div className="flex items-start">
            <FaFish className={`mr-2 mt-1 ${colorClasses.text}`} />
            <span className="line-clamp-2">
              {getShortSpeciesList(aquarium.fishSpecies)}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
          <span>Última atualização:</span>
          <span>
            {new Date(aquarium.lastUpdated).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const DetailView = ({
  aquarium,
  getAquariumTypeLabel,
  getTypeColor,
  typeColorClasses,
  onEdit,
  onDelete,
  checkAquariumHealth,
  getMaintenanceAlerts, // Add this prop
  quickNotes,
  onAddNote,
  onDeleteNote,
}) => {
  const [newNote, setNewNote] = useState("");
  const { updates, clearUpdate } = useAquariumUpdates(aquarium);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    onAddNote(aquarium.id, newNote);
    setNewNote("");
  };

  const colorType = getTypeColor(aquarium.aquariumType);
  const colors = typeColorClasses[colorType];
  const health = checkAquariumHealth(aquarium);
  const alerts = getMaintenanceAlerts(aquarium);

  return (
    <div className="space-y-6">
      {/* Notificações em tempo real */}
      <AnimatePresence>
        {updates.map((update) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
              update.priority === "urgent"
                ? "bg-red-50 border-red-200"
                : update.priority === "high"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {update.priority === "urgent" && (
                  <FaExclamationTriangle className="text-red-500 mr-2" />
                )}
                {update.priority === "high" && (
                  <FaExclamationCircle className="text-yellow-500 mr-2" />
                )}
                {update.priority === "medium" && (
                  <FaInfoCircle className="text-blue-500 mr-2" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      update.priority === "urgent"
                        ? "text-red-700"
                        : update.priority === "high"
                        ? "text-yellow-700"
                        : "text-blue-700"
                    }`}
                  >
                    {update.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(update.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearUpdate(update.id)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className={`${colors.bg} p-6`}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaFish className={`mr-3 ${colors.text}`} />
              {aquarium.aquariumName}
            </h2>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                onClick={() => onEdit(aquarium.id)}
                aria-label="Editar"
              >
                <FaEdit />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                onClick={() => onDelete(aquarium.id)}
                aria-label="Excluir"
              >
                <FaTrash />
              </motion.button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
            >
              {getAquariumTypeLabel(aquarium.aquariumType)}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {aquarium.capacity} litros
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              {aquarium.temperature}°C
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              pH {aquarium.waterPh}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3
                className={`text-lg font-semibold ${colors.text} mb-4 pb-2 border-b ${colors.border}`}
              >
                Informações Gerais
              </h3>

              <div className="space-y-4">
                <DetailSection
                  icon={<FaFish className={colors.text} />}
                  title="Espécies de Peixes"
                  content={aquarium.fishSpecies}
                />

                <DetailSection
                  icon={<FaTint className={colors.text} />}
                  title="Rotina de Troca de Água"
                  content={aquarium.waterChange}
                />
              </div>

              {aquarium.notes && (
                <div className="mt-6">
                  <h4 className={`font-medium ${colors.text} mb-2`}>
                    Observações
                  </h4>
                  <div
                    className={`p-4 rounded-lg ${
                      colors.bg
                    } ${colors.text.replace("700", "600")}`}
                  >
                    <p>{aquarium.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3
                className={`text-lg font-semibold ${colors.text} mb-4 pb-2 border-b ${colors.border}`}
              >
                Parâmetros e Manutenção
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <ParameterCard
                  icon={<FaFlask />}
                  label="pH da Água"
                  value={aquarium.waterPh}
                  colorClass={colors.text}
                />

                <ParameterCard
                  icon={<FaThermometerHalf />}
                  label="Temperatura"
                  value={`${aquarium.temperature}°C`}
                  colorClass={colors.text}
                />

                <ParameterCard
                  icon={<FaFlask />}
                  label="Capacidade"
                  value={`${aquarium.capacity} L`}
                  colorClass={colors.text}
                />

                <ParameterCard
                  icon={<FaSort />}
                  label="Atualizado em"
                  value={new Date(aquarium.lastUpdated).toLocaleDateString(
                    "pt-BR"
                  )}
                  colorClass={colors.text}
                />
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex">
                <FaInfoCircle className="text-yellow-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-yellow-700 mb-1">
                    Dica de Manutenção
                  </h4>
                  <p className="text-sm text-yellow-600">
                    Para este tipo de aquário, recomenda-se verificar o pH e
                    temperatura a cada 2-3 dias e realizar trocas parciais de
                    água conforme sua programação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Novo painel de saúde */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Status de Saúde do Aquário
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-4 rounded-lg ${
                health.status === "healthy"
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              } border`}
            >
              <div className="flex items-center mb-3">
                {health.status === "healthy" ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <FaExclamationCircle className="text-yellow-500 mr-2" />
                )}
                <span className="font-medium">
                  {health.status === "healthy" ? "Saudável" : "Requer Atenção"}
                </span>
              </div>
              {health.issues.length > 0 && (
                <ul className="space-y-2">
                  {health.issues.map((issue, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <FaExclamationTriangle className="text-yellow-500 mr-2 mt-1" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Manutenção */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <FaBell className="inline-block mr-2 text-yellow-500" />
            Alertas de Manutenção
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, index) => (
            <AlertCard
              key={index}
              icon={alert.icon}
              title={alert.title}
              value={alert.value}
              description={alert.description}
              status={alert.status}
            />
          ))}
        </div>
      </div>

      {/* Sistema de notas rápidas */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <FaNotesMedical className="inline-block mr-2 text-blue-500" />
            Notas Rápidas
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Adicionar nota..."
              className="px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleAddNote}
              className="text-blue-600 hover:text-blue-700 p-2"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickNotes.map((note) => (
            <QuickNoteCard
              key={note.id}
              note={note}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))}
          {quickNotes.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-4">
              Nenhuma nota adicionada
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditAquariumModal = ({ aquarium, onClose, onSave }) => {
  const [formData, setFormData] = useState(aquarium);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      lastUpdated: new Date().toISOString(), // Update the last updated date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header - Fixed at the top */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-10">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center">
            <FaEdit className="mr-2" /> Editar Aquário
          </h2>
          <p className="text-blue-100 mt-1 text-sm">
            Atualize as informações do seu aquário
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-6">
          <form
            id="edit-aquarium-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Nome e Tipo */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Nome do Aquário
                </label>
                <input
                  type="text"
                  name="aquariumName"
                  value={formData.aquariumName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Tipo de Aquário
                </label>
                <select
                  name="aquariumType"
                  value={formData.aquariumType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 bg-white"
                  required
                >
                  <option value="freshwater">Água Doce</option>
                  <option value="saltwater">Água Salgada</option>
                  <option value="brackish">Água Salobra</option>
                  <option value="planted">Plantado</option>
                </select>
              </div>
            </div>

            {/* Parâmetros */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Capacidade (L)
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  pH da Água
                </label>
                <input
                  type="number"
                  name="waterPh"
                  value={formData.waterPh}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 block">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Textareas */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Espécies de Peixes
                </label>
                <textarea
                  name="fishSpecies"
                  value={formData.fishSpecies}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 h-16 sm:h-24 resize-none"
                  placeholder="Liste as espécies de peixes..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Rotina de Troca de Água
                </label>
                <textarea
                  name="waterChange"
                  value={formData.waterChange}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 h-16 sm:h-24 resize-none"
                  placeholder="Descreva sua rotina de manutenção..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Observações
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 h-16 sm:h-24 resize-none"
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Fixed at the bottom */}
        <div className="p-4 border-t flex flex-col-reverse sm:flex-row sm:justify-end gap-3 bg-white sticky bottom-0 z-10">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </motion.button>
          <motion.button
            type="submit"
            form="edit-aquarium-form"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 w-full sm:w-auto rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex justify-center items-center"
          >
            <FaSave className="mr-2" /> Salvar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DetailSection = ({ icon, title, content }) => (
  <div>
    <div className="flex items-center mb-2">
      <span className="mr-2">{icon}</span>
      <h4 className="font-medium text-gray-700">{title}</h4>
    </div>
    <p className="text-gray-600 ml-7 whitespace-pre-line">{content}</p>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <li className="flex items-start">
    <span className="mr-3 mt-1">{icon}</span>
    <div>
      <span className="text-gray-600 font-medium">{label}:</span>{" "}
      <span className="text-gray-800">{value}</span>
    </div>
  </li>
);

const ParameterCard = ({ icon, label, value, colorClass }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div
      className={`${colorClass} mb-1 flex items-center justify-center sm:justify-start`}
    >
      {icon}
    </div>
    <div className="text-sm text-gray-500 text-center sm:text-left">
      {label}
    </div>
    <div className="text-lg font-semibold text-gray-700 text-center sm:text-left truncate">
      {value}
    </div>
  </div>
);

const AlertCard = ({ icon, title, value, description, status = "normal" }) => {
  const statusColors = {
    normal: "bg-gray-50 border-gray-200",
    warning: "bg-yellow-50 border-yellow-200",
    danger: "bg-red-50 border-red-200",
  };

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <div className="text-lg font-semibold mb-1">{value}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
};

const QuickNoteCard = ({ note, onDelete }) => (
  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
    <div className="flex justify-between items-start mb-2">
      <span className="text-sm font-medium text-gray-700">
        {new Date(note.date).toLocaleDateString()}
      </span>
      <button onClick={onDelete} className="text-gray-400 hover:text-gray-600">
        <FaTrash size={12} />
      </button>
    </div>
    <p className="text-sm text-gray-600">{note.content}</p>
  </div>
);

// Helper functions
function getUniqueSpeciesCount(aquariums) {
  const speciesSet = new Set();
  aquariums.forEach((aquarium) => {
    if (aquarium.fishSpecies) {
      // Roughly split by commas and capture species names
      const species = aquarium.fishSpecies
        .split(/,|x|\d+/)
        .map((s) => s.trim())
        .filter(Boolean);
      species.forEach((s) => speciesSet.add(s.toLowerCase()));
    }
  });
  return speciesSet.size;
}

function getTotalCapacity(aquariums) {
  return aquariums.reduce((sum, aquarium) => {
    return sum + (parseFloat(aquarium.capacity) || 0);
  }, 0);
}

function getLatestUpdateDate(aquariums) {
  if (!aquariums.length) return "N/A";
  const latestDate = aquariums.reduce((latest, aquarium) => {
    const currentDate = new Date(aquarium.lastUpdated);
    return currentDate > latest ? currentDate : latest;
  }, new Date(0));

  // Use a shorter date format for mobile-friendliness
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return latestDate.toLocaleDateString("pt-BR", options);
}

function getShortSpeciesList(fishSpecies) {
  if (!fishSpecies) return "Nenhuma espécie";

  // Properly trim and handle spaces in the species list
  const species = fishSpecies
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (species.length <= 2) return species.join(", ");
  return `${species[0]}, ${species[1]} e mais ${species.length - 2}`;
}

export default ViewAquariumsPage;
