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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Changed from 24 to 12

  const fishData = [
    {
      name: "Betta Splendens",
      scientificName: "Betta splendens",
      image:
        "https://aquariopedia.com.br/wp-content/uploads/2022/12/Peixe-de-aquario-betta-splendens-macho-da-cor-azul.jpg",
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
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/tetra_neon_verdadeiro_paracheirodon_innesi_4373_1_a875d85d71c43eee55728f28f40b2177.jpg",
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
      image:
        "https://www.solaqua.net/WebRoot/Store/Shops/3311-141118/5B7E/DEE3/C3BB/6E96/8538/25E6/6498/D8D1/guppy.jpg",
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
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Discus_aquarium_tropical_porte_dor%C3%A9e_-_002.JPG",
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
      image:
        "https://i0.wp.com/patadigital.com/wp-content/uploads/2024/03/image-30.png?resize=960%2C590&ssl=1",
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
      image: "https://petfriends.com.br/wp-content/uploads/2016/12/dory.png",
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
    {
      name: "Arraia Motoro",
      scientificName: "Potamotrygon motoro",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Ocellate_river_stingray%2C_Boston_Aquarium.jpg",
      type: "freshwater",
      temperament: "Pacífico",
      size: "30-40 cm",
      pH: "6.5-7.5",
      temperature: "24-28°C",
      diet: "Carnívoro (crustáceos, moluscos)",
      minTankSize: "500 litros",
      origin: "América do Sul",
      lifespan: "15-20 anos",
      description:
        "Arraia de água doce com padrões circulares no dorso. Requer aquário espaçoso e substrato fino.",
    },
    {
      name: "Camarão Red Cherry",
      scientificName: "Neocaridina davidi",
      image:
        "https://livingaqua-shop.com/cdn/shop/products/Neocaridina-davidi-Sakura.jpg?v=1679408913",
      type: "freshwater",
      temperament: "Pacífico",
      size: "2-3 cm",
      pH: "6.5-7.5",
      temperature: "20-28°C",
      diet: "Onívoro (algas, detritos)",
      minTankSize: "10 litros",
      origin: "Taiwan",
      lifespan: "1-2 anos",
      description:
        "Pequeno camarão vermelho popular em aquários plantados. Excelente limpador de algas.",
    },
    {
      name: "Caramujo Nerita",
      scientificName: "Neritina natalensis",
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/neritina_virginea_3879_1_e42b95a2e6084a05d813761f41f9249e.jpeg",
      type: "freshwater",
      temperament: "Pacífico",
      size: "2-2.5 cm",
      pH: "7.0-8.2",
      temperature: "22-28°C",
      diet: "Herbívoro (algas)",
      minTankSize: "20 litros",
      origin: "África",
      lifespan: "1-2 anos",
      description:
        "Excelente limpador de aquário, remove algas das superfícies sem danificar plantas.",
    },
    {
      name: "Caranguejo Ermitão",
      scientificName: "Coenobita spp.",
      image: "https://monomito.org/wp-content/uploads/paguro-1.jpg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "5-8 cm",
      pH: "8.0-8.4",
      temperature: "24-27°C",
      diet: "Onívoro (detritos, algas)",
      minTankSize: "60 litros",
      origin: "Oceano Indo-Pacífico",
      lifespan: "5-10 anos",
      description:
        "Crustáceo que usa conchas vazias como proteção. Excelente para limpeza do substrato.",
    },
    {
      name: "Cavalo-Marinho",
      scientificName: "Hippocampus reidi",
      image:
        "https://static.escolakids.uol.com.br/2022/10/1-cavalo-marinho.jpg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "12-17 cm",
      pH: "8.1-8.4",
      temperature: "24-26°C",
      diet: "Carnívoro (pequenos crustáceos)",
      minTankSize: "100 litros",
      origin: "Oceano Atlântico",
      lifespan: "3-5 anos",
      description:
        "Peixe exótico com anatomia única. Requer cuidados especiais e alimentação específica.",
    },
    {
      name: "Pleco Real",
      scientificName: "Panaque nigrolineatus",
      image:
        "https://media.istockphoto.com/id/680668122/pt/foto/pleco-catfish-l-260-queen-arabesque-hypostomus-sp-plecostomus-aquarium-fish.jpg?s=612x612&w=0&k=20&c=61y2zZTQU9LyUx60FNFBnBo7ONnQrRaIzTTTOzz30pU=",
      type: "freshwater",
      temperament: "Pacífico",
      size: "30-40 cm",
      pH: "6.5-7.5",
      temperature: "23-27°C",
      diet: "Herbívoro (madeira, vegetais)",
      minTankSize: "300 litros",
      origin: "América do Sul",
      lifespan: "10-15 anos",
      description:
        "Peixe conhecido por seu padrão dourado e preto. Necessita de madeira em sua dieta.",
    },
    {
      name: "Coral Xênia",
      scientificName: "Xenia sp.",
      image:
        "https://tsunamiaquarios.com.br/wp-content/uploads/2023/07/xenia-gianttt1-9e7165237f3935a48116588042205540-1024-1024.jpeg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "5-15 cm",
      pH: "8.1-8.4",
      temperature: "24-27°C",
      diet: "Fotossintético/Planctônico",
      minTankSize: "100 litros",
      origin: "Indo-Pacífico",
      lifespan: "2-5 anos",
      description:
        "Coral pulsante de crescimento rápido. Ideal para aquaristas iniciantes em corais.",
    },
    {
      name: "Carangueijo Azul",
      scientificName: "Cardisoma guanhumi",
      image:
        "https://s2-umsoplaneta.glbimg.com/gIkgp6FVXt6hZ9AmfRTWhY2ApB4=/0x0:1280x853/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_7d5b9b5029304d27b7ef8a7f28b4d70f/internal_photos/bs/2021/o/V/OV4Z0rSmSmgC0VUv8KsA/whatsapp-image-2021-08-31-at-09.56.21.jpeg",
      type: "freshwater",
      temperament: "Semi-agressivo",
      size: "10-15 cm",
      pH: "7.0-8.0",
      temperature: "22-28°C",
      diet: "Onívoro (vegetais, pequenos peixes)",
      minTankSize: "200 litros",
      origin: "América Central e Sul",
      lifespan: "3-5 anos",
      description:
        "Caranguejo terrestre que necessita de área seca no aquário. Coloração azulada impressionante.",
    },
    {
      name: "Anêmona Bubble Tip",
      scientificName: "Entacmaea quadricolor",
      image:
        "https://www.miarrecife.com/wp-content/uploads/2024/02/bubble-tip-anemone-philippines.jpg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "15-30 cm",
      pH: "8.1-8.4",
      temperature: "24-27°C",
      diet: "Carnívoro (pequenos peixes, camarões)",
      minTankSize: "150 litros",
      origin: "Indo-Pacífico",
      lifespan: "10+ anos",
      description:
        "Anêmona popular para symbiose com peixes-palhaço. Requer iluminação intensa.",
    },
    {
      name: "Ouriço-do-mar",
      scientificName: "Lytechinus variegatus",
      image:
        "https://cobasiblog.blob.core.windows.net/production-ofc/2022/05/ourico-do-mar-capa.png",
      type: "saltwater",
      temperament: "Pacífico",
      size: "5-10 cm",
      pH: "8.1-8.4",
      temperature: "23-27°C",
      diet: "Herbívoro (algas)",
      minTankSize: "100 litros",
      origin: "Oceano Atlântico",
      lifespan: "3-5 anos",
      description:
        "Excelente controlador de algas. Cuidado com seus espinhos durante manutenção.",
    },
    {
      name: "Molinésia",
      scientificName: "Poecilia sphenops",
      image:
        "https://aquastuchi.com.br/wp-content/uploads/2024/07/Molly-Gold-Black-Lyratail-1.jpg",
      type: "freshwater",
      temperament: "Pacífico/Ativo",
      size: "6-10 cm",
      pH: "7.0-8.2",
      temperature: "23-28°C",
      diet: "Onívoro (ração, algas)",
      minTankSize: "60 litros",
      origin: "América Central",
      lifespan: "3-5 anos",
      description:
        "Peixe resistente e colorido, ideal para iniciantes. Prefere águas levemente alcalinas.",
    },
    {
      name: "Camarão Arlequim",
      scientificName: "Hymenocera picta",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Harlequin_Shrimp_1.jpg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "5-7 cm",
      pH: "8.1-8.4",
      temperature: "24-28°C",
      diet: "Carnívoro (estrelas-do-mar)",
      minTankSize: "100 litros",
      origin: "Indo-Pacífico",
      lifespan: "2-3 anos",
      description:
        "Camarão colorido e exótico. Especializado em se alimentar de estrelas-do-mar.",
    },
    {
      name: "Plati",
      scientificName: "Xiphophorus maculatus",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/18_marca_06_r._015.jpg/640px-18_marca_06_r._015.jpg",
      type: "freshwater",
      temperament: "Pacífico/Ativo",
      size: "3-5 cm",
      pH: "7.0-8.2",
      temperature: "22-26°C",
      diet: "Onívoro (ração, vegetais)",
      minTankSize: "40 litros",
      origin: "América Central",
      lifespan: "2-3 anos",
      description:
        "Peixe pequeno e colorido, ideal para aquários comunitários. Fácil reprodução.",
    },
    {
      name: "Kinguio",
      scientificName: "Carassius auratus",
      image:
        "https://portalmelhoresamigos.com.br/wp-content/uploads/2015/06/destaque_peixe_dourado.jpg",
      type: "freshwater",
      temperament: "Pacífico",
      size: "15-30 cm",
      pH: "6.8-7.8",
      temperature: "18-24°C",
      diet: "Onívoro (ração, vegetais)",
      minTankSize: "100 litros",
      origin: "China",
      lifespan: "10-15 anos",
      description:
        "Peixe ornamental popular com diversas variedades de cores e formas. Requer boa filtragem devido à alta produção de resíduos.",
    },
    {
      name: "Cascudo Ancistrus",
      scientificName: "Ancistrus cirrhosus",
      image:
        "https://images.tcdn.com.br/img/img_prod/749804/cascudo_ancistrus_spotted_1767_1_cdae972faab75da2c88abe3f4578d2cf.jpg",
      type: "freshwater",
      temperament: "Pacífico",
      size: "10-15 cm",
      pH: "6.0-7.5",
      temperature: "22-26°C",
      diet: "Herbívoro/Detritívoro",
      minTankSize: "80 litros",
      origin: "América do Sul",
      lifespan: "8-12 anos",
      description:
        "Peixe limpador excelente para controle de algas. Mais adequado para aquários que kinguios maiores.",
    },
    {
      name: "Camarão Amano",
      scientificName: "Caridina multidentata",
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/camarao_takashi_amano_caridina_multidentata_5_unidades_7779_9_42b3e269ba81465eca29f6b8ee987025.jpeg",
      type: "freshwater",
      temperament: "Pacífico",
      size: "4-5 cm",
      pH: "6.0-7.6",
      temperature: "18-28°C",
      diet: "Detritívoro (algas, restos)",
      minTankSize: "20 litros",
      origin: "Japão",
      lifespan: "2-3 anos",
      description:
        "Um dos melhores limpadores de aquário, especialmente eficaz contra algas.",
    },
    {
      name: "Apistograma Ramirezi",
      scientificName: "Mikrogeophagus ramirezi",
      image:
        "https://images.tcdn.com.br/img/img_prod/749804/ramirezi_azul_mikrogeophagus_ramirezi_837_1_20201211001323.jpg",
      type: "freshwater",
      temperament: "Semi-agressivo",
      size: "5-7 cm",
      pH: "6.0-7.0",
      temperature: "24-29°C",
      diet: "Carnívoro (artemias, bloodworms)",
      minTankSize: "60 litros",
      origin: "Venezuela, Colômbia",
      lifespan: "2-4 anos",
      description:
        "Ciclídeo anão colorido, ideal para aquários plantados. Forma casais monogâmicos.",
    },
    {
      name: "Killifish",
      scientificName: "Aphyosemion australe",
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/killifish_gardneri_fundolopanchax_gardneri_casal_5329_1_14450d4e4fc73a88ec66580408da0d61.jpg",
      type: "freshwater",
      temperament: "Pacífico/Ativo",
      size: "5-6 cm",
      pH: "6.0-7.0",
      temperature: "22-26°C",
      diet: "Carnívoro (pequenos insetos, artemias)",
      minTankSize: "40 litros",
      origin: "África Ocidental",
      lifespan: "1-2 anos",
      description:
        "Peixe muito colorido com ciclo de vida curto. Excelente para nano aquários.",
    },
  ];

  const filteredFish = fishData.filter((fish) => {
    return (
      (filterType === "all" || fish.type === filterType) &&
      (fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination logic - simplified and guaranteed to work
  const totalPages = Math.ceil(filteredFish.length / itemsPerPage);
  const paginatedFish = filteredFish.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

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
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedFish.map((fish, index) => (
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
                      {fish.type === "freshwater"
                        ? "Água Doce"
                        : "Água Salgada"}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Primeira
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Anterior
              </button>
              <div className="flex items-center px-4">
                <span className="text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Próxima
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Última
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default FishSpecies;
