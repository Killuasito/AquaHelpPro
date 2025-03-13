import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaShoppingCart,
  FaFilter,
  FaTimes,
  FaPlus,
  FaWater,
  FaStar,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSort,
  FaClock,
  FaChevronDown,
} from "react-icons/fa";
import ProductDetail from "../components/ProductDetail";
import { useSearchParams } from "react-router-dom";

const ProductsFish = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const itemsPerPage = 12;
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sortOptions = [
    { value: "featured", label: "Em Destaque", icon: <FaStar /> },
    { value: "price-asc", label: "Menor Preço", icon: <FaSortAmountDown /> },
    { value: "price-desc", label: "Maior Preço", icon: <FaSortAmountUp /> },
    { value: "name", label: "Nome A-Z", icon: <FaSort /> },
    { value: "newest", label: "Mais Recentes", icon: <FaClock /> },
  ];

  const fishProducts = [
    {
      id: 1,
      name: "Betta Splendens Macho",
      type: "freshwater",
      price: 49.9,
      image:
        "https://aquariopedia.com.br/wp-content/uploads/2022/12/Peixe-de-aquario-betta-splendens-macho-da-cor-azul.jpg",
      description: "Betta macho com cores vibrantes e cauda exuberante",
      category: "peixes",
      specifications: [
        { name: "Tamanho", value: "6-7 cm" },
        { name: "Temperatura", value: "24-28°C" },
        { name: "pH", value: "6.5-7.5" },
      ],
      additionalInfo: [
        "Precisa de aquário de pelo menos 20L",
        "Não pode ser mantido com outros bettas",
        "Alimentação: ração específica para bettas",
        "Expectativa de vida: 2-3 anos",
      ],
    },
    {
      id: 2,
      name: "Guppy",
      scientificName: "Poecilia reticulata",
      type: "freshwater",
      price: 12.9,
      image:
        "https://www.solaqua.net/WebRoot/Store/Shops/3311-141118/5B7E/DEE3/C3BB/6E96/8538/25E6/6498/D8D1/guppy.jpg",
      description: "Pequeno, vibrante e fácil de cuidar. Reproduz rapidamente.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "3-4 cm" },
        { name: "Temperatura", value: "22-28°C" },
        { name: "pH", value: "7.0-8.0" },
      ],
      additionalInfo: [
        "Ideal para aquários comunitários",
        "Reprodução fácil e frequente",
        "Alimentação: flocos, ração granulada",
        "Expectativa de vida: 1-2 anos",
      ],
      isNew: true,
    },
    {
      id: 3,
      name: "Tetra Neon",
      scientificName: "Paracheirodon innesi",
      type: "freshwater",
      price: 4.2,
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/tetra_neon_verdadeiro_paracheirodon_innesi_4373_1_a875d85d71c43eee55728f28f40b2177.jpg",
      description: "Peixe pequeno com cores brilhantes azul e vermelho.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "2-3 cm" },
        { name: "Temperatura", value: "23-26°C" },
        { name: "pH", value: "6.0-7.0" },
      ],
      additionalInfo: [
        "Ideal manter em cardumes de 6 ou mais",
        "Preferem aquários plantados com áreas sombreadas",
        "Alimentação: ração em flocos, alimentos vivos pequenos",
        "Expectativa de vida: 3-5 anos",
      ],
    },
    {
      id: 4,
      name: "Molinésia",
      scientificName: "Poecilia sphenops",
      type: "freshwater",
      price: 14.5,
      image:
        "https://aquastuchi.com.br/wp-content/uploads/2024/07/Molly-Gold-Black-Lyratail-1.jpg",
      description:
        "Peixe resistente disponível em várias cores. Fácil de cuidar e reproduz rapidamente.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "6-10 cm" },
        { name: "Temperatura", value: "24-28°C" },
        { name: "pH", value: "7.5-8.5" },
      ],
      additionalInfo: [
        "Tolera água ligeiramente salobra",
        "Compatível com vários tipos de peixes pacíficos",
        "Alimentação: onívoro, aceita ração em flocos, vegetais",
        "Expectativa de vida: 3-5 anos",
      ],
    },
    {
      id: 5,
      name: "Corydora Bronze",
      scientificName: "Corydoras spp.",
      type: "freshwater",
      price: 18.5,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/00/Corydoras_melanotaenia.JPG",
      description:
        "Peixe de fundo pacífico, útil para limpeza e com aparência simpática.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "4-7 cm" },
        { name: "Temperatura", value: "22-26°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Manter em grupos de 5 ou mais",
        "Substrato fino para não danificar seus barbilhões",
        "Alimentação: tablets para fundo, artêmias, larvas",
        "Expectativa de vida: 5-8 anos",
      ],
    },
    {
      id: 6,
      name: "Platy",
      scientificName: "Xiphophorus maculatus",
      type: "freshwater",
      price: 12.9,
      image:
        "https://cobasiblog.blob.core.windows.net/production-ofc/2021/05/fish-4718919_1920.png",
      description:
        "Peixe colorido fácil de cuidar, ideal para aquaristas iniciantes.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "4-5 cm" },
        { name: "Temperatura", value: "22-28°C" },
        { name: "pH", value: "7.0-8.2" },
      ],
      additionalInfo: [
        "Variedade de cores e padrões",
        "Compatível com outros peixes pacíficos",
        "Alimentação: onívoro, aceita diversos tipos de ração",
        "Expectativa de vida: 2-3 anos",
      ],
    },
    {
      id: 7,
      name: "Peixe Dourado",
      scientificName: "Carassius auratus",
      type: "freshwater",
      price: 29.9,
      image:
        "https://s2-globorural.glbimg.com/vLWTg3hQFTaUpJHci7As3jeXTtk=/0x0:5616x3744/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_afe5c125c3bb42f0b5ae633b58923923/internal_photos/bs/2024/q/b/SyhKYbQsmOHCrMAjR0lQ/gettyimages-185331043.jpg",
      description: "Peixe ornamental clássico, existem diversas variedades.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "10-20 cm" },
        { name: "Temperatura", value: "18-24°C" },
        { name: "pH", value: "7.0-7.5" },
      ],
      additionalInfo: [
        "Precisa de aquário grande (mínimo 60L por peixe)",
        "Produz muito resíduo, necessita de filtragem eficiente",
        "Alimentação: ração específica para kinguios",
        "Expectativa de vida: 10-15 anos",
      ],
      isNew: true,
    },
    {
      id: 9,
      name: "Danio Zebra",
      scientificName: "Danio rerio",
      type: "freshwater",
      price: 8.9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3sxo1Un6pLBmYcvDAxG8RLMArwqLo5YiesDFp8dpha6uZ9pQP0gQMvLyCVmCW9QXKbOd-g3VXJNHM94wbwGlNiQ",
      description:
        "Peixe ativo com padrões de listras que lembram uma zebra, ideal para iniciantes.",
      category: "peixes",
      temperament: "Pacífico/Ativo",
      specifications: [
        { name: "Tamanho", value: "3-5 cm" },
        { name: "Temperatura", value: "18-25°C" },
        { name: "pH", value: "6.5-7.5" },
      ],
      additionalInfo: [
        "Prefere viver em cardumes de 6 ou mais exemplares",
        "Excelente peixe para ciclagem inicial de aquários",
        "Muito ativo, precisa de espaço para nadar",
        "Expectativa de vida: 2-5 anos",
      ],
    },
    {
      id: 11,
      name: "Killifish",
      scientificName: "Nothobranchius spp.",
      type: "freshwater",
      price: 39.9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOTWVIuv7xzmYqyP483PZm5JovgqOvVHVdg&s",
      description:
        "Peixe com cores vibrantes, perfeito para aquários específicos de espécie.",
      category: "peixes",
      temperament: "Variável",
      specifications: [
        { name: "Tamanho", value: "4-6 cm" },
        { name: "Temperatura", value: "22-26°C" },
        { name: "pH", value: "6.0-7.0" },
      ],
      additionalInfo: [
        "Ciclo de vida curto (6 meses a 2 anos)",
        "Exige aquários bem plantados com áreas sombreadas",
        "Algumas espécies podem requerer alimentação viva",
        "Grande diversidade de cores e padrões",
      ],
    },
    {
      id: 12,
      name: "Discus",
      scientificName: "Symphysodon spp.",
      type: "freshwater",
      price: 89.9,
      image:
        "https://www.georgiaaquarium.org/wp-content/uploads/2018/09/discus-3.jpg",
      description:
        "Conhecido como o rei dos aquários, com cores e padrões deslumbrantes.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "15-20 cm" },
        { name: "Temperatura", value: "28-31°C" },
        { name: "pH", value: "5.5-6.5" },
      ],
      additionalInfo: [
        "Requer água mole e ácida",
        "Exigente quanto à qualidade da água",
        "Alimentação variada incluindo artêmia e alimentos vivos",
        "Expectativa de vida: 10-15 anos",
      ],
      isNew: true,
    },
    {
      id: 13,
      name: "Botia Palhaço",
      scientificName: "Chromobotia macracanthus",
      type: "freshwater",
      price: 69.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/749804/botia_palhaco_5_a_7_cm_chromobotia_macracanthus_1035_1_0053208677157f9d7630a8a7ba2ce3a2.jpg",
      description:
        "Peixe de fundo colorido e ativo, excelente para controle de caramujos.",
      category: "peixes",
      temperament: "Pacífico/Ativo",
      specifications: [
        { name: "Tamanho", value: "15-30 cm" },
        { name: "Temperatura", value: "25-30°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Manter em grupos de pelo menos 5 exemplares",
        "Requer esconderijos e plantas na decoração",
        "Alimentação: ração em tablete, artêmias, larvas",
        "Expectativa de vida: 10-15 anos",
      ],
    },
    {
      id: 14,
      name: "Tetra Borboleta",
      scientificName: "Carnegiella strigata",
      type: "freshwater",
      price: 29.9,
      image:
        "https://cobasiblog.blob.core.windows.net/production-ofc/2022/12/3-3.png",
      description:
        "Pequeno peixe com formato de machado, nada na superfície da água.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "3-4 cm" },
        { name: "Temperatura", value: "24-28°C" },
        { name: "pH", value: "5.5-7.0" },
      ],
      additionalInfo: [
        "Peixe saltador - requer tampa no aquário",
        "Manter em cardumes de 6 ou mais exemplares",
        "Alimentação: ração em flocos, insetos pequenos",
        "Expectativa de vida: 3-5 anos",
      ],
      isNew: true,
    },
    {
      id: 15,
      name: "Oscar",
      scientificName: "Astronotus ocellatus",
      type: "freshwater",
      price: 59.9,
      image:
        "https://img.freepik.com/fotos-premium/peixe-oscar-astronotus-ocellatus-peixes-de-agua-doce-tropicais-no-aquario-oscar-tigre-ciclideo-de-veludo-peixes-da-familia-dos-ciclideos-na-tropical-america-do-sul-os-ciclideos-mais-populares-no-hobby-de-aquarios_85672-2130.jpg",
      description: "Peixe ciclidídeo grande e inteligente, reconhece seu dono.",
      category: "peixes",
      temperament: "Territorial",
      specifications: [
        { name: "Tamanho", value: "25-35 cm" },
        { name: "Temperatura", value: "23-28°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Requer aquário de no mínimo 200 litros",
        "Mexe no substrato e decoração do aquário",
        "Alimentação: ração para ciclídeos, alimentação viva",
        "Expectativa de vida: 10-15 anos",
      ],
    },
    {
      id: 17,
      name: "Cascudo Ancistrus",
      scientificName: "Ancistrus cirrhosus",
      type: "freshwater",
      price: 22.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/749804/cascudo_ancistrus_spotted_veu_l144_1049_1_2ab13adb67aaf2fde97fed3edb27494d.jpg",
      description:
        "Peixe de fundo que ajuda no controle de algas, excelente para limpeza.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "10-15 cm" },
        { name: "Temperatura", value: "22-26°C" },
        { name: "pH", value: "6.5-7.5" },
      ],
      additionalInfo: [
        "Possui ventosas na boca para raspar algas",
        "Precisa de troncos e raízes no aquário",
        "Alimentação: tablets para fundo, vegetais, algas",
        "Expectativa de vida: 5-12 anos",
      ],
    },
    {
      id: 18,
      name: "Colisa Lália",
      scientificName: "Trichogaster lalius",
      type: "freshwater",
      price: 24.9,
      image:
        "https://cdn.interago.com.br/img/webp/w_0_q_8/5/mc/Novo%20cat%C3%A1logo/Colisa%20Lalia/ColisaFundo",
      description:
        "Pequeno peixe labirinto com cores vibrantes, alternativa ao Betta.",
      category: "peixes",
      temperament: "Semi-agressivo",
      specifications: [
        { name: "Tamanho", value: "5-7 cm" },
        { name: "Temperatura", value: "22-28°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Peixe labirinto que respira ar atmosférico",
        "Constrói ninhos de bolhas para reprodução",
        "Alimentação: ração em flocos, alimentos vivos pequenos",
        "Expectativa de vida: 3-5 anos",
      ],
    },
    {
      id: 19,
      name: "Tetra Diamante",
      scientificName: "Moenkhausia pittieri",
      type: "freshwater",
      price: 9.9,
      image:
        "https://www.aquarismopaulista.com/wp-content/uploads/2018/09/Moenkhausia-pittieri.jpg",
      description:
        "Peixe de cardume com escamas prateadas reluzentes e nadadeiras avermelhadas.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "5-6 cm" },
        { name: "Temperatura", value: "23-28°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Ideal para aquários comunitários",
        "Manter em grupos de 6 ou mais exemplares",
        "Alimentação: ração em flocos, alimentos vivos pequenos",
        "Expectativa de vida: 3-5 anos",
      ],
    },
    {
      id: 20,
      name: "Acará Bandeira",
      scientificName: "Pterophyllum altum",
      type: "freshwater",
      price: 69.9,
      image: "https://www.baseflora.com/img/article/0011-1.jpg",
      description:
        "Peixe anjo de grande porte da Amazônia, mais raro que o escalare comum.",
      category: "peixes",
      temperament: "Semi-agressivo",
      specifications: [
        { name: "Tamanho", value: "20-30 cm" },
        { name: "Temperatura", value: "26-30°C" },
        { name: "pH", value: "5.0-6.5" },
      ],
      additionalInfo: [
        "Necessita de aquário alto e espaçoso",
        "Prefere água mole e ácida",
        "Alimentação variada: ração em flocos, artêmias, larvas",
        "Expectativa de vida: 10-15 anos",
      ],
      isNew: true,
    },
    {
      id: 21,
      name: "Camarão Red Cherry",
      scientificName: "Neocaridina davidi",
      type: "freshwater",
      price: 14.9,
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgco69Y7nLtM8cdQHOV35XmOuDMQBZst1C4EMOWmUAGfifVEjgnODULX0rWksbNFraclB5ff-ReNWTf4aPgntAMG8DkGKgNP0H0Guf8RKAaBmnpfL6zSc2p87m628g3Qdi3lEmZPzheReY/s1600/Neocaridina_heteropodavarred.jpg",
      description:
        "Camarão pequeno com coloração vermelha intensa, excelente para aquários plantados.",
      category: "invertebrados",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "2-3 cm" },
        { name: "Temperatura", value: "20-28°C" },
        { name: "pH", value: "6.5-8.0" },
      ],
      additionalInfo: [
        "Ótimo limpador de algas e restos orgânicos",
        "Reproduz-se facilmente em condições adequadas",
        "Alimentação: ração específica para camarões, vegetais, algas",
        "Expectativa de vida: 1-2 anos",
      ],
    },
    {
      id: 22,
      name: "Camarão Amano",
      scientificName: "Caridina multidentata",
      type: "freshwater",
      price: 19.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/camarao_takashi_amano_caridina_multidentata_5_unidades_7779_9_42b3e269ba81465eca29f6b8ee987025.jpeg",
      description:
        "Camarão maior conhecido por seu eficiente trabalho no controle de algas.",
      category: "invertebrados",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "4-5 cm" },
        { name: "Temperatura", value: "18-27°C" },
        { name: "pH", value: "6.5-7.5" },
      ],
      additionalInfo: [
        "Considerado o melhor camarão para controle de algas",
        "Difícil reprodução em cativeiro",
        "Alimentação: algas, detritos, ração específica",
        "Expectativa de vida: 2-3 anos",
      ],
    },
    {
      id: 23,
      name: "Caramujo Neritina",
      scientificName: "Neritina natalensis",
      type: "freshwater",
      price: 8.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/neritina_zebra_2911_1_8d166e14d5686b1b9e659541fa25d1f9.jpg",
      description:
        "Caramujo com padrões listrados, excelente para controle de algas.",
      category: "invertebrados",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "1.5-2.5 cm" },
        { name: "Temperatura", value: "22-28°C" },
        { name: "pH", value: "7.0-8.5" },
      ],
      additionalInfo: [
        "Não se reproduz em água doce",
        "Não come plantas do aquário",
        "Excelente consumidor de algas",
        "Expectativa de vida: 1-2 anos",
      ],
    },
    {
      id: 24,
      name: "Tetras Preto",
      scientificName: "Gymnocorymbus ternetzi",
      type: "freshwater",
      price: 5.5,
      image:
        "https://www.petz.com.br/blog/wp-content/uploads/2020/03/tetra-negro-pet.jpg",
      description:
        "Peixe de cardume com corpo achatado lateralmente e coloração escura.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "4-5 cm" },
        { name: "Temperatura", value: "22-28°C" },
        { name: "pH", value: "6.0-7.5" },
      ],
      additionalInfo: [
        "Ideal para aquários comunitários",
        "Manter em grupos de 6 ou mais exemplares",
        "Alimentação: ração em flocos, alimentos vivos pequenos",
        "Expectativa de vida: 3-5 anos",
      ],
    },
    {
      id: 25,
      name: "Camarão Crystal Red",
      scientificName: "Caridina cantonensis",
      type: "freshwater",
      price: 49.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/648834/red_cristal_pure_red_line_prl_73_1_20190610164921.jpeg",
      description:
        "Camarão ornamental com padrões vermelho e branco cristalinos.",
      category: "invertebrados",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "2-2.5 cm" },
        { name: "Temperatura", value: "18-24°C" },
        { name: "pH", value: "5.8-6.8" },
      ],
      additionalInfo: [
        "Exige água mais ácida e parâmetros estáveis",
        "Reprodução em água doce possível com condições adequadas",
        "Alimentação: ração específica, folhas de amêndoa, algas",
        "Expectativa de vida: 1.5-2 anos",
      ],
      isNew: true,
    },
    {
      id: 26,
      name: "Apistogramma Ramirezi",
      scientificName: "Mikrogeophagus ramirezi",
      type: "freshwater",
      price: 39.9,
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQNTllUMpZrpEUbKWN0sP7OWUmRPV2AV56txVnslyyiOzug5r3KpWA26qgD_kp9gW8eGTTbVDcpYRuK5f_uV6apdySJmyHH77GHtGbzBQ",
      description:
        "Ciclídeo anão colorido e pacífico, ótimo para aquários comunitários.",
      category: "peixes",
      temperament: "Semi-agressivo",
      specifications: [
        { name: "Tamanho", value: "5-7 cm" },
        { name: "Temperatura", value: "26-30°C" },
        { name: "pH", value: "5.5-6.5" },
      ],
      additionalInfo: [
        "Prefere aquários bem plantados com substratos escuros",
        "Forma casais monogâmicos",
        "Alimentação: ração em flocos, artêmias, larvas",
        "Expectativa de vida: 2-4 anos",
      ],
    },
    {
      id: 27,
      name: "Carpa Koi",
      scientificName: "Cyprinus carpio koi",
      type: "freshwater",
      price: 129.9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgQ8jeEaJgwQQOj8Yx4PqXsXyKWDatXGwVw&s",
      description:
        "Peixe ornamental japonês com padrões coloridos exclusivos. Tamanho pequeno.",
      category: "peixes",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "15-25 cm (jovem)" },
        { name: "Temperatura", value: "18-25°C" },
        { name: "pH", value: "6.5-8.5" },
      ],
      additionalInfo: [
        "Idealmente mantido em lagos ou aquários muito grandes",
        "Pode crescer até 60-90 cm em condições ideais",
        "Alimentação: ração para koi, vegetais, frutas",
        "Expectativa de vida: 20-30 anos ou mais",
      ],
      isNew: true,
    },
    {
      id: 29,
      name: "Caramujo Physa",
      scientificName: "Physa acuta",
      type: "freshwater",
      price: 3.9,
      image:
        "https://www.diario7.com.br/wp-content/uploads/2023/09/caramujo-caramujo-Physa-02-1-scaled.jpg",
      description:
        "Pequeno caramujo de crescimento rápido, útil para limpeza de aquários.",
      category: "invertebrados",
      temperament: "Pacífico",
      specifications: [
        { name: "Tamanho", value: "0.5-1.5 cm" },
        { name: "Temperatura", value: "18-30°C" },
        { name: "pH", value: "6.5-8.0" },
      ],
      additionalInfo: [
        "Reprodução rápida, podendo tornar-se invasivo",
        "Ótimo detritívoro e consumidor de algas",
        "Serve como alimento para peixes predadores",
        "Expectativa de vida: 6 meses a 1 ano",
      ],
    },
    // Adicione mais produtos aqui
  ];

  useEffect(() => {
    if (productId) {
      // Encontrar o produto específico
      const product = fishProducts.find((p) => p.id === Number(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [productId]);

  // Filter products based on search term and filter type
  const filteredProducts = fishProducts.filter((product) => {
    return (
      (filterType === "all" || product.type === filterType) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.scientificName &&
          product.scientificName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())))
    );
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        // Assuming newer products have higher IDs
        return b.id - a.id;
      default:
        // Featured - default sorting
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter, search, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, sortBy]);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm opacity-90">adicionado ao carrinho</p>
        </div>
      </div>,
      {
        position: "bottom-right",
        duration: 3000,
        style: {
          background: "rgba(49, 130, 206, 0.9)",
          color: "#fff",
          backdropFilter: "blur(8px)",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "rgba(49, 130, 206, 0.9)",
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r text-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loja de Peixes</h1>
            <p className="text-xl text-blue-400 max-w-2xl mx-auto">
              Explore nossa seleção premium de peixes ornamentais,
              cuidadosamente selecionados e mantidos em condições ideais.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar peixes..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterType("freshwater")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 
                  transition-all duration-200 font-medium ${
                    filterType === "freshwater"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
              >
                <FaWater
                  className={filterType === "freshwater" ? "text-blue-200" : ""}
                />
                Água Doce
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterType("saltwater")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 
                  transition-all duration-200 font-medium ${
                    filterType === "saltwater"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg"
                      : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                  }`}
              >
                <FaWater
                  className={filterType === "saltwater" ? "text-teal-200" : ""}
                />
                Água Salgada
              </motion.button>
            </div>

            {/* Sort Dropdown - Fixed Positioning */}
            <div className="relative group">
              <select
                className="appearance-none w-full pl-12 pr-10 py-3 rounded-lg
                  border-2 border-gray-200 bg-white text-gray-700
                  cursor-pointer font-medium
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="" disabled>
                  Ordenar por
                </option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Sort Icon */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaSort className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Chevron Icon */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 sm:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.scientificName && (
                    <span className="text-xs italic text-gray-500 ml-1">
                      {product.scientificName}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {product.type === "freshwater"
                      ? "Água Doce"
                      : "Água Salgada"}
                  </span>
                  {product.temperament && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {product.temperament}
                    </span>
                  )}
                </div>

                <div className="mb-4 flex-grow">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Comprar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
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
                {filteredProducts.length} produtos)
              </span>

              <div className="inline-flex justify-center items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label="Primeira página"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md flex items-center ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label="Página anterior"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                {/* Page numbers - Only show on medium screens and up */}
                <div className="hidden md:flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      // If 5 or fewer pages, show all
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Near start
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Near end
                      pageNum = totalPages - 4 + i;
                    } else {
                      // In middle
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Current page indicator on small screens */}
                <span className="md:hidden px-3 py-1 bg-blue-600 text-white rounded-md">
                  {currentPage}
                </span>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md flex items-center ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label="Próxima página"
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                  }`}
                  aria-label="Última página"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Jump to page dropdown - Only on medium+ screens */}
              {totalPages > 5 && (
                <div className="hidden md:flex items-center gap-2 mt-4">
                  <label
                    htmlFor="page-select"
                    className="text-sm text-gray-600"
                  >
                    Ir para página:
                  </label>
                  <select
                    id="page-select"
                    className="bg-white border border-gray-300 text-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsFish;
