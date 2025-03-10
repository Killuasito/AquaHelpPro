import React, { useState, useContext } from "react";
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plantProducts.map((product) => (
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
