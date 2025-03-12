import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFish,
  FaLeaf,
  FaBox,
  FaSearch,
  FaBookOpen,
  FaCalculator,
  FaCalendarAlt,
  FaLightbulb,
  FaThermometerHalf,
  FaFilter,
  FaTint,
  FaBacterium,
  FaTools,
  FaFlask,
} from "react-icons/fa";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const filters = [
    { id: "all", label: "Tudo", icon: <FaSearch /> },
    { id: "products", label: "Produtos", icon: <FaBox /> },
    { id: "species", label: "Espécies", icon: <FaFish /> },
    { id: "guides", label: "Guias", icon: <FaBookOpen /> },
    { id: "tools", label: "Ferramentas", icon: <FaCalculator /> },
  ];

  // Handle new search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = new URL(window.location);
      url.searchParams.set("q", searchQuery);
      window.history.pushState({}, "", url);
      fetchResults(searchQuery);
    }
  };

  const fetchResults = (searchTerm) => {
    setLoading(true);
    const mockResults = [
      // Produtos - Peixes (atualizados do ProductsFish.jsx)
      {
        type: "products",
        category: "fish",
        title: "Betta Splendens Macho",
        description: "Betta macho com cores vibrantes e cauda exuberante",
        path: "/products/fish?id=1",
        icon: <FaFish />,
        price: "R$ 49,90",
        id: 1,
      },
      {
        type: "products",
        category: "fish",
        title: "Guppy",
        description:
          "Pequeno, vibrante e fácil de cuidar. Reproduz rapidamente.",
        path: "/products/fish?id=2",
        icon: <FaFish />,
        price: "R$ 12,90",
        id: 2,
      },
      // Adicionando todos os outros peixes do ProductsFish
      {
        type: "products",
        category: "fish",
        title: "Corydora Bronze",
        description:
          "Peixe de fundo pacífico, útil para limpeza e com aparência simpática.",
        path: "/products/fish?id=5",
        icon: <FaFish />,
        price: "R$ 18,50",
        id: 5,
      },
      {
        type: "products",
        category: "fish",
        title: "Platy",
        description:
          "Peixe colorido fácil de cuidar, ideal para aquaristas iniciantes.",
        path: "/products/fish?id=6",
        icon: <FaFish />,
        price: "R$ 12,90",
        id: 6,
      },
      {
        type: "products",
        category: "fish",
        title: "Peixe Dourado",
        description: "Peixe ornamental clássico, existem diversas variedades.",
        path: "/products/fish?id=7",
        icon: <FaFish />,
        price: "R$ 29,90",
        id: 7,
      },
      {
        type: "products",
        category: "fish",
        title: "Danio Zebra",
        description:
          "Peixe ativo com padrões de listras que lembram uma zebra, ideal para iniciantes.",
        path: "/products/fish?id=9",
        icon: <FaFish />,
        price: "R$ 8,90",
        id: 9,
      },
      {
        type: "products",
        category: "fish",
        title: "Killifish",
        description:
          "Peixe com cores vibrantes, perfeito para aquários específicos de espécie.",
        path: "/products/fish?id=11",
        icon: <FaFish />,
        price: "R$ 39,90",
        id: 11,
      },
      {
        type: "products",
        category: "fish",
        title: "Discus",
        description:
          "Conhecido como o rei dos aquários, com cores e padrões deslumbrantes.",
        path: "/products/fish?id=12",
        icon: <FaFish />,
        price: "R$ 89,90",
        id: 12,
      },
      {
        type: "products",
        category: "fish",
        title: "Botia Palhaço",
        description:
          "Peixe de fundo colorido e ativo, excelente para controle de caramujos.",
        path: "/products/fish?id=13",
        icon: <FaFish />,
        price: "R$ 69,90",
        id: 13,
      },
      {
        type: "products",
        category: "fish",
        title: "Tetra Borboleta",
        description:
          "Pequeno peixe com formato de machado, nada na superfície da água.",
        path: "/products/fish?id=14",
        icon: <FaFish />,
        price: "R$ 29,90",
        id: 14,
      },
      {
        type: "products",
        category: "fish",
        title: "Oscar",
        description:
          "Peixe ciclidídeo grande e inteligente, reconhece seu dono.",
        path: "/products/fish?id=15",
        icon: <FaFish />,
        price: "R$ 59,90",
        id: 15,
      },
      {
        type: "products",
        category: "fish",
        title: "Cascudo Ancistrus",
        description:
          "Peixe de fundo que ajuda no controle de algas, excelente para limpeza.",
        path: "/products/fish?id=17",
        icon: <FaFish />,
        price: "R$ 22,90",
        id: 17,
      },
      {
        type: "products",
        category: "fish",
        title: "Colisa Lália",
        description:
          "Pequeno peixe labirinto com cores vibrantes, alternativa ao Betta.",
        path: "/products/fish?id=18",
        icon: <FaFish />,
        price: "R$ 24,90",
        id: 18,
      },
      {
        type: "products",
        category: "invertebrates",
        title: "Camarão Red Cherry",
        description:
          "Camarão pequeno com coloração vermelha intensa, excelente para aquários plantados.",
        path: "/products/fish?id=21",
        icon: <FaFish />,
        price: "R$ 14,90",
        id: 21,
      },
      {
        type: "products",
        category: "invertebrates",
        title: "Camarão Amano",
        description:
          "Camarão maior conhecido por seu eficiente trabalho no controle de algas.",
        path: "/products/fish?id=22",
        icon: <FaFish />,
        price: "R$ 19,90",
        id: 22,
      },
      {
        type: "products",
        category: "invertebrates",
        title: "Caramujo Neritina",
        description:
          "Caramujo com padrões listrados, excelente para controle de algas.",
        path: "/products/fish?id=23",
        icon: <FaFish />,
        price: "R$ 8,90",
        id: 23,
      },
      {
        type: "products",
        category: "fish",
        title: "Tetras Preto",
        description:
          "Peixe de cardume com corpo achatado lateralmente e coloração escura.",
        path: "/products/fish?id=24",
        icon: <FaFish />,
        price: "R$ 5,50",
        id: 24,
      },
      {
        type: "products",
        category: "invertebrates",
        title: "Camarão Crystal Red",
        description:
          "Camarão ornamental com padrões vermelho e branco cristalinos.",
        path: "/products/fish?id=25",
        icon: <FaFish />,
        price: "R$ 49,90",
        id: 25,
      },
      {
        type: "products",
        category: "fish",
        title: "Apistogramma Ramirezi",
        description:
          "Ciclídeo anão colorido e pacífico, ótimo para aquários comunitários.",
        path: "/products/fish?id=26",
        icon: <FaFish />,
        price: "R$ 39,90",
        id: 26,
      },
      {
        type: "products",
        category: "fish",
        title: "Carpa Koi",
        description:
          "Peixe ornamental japonês com padrões coloridos exclusivos. Tamanho pequeno.",
        path: "/products/fish?id=27",
        icon: <FaFish />,
        price: "R$ 129,90",
        id: 27,
      },
      {
        type: "products",
        category: "invertebrates",
        title: "Caramujo Physa",
        description:
          "Pequeno caramujo de crescimento rápido, útil para limpeza de aquários.",
        path: "/products/fish?id=29",
        icon: <FaFish />,
        price: "R$ 3,90",
        id: 29,
      },
      // Produtos - Plantas
      {
        type: "products",
        category: "plants",
        title: "Anúbia Nana",
        description: "Planta aquática de baixa manutenção",
        path: "/products/plants?id=101",
        icon: <FaLeaf />,
        price: "R$ 29,90",
        id: 101,
      },
      // Produtos - Equipamentos
      {
        type: "products",
        category: "equipment",
        title: "Filtro Hang On 250L/H",
        description:
          "Equipamento de filtragem profissional para aquários grandes",
        path: "/products/equipment?id=500",
        icon: <FaFilter />,
        price: "R$ 79,50",
        id: 500,
      },
      {
        type: "products",
        category: "equipment",
        title: "Termostato 25W",
        description: "Controle preciso de temperatura para aquários até 35L",
        path: "/products/equipment?id=501",
        icon: <FaThermometerHalf />,
        price: "R$ 89,90",
        id: 501,
      },
      {
        type: "products",
        category: "equipment",
        title: "Termômetro Digital para Aquário",
        description: "Display LCD de fácil leitura",
        path: "/products/equipment?id=502",
        icon: <FaLightbulb />,
        price: "R$ 249,90",
        id: 502,
      },
      {
        type: "products",
        category: "equipment",
        title: "Aquário de 28L",
        description: "Aquario de 28L, 45x20x30",
        path: "/products/equipment?id=503",
        icon: <FaTint />,
        price: "R$ 89,90",
        id: 503,
      },
      {
        type: "products",
        category: "equipment",
        title: "Substrato de Areia Fina 5kg",
        description: "Areia fina natural para aquários plantados e de peixes",
        path: "/products/equipment?id=505",
        icon: <FaLeaf />,
        price: "R$ 79,90",
        id: 505,
      },
      {
        type: "products",
        category: "equipment",
        title: "Acelerador Biológico 100ml",
        description:
          "Acelera o processo de ciclagem e estabelece colônias de bactérias benéficas",
        path: "/products/equipment?id=504",
        icon: <FaLeaf />,
        price: "R$ 79,90",
        id: 504,
      },
      // Espécies - Peixes
      {
        type: "species",
        category: "fish",
        title: "Tetra Neon",
        description:
          "Guia completo sobre cuidados e características do Tetra Neon",
        path: "/fish-species?id=302",
        icon: <FaFish />,
        id: 302,
      },
      {
        type: "species",
        category: "fish",
        title: "Betta Splendens",
        description: "Tudo sobre o peixe de briga siamês e suas variedades",
        path: "/fish-species?id=301",
        icon: <FaFish />,
        id: 301,
      },
      {
        type: "species",
        category: "fish",
        title: "Guppy",
        description: "Conhecido por suas cores vibrantes e fácil reprodução.",
        path: "/fish-species?id=303",
        icon: <FaFish />,
        id: 303,
      },
      {
        type: "species",
        category: "fish",
        title: "Acará Disco",
        description: "Peixe majestoso em forma de disco.",
        path: "/fish-species?id=304",
        icon: <FaFish />,
        id: 304,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe-Borboleta",
        description:
          "Possui nadadeiras peitorais semelhantes a asas de borboleta. Capaz de saltar fora d'água para capturar insetos.",
        path: "/fish-species?id=325",
        icon: <FaFish />,
        id: 325,
      },
      {
        type: "species",
        category: "fish",
        title: "Acará Bandeira",
        description:
          "Peixe elegante de formato triangular. Prefere aquários altos com plantas e troncos.",
        path: "/fish-species?id=326",
        icon: <FaFish />,
        id: 326,
      },
      {
        type: "species",
        category: "fish",
        title: "Barbo Tigre",
        description:
          "Reconhecível por suas listras pretas. Deve ser mantido em grupos de no mínimo 6 indivíduos.",
        path: "/fish-species?id=327",
        icon: <FaFish />,
        id: 327,
      },
      {
        type: "species",
        category: "fish",
        title: "Tetras Sangue",
        description:
          "Pequeno peixe de coloração vermelha intensa. Ideal para aquários comunitários.",
        path: "/fish-species?id=328",
        icon: <FaFish />,
        id: 328,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe Colisa",
        description:
          "Também conhecido como gourami anão, possui cores vibrantes e constrói ninhos de bolhas.",
        path: "/fish-species?id=329",
        icon: <FaFish />,
        id: 329,
      },
      {
        type: "species",
        category: "fish",
        title: "Corydora Bronze",
        description:
          "Peixe de fundo que ajuda a manter o substrato limpo. Deve ser mantido em grupos.",
        path: "/fish-species?id=330",
        icon: <FaFish />,
        id: 330,
      },
      {
        type: "species",
        category: "fish",
        title: "Danio Zebra",
        description:
          "Pequeno peixe listrado muito ativo. Ideal para iniciantes e aquários comunitários.",
        path: "/fish-species?id=331",
        icon: <FaFish />,
        id: 331,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe Arco-Íris",
        description:
          "Coloração impressionante que muda com a luz. Precisa de espaço para natação em cardume.",
        path: "/fish-species?id=332",
        icon: <FaFish />,
        id: 332,
      },
      {
        type: "species",
        category: "fish",
        title: "Botia Palhaço",
        description:
          "Peixe de fundo com padrão laranja e preto. Excelente controlador de caramujos indesejados.",
        path: "/fish-species?id=333",
        icon: <FaFish />,
        id: 333,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe-Anjo Imperador",
        description:
          "Um dos mais belos peixes marinhos, com listras azuis e amarelas. Juvenis têm coloração diferente dos adultos.",
        path: "/fish-species?id=334",
        icon: <FaFish />,
        id: 334,
      },
      {
        type: "species",
        category: "fish",
        title: "Cirurgião Yellow Tang",
        description:
          "Peixe amarelo vibrante muito popular em aquários marinhos. Excelente controlador de algas.",
        path: "/fish-species?id=335",
        icon: <FaFish />,
        id: 335,
      },
      {
        type: "species",
        category: "fish",
        title: "Góbio Mandarim",
        description:
          "Um dos peixes mais coloridos do mundo. Requer alimentação especializada e aquário maduro.",
        path: "/fish-species?id=336",
        icon: <FaFish />,
        id: 336,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe-Leão",
        description:
          "Peixe exótico com espinhos venenosos. Requer cuidados especiais e não deve ser mantido com peixes pequenos.",
        path: "/fish-species?id=337",
        icon: <FaFish />,
        id: 337,
      },
      {
        type: "species",
        category: "fish",
        title: "Chromis Azul",
        description:
          "Peixe azul elétrico que se dá bem em cardumes. Excelente para iniciantes em aquários marinhos.",
        path: "/fish-species?id=338",
        icon: <FaFish />,
        id: 338,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe-Anjo Flameback",
        description:
          "Peixe-anjo anão com coloração laranja-avermelhada. Menor e mais adequado para aquários médios que outros peixes-anjo.",
        path: "/fish-species?id=339",
        icon: <FaFish />,
        id: 339,
      },
      {
        type: "species",
        category: "fish",
        title: "Camarão Pistola",
        description:
          "Capaz de produzir um estalido sonoro com sua garra que atordoa presas. Geralmente forma parceria simbiótica com góbios.",
        path: "/fish-species?id=340",
        icon: <FaFish />,
        id: 340,
      },
      {
        type: "species",
        category: "fish",
        title: "Peixe-folha",
        description:
          "Peixe com projeções dérmicas semelhantes a folhas que garantem camuflagem perfeita entre algas e corais.",
        path: "/fish-species?id=341",
        icon: <FaFish />,
        id: 341,
      },
      // Adicionando espécies que faltavam
      {
        type: "species",
        category: "fish",
        title: "Peixe-palhaço",
        description:
          "Popularizado pelo filme 'Procurando Nemo'. Vive em simbiose com anêmonas-do-mar.",
        path: "/fish-species?id=305",
        icon: <FaFish />,
        id: 305,
      },
      {
        type: "species",
        category: "fish",
        title: "Cirurgião-patela",
        description:
          "Conhecido como 'Dory' do filme 'Procurando Nemo'. Possui coloração azul vibrante e requer aquário espaçoso.",
        path: "/fish-species?id=306",
        icon: <FaFish />,
        id: 306,
      },
      {
        type: "species",
        category: "fish",
        title: "Arraia Motoro",
        description:
          "Arraia de água doce com padrões circulares no dorso. Requer aquário espaçoso e substrato fino.",
        path: "/fish-species?id=307",
        icon: <FaFish />,
        id: 307,
      },
      {
        type: "species",
        category: "fish",
        title: "Camarão Red Cherry",
        description:
          "Pequeno camarão vermelho popular em aquários plantados. Excelente limpador de algas.",
        path: "/fish-species?id=308",
        icon: <FaFish />,
        id: 308,
      },
      {
        type: "species",
        category: "fish",
        title: "Caramujo Nerita",
        description:
          "Excelente limpador de aquário, remove algas das superfícies sem danificar plantas.",
        path: "/fish-species?id=309",
        icon: <FaFish />,
        id: 309,
      },
      {
        type: "species",
        category: "fish",
        title: "Caranguejo Ermitão",
        description:
          "Crustáceo que usa conchas vazias como proteção. Excelente para limpeza do substrato.",
        path: "/fish-species?id=310",
        icon: <FaFish />,
        id: 310,
      },
      {
        type: "species",
        category: "fish",
        title: "Cavalo-Marinho",
        description:
          "Peixe exótico com anatomia única. Requer cuidados especiais e alimentação específica.",
        path: "/fish-species?id=311",
        icon: <FaFish />,
        id: 311,
      },
      {
        type: "species",
        category: "fish",
        title: "Pleco Real",
        description:
          "Peixe conhecido por seu padrão dourado e preto. Necessita de madeira em sua dieta.",
        path: "/fish-species?id=312",
        icon: <FaFish />,
        id: 312,
      },
      {
        type: "species",
        category: "fish",
        title: "Coral Xênia",
        description:
          "Coral pulsante de crescimento rápido. Ideal para aquaristas iniciantes em corais.",
        path: "/fish-species?id=313",
        icon: <FaFish />,
        id: 313,
      },
      {
        type: "species",
        category: "fish",
        title: "Carangueijo Azul",
        description:
          "Caranguejo terrestre que necessita de área seca no aquário. Coloração azulada impressionante.",
        path: "/fish-species?id=314",
        icon: <FaFish />,
        id: 314,
      },
      {
        type: "species",
        category: "fish",
        title: "Anêmona Bubble Tip",
        description:
          "Anêmona popular para symbiose com peixes-palhaço. Requer iluminação intensa.",
        path: "/fish-species?id=315",
        icon: <FaFish />,
        id: 315,
      },
      {
        type: "species",
        category: "fish",
        title: "Ouriço-do-mar",
        description:
          "Excelente controlador de algas. Cuidado com seus espinhos durante manutenção.",
        path: "/fish-species?id=316",
        icon: <FaFish />,
        id: 316,
      },
      {
        type: "species",
        category: "fish",
        title: "Molinésia",
        description:
          "Peixe resistente e colorido, ideal para iniciantes. Prefere águas levemente alcalinas.",
        path: "/fish-species?id=317",
        icon: <FaFish />,
        id: 317,
      },
      {
        type: "species",
        category: "fish",
        title: "Camarão Arlequim",
        description:
          "Camarão colorido e exótico. Especializado em se alimentar de estrelas-do-mar.",
        path: "/fish-species?id=318",
        icon: <FaFish />,
        id: 318,
      },
      {
        type: "species",
        category: "fish",
        title: "Plati",
        description:
          "Peixe pequeno e colorido, ideal para aquários comunitários. Fácil reprodução.",
        path: "/fish-species?id=319",
        icon: <FaFish />,
        id: 319,
      },
      {
        type: "species",
        category: "fish",
        title: "Kinguio",
        description:
          "Peixe ornamental popular com diversas variedades de cores e formas. Requer boa filtragem devido à alta produção de resíduos.",
        path: "/fish-species?id=320",
        icon: <FaFish />,
        id: 320,
      },
      {
        type: "species",
        category: "fish",
        title: "Cascudo Ancistrus",
        description:
          "Peixe limpador excelente para controle de algas. Mais adequado para aquários que kinguios maiores.",
        path: "/fish-species?id=321",
        icon: <FaFish />,
        id: 321,
      },
      {
        type: "species",
        category: "fish",
        title: "Camarão Amano",
        description:
          "Um dos melhores limpadores de aquário, especialmente eficaz contra algas.",
        path: "/fish-species?id=322",
        icon: <FaFish />,
        id: 322,
      },
      {
        type: "species",
        category: "fish",
        title: "Apistograma Ramirezi",
        description:
          "Ciclídeo anão colorido, ideal para aquários plantados. Forma casais monogâmicos.",
        path: "/fish-species?id=323",
        icon: <FaFish />,
        id: 323,
      },
      {
        type: "species",
        category: "fish",
        title: "Killifish",
        description:
          "Peixe muito colorido com ciclo de vida curto. Excelente para nano aquários.",
        path: "/fish-species?id=324",
        icon: <FaFish />,
        id: 324,
      },
      // Espécies - Plantas
      {
        type: "species",
        category: "plants",
        title: "Vallisneria",
        description:
          "Informações sobre cultivo e manutenção desta planta de fundo",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Cryptocoryne Wendtii",
        description: "Guia completo sobre esta versátil planta de aquário",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Glossostigma",
        description: "Como cultivar este carpete aquático de baixa altura",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Bucephalandra",
        description: "Espécie exótica para fixação em rochas e madeiras",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Anúbia",
        description:
          "Planta resistente, ideal para iniciantes. Pode ser fixada em troncos e rochas.",
        path: "/plant-species?id=1",
        icon: <FaLeaf />,
        id: 1,
      },
      {
        type: "species",
        category: "plants",
        title: "Elodea",
        description:
          "Planta de crescimento rápido, excelente para iniciantes e aquários novos. Ajuda na oxigenação da água.",
        path: "/plant-species?id=2",
        icon: <FaLeaf />,
        id: 2,
      },
      {
        type: "species",
        category: "plants",
        title: "Musgo de Java",
        description:
          "Musgo versátil que pode ser fixado em qualquer superfície. Excelente para criar ambientes naturais.",
        path: "/plant-species?id=3",
        icon: <FaLeaf />,
        id: 3,
      },
      {
        type: "species",
        category: "plants",
        title: "Vallisneria",
        description:
          "Planta com folhas longas em forma de fita. Cria um belo efeito de cortina no fundo do aquário.",
        path: "/plant-species?id=4",
        icon: <FaLeaf />,
        id: 4,
      },
      {
        type: "species",
        category: "plants",
        title: "Eleocharis",
        description:
          "Planta delicada que forma belos tapetes verdes quando bem estabelecida.",
        path: "/plant-species?id=5",
        icon: <FaLeaf />,
        id: 5,
      },
      {
        type: "species",
        category: "plants",
        title: "Cabomba",
        description:
          "Planta com folhas finamente divididas que proporcionam um visual delicado e fluido.",
        path: "/plant-species?id=6",
        icon: <FaLeaf />,
        id: 6,
      },
      {
        type: "species",
        category: "plants",
        title: "Samambaia de Java",
        description:
          "Planta robusta com folhas verdes escuras. Pode ser fixada em decorações.",
        path: "/plant-species?id=7",
        icon: <FaLeaf />,
        id: 7,
      },
      {
        type: "species",
        category: "plants",
        title: "Rotala Rotundifolia",
        description:
          "Com iluminação intensa, os topos ficam avermelhados, criando um belo contraste.",
        path: "/plant-species?id=8",
        icon: <FaLeaf />,
        id: 8,
      },
      {
        type: "species",
        category: "plants",
        title: "Alternanthera Reineckii",
        description:
          "Planta com folhas vermelhas a roxas, perfeita para criar pontos de contraste.",
        path: "/plant-species?id=9",
        icon: <FaLeaf />,
        id: 9,
      },
      {
        type: "species",
        category: "plants",
        title: "Lobélia Cardinalis",
        description:
          "Planta com folhas verdes escuras e caule vermelho, cria um belo contraste.",
        path: "/plant-species?id=10",
        icon: <FaLeaf />,
        id: 10,
      },
      {
        type: "species",
        category: "plants",
        title: "Helanthium Tenellum",
        description:
          "Planta pequena ideal para criar carpetes no primeiro plano do aquário.",
        path: "/plant-species?id=11",
        icon: <FaLeaf />,
        id: 11,
      },
      {
        type: "species",
        category: "plants",
        title: "Bucephalandra",
        description:
          "Planta compacta com folhas de coloração variada. Excelente para decoração de rochas.",
        path: "/plant-species?id=12",
        icon: <FaLeaf />,
        id: 12,
      },
      {
        type: "species",
        category: "plants",
        title: "Sagittaria Subulata",
        description:
          "Planta com folhas em forma de grama que se propaga rapidamente formando tufos.",
        path: "/plant-species?id=13",
        icon: <FaLeaf />,
        id: 13,
      },
      {
        type: "species",
        category: "plants",
        title: "Hygrophila Polysperma",
        description:
          "Planta de crescimento rápido e robusta, ideal para aquários iniciantes.",
        path: "/plant-species?id=14",
        icon: <FaLeaf />,
        id: 14,
      },
      {
        type: "species",
        category: "plants",
        title: "Cryptocoryne Wendtii",
        description:
          "Planta robusta com folhas onduladas disponível em várias colorações.",
        path: "/plant-species?id=15",
        icon: <FaLeaf />,
        id: 15,
      },
      {
        type: "species",
        category: "plants",
        title: "Limnobium Laevigatum",
        description:
          "Planta flutuante com folhas redondas e pequenas raízes pendentes.",
        path: "/plant-species?id=16",
        icon: <FaLeaf />,
        id: 16,
      },
      {
        type: "species",
        category: "plants",
        title: "Bacopa Caroliniana",
        description:
          "Planta com caule robusto e folhas verdes arredondadas dispostas em pares.",
        path: "/plant-species?id=17",
        icon: <FaLeaf />,
        id: 17,
      },
      {
        type: "species",
        category: "plants",
        title: "Micranthemum 'Monte Carlo'",
        description:
          "Planta rasteira que forma densos tapetes verdes. Alternativa mais fácil ao HC Cuba.",
        path: "/plant-species?id=18",
        icon: <FaLeaf />,
        id: 18,
      },
      {
        type: "species",
        category: "plants",
        title: "Ludwigia Repens",
        description:
          "Planta com folhas que variam do verde ao vermelho dependendo das condições.",
        path: "/plant-species?id=19",
        icon: <FaLeaf />,
        id: 19,
      },
      {
        type: "species",
        category: "plants",
        title: "Staurogyne Repens",
        description:
          "Planta compacta com folhas verdes pequenas, cria um belo primeiro plano.",
        path: "/plant-species?id=20",
        icon: <FaLeaf />,
        id: 20,
      },
      {
        type: "species",
        category: "plants",
        title: "Echinodorus Amazonicus",
        description:
          "Planta amazônica de grande porte com folhas longas em formato de espada.",
        path: "/plant-species?id=21",
        icon: <FaLeaf />,
        id: 21,
      },
      {
        type: "species",
        category: "plants",
        title: "Glossostigma Elatinoides",
        description:
          "Forma um dos carpetes mais baixos e delicados em aquarismo plantado.",
        path: "/plant-species?id=22",
        icon: <FaLeaf />,
        id: 22,
      },
      {
        type: "species",
        category: "plants",
        title: "Nymphaea Lotus",
        description:
          "Planta bulbosa com folhas em forma de coração, disponível em verde ou vermelha.",
        path: "/plant-species?id=23",
        icon: <FaLeaf />,
        id: 23,
      },
      {
        type: "species",
        category: "plants",
        title: "Hygrophila Pinnatifida",
        description:
          "Planta versátil com folhas texturizadas que pode crescer fixa em rochas ou no substrato.",
        path: "/plant-species?id=24",
        icon: <FaLeaf />,
        id: 24,
      },
      // Guias
      {
        type: "guides",
        title: "Guia para Iniciantes",
        description:
          "Tudo que você precisa saber para começar seu primeiro aquário",
        path: "/beginner-guide",
        icon: <FaBookOpen />,
      },
      {
        type: "guides",
        title: "Aquário Plantado",
        description: "Como montar e manter um belo aquário com plantas vivas",
        path: "/beginner-guide",
        icon: <FaLeaf />,
      },
      {
        type: "guides",
        title: "Dicas de Manutenção",
        description: "Melhores práticas para seu aquário se manter saudável",
        path: "/tips",
        icon: <FaLightbulb />,
      },
      {
        type: "guides",
        title: "Ciclagem do Aquário",
        description:
          "Entenda o processo de estabelecimento do ciclo do nitrogênio",
        path: "/beginner-guide",
        icon: <FaBacterium />,
      },
      {
        type: "guides",
        title: "Aquário Marinho",
        description:
          "Guia completo para iniciantes em aquários de água salgada",
        path: "/beginner-guide",
        icon: <FaFish />,
      },
      // Ferramentas
      {
        type: "tools",
        title: "Calculadora de Parâmetros",
        description: "Calcule os parâmetros ideais do seu aquário",
        path: "/parameter-calculator",
        icon: <FaCalculator />,
      },
      {
        type: "tools",
        title: "Calendário de Manutenção",
        description: "Organize as manutenções do seu aquário",
        path: "/maintenance-calendar",
        icon: <FaCalendarAlt />,
      },
    ];

    // Filtra resultados baseados no termo de busca
    const filteredResults = mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchResults(query);
    }
  }, [query]);

  const filteredResults = results.filter(
    (result) => activeFilter === "all" || result.type === activeFilter
  );

  const getBadgeColor = (type) => {
    switch (type) {
      case "products":
        return "bg-green-100 text-green-800";
      case "species":
        return "bg-blue-100 text-blue-800";
      case "guides":
        return "bg-yellow-100 text-yellow-800";
      case "tools":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconByCategory = (type, category) => {
    if (type === "products") {
      switch (category) {
        case "fish":
          return <FaFish className="text-blue-500" />;
        case "plants":
          return <FaLeaf className="text-green-500" />;
        case "equipment":
          if (category === "filter")
            return <FaFilter className="text-gray-500" />;
          if (category === "heater")
            return <FaThermometerHalf className="text-red-500" />;
          return <FaBox className="text-gray-500" />;
        default:
          return <FaBox className="text-gray-500" />;
      }
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos, espécies, guias..."
            className="w-full pl-12 pr-28 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {query && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados da busca
            </h1>
            <p className="text-gray-600">
              Exibindo resultados para:{" "}
              <span className="font-medium text-blue-600">"{query}"</span>
            </p>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Resultados count */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {filteredResults.length}{" "}
              {filteredResults.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"}
              {activeFilter !== "all" &&
                ` em ${filters.find((f) => f.id === activeFilter)?.label}`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={`${result.type}-${result.id || index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={result.path}
                    className="block p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 bg-white h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${getBadgeColor(
                          result.type
                        )}`}
                      >
                        {result.icon ||
                          getIconByCategory(result.type, result.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">
                            {result.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(
                              result.type
                            )}`}
                          >
                            {result.type === "products"
                              ? "Produto"
                              : result.type === "species"
                              ? "Espécie"
                              : result.type === "guides"
                              ? "Guia"
                              : "Ferramenta"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {result.description}
                        </p>
                        {result.price && (
                          <p className="text-green-600 font-medium mt-2">
                            {result.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Nenhum resultado encontrado
              </h2>
              <p className="text-gray-600 mb-8">
                Tente buscar por termos diferentes ou verifique a ortografia
              </p>

              <div className="max-w-lg mx-auto">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Sugestões de pesquisa:
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Betta",
                    "Aquário plantado",
                    "Filtro",
                    "Iluminação",
                    "Tetra",
                    "Manutenção",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setTimeout(
                          () => handleSearch({ preventDefault: () => {} }),
                          0
                        );
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!query && !loading && (
        <div className="text-center py-12">
          <FaSearch className="mx-auto h-16 w-16 text-blue-400 mb-6" />
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            O que você está procurando?
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Digite algum termo de busca para encontrar produtos, espécies, guias
            ou ferramentas para o seu aquário
          </p>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Buscas populares:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Betta",
                "Anúbia",
                "Filtro Canister",
                "Tetra Neon",
                "Aquário plantado",
                "Ciclagem",
                "Kinguio",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(
                      () => handleSearch({ preventDefault: () => {} }),
                      0
                    );
                  }}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
