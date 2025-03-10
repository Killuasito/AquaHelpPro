import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
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

const ProductsFish = () => {
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

  const fishProducts = [
    {
      id: 1,
      name: "Betta Splendens Macho",
      type: "freshwater",
      price: 49.9,
      image:
        "https://aquariopedia.com.br/wp-content/uploads/2022/12/Peixe-de-aquario-betta-splendens-macho-da-cor-azul.jpg",
      description: "Betta macho com cores vibrantes e cauda exuberante",
      stock: 10,
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
    // Adicione mais produtos aqui
  ];

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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fishProducts.map((product) => (
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
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Novo
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
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {product.type === "freshwater"
                      ? "Água Doce"
                      : "Água Salgada"}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {product.temperament}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">
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
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default ProductsFish;
