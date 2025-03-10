import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaLeaf,
  FaRuler,
  FaSun,
  FaThermometerHalf,
  FaTimes,
  FaWater,
  FaClock,
  FaSeedling,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

const PlantSpecies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const itemsPerPage = 12;

  // Function to determine difficulty color scheme
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Média":
        return "bg-yellow-100 text-yellow-800";
      case "Avançada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const plantData = [
    {
      name: "Anúbia",
      scientificName: "Anubias barteri",
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/Anubias%20barteri%20var.%20nana-800x800.jpg",
      type: "foreground",
      difficulty: "Fácil",
      height: "5-15 cm",
      light: "Baixa a Média",
      growth: "Lento",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Foreground/Midground",
      propagation: "Divisão do rizoma",
      description:
        "Planta resistente, ideal para iniciantes. Pode ser fixada em troncos e rochas.",
      care: "Não enterrar o rizoma, apenas as raízes",
    },
    {
      name: "Elodea",
      scientificName: "Egeria densa",
      image:
        "https://cdn.britannica.com/23/120823-050-97B539DF/Canadian-waterweed.jpg",
      type: "background",
      difficulty: "Fácil",
      height: "30-80 cm",
      light: "Média a Alta",
      growth: "Rápido",
      co2: "Opcional",
      temperature: "18-26°C",
      placement: "Background",
      propagation: "Corte de caule",
      description:
        "Planta de crescimento rápido, excelente para iniciantes e aquários novos. Ajuda na oxigenação da água.",
      care: "Pode precisar de podas frequentes para controlar o crescimento",
    },
    {
      name: "Musgo de Java",
      scientificName: "Taxiphyllum barbieri",
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/taxiphyllum%20barbieri%20musgo-800x800.jpg",
      type: "foreground",
      difficulty: "Fácil",
      height: "2-5 cm",
      light: "Baixa a Média",
      growth: "Lento",
      co2: "Não necessário",
      temperature: "20-28°C",
      placement: "Foreground/Decoração",
      propagation: "Divisão de porções",
      description:
        "Musgo versátil que pode ser fixado em qualquer superfície. Excelente para criar ambientes naturais.",
      care: "Remova detritos periodicamente para evitar acúmulos no musgo",
    },
    {
      name: "Vallisneria",
      scientificName: "Vallisneria spiralis",
      image:
        "https://aqualandpetsplus.com/wp-content/uploads/2024/08/Vallisneria-Nana-5-1024x585.webp",
      type: "background",
      difficulty: "Fácil",
      height: "30-60 cm",
      light: "Média a Alta",
      growth: "Médio a Rápido",
      co2: "Opcional",
      temperature: "20-28°C",
      placement: "Background",
      propagation: "Estolões",
      description:
        "Planta com folhas longas em forma de fita. Cria um belo efeito de cortina no fundo do aquário.",
      care: "Plante as raízes com cuidado, deixando a coroa exposta",
    },
    {
      name: "Eleocharis",
      scientificName: "Eleocharis parvula",
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/eleocharis-minima-800x800.jpg",
      type: "foreground",
      difficulty: "Média",
      height: "3-10 cm",
      light: "Média a Alta",
      growth: "Médio",
      co2: "Recomendado",
      temperature: "21-28°C",
      placement: "Foreground (carpete)",
      propagation: "Rizomas",
      description:
        "Planta delicada que forma belos tapetes verdes quando bem estabelecida.",
      care: "Plante em pequenos tufos, beneficia-se de substrato nutritivo",
    },
    {
      name: "Cabomba",
      scientificName: "Cabomba caroliniana",
      image:
        "https://s3-sa-east-1.amazonaws.com/loja2/9958adec3eea22d7721cc56e62707458.jpg",
      type: "background",
      difficulty: "Média",
      height: "30-50 cm",
      light: "Média a Alta",
      growth: "Rápido",
      co2: "Recomendado",
      temperature: "20-26°C",
      placement: "Background",
      propagation: "Corte de caule",
      description:
        "Planta com folhas finamente divididas que proporcionam um visual delicado e fluido.",
      care: "Precisa de nutrientes adequados para manter a coloração e estrutura",
    },
    {
      name: "Samambaia de Java",
      scientificName: "Microsorum pteropus",
      image: "https://m.media-amazon.com/images/I/71mDcHEaDeL._AC_SL1500_.jpg",
      type: "midground",
      difficulty: "Fácil",
      height: "15-30 cm",
      light: "Baixa a Média",
      growth: "Lento",
      co2: "Opcional",
      temperature: "20-28°C",
      placement: "Midground",
      propagation: "Divisão do rizoma/Folhas filhas",
      description:
        "Planta robusta com folhas verdes escuras. Pode ser fixada em decorações.",
      care: "Não enterrar o rizoma, apenas fixar em superfícies",
    },
    {
      name: "Rotala Rotundifolia",
      scientificName: "Rotala rotundifolia",
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/rotala-rotundifolia-07-800x800.jpg",
      type: "background",
      difficulty: "Média",
      height: "20-40 cm",
      light: "Média a Alta",
      growth: "Médio a Rápido",
      co2: "Recomendado",
      temperature: "22-28°C",
      placement: "Background",
      propagation: "Corte de caule",
      description:
        "Com iluminação intensa, os topos ficam avermelhados, criando um belo contraste.",
      care: "Pode exigir podas regulares para manter a forma compacta",
    },
    {
      name: "Alternanthera Reineckii",
      scientificName: "Alternanthera reineckii",
      image:
        "https://aquastuchi.com.br/wp-content/uploads/2024/06/planta_alternanthera_reineckii_variegata_1003_2_dc238bd83f0279611c748183997e64fb.jpg",
      type: "midground",
      difficulty: "Média",
      height: "15-30 cm",
      light: "Média a Alta",
      growth: "Médio",
      co2: "Recomendado",
      temperature: "22-28°C",
      placement: "Midground",
      propagation: "Corte de caule",
      description:
        "Planta com folhas vermelhas a roxas, perfeita para criar pontos de contraste.",
      care: "Necessita de fertilização rica em ferro para manter a coloração",
    },
    {
      name: "Lobélia Cardinalis",
      scientificName: "Lobelia cardinalis",
      image:
        "https://www.2hraquarist.com/cdn/shop/articles/Lobelia_cardinalis-min_1800x.jpg?v=1738735758",
      type: "midground",
      difficulty: "Média",
      height: "15-30 cm",
      light: "Alta",
      growth: "Médio",
      co2: "Necessário",
      temperature: "22-26°C",
      placement: "Midground",
      propagation: "Corte de caule",
      description:
        "Planta com folhas verdes escuras e caule vermelho, cria um belo contraste.",
      care: "Precisa de boa iluminação e CO2 para prosperar",
    },
    {
      name: "Helanthium Tenellum",
      scientificName: "Helanthium tenellum",
      image:
        "https://aquainfo.org/wp-content/uploads/2009/12/Helanthium-tenellum_9110.jpg",
      type: "foreground",
      difficulty: "Média",
      height: "5-10 cm",
      light: "Média a Alta",
      growth: "Médio",
      co2: "Recomendado",
      temperature: "22-28°C",
      placement: "Foreground",
      propagation: "Estolões",
      description:
        "Planta pequena ideal para criar carpetes no primeiro plano do aquário.",
      care: "Plantar em pequenos grupos para estimular a propagação",
    },
    {
      name: "Bucephalandra",
      scientificName: "Bucephalandra sp.",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_830712-MLB80024260328_102024-O.webp",
      type: "midground",
      difficulty: "Média",
      height: "5-15 cm",
      light: "Baixa a Média",
      growth: "Muito lento",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Midground/Decoração",
      propagation: "Divisão do rizoma",
      description:
        "Planta compacta com folhas de coloração variada. Excelente para decoração de rochas.",
      care: "Não enterrar o rizoma, apenas fixar em superfícies",
    },
    {
      name: "Sagittaria Subulata",
      scientificName: "Sagittaria subulata",
      image:
        "https://flora-aquatica.com.br/wp-content/uploads/2023/11/20231107_135426-11.jpg",
      type: "foreground",
      difficulty: "Fácil",
      height: "5-20 cm",
      light: "Média",
      growth: "Médio a Rápido",
      co2: "Opcional",
      temperature: "22-27°C",
      placement: "Foreground/Midground",
      propagation: "Estolões",
      description:
        "Planta com folhas em forma de grama que se propaga rapidamente formando tufos.",
      care: "Pode precisar de desbaste ocasional para controlar a propagação",
    },
    {
      name: "Hygrophila Polysperma",
      scientificName: "Hygrophila polysperma",
      image:
        "https://www.aquariumgallery.com.au/cdn/shop/files/polysperma-green.webp?v=1689491888&width=416",
      type: "background",
      difficulty: "Fácil",
      height: "25-50 cm",
      light: "Média",
      growth: "Rápido",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Background",
      propagation: "Corte de caule",
      description:
        "Planta de crescimento rápido e robusta, ideal para aquários iniciantes.",
      care: "Requer podas frequentes para evitar que tome conta do aquário",
    },
    {
      name: "Cryptocoryne Wendtii",
      scientificName: "Cryptocoryne wendtii",
      image:
        "https://static.wixstatic.com/media/354b87_13cb91065b264ba1af79371c0834a9b6~mv2.jpg/v1/fill/w_520,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/354b87_13cb91065b264ba1af79371c0834a9b6~mv2.jpg",
      type: "midground",
      difficulty: "Fácil",
      height: "10-15 cm",
      light: "Baixa a Média",
      growth: "Lento",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Midground",
      propagation: "Rizomas",
      description:
        "Planta robusta com folhas onduladas disponível em várias colorações.",
      care: "Pode derreter após o plantio, mas se recupera com novas folhas",
    },
    {
      name: "Limnobium Laevigatum",
      scientificName: "Limnobium laevigatum",
      image:
        "https://flora-aquatica.com.br/wp-content/uploads/2023/11/aaa1-18.jpg",
      type: "floating",
      difficulty: "Fácil",
      height: "Flutuante",
      light: "Alta",
      growth: "Rápido",
      co2: "Não necessário",
      temperature: "20-28°C",
      placement: "Superfície",
      propagation: "Estolões",
      description:
        "Planta flutuante com folhas redondas e pequenas raízes pendentes.",
      care: "Remover excesso periodicamente para evitar sombreamento excessivo",
    },
    {
      name: "Bacopa Caroliniana",
      scientificName: "Bacopa caroliniana",
      image:
        "https://www.aquarismopaulista.com/wp-content/uploads/2014/09/Bacopa-caroliniana.jpg",
      type: "midground",
      difficulty: "Fácil",
      height: "15-30 cm",
      light: "Média a Alta",
      growth: "Médio",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Midground/Background",
      propagation: "Corte de caule",
      description:
        "Planta com caule robusto e folhas verdes arredondadas dispostas em pares.",
      care: "Pode ser cultivada emersa e submersa",
    },
    {
      name: "Micranthemum 'Monte Carlo'",
      scientificName: "Micranthemum tweediei",
      image:
        "https://static.wixstatic.com/media/354b87_180b47cdb1ee413e9ad4893d1bafa8da~mv2.jpg/v1/fill/w_980,h_551,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/354b87_180b47cdb1ee413e9ad4893d1bafa8da~mv2.jpg",
      type: "foreground",
      difficulty: "Média",
      height: "3-5 cm",
      light: "Média a Alta",
      growth: "Médio a Rápido",
      co2: "Recomendado",
      temperature: "22-26°C",
      placement: "Foreground (carpete)",
      propagation: "Estolões",
      description:
        "Planta rasteira que forma densos tapetes verdes. Alternativa mais fácil ao HC Cuba.",
      care: "Plantar em pequenas porções e garantir boa iluminação",
    },
    {
      name: "Ludwigia Repens",
      scientificName: "Ludwigia repens",
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/Ludwigia%20repens%20Rubin%20aqua2-800x800.JPG",
      type: "background",
      difficulty: "Fácil",
      height: "25-50 cm",
      light: "Média a Alta",
      growth: "Médio a Rápido",
      co2: "Recomendado",
      temperature: "22-27°C",
      placement: "Background",
      propagation: "Corte de caule",
      description:
        "Planta com folhas que variam do verde ao vermelho dependendo das condições.",
      care: "Maior intensidade luminosa favorece a coloração avermelhada",
    },
    {
      name: "Staurogyne Repens",
      scientificName: "Staurogyne repens",
      image:
        "https://www.aquarismopaulista.com/wp-content/uploads/2017/02/Staurogyne-Repens.jpg",
      type: "foreground",
      difficulty: "Média",
      height: "5-10 cm",
      light: "Média a Alta",
      growth: "Lento",
      co2: "Recomendado",
      temperature: "22-28°C",
      placement: "Foreground",
      propagation: "Corte de caule",
      description:
        "Planta compacta com folhas verdes pequenas, cria um belo primeiro plano.",
      care: "Podar regularmente os topos para estimular crescimento lateral",
    },
    {
      name: "Echinodorus Amazonicus",
      scientificName: "Echinodorus amazonicus",
      image: "https://www.fishi-pedia.com/wp-content/uploads/2023/04/4.jpg",
      type: "background",
      difficulty: "Fácil",
      height: "40-60 cm",
      light: "Média",
      growth: "Médio",
      co2: "Opcional",
      temperature: "22-28°C",
      placement: "Background",
      propagation: "Mudas nas hastes florais",
      description:
        "Planta amazônica de grande porte com folhas longas em formato de espada.",
      care: "Precisa de espaço e substrato nutritivo para desenvolver todo o potencial",
    },
    {
      name: "Glossostigma Elatinoides",
      scientificName: "Glossostigma elatinoides",
      image:
        "https://escoladeaquario.com.br/wp-content/uploads/2020/08/glossostigma-elatinoides-3-1199x800.jpg",
      type: "foreground",
      difficulty: "Avançada",
      height: "1-3 cm",
      light: "Alta",
      growth: "Médio",
      co2: "Necessário",
      temperature: "20-26°C",
      placement: "Foreground (carpete)",
      propagation: "Estolões",
      description:
        "Forma um dos carpetes mais baixos e delicados em aquarismo plantado.",
      care: "Requer CO2, alta iluminação e manutenção regular",
    },
    {
      name: "Nymphaea Lotus",
      scientificName: "Nymphaea lotus",
      image:
        "https://www.gardenia.net/wp-content/uploads/2023/05/nymphaea-lotus.webp",
      type: "midground",
      difficulty: "Média",
      height: "20-40 cm",
      light: "Alta",
      growth: "Médio",
      co2: "Recomendado",
      temperature: "22-28°C",
      placement: "Midground/Destaque",
      propagation: "Bulbos",
      description:
        "Planta bulbosa com folhas em forma de coração, disponível em verde ou vermelha.",
      care: "Não enterrar o bulbo completamente para evitar apodrecimento",
    },
    {
      name: "Hygrophila Pinnatifida",
      scientificName: "Hygrophila pinnatifida",
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/hygrophila_pinnatifida_in_vitro_aquaplante_105_2_52ea758dc442e1e786b54c901815f5c8.jpg",
      type: "midground",
      difficulty: "Média",
      height: "15-25 cm",
      light: "Média a Alta",
      growth: "Médio",
      co2: "Recomendado",
      temperature: "20-28°C",
      placement: "Midground/Epífita",
      propagation: "Corte de caule/Brotos laterais",
      description:
        "Planta versátil com folhas texturizadas que pode crescer fixa em rochas ou no substrato.",
      care: "Beneficia-se de ferro na fertilização para melhor coloração",
    },
  ];

  // Similar filtering and pagination logic as FishSpecies
  const filteredPlants = plantData.filter((plant) => {
    return (
      (filterType === "all" || plant.type === filterType) &&
      (plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const paginatedPlants = filteredPlants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    scrollToTop();
  };

  const openPlantDetails = (plant) => {
    setSelectedPlant(plant);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closePlantDetails = () => {
    setSelectedPlant(null);
    // Restore scrolling
    document.body.style.overflow = "auto";
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Catálogo de Plantas Aquáticas
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore nossa coleção de plantas aquáticas com informações detalhadas
          sobre cuidados, requisitos de iluminação e dicas de cultivo.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar plantas..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          {["foreground", "midground", "background"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg ${
                filterType === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type === "foreground"
                ? "Primeiro Plano"
                : type === "midground"
                ? "Plano Médio"
                : "Fundo"}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Cards Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            Nenhuma planta encontrada com esse critério.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPlants.map((plant, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => openPlantDetails(plant)}
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {plant.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                        plant.difficulty
                      )}`}
                    >
                      {plant.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 italic text-sm mb-4">
                    {plant.scientificName}
                  </p>

                  <p className="text-gray-700 mb-4">{plant.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <FaRuler className="text-green-500 mr-2" />
                      <span>Altura: {plant.height}</span>
                    </div>
                    <div className="flex items-center">
                      <FaSun className="text-yellow-500 mr-2" />
                      <span>Luz: {plant.light}</span>
                    </div>
                    <div className="flex items-center">
                      <FaThermometerHalf className="text-red-500 mr-2" />
                      <span>Temp: {plant.temperature}</span>
                    </div>
                    <div className="flex items-center">
                      <FaLeaf className="text-green-500 mr-2" />
                      <span>CO₂: {plant.co2}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong>Dica:</strong> {plant.care}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Updated Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              className="mt-10 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 mb-3">
                  Página <span className="font-semibold">{currentPage}</span> de{" "}
                  <span className="font-semibold">{totalPages}</span> (
                  {filteredPlants.length} plantas)
                </span>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                    }`}
                    aria-label="Página anterior"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Anterior
                  </button>

                  <div className="hidden sm:flex space-x-1">
                    {/* First page */}
                    {currentPage > 2 && (
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-200"
                      >
                        1
                      </button>
                    )}

                    {/* Ellipsis for skipped pages */}
                    {currentPage > 3 && (
                      <span className="px-1.5 py-1.5 text-gray-500">...</span>
                    )}

                    {/* Previous page if not first */}
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-200"
                      >
                        {currentPage - 1}
                      </button>
                    )}

                    {/* Current page */}
                    <button
                      className="px-3 py-1.5 rounded-lg bg-green-600 text-white font-medium"
                      aria-current="page"
                    >
                      {currentPage}
                    </button>

                    {/* Next page if not last */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-200"
                      >
                        {currentPage + 1}
                      </button>
                    )}

                    {/* Ellipsis for skipped pages */}
                    {currentPage < totalPages - 2 && (
                      <span className="px-1.5 py-1.5 text-gray-500">...</span>
                    )}

                    {/* Last page */}
                    {currentPage < totalPages - 1 && (
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-200"
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>

                  {/* Mobile pagination with current/total */}
                  <div className="flex sm:hidden items-center px-3 py-1.5 bg-gray-100 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">
                      {currentPage} / {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                    }`}
                    aria-label="Próxima página"
                  >
                    Próxima
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Jump to page for larger screens */}
                {totalPages > 3 && (
                  <div className="hidden md:flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Ir para:</span>
                    <select
                      className="bg-white border border-gray-300 text-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      aria-label="Selecionar página"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Plant Details Modal */}
      <AnimatePresence mode="wait">
        {selectedPlant && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closePlantDetails}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.25,
              }}
            >
              <div className="relative">
                <div className="h-64 sm:h-80 overflow-hidden">
                  <img
                    src={selectedPlant.image}
                    alt={selectedPlant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                  onClick={closePlantDetails}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {selectedPlant.name}
                    </h2>
                    <p className="text-gray-600 italic">
                      {selectedPlant.scientificName}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${getDifficultyColor(
                      selectedPlant.difficulty
                    )}`}
                  >
                    {selectedPlant.difficulty}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Sobre
                  </h3>
                  <p className="text-gray-700">{selectedPlant.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Características
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaRuler className="text-green-500 mr-3 min-w-5" />
                        <span>
                          <strong>Altura:</strong> {selectedPlant.height}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaSun className="text-yellow-500 mr-3 min-w-5" />
                        <span>
                          <strong>Iluminação:</strong> {selectedPlant.light}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaThermometerHalf className="text-red-500 mr-3 min-w-5" />
                        <span>
                          <strong>Temperatura:</strong>{" "}
                          {selectedPlant.temperature}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaLeaf className="text-green-500 mr-3 min-w-5" />
                        <span>
                          <strong>CO₂:</strong> {selectedPlant.co2}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Cultivo
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaClock className="text-blue-500 mr-3 min-w-5" />
                        <span>
                          <strong>Crescimento:</strong> {selectedPlant.growth}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaSeedling className="text-green-600 mr-3 min-w-5" />
                        <span>
                          <strong>Propagação:</strong>{" "}
                          {selectedPlant.propagation}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaMapMarkerAlt className="text-red-500 mr-3 min-w-5" />
                        <span>
                          <strong>Posicionamento:</strong>{" "}
                          {selectedPlant.placement}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaInfoCircle className="text-blue-500 mr-3 min-w-5" />
                        <span>
                          <strong>Tipo:</strong>{" "}
                          {selectedPlant.type === "foreground"
                            ? "Primeiro Plano"
                            : selectedPlant.type === "midground"
                            ? "Plano Médio"
                            : selectedPlant.type === "background"
                            ? "Fundo"
                            : "Flutuante"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-green-700">
                    Dicas de Cuidado
                  </h3>
                  <p className="text-green-800">{selectedPlant.care}</p>
                </div>

                <div className="text-center pt-4 border-t border-gray-200">
                  <button
                    onClick={closePlantDetails}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlantSpecies;
