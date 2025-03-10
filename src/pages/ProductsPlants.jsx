import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import {
  FaSearch,
  FaShoppingCart,
  FaLeaf,
  FaTimes,
  FaPlus,
  FaStar,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSort,
  FaClock,
  FaChevronDown,
  FaSeedling,
  FaLayerGroup,
  FaSun,
} from "react-icons/fa";
import ProductDetail from "../components/ProductDetail";

const ProductsPlants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const itemsPerPage = 12;
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sortOptions = [
    {
      value: "featured",
      label: "Em Destaque",
      icon: <FaStar className="text-yellow-400" />,
    },
    {
      value: "price-asc",
      label: "Menor Preço",
      icon: <FaSortAmountDown className="text-green-500" />,
    },
    {
      value: "price-desc",
      label: "Maior Preço",
      icon: <FaSortAmountUp className="text-green-500" />,
    },
    {
      value: "name",
      label: "Nome A-Z",
      icon: <FaSort className="text-gray-400" />,
    },
    {
      value: "newest",
      label: "Mais Recentes",
      icon: <FaClock className="text-gray-400" />,
    },
  ];

  const plantTypes = [
    { value: "foreground", label: "Carpete", icon: <FaLayerGroup /> },
    { value: "midground", label: "Médio Porte", icon: <FaSeedling /> },
    { value: "background", label: "Fundo", icon: <FaLeaf /> },
  ];

  const plantProducts = [
    {
      id: 101,
      name: "Anúbia Nana",
      type: "foreground",
      price: 29.9,
      image:
        "https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/Anubias%20barteri%20var.%20nana-800x800.jpg",
      description: "Planta de fácil manutenção ideal para aquários plantados",
      stock: 15,
      category: "plantas",
      difficulty: "fácil",
      specifications: [
        { name: "Altura", value: "5-15 cm" },
        { name: "Iluminação", value: "Baixa a Média" },
        { name: "Crescimento", value: "Lento" },
      ],
      additionalInfo: [
        "Não enterrar o rizoma",
        "Ideal para fixar em troncos e rochas",
        "Tolera ampla faixa de pH",
        "Excelente para aquários com bettas e escalares",
      ],
    },
    // Adicione mais produtos aqui
  ];

  // Filter products based on search term and filter type
  const filteredProducts = plantProducts.filter((product) => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r text-green-500">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Plantas Aquáticas</h1>
            <p className="text-xl text-green-400 max-w-2xl mx-auto">
              Explore nossa seleção de plantas aquáticas saudáveis e vibrantes
              para transformar seu aquário em um jardim submerso.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Corrected Search Input */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar plantas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200
                  focus:border-green-500 focus:ring-2 focus:ring-green-200
                  placeholder:text-gray-400 text-gray-700
                  transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Plant Type Filters */}
            <div className="flex gap-2">
              {plantTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilterType(type.value)}
                  className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 
                    transition-all duration-200 font-medium ${
                      filterType === type.value
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                >
                  {type.icon}
                  {type.label}
                </motion.button>
              ))}
            </div>

            {/* Ajustado Sort Dropdown */}
            <div className="relative">
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <FaSort className="w-4 h-4" />
                </div>
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg
                    border-2 border-gray-200 bg-white text-gray-700
                    cursor-pointer font-medium
                    focus:border-green-500 focus:ring-2 focus:ring-green-200
                    transition-all duration-200"
                >
                  <option value="" disabled selected>
                    Ordenar por
                  </option>
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="flex items-center gap-2 py-2"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <FaChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              Nenhuma planta encontrada com esse critério.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Últimas unidades
                    </span>
                  )}
                  {product.difficulty === "fácil" && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaSeedling className="text-xs" /> Para Iniciantes
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {product.scientificName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      {product.type === "foreground"
                        ? "Carpete"
                        : product.type === "midground"
                        ? "Médio Porte"
                        : "Fundo"}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaSun className="text-xs" />
                      {product.light || "Média"}
                    </span>
                  </div>

                  {/* Add price and stock info */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} em estoque`
                        : "Indisponível"}
                    </span>
                  </div>

                  {/* Add action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                {filteredProducts.length} plantas)
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

export default ProductsPlants;
