import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
      id: 201,
      name: "Filtro Canister 1000L/h",
      type: "filter",
      price: 599.9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXse-2lBzY3e-Pi_x9VENh78DN6FleBtcchg&s",
      description: "Filtro potente e silencioso para aquários grandes",
      stock: 5,
      category: "equipamentos",
      specifications: [
        { name: "Vazão", value: "1000L/h" },
        { name: "Potência", value: "35W" },
        { name: "Volume Ideal", value: "200-400L" },
      ],
      additionalInfo: [
        "Sistema de filtragem em 3 estágios",
        "Inclui mídias filtrantes",
        "Baixo consumo de energia",
        "Garantia de 1 ano",
      ],
    },
    // Adicione mais produtos aqui
  ];

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
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
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

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {equipmentTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilterType(type.value)}
                  className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 
                    transition-all duration-200 font-medium ${
                      filterType === type.value
                        ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {type.icon}
                  {type.label}
                </motion.button>
              ))}
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
              >
                <option value="" disabled selected>
                  Ordenar por
                </option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaSort className="w-4 h-4 text-gray-400" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {equipmentProducts.map((product) => (
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
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    Lançamento
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {product.type}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-700">
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
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default ProductsEquipment;
