import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaInfoCircle, FaWater } from "react-icons/fa";

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

  // Calculate tank volume whenever dimensions change
  useEffect(() => {
    if (tankLength && tankWidth && tankHeight) {
      const volume = (tankLength * tankWidth * tankHeight) / 1000; // convert from cm³ to liters
      setTankVolume(volume);
    } else {
      setTankVolume(null);
    }
  }, [tankLength, tankWidth, tankHeight]);

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

    setCalculationResults({
      recommendedFilterCapacity,
      filterSufficiency,
      waterChangeVolume,
      monthlyWaterChanges,
      maintenanceRecommendation,
    });
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
          Calculadora de Parâmetros
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calcule o volume de seu aquário, determine a capacidade ideal do
          filtro e organize sua rotina de manutenção para manter seu aquário
          saudável.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="flex overflow-x-auto border-b">
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "volume"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("volume")}
          >
            Volume do Aquário
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "filter"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("filter")}
          >
            Filtração
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "maintenance"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("maintenance")}
          >
            Manutenção
          </button>
        </div>

        <div className="p-6">
          {activeTab === "volume" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCalculator className="mr-2 text-blue-500" />
                Calcular Volume do Aquário
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="length">
                    Comprimento (cm)
                  </label>
                  <input
                    id="length"
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={tankLength}
                    onChange={(e) =>
                      setTankLength(
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    placeholder="Ex: 60"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="width">
                    Largura (cm)
                  </label>
                  <input
                    id="width"
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={tankWidth}
                    onChange={(e) =>
                      setTankWidth(
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    placeholder="Ex: 30"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="height">
                    Altura (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={tankHeight}
                    onChange={(e) =>
                      setTankHeight(
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    placeholder="Ex: 35"
                  />
                </div>
              </div>

              {tankVolume && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-blue-700">
                      Volume do seu aquário:
                    </p>
                    <p className="text-3xl font-bold text-blue-800">
                      {tankVolume.toFixed(1)} litros
                    </p>
                  </div>
                  <FaWater className="text-5xl text-blue-400 opacity-70" />
                </div>
              )}
            </div>
          )}

          {activeTab === "filter" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Cálculo de Filtragem Ideal
              </h2>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="fishLoad">
                  Densidade de peixes
                </label>
                <select
                  id="fishLoad"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  value={fishLoad}
                  onChange={(e) => setFishLoad(e.target.value)}
                >
                  <option value="low">Baixa (poucos peixes)</option>
                  <option value="medium">Média (quantidade moderada)</option>
                  <option value="high">Alta (muitos peixes)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Isso afeta a quantidade de filtração necessária
                </p>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="filterCapacity"
                >
                  Capacidade do seu filtro (L/h)
                </label>
                <input
                  id="filterCapacity"
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  value={filterCapacity}
                  onChange={(e) =>
                    setFilterCapacity(
                      e.target.value ? parseFloat(e.target.value) : ""
                    )
                  }
                  placeholder="Ex: 300"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Verifique na embalagem ou manual do seu filtro
                </p>
              </div>

              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-blue-500 mr-2" />
                <p className="text-sm text-gray-700">
                  Para um aquário saudável, seu filtro deve ter capacidade de
                  circular pelo menos 4x o volume do aquário por hora.
                </p>
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
                <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-lg text-blue-800 mb-3">
                    Resultados da Análise
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        Capacidade de filtro recomendada:
                      </p>
                      <p className="text-xl font-bold text-blue-700">
                        {calculationResults.recommendedFilterCapacity} L/h
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        Seu filtro atual é:
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          calculationResults.filterSufficiency === "excellent"
                            ? "text-green-600"
                            : calculationResults.filterSufficiency ===
                              "adequate"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {calculationResults.filterSufficiency === "excellent" &&
                          "Excelente"}
                        {calculationResults.filterSufficiency === "adequate" &&
                          "Adequado"}
                        {calculationResults.filterSufficiency ===
                          "inadequate" && "Insuficiente"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "maintenance" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Rotina de Manutenção
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="changeFrequency"
                  >
                    Frequência de troca de água (dias)
                  </label>
                  <input
                    id="changeFrequency"
                    type="number"
                    min="1"
                    max="30"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={waterChangeFrequency}
                    onChange={(e) =>
                      setWaterChangeFrequency(parseInt(e.target.value) || 7)
                    }
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="changeAmount"
                  >
                    Quantidade de água trocada (%)
                  </label>
                  <input
                    id="changeAmount"
                    type="number"
                    min="5"
                    max="90"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={waterChangeAmount}
                    onChange={(e) =>
                      setWaterChangeAmount(parseInt(e.target.value) || 25)
                    }
                  />
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
                <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-lg text-blue-800 mb-3">
                    Sua Rotina de Manutenção
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        Volume de água trocado por vez:
                      </p>
                      <p className="text-xl font-bold text-blue-700">
                        {calculationResults.waterChangeVolume.toFixed(1)} litros
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        Total mensal de água trocada:
                      </p>
                      <p className="text-xl font-bold text-blue-700">
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ParameterCalculator;
