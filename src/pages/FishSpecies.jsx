import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaThermometerHalf,
  FaRuler,
  FaGlobeAmericas,
  FaTimes,
  FaFish,
  FaUtensils,
  FaClock,
  FaFlask,
  FaWater,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const FishSpecies = () => {
  const [searchParams] = useSearchParams();
  const speciesId = searchParams.get("id");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFish, setSelectedFish] = useState(null);
  const itemsPerPage = 12; // Changed from 24 to 12

  // Update fishData to include IDs
  const fishData = [
    {
      id: 301, // Using 300+ range for species IDs
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
      id: 302,
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
      id: 303,
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
      id: 304,
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
      id: 305,
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
      id: 306,
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
      id: 307,
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
      id: 308,
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
      id: 309,
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
      id: 310,
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
      id: 311,
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
      id: 312,
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
      id: 313,
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
      id: 314,
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
      id: 315,
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
      id: 316,
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
      id: 317,
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
      id: 318,
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
      id: 319,
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
      id: 320,
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
      id: 321,
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
      id: 322,
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
      id: 323,
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
      id: 324,
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
    // Novas espécies de água doce
    {
      id: 325,
      name: "Peixe-Borboleta",
      scientificName: "Pantodon buchholzi",
      image:
        "https://cobasiblog.blob.core.windows.net/production-ofc/2022/12/3-3.png",
      type: "freshwater",
      temperament: "Pacífico/Tímido",
      size: "10-13 cm",
      pH: "6.0-7.0",
      temperature: "24-28°C",
      diet: "Carnívoro (insetos, pequenos peixes)",
      minTankSize: "100 litros",
      origin: "África Ocidental",
      lifespan: "5-8 anos",
      description:
        "Possui nadadeiras peitorais semelhantes a asas de borboleta. Capaz de saltar fora d'água para capturar insetos.",
    },
    {
      id: 326,
      name: "Acará Bandeira",
      scientificName: "Pterophyllum scalare",
      image: "https://www.baseflora.com/img/article/0011-1.jpg",
      type: "freshwater",
      temperament: "Semi-agressivo/Cardume",
      size: "15-20 cm",
      pH: "6.0-7.5",
      temperature: "24-30°C",
      diet: "Onívoro (artemias, flocos)",
      minTankSize: "150 litros",
      origin: "América do Sul (Bacia Amazônica)",
      lifespan: "8-10 anos",
      description:
        "Peixe elegante de formato triangular. Prefere aquários altos com plantas e troncos.",
    },
    {
      id: 327,
      name: "Barbo Tigre",
      scientificName: "Puntigrus tetrazona",
      image:
        "https://peixecoruna.com/wp-content/uploads/2024/08/Peixe-Barbo-Tigre.png",
      type: "freshwater",
      temperament: "Ativo/Cardume",
      size: "5-7 cm",
      pH: "6.0-7.5",
      temperature: "22-26°C",
      diet: "Onívoro (ração, vegetais)",
      minTankSize: "80 litros",
      origin: "Indonésia",
      lifespan: "5-7 anos",
      description:
        "Reconhecível por suas listras pretas. Deve ser mantido em grupos de no mínimo 6 indivíduos.",
    },
    {
      id: 328,
      name: "Tetras Sangue",
      scientificName: "Hyphessobrycon eques",
      image: "https://gruposarlo.com.br/wp-content/uploads/2022/01/S35736.jpg",
      type: "freshwater",
      temperament: "Pacífico/Cardume",
      size: "3-5 cm",
      pH: "6.0-7.5",
      temperature: "22-28°C",
      diet: "Onívoro (ração, artemias)",
      minTankSize: "60 litros",
      origin: "Bacia do Rio Paraná",
      lifespan: "3-5 anos",
      description:
        "Pequeno peixe de coloração vermelha intensa. Ideal para aquários comunitários.",
    },
    {
      id: 329,
      name: "Peixe Colisa",
      scientificName: "Trichogaster lalius",
      image:
        "https://cdn.dlojavirtual.com/static1/107424/sku/peixes-de-agua-doce-colisa-azul-3-a-4-cm-p-1716415482406.png",
      type: "freshwater",
      temperament: "Pacífico/Tímido",
      size: "5-8 cm",
      pH: "6.0-7.5",
      temperature: "22-28°C",
      diet: "Onívoro (ração, vegetais)",
      minTankSize: "60 litros",
      origin: "Índia, Bangladesh",
      lifespan: "3-5 anos",
      description:
        "Também conhecido como gourami anão, possui cores vibrantes e constrói ninhos de bolhas.",
    },
    {
      id: 330,
      name: "Corydora Bronze",
      scientificName: "Corydoras aeneus",
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/corydoras_aeneus_4381_1_86dc7741342d3cfd77cf2a31218b0e7a.jpg",
      type: "freshwater",
      temperament: "Pacífico/Cardume",
      size: "6-7 cm",
      pH: "6.0-7.5",
      temperature: "22-26°C",
      diet: "Onívoro (tabletes de fundo)",
      minTankSize: "60 litros",
      origin: "América do Sul",
      lifespan: "5-8 anos",
      description:
        "Peixe de fundo que ajuda a manter o substrato limpo. Deve ser mantido em grupos.",
    },
    {
      id: 331,
      name: "Danio Zebra",
      scientificName: "Danio rerio",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zebrafisch.jpg/640px-Zebrafisch.jpg",
      type: "freshwater",
      temperament: "Ativo/Cardume",
      size: "3-5 cm",
      pH: "6.5-7.5",
      temperature: "18-24°C",
      diet: "Onívoro (ração, microorganismos)",
      minTankSize: "40 litros",
      origin: "Índia, Bangladesh",
      lifespan: "3-5 anos",
      description:
        "Pequeno peixe listrado muito ativo. Ideal para iniciantes e aquários comunitários.",
    },
    {
      id: 332,
      name: "Peixe Arco-Íris",
      scientificName: "Melanotaenia boesemani",
      image:
        "https://cdn.interago.com.br/img/webp/w_0_q_8/5/mc/Novo%20cat%C3%A1logo/Arco%20Iris/arcoirisfundo",
      type: "freshwater",
      temperament: "Pacífico/Cardume",
      size: "10-12 cm",
      pH: "7.0-8.0",
      temperature: "24-28°C",
      diet: "Onívoro (ração, artemias)",
      minTankSize: "120 litros",
      origin: "Nova Guiné",
      lifespan: "5-8 anos",
      description:
        "Coloração impressionante que muda com a luz. Precisa de espaço para natação em cardume.",
    },
    {
      id: 333,
      name: "Botia Palhaço",
      scientificName: "Chromobotia macracanthus",
      image:
        "https://images.tcdn.com.br/img/img_prod/749804/botia_palhaco_5_a_7_cm_chromobotia_macracanthus_1035_2_2b530771e56c9022d8545185663c543f.jpg",
      type: "freshwater",
      temperament: "Pacífico/Cardume",
      size: "15-30 cm",
      pH: "6.0-7.5",
      temperature: "25-30°C",
      diet: "Onívoro (ração, caramujos)",
      minTankSize: "250 litros",
      origin: "Indonésia",
      lifespan: "10-15 anos",
      description:
        "Peixe de fundo com padrão laranja e preto. Excelente controlador de caramujos indesejados.",
    },
    // Novas espécies de água salgada
    {
      id: 334,
      name: "Peixe-Anjo Imperador",
      scientificName: "Pomacanthus imperator",
      image:
        "https://guiadoaquarismo.com.br/wp-content/uploads/2023/06/Peixe-Anjo-imperador-Pomacanthus-imperator.jpg",
      type: "saltwater",
      temperament: "Semi-agressivo",
      size: "30-40 cm",
      pH: "8.1-8.4",
      temperature: "24-28°C",
      diet: "Onívoro (esponjas, algas)",
      minTankSize: "500 litros",
      origin: "Indo-Pacífico",
      lifespan: "10-15 anos",
      description:
        "Um dos mais belos peixes marinhos, com listras azuis e amarelas. Juvenis têm coloração diferente dos adultos.",
    },
    {
      id: 335,
      name: "Cirurgião Yellow Tang",
      scientificName: "Zebrasoma flavescens",
      image:
        "https://www.aquarismomarinho.com.br/blog/wp-content/uploads/2020/05/yellow-tang-preco.jpg",
      type: "saltwater",
      temperament: "Semi-agressivo",
      size: "15-20 cm",
      pH: "8.1-8.4",
      temperature: "24-28°C",
      diet: "Herbívoro (algas, vegetais marinhos)",
      minTankSize: "280 litros",
      origin: "Havaí, Pacífico",
      lifespan: "8-10 anos",
      description:
        "Peixe amarelo vibrante muito popular em aquários marinhos. Excelente controlador de algas.",
    },
    {
      id: 336,
      name: "Góbio Mandarim",
      scientificName: "Synchiropus splendidus",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Synchiropus_splendidus_2_Luc_Viatour.jpg",
      type: "saltwater",
      temperament: "Pacífico",
      size: "6-8 cm",
      pH: "8.1-8.4",
      temperature: "24-26°C",
      diet: "Carnívoro (copépodes, microcrustáceos)",
      minTankSize: "150 litros",
      origin: "Indo-Pacífico",
      lifespan: "3-5 anos",
      description:
        "Um dos peixes mais coloridos do mundo. Requer alimentação especializada e aquário maduro.",
    },
    {
      id: 337,
      name: "Peixe-Leão",
      scientificName: "Pterois volitans",
      image:
        "https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/peixe-leao.jpg",
      type: "saltwater",
      temperament: "Predador/Solitário",
      size: "30-35 cm",
      pH: "8.1-8.4",
      temperature: "23-27°C",
      diet: "Carnívoro (pequenos peixes, crustáceos)",
      minTankSize: "400 litros",
      origin: "Indo-Pacífico",
      lifespan: "10-15 anos",
      description:
        "Peixe exótico com espinhos venenosos. Requer cuidados especiais e não deve ser mantido com peixes pequenos.",
    },
    {
      id: 338,
      name: "Chromis Azul",
      scientificName: "Chromis cyanea",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Chromis_cyanea_Gratwicke.jpg/1200px-Chromis_cyanea_Gratwicke.jpg",
      type: "saltwater",
      temperament: "Pacífico/Cardume",
      size: "8-10 cm",
      pH: "8.1-8.4",
      temperature: "24-27°C",
      diet: "Onívoro (plâncton, ração marinha)",
      minTankSize: "150 litros",
      origin: "Caribe",
      lifespan: "8-15 anos",
      description:
        "Peixe azul elétrico que se dá bem em cardumes. Excelente para iniciantes em aquários marinhos.",
    },
    {
      id: 339,
      name: "Peixe-Anjo Flameback",
      scientificName: "Centropyge acanthops",
      image:
        "https://lh5.googleusercontent.com/proxy/zHTdNXbXJgAHrhhUYeZlw8agTqEqa4JTtAJcGpUJP2lKjkAwbfbQzY5A3Xlg-FtUe0AkbPjzXBZzJ8FFbvp1neGn4XhisgpN-J-HEpA8S9TdCyPuYEP-8BpuGZOQh5fw440Le0Ab1S_i-qyLtJVMOU5C3lle",
      type: "saltwater",
      temperament: "Semi-agressivo",
      size: "8-10 cm",
      pH: "8.1-8.4",
      temperature: "24-28°C",
      diet: "Onívoro (algas, pequenos invertebrados)",
      minTankSize: "180 litros",
      origin: "Oceano Índico",
      lifespan: "5-10 anos",
      description:
        "Peixe-anjo anão com coloração laranja-avermelhada. Menor e mais adequado para aquários médios que outros peixes-anjo.",
    },
    {
      id: 340,
      name: "Camarão Pistola",
      scientificName: "Alpheus soror",
      image:
        "https://i.pinimg.com/474x/73/fc/16/73fc16c9ccca2bed1e8c6e8bb421d504.jpg",
      type: "saltwater",
      temperament: "Pacífico/Territorial",
      size: "3-5 cm",
      pH: "8.1-8.4",
      temperature: "24-27°C",
      diet: "Carnívoro (detritos, pequenos invertebrados)",
      minTankSize: "100 litros",
      origin: "Indo-Pacífico",
      lifespan: "3-5 anos",
      description:
        "Capaz de produzir um estalido sonoro com sua garra que atordoa presas. Geralmente forma parceria simbiótica com góbios.",
    },
    {
      id: 341,
      name: "Peixe-folha",
      scientificName: "Chaetodermis penicilligerus",
      image:
        "https://www.aquarismopaulista.com/wp-content/uploads/2021/08/Monocirrhus-polyacanthus2.jpg",
      type: "saltwater",
      temperament: "Semi-agressivo",
      size: "20-25 cm",
      pH: "8.1-8.4",
      temperature: "24-26°C",
      diet: "Onívoro (pequenos invertebrados, algas)",
      minTankSize: "300 litros",
      origin: "Pacífico Ocidental",
      lifespan: "5-7 anos",
      description:
        "Peixe com projeções dérmicas semelhantes a folhas que garantem camuflagem perfeita entre algas e corais.",
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
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  useEffect(() => {
    if (speciesId) {
      const species = fishData.find((f) => f.id === Number(speciesId));
      if (species) {
        setSelectedFish(species);
      }
    }
  }, [speciesId]);

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

  const openFishDetails = (fish) => {
    setSelectedFish(fish);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeFishDetails = () => {
    setSelectedFish(null);
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
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => openFishDetails(fish)}
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

          {/* Improved Pagination Controls */}
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
                  {filteredFish.length} espécies)
                </span>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
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
                        className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
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
                        className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        {currentPage - 1}
                      </button>
                    )}

                    {/* Current page */}
                    <button
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                      aria-current="page"
                    >
                      {currentPage}
                    </button>

                    {/* Next page if not last */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
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
                        className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
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
                        : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
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
                      className="bg-white border border-gray-300 text-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Fish Details Modal */}
      <AnimatePresence mode="wait">
        {selectedFish && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeFishDetails}
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
                    src={selectedFish.image}
                    alt={selectedFish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                  onClick={closeFishDetails}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {selectedFish.name}
                    </h2>
                    <p className="text-gray-600 italic">
                      {selectedFish.scientificName}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      selectedFish.type === "freshwater"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {selectedFish.type === "freshwater"
                      ? "Água Doce"
                      : "Água Salgada"}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Sobre
                  </h3>
                  <p className="text-gray-700">{selectedFish.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Características
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaRuler className="text-blue-500 mr-3 min-w-5" />
                        <span>
                          <strong>Tamanho:</strong> {selectedFish.size}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaThermometerHalf className="text-red-500 mr-3 min-w-5" />
                        <span>
                          <strong>Temperatura:</strong>{" "}
                          {selectedFish.temperature}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaFlask className="text-purple-500 mr-3 min-w-5" />
                        <span>
                          <strong>pH:</strong> {selectedFish.pH}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaFish className="text-green-500 mr-3 min-w-5" />
                        <span>
                          <strong>Temperamento:</strong>{" "}
                          {selectedFish.temperament}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Cuidados
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaUtensils className="text-orange-500 mr-3 min-w-5" />
                        <span>
                          <strong>Dieta:</strong> {selectedFish.diet}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaWater className="text-blue-500 mr-3 min-w-5" />
                        <span>
                          <strong>Aquário mínimo:</strong>{" "}
                          {selectedFish.minTankSize}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaClock className="text-gray-500 mr-3 min-w-5" />
                        <span>
                          <strong>Expectativa de vida:</strong>{" "}
                          {selectedFish.lifespan}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaGlobeAmericas className="text-green-500 mr-3 min-w-5" />
                        <span>
                          <strong>Origem:</strong> {selectedFish.origin}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-200">
                  <button
                    onClick={closeFishDetails}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default FishSpecies;
