import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaShoppingCart,
  FaTools,
  FaTimes,
  FaPlus,
  FaStar,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSort,
  FaClock,
  FaChevronDown,
  FaFilter,
  FaLightbulb,
  FaPowerOff,
} from "react-icons/fa";
import ProductDetail from "../components/ProductDetail";

const ProductsEquipment = () => {
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

  const equipmentTypes = [
    { value: "filter", label: "Filtros", icon: <FaFilter /> },
    { value: "lighting", label: "Iluminação", icon: <FaLightbulb /> },
    { value: "other", label: "Outros", icon: <FaTools /> },
  ];

  const equipmentProducts = [
    {
      id: 500,
      name: "Filtro Hang-On 250L/h",
      type: "filter",
      price: 79.5,
      image: "https://m.media-amazon.com/images/I/41MZNX9eIQL.jpg",
      description:
        "Filtro de fácil instalação e manutenção para aquários pequenos",
      category: "equipamentos",
      specifications: [
        { name: "Vazão", value: "250L/h" },
        { name: "Potência", value: "8W" },
        { name: "Volume Ideal", value: "até 70L" },
      ],
      additionalInfo: [
        "Sistema de cascata para oxigenação",
        "Fácil de limpar",
        "Operação silenciosa",
        "Ideal para aquários pequenos",
      ],
    },
    {
      id: 501,
      name: "Termostato 25W",
      type: "other",
      price: 69.9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDH9h3Y4JvGBqvBe9r8ciDfiAXT4I9LlOfw&s",
      description: "Controle preciso de temperatura para aquários pequenos",
      category: "equipamentos",
      specifications: [
        { name: "Potência", value: "25W" },
        { name: "Precisão", value: "±0.5°C" },
        { name: "Volume Ideal", value: "até 40L" },
      ],
      additionalInfo: [
        "Temperatura ajustável",
        "Luz indicadora de funcionamento",
        "Revestimento resistente",
        "A prova d'água",
      ],
    },
    {
      id: 502,
      name: "Termômetro Digital para Aquário",
      type: "other",
      price: 59.9,
      image:
        "https://images.tcdn.com.br/img/img_prod/731049/termometro_digital_aquario_terrario_estufa_piscina_adega_131_1_e0702baa6cb5acd513cf08ec92bb766a.jpg",
      description: "Monitor de temperatura preciso e fácil de ler",
      category: "equipamentos",
      specifications: [
        { name: "Faixa de Medição", value: "0-50°C" },
        { name: "Precisão", value: "±0.1°C" },
        { name: "Alimentação", value: "Pilha botão (inclusa)" },
      ],
      additionalInfo: [
        "Display LCD de fácil leitura",
        "À prova d'água",
        "Sensor submerso com cabo",
        "Instalação com ventosas",
      ],
    },
    {
      id: 503,
      name: "Aquário de 28L",
      type: "other",
      price: 199.9,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_763841-MLB70902973730_082023-O.webp",
      description:
        "Kit aquário ideal para iniciantes, com capacidade de 28 litros",
      category: "equipamentos",
      specifications: [
        { name: "Capacidade", value: "28L" },
        { name: "Dimensões", value: "40x25x28cm" },
        { name: "Material", value: "Vidro 4mm" },
      ],
      additionalInfo: [
        "Vidro de alta transparência",
        "Tampa com iluminação LED",
        "Espaço para filtro e cabo",
        "Ideal para peixes pequenos",
      ],
    },
    {
      id: 504,
      name: "Substrato de Areia Fina 5kg",
      type: "other",
      price: 6.9,
      image:
        "https://a-static.mlcdn.com.br/1500x1500/areia-duna-fina-para-aquarios-5kg-embalada-a-granel-aquapedras/continentalaquarium/08aeebe2272c11ee90544201ac185049/a2b6f85ef98c1ea614aa3c84900b55b1.jpeg",
      description: "Areia fina natural para aquários plantados e de peixes",
      category: "equipamentos",
      specifications: [
        { name: "Quantidade", value: "5kg" },
        { name: "Granulometria", value: "0.5-1.0mm" },
        { name: "Cobertura", value: "~5cm em aquário de 60L" },
      ],
      additionalInfo: [
        "100% natural e inerte",
        "Não altera o pH da água",
        "Ideal para peixes de fundo",
        "Lavável e reutilizável",
      ],
    },
    {
      id: 505,
      name: "Acelerador Biológico 100ml",
      type: "other",
      price: 69.9,
      image:
        "https://www.darkreefstore.com.br/wp-content/uploads/2025/01/acelerador-biologico-stability-seachem-100-ml.jpg",
      description:
        "Acelera o processo de ciclagem e estabelece colônias de bactérias benéficas",
      category: "equipamentos",
      specifications: [
        { name: "Volume", value: "100ml" },
        { name: "Dosagem", value: "5ml para 50L" },
        { name: "Frequência", value: "Semanal" },
      ],
      additionalInfo: [
        "Contém bactérias nitrificantes vivas",
        "Reduz amônia e nitrito",
        "Acelera a ciclagem do aquário",
        "Ideal para aquários novos",
      ],
    },
  ];

  // Adicione este useEffect para abrir o modal quando receber o ID via URL
  useEffect(() => {
    if (productId) {
      const product = equipmentProducts.find((p) => p.id === Number(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [productId]);

  // Filter products based on search term and filter type
  const filteredProducts = equipmentProducts.filter((product) => {
    return (
      (filterType === "all" || product.type === filterType) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          background: "rgba(45, 55, 72, 0.9)",
          color: "#fff",
          backdropFilter: "blur(8px)",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "rgba(45, 55, 72, 0.9)",
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Equipamentos para Aquário
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Equipamentos de alta qualidade para manter seu aquário nas
              melhores condições.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section - Improved Mobile Layout */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar equipamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-200
                  placeholder:text-gray-400 text-gray-700
                  transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Buttons - Stack for mobile, flex for desktop */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
              {equipmentTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setFilterType(
                      type.value === filterType ? "all" : type.value
                    )
                  }
                  className={`px-3 py-2 sm:py-3 sm:flex-1 rounded-lg flex items-center justify-center gap-1 sm:gap-2 
                    transition-all duration-200 text-sm sm:text-base sm:font-medium ${
                      filterType === type.value
                        ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <span className="text-base sm:text-lg">{type.icon}</span>
                  <span className="hidden xs:inline">{type.label}</span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterType("all")}
                className={`px-3 py-2 sm:py-3 sm:flex-1 rounded-lg flex items-center justify-center gap-1 sm:gap-2 
                  transition-all duration-200 text-sm sm:text-base sm:font-medium ${
                    filterType === "all"
                      ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span className="text-base sm:text-lg">
                  <FaTools />
                </span>
                <span className="hidden xs:inline">Todos</span>
              </motion.button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg
                  border-2 border-gray-200 bg-white text-gray-700
                  cursor-pointer font-medium
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-200
                  transition-all duration-200"
                value={sortBy}
              >
                <option value="featured">Ordenar: Em Destaque</option>
                <option value="price-asc">Ordenar: Menor Preço</option>
                <option value="price-desc">Ordenar: Maior Preço</option>
                <option value="name">Ordenar: Nome A-Z</option>
                <option value="newest">Ordenar: Mais Recentes</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaSort className="w-4 h-4 text-gray-400" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {filterType !== "all" && (
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                Filtros ativos:
              </span>
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                {filterType === "filter"
                  ? "Filtros"
                  : filterType === "lighting"
                  ? "Iluminação"
                  : "Outros"}
                <button
                  onClick={() => setFilterType("all")}
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              Nenhum equipamento encontrado com esse critério.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                whileHover={{ y: -5 }}
              >
                <div className="relative group h-48 sm:h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-105 p-2 sm:p-0"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Lançamento
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {product.type === "filter"
                        ? "Filtro"
                        : product.type === "lighting"
                        ? "Iluminação"
                        : "Acessório"}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4 mt-auto pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-700">
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
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Comprar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
                {filteredProducts.length} equipamentos)
              </span>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white"
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
                      className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-200"
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
                      className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-200"
                    >
                      {currentPage - 1}
                    </button>
                  )}

                  {/* Current page */}
                  <button
                    className="px-3 py-1.5 rounded-lg bg-gray-700 text-white font-medium"
                    aria-current="page"
                  >
                    {currentPage}
                  </button>

                  {/* Next page if not last */}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-200"
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
                      className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-200"
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
                      : "bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white"
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
                    className="bg-white border border-gray-300 text-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
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

export default ProductsEquipment;
