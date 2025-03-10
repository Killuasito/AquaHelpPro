import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaInfoCircle,
  FaWater,
  FaRuler,
  FaFilter,
  FaClock,
  FaHistory,
  FaExchangeAlt,
  FaThermometer,
  FaChartLine,
  FaVial,
  FaChartBar,
  FaTint,
  FaRegLightbulb,
  FaTimes,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ParameterCalculator = () => {
  const [tankLength, setTankLength] = useState("");
  const [tankWidth, setTankWidth] = useState("");
  const [tankHeight, setTankHeight] = useState("");
  const [tankVolume, setTankVolume] = useState(null);
  const [fishLoad, setFishLoad] = useState("medium");
  const [filterCapacity, setFilterCapacity] = useState("");
  const [waterChangeFrequency, setWaterChangeFrequency] = useState(7);
  const [waterChangeAmount, setWaterChangeAmount] = useState(25);
  const [calculationResults, setCalculationResults] = useState(null);
  const [activeTab, setActiveTab] = useState("volume");
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [useGallons, setUseGallons] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [ph, setPh] = useState("");
  const [showTooltips, setShowTooltips] = useState(true);
  const [waterParameters, setWaterParameters] = useState({
    temperature: "",
    ph: "",
  });
  const [parameterHistory, setParameterHistory] = useState([]);

  const parameterRanges = {
    temperature: { min: 24, max: 28, unit: "°C" },
    ph: { min: 6.5, max: 7.5, unit: "" },
  };

  const getParameterStatus = (param, value) => {
    if (!value) return "neutral";
    const range = parameterRanges[param];
    if (value < range.min) return "low";
    if (value > range.max) return "high";
    return "optimal";
  };

  const handleParameterChange = (param, value) => {
    setWaterParameters((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const getParameterRecommendation = (param, value) => {
    if (!value) return null;
    const status = getParameterStatus(param, value);
    const range = parameterRanges[param];

    return {
      param,
      status,
      message:
        status === "optimal"
          ? `${
              param === "temperature" ? "Temperatura" : "pH"
            } está na faixa ideal (${range.min}-${range.max}${range.unit})`
          : status === "low"
          ? `${
              param === "temperature" ? "Temperatura" : "pH"
            } está baixo. Ideal: ${range.min}-${range.max}${range.unit}`
          : `${
              param === "temperature" ? "Temperatura" : "pH"
            } está alto. Ideal: ${range.min}-${range.max}${range.unit}`,
    };
  };

  // Load all saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedParameters = localStorage.getItem("waterParameterHistory");
      const savedCalculations = localStorage.getItem("calculationHistory");

      if (savedParameters) {
        setParameterHistory(JSON.parse(savedParameters));
      }
      if (savedCalculations) {
        setCalculationHistory(JSON.parse(savedCalculations));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save parameter history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "waterParameterHistory",
        JSON.stringify(parameterHistory)
      );
    } catch (error) {
      console.error("Error saving parameter history:", error);
    }
  }, [parameterHistory]);

  // Save calculation history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "calculationHistory",
        JSON.stringify(calculationHistory)
      );
    } catch (error) {
      console.error("Error saving calculation history:", error);
    }
  }, [calculationHistory]);

  // Modified saveParameterHistory function
  const saveParameterHistory = () => {
    if (!waterParameters.temperature && !waterParameters.ph) {
      alert("Por favor, insira pelo menos um parâmetro antes de salvar.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()),
      ...waterParameters,
    };

    setParameterHistory((prev) => [newEntry, ...prev]);

    // Clear inputs after saving
    setWaterParameters({
      temperature: "",
      ph: "",
    });
  };

  // Modified clearHistory function
  const clearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setParameterHistory([]);
      localStorage.removeItem("waterParameterHistory");
    }
  };

  // Modified deleteHistoryEntry function
  const deleteHistoryEntry = (id) => {
    setParameterHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Calculate tank volume whenever dimensions change
  useEffect(() => {
    if (tankLength && tankWidth && tankHeight) {
      const volume = (tankLength * tankWidth * tankHeight) / 1000; // convert from cm³ to liters
      setTankVolume(volume);
    } else {
      setTankVolume(null);
    }
  }, [tankLength, tankWidth, tankHeight]);

  // Unit conversion functions
  const litersToGallons = (liters) => liters * 0.264172;
  const gallonsToLiters = (gallons) => gallons * 3.78541;

  // Enhanced calculate parameters function
  const calculateParameters = () => {
    if (!tankVolume) return;

    // Fish load factors
    const loadFactors = {
      low: 0.8,
      medium: 1,
      high: 1.2,
    };

    // Minimum filter capacity based on fish load
    const recommendedFilterCapacity = Math.round(
      tankVolume * 4 * loadFactors[fishLoad]
    );

    // Water change calculations
    const waterChangeVolume = (tankVolume * waterChangeAmount) / 100;
    const monthlyWaterChanges = Math.round(
      (30 / waterChangeFrequency) * waterChangeVolume
    );

    // Filter sufficiency
    let filterSufficiency = "inadequate";
    if (filterCapacity >= recommendedFilterCapacity * 1.2) {
      filterSufficiency = "excellent";
    } else if (filterCapacity >= recommendedFilterCapacity) {
      filterSufficiency = "adequate";
    }

    // Maintenance recommendations
    let maintenanceRecommendation = "";
    if (waterChangeFrequency <= 5 && waterChangeAmount >= 30) {
      maintenanceRecommendation =
        "Sua rotina de manutenção é excelente. Continue assim!";
    } else if (waterChangeFrequency <= 7 && waterChangeAmount >= 25) {
      maintenanceRecommendation =
        "Sua rotina de manutenção é adequada. Para melhorar, considere aumentar ligeiramente a quantidade de água trocada.";
    } else {
      maintenanceRecommendation =
        "Recomendamos aumentar a frequência ou quantidade das trocas de água para manter melhores parâmetros.";
    }

    const results = {
      recommendedFilterCapacity,
      filterSufficiency,
      waterChangeVolume,
      monthlyWaterChanges,
      maintenanceRecommendation,
    };

    setCalculationResults(results);

    // Add calculation to history
    const newCalculation = {
      date: new Date().toLocaleString(),
      volume: tankVolume,
      filterCapacity,
      recommendations: results,
    };
    setCalculationHistory([newCalculation, ...calculationHistory.slice(0, 4)]);
  };

  // New function for water parameters analysis
  const analyzeWaterParameters = () => {
    let recommendations = [];

    if (temperature) {
      if (temperature < 24)
        recommendations.push("Temperatura baixa - considere um aquecedor");
      if (temperature > 28)
        recommendations.push("Temperatura alta - melhore a ventilação");
    }

    if (ph) {
      if (ph < 6.5) recommendations.push("pH ácido - considere usar tampão");
      if (ph > 7.5)
        recommendations.push("pH alcalino - monitore com frequência");
    }

    return recommendations;
  };

  // Add input validation function
  const getInputStatus = (value, min, max) => {
    if (!value) return "neutral";
    const numValue = parseFloat(value);
    if (numValue < min) return "low";
    if (numValue > max) return "high";
    return "optimal";
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br px-4 py-8">
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Calculadora de Parâmetros
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Calcule o volume de seu aquário, determine a capacidade ideal do
          filtro e organize sua rotina de manutenção para manter seu aquário
          saudável.
        </motion.p>
      </div>

      <motion.div className="max-w-5xl mx-auto">
        {/* New unit toggle button */}
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            onClick={() => setUseGallons(!useGallons)}
          >
            <FaExchangeAlt className="text-lg" />
            <span>
              {useGallons ? "Mudar para Litros" : "Mudar para Galões"}
            </span>
          </button>
        </div>

        {/* Main calculator container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="flex overflow-x-auto border-b bg-gray-50">
            <button
              className={`px-6 py-4 font-medium flex items-center space-x-2 transition-all ${
                activeTab === "volume"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("volume")}
            >
              <FaCalculator className="text-lg" />
              <span>Volume do Aquário</span>
            </button>
            <button
              className={`px-6 py-4 font-medium flex items-center space-x-2 transition-all ${
                activeTab === "filter"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("filter")}
            >
              <FaFilter className="text-lg" />
              <span>Filtração</span>
            </button>
            <button
              className={`px-6 py-4 font-medium flex items-center space-x-2 transition-all ${
                activeTab === "maintenance"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("maintenance")}
            >
              <FaClock className="text-lg" />
              <span>Manutenção</span>
            </button>
            <button
              className={`px-6 py-4 font-medium flex items-center space-x-2 transition-all ${
                activeTab === "parameters"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("parameters")}
            >
              <FaThermometer className="text-lg" />
              <span>Parâmetros da Água</span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === "volume" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaCalculator className="mr-3 text-blue-500" />
                  Calcular Volume do Aquário
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      label: "Comprimento",
                      id: "length",
                      value: tankLength,
                      setValue: setTankLength,
                      min: 10,
                      max: 500,
                    },
                    {
                      label: "Largura",
                      id: "width",
                      value: tankWidth,
                      setValue: setTankWidth,
                      min: 10,
                      max: 200,
                    },
                    {
                      label: "Altura",
                      id: "height",
                      value: tankHeight,
                      setValue: setTankHeight,
                      min: 10,
                      max: 200,
                    },
                  ].map(({ label, id, value, setValue, min, max }) => (
                    <div
                      key={id}
                      className="relative bg-gray-50 p-6 rounded-lg border border-gray-200"
                    >
                      <label
                        className="block text-gray-700 mb-3 font-medium"
                        htmlFor={id}
                      >
                        {label} (cm)
                      </label>
                      <div className="relative">
                        <FaRuler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id={id}
                          type="number"
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all
                    ${
                      getInputStatus(value, min, max) === "optimal"
                        ? "border-green-500"
                        : getInputStatus(value, min, max) === "low"
                        ? "border-yellow-500"
                        : getInputStatus(value, min, max) === "high"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                          value={value}
                          onChange={(e) =>
                            setValue(
                              e.target.value ? parseFloat(e.target.value) : ""
                            )
                          }
                          placeholder={`${min} - ${max}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div
                            className={`w-3 h-3 rounded-full
                    ${
                      getInputStatus(value, min, max) === "optimal"
                        ? "bg-green-500"
                        : getInputStatus(value, min, max) === "low"
                        ? "bg-yellow-500"
                        : getInputStatus(value, min, max) === "high"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Faixa recomendada: {min} - {max} cm
                      </p>
                    </div>
                  ))}
                </div>

                {tankVolume && (
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium opacity-90">
                          Volume do seu aquário:
                        </p>
                        <p className="text-4xl font-bold mt-2">
                          {useGallons
                            ? `${litersToGallons(tankVolume).toFixed(1)} gal`
                            : `${tankVolume.toFixed(1)} litros`}
                        </p>
                      </div>
                      <FaWater className="text-6xl opacity-50" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "filter" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaFilter className="mr-3 text-blue-500" />
                  Cálculo de Filtragem Ideal
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <label
                      className="block text-gray-700 mb-3 font-medium"
                      htmlFor="fishLoad"
                    >
                      Densidade de peixes
                    </label>
                    <select
                      id="fishLoad"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
                      value={fishLoad}
                      onChange={(e) => setFishLoad(e.target.value)}
                    >
                      <option value="low">Baixa (poucos peixes)</option>
                      <option value="medium">
                        Média (quantidade moderada)
                      </option>
                      <option value="high">Alta (muitos peixes)</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      <FaInfoCircle className="inline mr-1" />
                      Isso afeta a quantidade de filtração necessária
                    </p>
                  </div>

                  <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <label
                      className="block text-gray-700 mb-3 font-medium"
                      htmlFor="filterCapacity"
                    >
                      Capacidade do seu filtro
                    </label>
                    <div className="relative">
                      <input
                        id="filterCapacity"
                        type="number"
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all
                  ${
                    getInputStatus(filterCapacity, 100, 5000) === "optimal"
                      ? "border-green-500"
                      : getInputStatus(filterCapacity, 100, 5000) === "low"
                      ? "border-yellow-500"
                      : getInputStatus(filterCapacity, 100, 5000) === "high"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                        value={filterCapacity}
                        onChange={(e) =>
                          setFilterCapacity(
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                        placeholder="100 - 5000"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        L/h
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Faixa recomendada: 100 - 5000 L/h
                    </p>
                  </div>
                </div>

                {tankVolume && (
                  <button
                    onClick={calculateParameters}
                    className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2"
                  >
                    <FaCalculator className="text-lg" />
                    <span>Calcular Recomendações</span>
                  </button>
                )}

                {calculationResults && (
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-bold text-lg text-white mb-3">
                      Resultados da Análise
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-200">
                          Capacidade de filtro recomendada:
                        </p>
                        <p className="text-xl font-bold text-white">
                          {calculationResults.recommendedFilterCapacity} L/h
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-200">
                          Seu filtro atual é:
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            calculationResults.filterSufficiency === "excellent"
                              ? "text-green-400"
                              : calculationResults.filterSufficiency ===
                                "adequate"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {calculationResults.filterSufficiency ===
                            "excellent" && "Excelente"}
                          {calculationResults.filterSufficiency ===
                            "adequate" && "Adequado"}
                          {calculationResults.filterSufficiency ===
                            "inadequate" && "Insuficiente"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "maintenance" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaClock className="mr-3 text-blue-500" />
                  Rotina de Manutenção
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <label
                      className="block text-gray-700 mb-3 font-medium"
                      htmlFor="changeFrequency"
                    >
                      Frequência de troca
                    </label>
                    <div className="relative">
                      <input
                        id="changeFrequency"
                        type="number"
                        min="1"
                        max="30"
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all
                  ${
                    getInputStatus(waterChangeFrequency, 1, 30) === "optimal"
                      ? "border-green-500"
                      : getInputStatus(waterChangeFrequency, 1, 30) === "low"
                      ? "border-yellow-500"
                      : getInputStatus(waterChangeFrequency, 1, 30) === "high"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                        value={waterChangeFrequency}
                        onChange={(e) =>
                          setWaterChangeFrequency(
                            e.target.value ? parseInt(e.target.value) : ""
                          )
                        }
                        placeholder="1 - 30"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        dias
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Faixa recomendada: 1 - 30 dias
                    </p>
                  </div>

                  <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <label
                      className="block text-gray-700 mb-3 font-medium"
                      htmlFor="changeAmount"
                    >
                      Quantidade trocada
                    </label>
                    <div className="relative">
                      <input
                        id="changeAmount"
                        type="number"
                        min="5"
                        max="90"
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all
                  ${
                    getInputStatus(waterChangeAmount, 5, 90) === "optimal"
                      ? "border-green-500"
                      : getInputStatus(waterChangeAmount, 5, 90) === "low"
                      ? "border-yellow-500"
                      : getInputStatus(waterChangeAmount, 5, 90) === "high"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                        value={waterChangeAmount}
                        onChange={(e) =>
                          setWaterChangeAmount(
                            e.target.value ? parseInt(e.target.value) : ""
                          )
                        }
                        placeholder="5 - 90"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Faixa recomendada: 5 - 90%
                    </p>
                  </div>
                </div>

                {tankVolume && (
                  <button
                    onClick={calculateParameters}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Calcular Recomendações
                  </button>
                )}

                {calculationResults && (
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-bold text-lg text-white mb-3">
                      Sua Rotina de Manutenção
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div>
                        <p className="text-sm text-gray-200">
                          Volume de água trocado por vez:
                        </p>
                        <p className="text-xl font-bold text-white">
                          {calculationResults.waterChangeVolume.toFixed(1)}{" "}
                          litros
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-200">
                          Total mensal de água trocada:
                        </p>
                        <p className="text-xl font-bold text-white">
                          {calculationResults.monthlyWaterChanges.toFixed(1)}{" "}
                          litros
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-blue-200 bg-blue-100/50">
                      <p className="text-gray-800">
                        {calculationResults.maintenanceRecommendation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "parameters" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaVial className="mr-3 text-blue-500" />
                    Parâmetros da Água
                  </h2>
                  <button
                    onClick={saveParameterHistory}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                  >
                    <FaChartBar />
                    <span>Salvar Medição</span>
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(parameterRanges).map(([param, range]) => (
                    <div key={param} className="relative">
                      <label className="block text-gray-700 mb-2 font-medium capitalize">
                        {param === "temperature" ? "Temperatura" : "pH"}{" "}
                        {range.unit && `(${range.unit})`}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step={param === "ph" ? "0.1" : "0.5"}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-300 transition-all
                  ${
                    getParameterStatus(param, waterParameters[param]) ===
                    "optimal"
                      ? "border-green-500"
                      : getParameterStatus(param, waterParameters[param]) ===
                        "low"
                      ? "border-yellow-500"
                      : getParameterStatus(param, waterParameters[param]) ===
                        "high"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                          value={waterParameters[param]}
                          onChange={(e) =>
                            handleParameterChange(param, e.target.value)
                          }
                          placeholder={`${range.min} - ${range.max}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div
                            className={`w-3 h-3 rounded-full
                  ${
                    getParameterStatus(param, waterParameters[param]) ===
                    "optimal"
                      ? "bg-green-500"
                      : getParameterStatus(param, waterParameters[param]) ===
                        "low"
                      ? "bg-yellow-500"
                      : getParameterStatus(param, waterParameters[param]) ===
                        "high"
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Faixa ideal: {range.min} - {range.max} {range.unit}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                >
                  <h3 className="font-bold text-xl mb-4 flex items-center">
                    <FaRegLightbulb className="mr-2" />
                    Análise dos Parâmetros
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(waterParameters).map(([param, value]) => {
                      const recommendation = getParameterRecommendation(
                        param,
                        value
                      );
                      if (!recommendation) return null;
                      return (
                        <div
                          key={param}
                          className={`flex items-start space-x-3 p-3 rounded-lg ${
                            recommendation.status === "optimal"
                              ? "bg-green-400/20"
                              : recommendation.status === "low"
                              ? "bg-yellow-400/20"
                              : "bg-red-400/20"
                          }`}
                        >
                          <FaInfoCircle className="text-lg mt-1" />
                          <p className="text-sm">{recommendation.message}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {parameterHistory.length > 0 && (
                  <motion.div
                    className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg flex items-center">
                        <FaChartBar className="mr-2 text-blue-500" />
                        Histórico de Medições
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Limpar Histórico
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2">Data</th>
                            <th className="px-4 py-2">Temperatura</th>
                            <th className="px-4 py-2">pH</th>
                            <th className="px-4 py-2">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {parameterHistory.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-sm">
                                {entry.date}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {entry.temperature
                                  ? `${entry.temperature}°C`
                                  : "-"}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {entry.ph || "-"}
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  onClick={() => deleteHistoryEntry(entry.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  title="Excluir medição"
                                >
                                  <FaTimes />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Calculation History Panel */}
            {calculationHistory.length > 0 && (
              <motion.div
                className="mt-8 p-4 bg-gray-50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaHistory className="mr-2" />
                  Histórico de Cálculos
                </h3>
                <div className="space-y-4">
                  {calculationHistory.map((calc, index) => (
                    <div key={index} className="p-3 bg-white rounded border">
                      <p className="text-sm text-gray-500">{calc.date}</p>
                      <p className="font-medium">
                        Volume:{" "}
                        {useGallons
                          ? `${litersToGallons(calc.volume).toFixed(1)} gal`
                          : `${calc.volume.toFixed(1)} L`}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tooltips */}
      <Tooltip id="volume-tooltip" />
      <Tooltip id="filter-tooltip" />
      <Tooltip id="maintenance-tooltip" />
    </motion.div>
  );
};

export default ParameterCalculator;
