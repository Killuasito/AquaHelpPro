import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaThermometerHalf,
  FaRuler,
  FaGlobeAmericas,
} from "react-icons/fa";

const FishSpecies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fishData = [
    {
      name: "Betta Splendens",
      scientificName: "Betta splendens",
      image: "https://via.placeholder.com/300x200?text=Betta",
      type: "freshwater",
      temperament: "Solitário/Agressivo",
      size: "6-7 cm",
      pH: "6.0-7.5",
      temperature: "24-28°C",
      diet: "Carnívoro (ração, larvas, artêmias)",
      minTankSize: "10 litros",
      origin: "Tailândia, Camboja",
      lifespan: "2-4 anos",
      description:
        "Conhecido por suas nadadeiras longas e coloridas. Machos são territoriais e não devem ser mantidos juntos.",
    },
    {
      name: "Tetra Neon",
      scientificName: "Paracheirodon innesi",
      image: "https://via.placeholder.com/300x200?text=Tetra+Neon",
      type: "freshwater",
      temperament: "Pacífico/Cardume",
      size: "3-4 cm",
      pH: "5.5-7.0",
      temperature: "22-26°C",
      diet: "Onívoro (ração, microorganismos)",
      minTankSize: "60 litros (para cardume)",
      origin: "América do Sul (Bacia Amazônica)",
      lifespan: "5-8 anos",
      description:
        "Pequeno e colorido com listras azuis e vermelhas. Deve ser mantido em grupos de pelo menos 6 indivíduos.",
    },
    {
      name: "Guppy",
      scientificName: "Poecilia reticulata",
      image: "https://via.placeholder.com/300x200?text=Guppy",
      type: "freshwater",
      temperament: "Pacífico/Ativo",
      size: "3-6 cm",
      pH: "6.8-7.8",
      temperature: "22-28°C",
      diet: "Onívoro (ração, vegetais)",
      minTankSize: "40 litros",
      origin: "América do Sul",
      lifespan: "1-3 anos",
      description:
        "Conhecido por suas cores vibrantes e fácil reprodução. Ideal para iniciantes.",
    },
    {
      name: "Acará Disco",
      scientificName: "Symphysodon spp.",
      image: "https://via.placeholder.com/300x200?text=Acará+Disco",
      type: "freshwater",
      temperament: "Pacífico/Tímido",
      size: "15-20 cm",
      pH: "5.5-7.0",
      temperature: "28-30°C",
      diet: "Onívoro (ração específica, larvas)",
      minTankSize: "200 litros",
      origin: "América do Sul (Bacia Amazônica)",
      lifespan: "10-15 anos",
      description:
        "Peixe majestoso em forma de disco. Requer experiência em aquarismo pois é sensível à qualidade da água.",
    },
    {
      name: "Peixe-palhaço",
      scientificName: "Amphiprion ocellaris",
      image: "https://via.placeholder.com/300x200?text=Peixe+Palhaço",
      type: "saltwater",
      temperament: "Ativo/Territorial",
      size: "8-11 cm",
      pH: "7.8-8.4",
      temperature: "24-28°C",
      diet: "Onívoro (plâncton, ração marinha)",
      minTankSize: "100 litros",
      origin: "Oceano Indo-Pacífico",
      lifespan: "10-15 anos",
      description:
        "Popularizado pelo filme 'Procurando Nemo'. Vive em simbiose com anêmonas-do-mar.",
    },
    {
      name: "Cirurgião-patela",
      scientificName: "Paracanthurus hepatus",
      image: "https://via.placeholder.com/300x200?text=Cirurgião+Patela",
      type: "saltwater",
      temperament: "Semi-agressivo",
      size: "15-31 cm",
      pH: "8.1-8.4",
      temperature: "24-26°C",
      diet: "Herbívoro (algas, vegetais)",
      minTankSize: "280 litros",
      origin: "Oceano Indo-Pacífico",
      lifespan: "8-20 anos",
      description:
        "Conhecido como 'Dory' do filme 'Procurando Nemo'. Possui coloração azul vibrante e requer aquário espaçoso.",
    },
  ];

  const filteredFish = fishData.filter((fish) => {
    return (
      (filterType === "all" || fish.type === filterType) &&
      (fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-3">
          Catálogo de Espécies de Peixes
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore nossa coleção de espécies populares de aquário com informações
          detalhadas sobre cuidados, habitat e compatibilidade.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar espécies..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterType("freshwater")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "freshwater"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Água Doce
          </button>
          <button
            onClick={() => setFilterType("saltwater")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "saltwater"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Água Salgada
          </button>
        </div>
      </div>

      {filteredFish.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            Nenhuma espécie encontrada com esse critério.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFish.map((fish, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {fish.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      fish.type === "freshwater"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {fish.type === "freshwater" ? "Água Doce" : "Água Salgada"}
                  </span>
                </div>

                <p className="text-gray-600 italic text-sm mb-4">
                  {fish.scientificName}
                </p>

                <p className="text-gray-700 mb-4">{fish.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <FaRuler className="text-blue-500 mr-2" />
                    <span>Tamanho: {fish.size}</span>
                  </div>
                  <div className="flex items-center">
                    <FaThermometerHalf className="text-red-500 mr-2" />
                    <span>Temp: {fish.temperature}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">pH:</span>
                    <span>{fish.pH}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGlobeAmericas className="text-green-500 mr-2" />
                    <span title={fish.origin}>
                      Origem: {fish.origin.split(",")[0]}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Aquário mín: {fish.minTankSize}</span>
                    <span>Temp.: {fish.temperament}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FishSpecies;
