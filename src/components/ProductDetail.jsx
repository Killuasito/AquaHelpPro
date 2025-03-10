import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaShoppingCart,
  FaBox,
  FaTag,
  FaInfoCircle,
} from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-80 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-500 italic">{product.scientificName}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                R$ {product.price.toFixed(2)}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} em estoque`
                  : "Indisponível"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Descrição</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FaTag className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Categoria</h3>
                  <p className="text-gray-600 capitalize">{product.category}</p>
                </div>
              </div>

              {product.specifications?.map((spec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaBox className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">{spec.name}</h3>
                    <p className="text-gray-600">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {product.additionalInfo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Informações Adicionais
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {product.additionalInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-500"
              }`}
            >
              <FaShoppingCart />
              {product.stock > 0
                ? "Adicionar ao Carrinho"
                : "Produto Indisponível"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
