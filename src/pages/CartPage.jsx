import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaArrowLeft,
  FaCreditCard,
  FaBarcode,
  FaMoneyBillWave,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <FaBoxOpen className="mx-auto text-8xl text-gray-300 mb-4" />
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Parece que você ainda não adicionou nenhum item ao seu carrinho.
              Que tal explorar nossa loja?
            </p>
            <Link
              to="/products/fish"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Continuar Comprando
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section - Improved for mobile */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                  <FaShoppingCart className="text-blue-500" />
                  Seu Carrinho
                  <span className="text-sm font-normal text-gray-500">
                    ({itemCount} {itemCount === 1 ? "item" : "itens"})
                  </span>
                </h1>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  <div className="w-full sm:w-24 h-36 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain sm:object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                      <h3 className="font-medium text-gray-800 text-lg">
                        {item.name}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">
                          Preço unitário
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      {item.category === "peixes"
                        ? "Peixe"
                        : item.category === "plantas"
                        ? "Planta"
                        : "Equipamento"}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-lg border-2 border-gray-200 overflow-hidden">
                        <motion.button
                          whileHover={{ backgroundColor: "#f3f4f6" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                          <FaMinus
                            className={`${
                              item.quantity === 1
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="px-4 py-2 font-medium min-w-[40px] text-center"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          whileHover={{ backgroundColor: "#f3f4f6" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                          <FaPlus className="text-green-500" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, color: "#ef4444" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                      >
                        <FaTrash />{" "}
                        <span className="ml-1 sm:hidden">Remover</span>
                      </motion.button>
                    </div>

                    <div className="w-full sm:hidden mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Subtotal:</p>
                        <p className="font-bold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Link
            to="/products/fish"
            className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-700"
          >
            <FaArrowLeft className="mr-2" />
            Continuar Comprando
          </Link>
        </div>

        {/* Order Summary Section - Improved for mobile */}
        <div className="lg:w-96 mt-6 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
            >
              Finalizar Compra
            </button>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700 mb-2">
                Formas de Pagamento
              </h3>
              <div className="flex gap-2 text-gray-400">
                <FaCreditCard className="text-xl" />
                <FaBarcode className="text-xl" />
                <FaMoneyBillWave className="text-xl" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaTruck />
                <span>Entrega em todo Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
