import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaShoppingCart,
  FaRuler,
  FaThermometerHalf,
  FaVial,
  FaInfoCircle,
  FaStar,
  FaRegStar,
  FaSeedling,
  FaLeaf,
  FaTools,
  FaFilter,
  FaLightbulb,
  FaBolt,
  FaSun,
  FaLayerGroup,
} from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  // Determine product category
  const isPlant = product.category === "plantas";
  const isEquipment = product.category === "equipamentos";
  const isFish = !isPlant && !isEquipment;

  // Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Modal animation
  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.1 } },
  };

  // Image animation
  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
  };

  // Calculate care level based on temperament and specifications
  const calculateCareLevel = () => {
    if (isPlant) {
      // Plants care level logic
      if (product.difficulty === "difícil" || product.light === "alta") {
        return { level: 4, text: "Avançado" };
      } else if (product.difficulty === "médio" || product.light === "média") {
        return { level: 3, text: "Intermediário" };
      } else {
        return { level: 2, text: "Iniciante" };
      }
    } else if (isEquipment) {
      // Equipment doesn't need care level
      return null;
    } else {
      // Fish care level logic
      if (product.temperament === "Territorial") {
        return { level: 4, text: "Avançado" };
      } else if (product.temperament === "Semi-agressivo") {
        return { level: 3, text: "Intermediário" };
      } else if (
        product.additionalInfo?.some((info) => info.includes("exige"))
      ) {
        return { level: 3, text: "Intermediário" };
      } else {
        return { level: 2, text: "Iniciante" };
      }
    }
  };

  const careLevel = calculateCareLevel();

  // Helper function for getting category-specific icons
  const getTypeIcon = () => {
    if (isPlant) {
      if (product.type === "foreground")
        return <FaLayerGroup className="mr-2" />;
      if (product.type === "midground") return <FaSeedling className="mr-2" />;
      return <FaLeaf className="mr-2" />;
    } else if (isEquipment) {
      if (product.type === "filter") return <FaFilter className="mr-2" />;
      if (product.type === "lighting") return <FaLightbulb className="mr-2" />;
      return <FaTools className="mr-2" />;
    }
    return null;
  };

  // Helper function for type label
  const getTypeLabel = () => {
    if (isPlant) {
      if (product.type === "foreground") return "Carpete";
      if (product.type === "midground") return "Médio Porte";
      if (product.type === "background") return "Fundo";
      return product.type || "Planta";
    } else if (isEquipment) {
      if (product.type === "filter") return "Filtro";
      if (product.type === "lighting") return "Iluminação";
      return "Acessório";
    } else {
      return product.type === "freshwater" ? "Água Doce" : "Água Salgada";
    }
  };

  // Helper function for type badge color
  const getTypeBadgeColor = () => {
    if (isPlant) {
      return "bg-green-600";
    } else if (isEquipment) {
      return "bg-gray-600";
    } else {
      return product.type === "freshwater" ? "bg-blue-600" : "bg-teal-600";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - inside the card */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 z-10 transition-all duration-200 transform hover:scale-110 border border-gray-200"
          aria-label="Fechar"
        >
          <FaTimes className="text-gray-600" />
        </button>

        {/* Left side - Image */}
        <motion.div
          className={`md:w-2/5 relative bg-gradient-to-br ${
            isPlant
              ? "from-green-50 to-gray-50"
              : isEquipment
              ? "from-gray-50 to-white"
              : "from-blue-50 to-gray-50"
          }`}
          variants={imageVariants}
        >
          <div className="h-full flex items-center justify-center p-4 bg-white">
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain max-h-[400px] transition-transform duration-300 hover:scale-105"
                loading="eager"
                style={{ objectPosition: "center" }}
              />

              {/* Image overlay to improve contrast of the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30 pointer-events-none"></div>
            </div>
          </div>

          {/* Tags overlaying the image */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Novo
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Últimas unidades
              </span>
            )}
            {isPlant && product.difficulty === "fácil" && (
              <span className="bg-green-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
                <FaSeedling className="mr-1" /> Para Iniciantes
              </span>
            )}
          </div>

          {/* Type tag at bottom */}
          <div className="absolute bottom-4 left-4">
            <span
              className={`${getTypeBadgeColor()} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center`}
            >
              {getTypeIcon()}
              {getTypeLabel()}
            </span>
          </div>
        </motion.div>

        {/* Right side - Info */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {product.name}
            </h2>
            {product.scientificName && (
              <p className="text-sm italic text-gray-500 mb-2">
                {product.scientificName}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {/* Show temperament tag only for fish */}
              {isFish && product.temperament && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.temperament === "Territorial" ||
                    product.temperament === "Semi-agressivo"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {product.temperament}
                </span>
              )}

              {/* Show category tag for all products */}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isPlant
                    ? "bg-green-100 text-green-800"
                    : isEquipment
                    ? "bg-gray-100 text-gray-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {isPlant
                  ? "Planta"
                  : isEquipment
                  ? "Equipamento"
                  : product.category === "peixes"
                  ? "Peixe"
                  : "Invertebrado"}
              </span>

              {/* Show plant-specific light requirement tag */}
              {isPlant && product.light && (
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaSun className="text-xs" /> Luz {product.light || "Média"}
                </span>
              )}

              {/* Show equipment-specific power tag */}
              {isEquipment &&
                product.specifications &&
                product.specifications.find(
                  (spec) => spec.name === "Potência"
                ) && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaBolt className="text-xs" />{" "}
                    {
                      product.specifications.find(
                        (spec) => spec.name === "Potência"
                      ).value
                    }
                  </span>
                )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price and stock info with card-like styling */}
            <div
              className={`rounded-xl p-4 mb-6 border border-gray-100 shadow-sm ${
                isPlant
                  ? "bg-green-50"
                  : isEquipment
                  ? "bg-gray-50"
                  : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Preço</p>
                  <p
                    className={`text-3xl font-bold ${
                      isPlant
                        ? "text-green-600"
                        : isEquipment
                        ? "text-gray-700"
                        : "text-blue-600"
                    }`}
                  >
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estoque</p>
                  <p
                    className={`font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} unidades`
                      : "Indisponível"}
                  </p>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full mt-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                  product.stock > 0
                    ? isPlant
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : isEquipment
                      ? "bg-gray-700 hover:bg-gray-800 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaShoppingCart />
                {product.stock > 0
                  ? "Adicionar ao Carrinho"
                  : "Produto Indisponível"}
              </button>
            </div>
          </div>

          {/* Specifications with icons */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <FaInfoCircle
                  className={`mr-2 ${
                    isPlant
                      ? "text-green-500"
                      : isEquipment
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                />
                Especificações
              </h3>
              <div
                className={`rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 ${
                  isPlant
                    ? "bg-green-50"
                    : isEquipment
                    ? "bg-gray-50"
                    : "bg-blue-50"
                }`}
              >
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center">
                    {/* Dynamic icons based on specification name and product type */}
                    {spec.name === "Tamanho" ||
                      (spec.name === "Altura" && (
                        <FaRuler
                          className={`mr-2 ${
                            isPlant
                              ? "text-green-600"
                              : isEquipment
                              ? "text-gray-600"
                              : "text-blue-600"
                          }`}
                        />
                      ))}
                    {spec.name === "Temperatura" && (
                      <FaThermometerHalf className="text-red-600 mr-2" />
                    )}
                    {spec.name === "pH" && (
                      <FaVial className="text-purple-600 mr-2" />
                    )}
                    {spec.name === "Iluminação" && isPlant && (
                      <FaSun className="text-yellow-600 mr-2" />
                    )}
                    {spec.name === "Crescimento" && isPlant && (
                      <FaSeedling className="text-green-600 mr-2" />
                    )}
                    {spec.name === "Potência" && isEquipment && (
                      <FaBolt className="text-yellow-600 mr-2" />
                    )}
                    {spec.name === "Volume Ideal" && isEquipment && (
                      <FaFilter className="text-blue-600 mr-2" />
                    )}
                    {spec.name === "Vazão" && isEquipment && (
                      <FaFilter className="text-blue-600 mr-2" />
                    )}
                    <span>
                      <span className="font-medium">{spec.name}:</span>{" "}
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional information as cards */}
          {product.additionalInfo && product.additionalInfo.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <FaInfoCircle
                  className={`mr-2 ${
                    isPlant
                      ? "text-green-500"
                      : isEquipment
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                />
                Informações Adicionais
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {product.additionalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-start">
                      <FaStar
                        className={`mt-1 mr-2 flex-shrink-0 ${
                          isPlant
                            ? "text-green-500"
                            : isEquipment
                            ? "text-gray-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <p className="text-gray-700">{info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Care Level indicator - only for fish and plants */}
          {careLevel && (isFish || isPlant) && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Nível de Cuidado
              </h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  return i < careLevel.level ? (
                    <FaStar
                      key={i}
                      className={`mr-1 ${
                        isPlant ? "text-green-400" : "text-yellow-400"
                      }`}
                    />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 mr-1" />
                  );
                })}
                <span className="ml-2 text-sm text-gray-600">
                  {careLevel.text}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
