import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import {
  FaUser,
  FaTruck,
  FaCreditCard,
  FaCheck,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBarcode,
  FaMoneyBill,
  FaShoppingCart,
  FaQrcode,
  FaSpinner,
  FaTimes,
  FaCopy,
  FaRegClock,
  FaExclamationTriangle,
  FaSearch,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Input mask helpers
const formatCPF = (value) => {
  return value
    .replace(/\D/g, "") // Remove non-digits
    .replace(/(\d{3})(\d)/, "$1.$2") // Insert dot after 3 digits
    .replace(/(\d{3})(\d)/, "$1.$2") // Insert dot after next 3 digits
    .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Insert dash before last 2 digits
    .substring(0, 14); // Limit to 11 digits + 3 formatting chars
};

const formatPhone = (value) => {
  return value
    .replace(/\D/g, "") // Remove non-digits
    .replace(/(\d{2})(\d)/, "($1) $2") // Format first 2 digits with parentheses
    .replace(/(\d{5})(\d)/, "$1-$2") // Insert dash after 5 digits
    .substring(0, 15); // Limit to 11 digits + 4 formatting chars
};

const formatCEP = (value) => {
  return value
    .replace(/\D/g, "") // Remove non-digits
    .replace(/(\d{5})(\d)/, "$1-$2") // Insert dash after 5 digits
    .substring(0, 9); // Limit to 8 digits + 1 formatting char
};

// CEP Service for address lookup
const CEPService = {
  fetchAddressByCEP: async (cep) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return null;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      if (data.erro) return null;

      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        complement: data.complemento,
      };
    } catch (error) {
      console.error("Error fetching CEP data:", error);
      return null;
    }
  },
};

// Mock payment service client-side only
const PaymentService = {
  createTransaction: (orderData) => {
    return new Promise((resolve) => {
      const transactionId = `tx_${Math.random().toString(36).substr(2, 9)}`;
      const pixCode = "546.965.398-65";

      // Store in localStorage for persistence
      const transaction = {
        id: transactionId,
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pix: {
          code: pixCode,
          qrCodeImage:
            "https://chart.googleapis.com/chart?cht=qr&chl=" +
            pixCode +
            "&chs=300x300&chld=L|0",
        },
      };

      const transactions = JSON.parse(
        localStorage.getItem("transactions") || "{}"
      );
      transactions[transactionId] = transaction;
      localStorage.setItem("transactions", JSON.stringify(transactions));

      // Resolve immediately with PIX data
      setTimeout(() => {
        resolve({
          success: true,
          transactionId,
          pix: transaction.pix,
          message: "PIX gerado com sucesso!",
        });
      }, 700);
    });
  },

  checkPaymentStatus: (transactionId) => {
    return new Promise((resolve, reject) => {
      try {
        const transactions = JSON.parse(
          localStorage.getItem("transactions") || "{}"
        );
        const transaction = transactions[transactionId];

        if (!transaction) {
          resolve({
            success: false,
            message: "Transação não encontrada",
          });
          return;
        }

        resolve({
          success: true,
          status: transaction.status,
          message: "Aguardando pagamento.",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState({
    processing: false,
    confirmed: false,
    error: null,
  });
  // New state for tracking payment completion
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  // Generate a fake PIX code
  const [pixCode, setPixCode] = useState("546.965.398-65");

  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    email: "",
    cpf: "",
    phone: "",
    // Endereço
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    // Pagamento
    paymentMethod: "pix", // Set PIX as default payment method
    // Cartão de crédito
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    // Boleto
    cpfBoleto: "",
    // PIX
    pixKey: "",
  });
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting for specific fields
    if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "cep") {
      formattedValue = formatCEP(value);

      // If we have a complete CEP, fetch address data
      if (formattedValue.length === 9) {
        fetchAddressByCEP(formattedValue);
      }
    } else if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .substring(0, 19);
    } else if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    } else if (name === "cardCvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  // Function to fetch address by CEP
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const [cepError, setCepError] = useState(null);

  const fetchAddressByCEP = async (cep) => {
    setIsLoadingCEP(true);
    setCepError(null);

    try {
      const addressData = await CEPService.fetchAddressByCEP(cep);

      if (addressData) {
        setFormData((prev) => ({
          ...prev,
          street: addressData.street || prev.street,
          neighborhood: addressData.neighborhood || prev.neighborhood,
          city: addressData.city || prev.city,
          state: addressData.state || prev.state,
          complement: addressData.complement || prev.complement,
        }));
      } else {
        setCepError(
          "CEP não encontrado. Por favor, verifique o número ou preencha o endereço manualmente."
        );
      }
    } catch (error) {
      setCepError("Erro ao buscar endereço. Por favor, preencha manualmente.");
    } finally {
      setIsLoadingCEP(false);
    }
  };

  // Function to manually search for CEP
  const handleCEPSearch = () => {
    if (formData.cep.length >= 8) {
      fetchAddressByCEP(formData.cep);
    }
  };

  // Function to copy PIX code to clipboard
  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado para a área de transferência!");
  };

  // Function to simulate PIX confirmation
  const simulatePixConfirmation = () => {
    setPaymentStatus({ processing: true, confirmed: false, error: null });

    // Simulate processing time
    setTimeout(() => {
      setPaymentStatus({
        processing: false,
        confirmed: true,
        error: null,
      });
      setPaymentCompleted(true);

      // If we have a transaction ID, mark it as completed
      if (transactionId) {
        const transactions = JSON.parse(
          localStorage.getItem("transactions") || "{}"
        );
        if (transactions[transactionId]) {
          transactions[transactionId].status = "completed";
          transactions[transactionId].updatedAt = new Date().toISOString();
          localStorage.setItem("transactions", JSON.stringify(transactions));
        }
      }
    }, 2000);
  };

  // Function to check if payment method form is complete
  const isPaymentFormComplete = () => {
    if (!formData.paymentMethod) return false;

    if (formData.paymentMethod === "credit") {
      return (
        formData.cardNumber &&
        formData.cardName &&
        formData.cardExpiry &&
        formData.cardCvv
      );
    }

    if (formData.paymentMethod === "boleto") {
      return formData.cpfBoleto || formData.cpf;
    }

    return true; // PIX doesn't require additional info
  };

  // New state for transaction tracking
  const [transactionId, setTransactionId] = useState(null);
  const [paymentPollingInterval, setPaymentPollingInterval] = useState(null);
  const [paymentVerificationCount, setPaymentVerificationCount] = useState(0);
  const [isPaymentBeingVerified, setIsPaymentBeingVerified] = useState(false);

  // On component unmount, clear any intervals
  useEffect(() => {
    const interval = paymentPollingInterval;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paymentPollingInterval]);

  // Function to check payment status from simulated service
  const checkPaymentStatus = async (txId) => {
    if (!txId) return;

    try {
      setIsPaymentBeingVerified(true);

      const response = await PaymentService.checkPaymentStatus(txId);

      if (response.status === "completed") {
        // Payment confirmed
        setPaymentStatus({
          processing: false,
          confirmed: true,
          error: null,
        });
        setPaymentCompleted(true);

        // Clear polling interval
        if (paymentPollingInterval) {
          clearInterval(paymentPollingInterval);
          setPaymentPollingInterval(null);
        }

        // For credit card and confirmed PIX, proceed to confirmation
        if (
          formData.paymentMethod === "credit" ||
          formData.paymentMethod === "pix"
        ) {
          clearCart();
          setStep(4);
        }
      } else if (response.status === "pending") {
        // Still waiting for payment
        setPaymentStatus({
          processing: false,
          confirmed: false,
          error: null,
        });

        // If we've been polling for too long, show a message
        if (paymentVerificationCount > 24) {
          setPaymentStatus({
            processing: false,
            confirmed: false,
            error:
              "Verificação de pagamento está demorando mais que o normal. Por favor, verifique seu app bancário ou tente novamente mais tarde.",
          });

          // Stop polling
          if (paymentPollingInterval) {
            clearInterval(paymentPollingInterval);
            setPaymentPollingInterval(null);
          }
        }
      } else if (response.status === "failed") {
        // Payment failed
        setPaymentStatus({
          processing: false,
          confirmed: false,
          error:
            response.message || "Pagamento falhou. Por favor, tente novamente.",
        });

        // Clear polling interval
        if (paymentPollingInterval) {
          clearInterval(paymentPollingInterval);
          setPaymentPollingInterval(null);
        }
      }

      setIsPaymentBeingVerified(false);
      setPaymentVerificationCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error checking payment status:", error);

      setPaymentStatus({
        processing: false,
        confirmed: false,
        error:
          "Erro ao verificar o status do pagamento. Por favor, tente novamente.",
      });

      setIsPaymentBeingVerified(false);
    }
  };

  // Process payment based on payment method - client side only
  const processPayment = async () => {
    setPaymentStatus({ processing: true, confirmed: false, error: null });

    try {
      // Create order data
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          phone: formData.phone,
        },
        shipping: {
          address: {
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            zipCode: formData.cep,
          },
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: total,
        paymentMethod: "pix", // Always use PIX
      };

      // Process using client-side payment service
      const response = await PaymentService.createTransaction(orderData);

      if (!response || !response.success) {
        throw new Error(response?.message || "Falha ao processar o pagamento");
      }

      // Store transaction ID
      setTransactionId(response.transactionId);

      // Immediately set PIX data
      setPixCode(response.pix.code);
      setPixQrCodeImage(
        "https://chart.googleapis.com/chart?cht=qr&chl=" +
          response.pix.code +
          "&chs=300x300&chld=L|0"
      );

      setPaymentStatus({
        processing: false,
        confirmed: false,
        error: null,
      });

      // Move to PIX payment step
      setStep(3.5);
    } catch (error) {
      console.error("Payment processing error:", error);

      setPaymentStatus({
        processing: false,
        confirmed: false,
        error:
          error.message ||
          "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
      });
    }
  };

  // New state for boleto details and PIX QR Code
  const [boletoDetails, setBoletoDetails] = useState(null);
  const [pixQrCodeImage, setPixQrCodeImage] = useState(null);

  // Modified PIX confirmation handling - for client-side simulation
  const manuallyCheckPixPayment = async () => {
    if (!transactionId) return;

    setPaymentStatus({ processing: true, confirmed: false, error: null });

    try {
      const transactions = JSON.parse(
        localStorage.getItem("transactions") || "{}"
      );
      const transaction = transactions[transactionId];

      if (transaction) {
        transaction.status = "completed";
        transaction.updatedAt = new Date().toISOString();

        // Atualizar localStorage
        transactions[transactionId] = transaction;
        localStorage.setItem("transactions", JSON.stringify(transactions));

        setPaymentStatus({
          processing: false,
          confirmed: true,
          error: null,
        });
        setPaymentCompleted(true);

        // Enviar email com os dados do pedido
        const orderData = {
          customer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            phone: formData.phone,
          },
          shipping: {
            address: {
              street: formData.street,
              number: formData.number,
              complement: formData.complement,
              neighborhood: formData.neighborhood,
              city: formData.city,
              state: formData.state,
              zipCode: formData.cep,
            },
          },
          items: cartItems,
          totalAmount: total,
          transactionId: transactionId,
        };

        const orderNumber = await sendOrderConfirmationEmail(orderData);
        setOrderNumber(orderNumber);
        clearCart();
        setStep(4); // Ir direto para a página de confirmação

        // Limpar polling
        if (paymentPollingInterval) {
          clearInterval(paymentPollingInterval);
          setPaymentPollingInterval(null);
        }
      }

      setIsPaymentBeingVerified(false);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setPaymentStatus({
        processing: false,
        confirmed: false,
        error: "Erro ao processar pagamento. Tente novamente.",
      });
      setIsPaymentBeingVerified(false);
    }
  };

  // ADICIONE esta nova função para simular o pagamento (apenas para demonstração)
  const simulatePixPayment = () => {
    // Simular que o pagamento foi realizado
    const pixConfirmations = JSON.parse(
      localStorage.getItem("pixConfirmations") || "{}"
    );

    pixConfirmations[transactionId] = {
      timestamp: new Date().toISOString(),
      amount: total,
    };

    localStorage.setItem("pixConfirmations", JSON.stringify(pixConfirmations));
    alert(
      "Simulação: PIX foi pago com sucesso! Agora clique em 'Verificar Pagamento'"
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      scrollToTop(); // Adicionado scroll para o topo
    } else if (step === 3) {
      processPayment();
      scrollToTop(); // Adicionado scroll para o topo
    } else if (step === 3.5 && paymentCompleted) {
      clearCart();
      setStep(4);
      scrollToTop(); // Adicionado scroll para o topo
    }
  };

  // Update the PIX payment section to use actual QR code and manual verification:
  const renderPixPaymentSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaQrcode className="text-blue-500" />
        Pagamento via PIX
      </h2>

      {paymentStatus.error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <FaTimes className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-700">{paymentStatus.error}</p>
          </div>
        </div>
      )}

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-blue-700 font-medium text-center mb-2">
            Escaneie o QR Code abaixo ou copie o código PIX:
          </p>

          {/* QR Code */}
          <div className="bg-white p-4 border-2 border-blue-200 rounded-lg mb-4">
            {pixQrCodeImage ? (
              <img
                src={pixQrCodeImage}
                alt="QR Code do PIX"
                className="w-64 h-64 object-contain"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center">
                <FaSpinner className="text-6xl text-blue-400 animate-spin" />
              </div>
            )}
          </div>

          {/* PIX Key */}
          <div className="w-full">
            <p className="text-sm text-blue-700 mb-1 font-medium">
              Código PIX:
            </p>
            <div className="flex items-center">
              <input
                type="text"
                value={pixCode}
                readOnly
                className="flex-grow bg-white border border-blue-200 rounded-l-lg py-2 px-3 text-sm"
              />
              <button
                onClick={copyPixCode}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
                type="button"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          {/* Payment instructions */}
          <div className="bg-white p-3 rounded-lg border border-blue-100 w-full text-sm text-blue-800">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Abra o aplicativo do seu banco</li>
              <li>Escolha a opção "PIX" ou "Pagar com PIX"</li>
              <li>Escaneie o QR code acima ou cole o código copiado</li>
              <li>Confirme os dados e finalize o pagamento</li>
              <li>Após o pagamento, clique em "Verificar Pagamento" abaixo</li>
            </ol>
          </div>

          {/* Payment status */}
          <div className="mt-6 w-full p-4 rounded-lg bg-blue-100 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 flex items-center">
                <FaRegClock className="mr-2" /> Status:
              </span>
              <span className="font-medium">
                {paymentCompleted ? (
                  <span className="text-green-600 flex items-center">
                    <FaCheck className="mr-1" /> Pagamento Confirmado
                  </span>
                ) : isPaymentBeingVerified ? (
                  <span className="text-blue-600 flex items-center">
                    <FaSpinner className="animate-spin mr-1" /> Verificando...
                  </span>
                ) : (
                  <span className="text-yellow-600">Aguardando Pagamento</span>
                )}
              </span>
            </div>
          </div>

          {paymentVerificationCount > 5 &&
            !paymentCompleted &&
            !isPaymentBeingVerified && (
              <div className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 flex items-start">
                <FaExclamationTriangle className="mt-0.5 mr-2 text-yellow-600 flex-shrink-0" />
                <p>
                  Não recebemos a confirmação do seu pagamento ainda. Isso pode
                  levar alguns instantes dependendo do seu banco. Se você já
                  realizou o pagamento, aguarde um momento e clique em
                  "Verificar Pagamento" novamente.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {!paymentCompleted ? (
          <div className="w-full">
            <Button
              onClick={manuallyCheckPixPayment}
              disabled={isPaymentBeingVerified}
              className="flex items-center justify-center w-full"
            >
              {isPaymentBeingVerified ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaCheck className="mr-2" />
                  Verificar Pagamento
                </span>
              )}
            </Button>
          </div>
        ) : (
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Voltar ao Menu
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Finalizar Compra
        </h1>
        <p className="text-gray-600">
          Complete as informações abaixo para finalizar seu pedido
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[
            { title: "Dados Pessoais", icon: <FaUser /> },
            { title: "Endereço", icon: <FaTruck /> },
            { title: "Pagamento", icon: <FaCreditCard /> },
          ].map((section, index) => (
            <React.Fragment key={index}>
              <motion.div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  step > index + 1
                    ? "bg-blue-500 text-white"
                    : step === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } ${index + 1 === step ? "ring-4 ring-blue-200" : ""}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => index + 1 < step && setStep(index + 1)}
                style={{ cursor: index + 1 < step ? "pointer" : "default" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {step > index + 1 ? <FaCheck /> : section.icon}
              </motion.div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > index + 1 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step labels - more precisely aligned */}
        <div className="flex mt-2 text-sm">
          <div
            className={`w-12 text-center ${
              step === 1 ? "font-semibold text-blue-800" : "text-gray-500"
            }`}
          >
            Dados Pessoais
          </div>
          <div className="flex-1"></div>
          <div
            className={`w-8 text-center ${
              step === 2 ? "font-semibold text-blue-800" : "text-gray-500"
            }`}
          >
            Endereço
          </div>
          <div className="flex-1"></div>
          <div
            className={`w-16 text-center ${
              step === 3 ? "font-semibold text-blue-800" : "text-gray-500"
            }`}
          >
            Pagamento
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-3">
                  <FaUser className="text-blue-500" />
                  Dados Pessoais
                </h2>
                <div className="grid gap-6">
                  <InputField
                    name="name"
                    label="Nome Completo"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                  <InputField
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      name="cpf"
                      label="CPF"
                      value={formData.cpf}
                      onChange={handleFormChange}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      required
                    />
                    <InputField
                      name="phone"
                      label="Telefone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">Continuar</Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-500" />
                  Endereço de Entrega
                </h2>

                <div className="grid gap-6">
                  <div className="relative">
                    <InputField
                      name="cep"
                      label="CEP"
                      value={formData.cep}
                      onChange={handleFormChange}
                      placeholder="00000-000"
                      maxLength={9}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleCEPSearch}
                      disabled={isLoadingCEP || formData.cep.length < 8}
                      className="absolute right-2 top-9 p-2 text-blue-600 hover:text-blue-800"
                    >
                      {isLoadingCEP ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSearch />
                      )}
                    </button>
                  </div>

                  {cepError && (
                    <p className="text-red-600 text-sm mt-1">{cepError}</p>
                  )}

                  {isLoadingCEP && (
                    <div className="flex items-center justify-center py-2">
                      <FaSpinner className="animate-spin text-blue-600 mr-2" />
                      <span className="text-blue-600">
                        Buscando endereço...
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <InputField
                        name="street"
                        label="Rua"
                        value={formData.street}
                        onChange={handleFormChange}
                        required
                        disabled={isLoadingCEP}
                      />
                    </div>
                    <InputField
                      name="number"
                      label="Número"
                      value={formData.number}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <InputField
                    name="complement"
                    label="Complemento"
                    value={formData.complement}
                    onChange={handleFormChange}
                    disabled={isLoadingCEP}
                  />
                  <InputField
                    name="neighborhood"
                    label="Bairro"
                    value={formData.neighborhood}
                    onChange={handleFormChange}
                    required
                    disabled={isLoadingCEP}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      name="city"
                      label="Cidade"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                      disabled={isLoadingCEP}
                    />
                    <InputField
                      name="state"
                      label="Estado"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                      disabled={isLoadingCEP}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Voltar
                  </button>
                  <Button type="submit">Continuar</Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
                  <FaCreditCard className="text-blue-500" />
                  <span className="break-words">Pagamento via PIX</span>
                </h2>

                <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Pagamento via PIX
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Na próxima tela você receberá um QR Code para realizar o
                    pagamento. Após efetuar o pagamento, você receberá a
                    confirmação por email em instantes.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center flex-col">
                    <FaQrcode className="text-blue-500 text-5xl mb-3" />
                    <p className="text-center text-blue-700">
                      O pagamento via PIX é processado instantaneamente e você
                      receberá a confirmação por email.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    disabled={paymentStatus.processing}
                  >
                    Voltar
                  </button>
                  <Button type="submit" disabled={paymentStatus.processing}>
                    {paymentStatus.processing ? (
                      <span className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Processando...
                      </span>
                    ) : (
                      "Gerar QR Code PIX"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* PIX payment step */}
            {step === 3.5 && renderPixPaymentSection()}

            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                {orderNumber && (
                  <h2 className="text-xl text-gray-600 mb-4">
                    Pedido N°: {orderNumber}
                  </h2>
                )}
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  {formData.paymentMethod === "boleto"
                    ? "Pedido Realizado!"
                    : "Pedido Confirmado!"}
                </h2>

                {formData.paymentMethod !== "boleto" && (
                  <p className="text-gray-600 mb-3">
                    Seu pagamento foi processado com sucesso.
                  </p>
                )}

                <p className="text-gray-600 mb-8">
                  Em breve você receberá um email com os detalhes do seu pedido.
                </p>

                {/* Show specific payment confirmation details based on method */}
                {formData.paymentMethod === "boleto" && boletoDetails && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                    <h3 className="font-medium text-yellow-800 mb-2 flex items-center justify-center">
                      <FaBarcode className="mr-2" />
                      Seu Boleto
                    </h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      O boleto foi enviado para seu email e pode ser pago em
                      qualquer agência bancária até a data de vencimento.
                    </p>

                    {boletoDetails.barCodeImage ? (
                      <div className="bg-white p-4 rounded-lg mb-4 border border-yellow-200">
                        <img
                          src={boletoDetails.barCodeImage}
                          alt="Código de barras do boleto"
                          className="h-16 w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="bg-white p-4 rounded-lg mb-4 border border-yellow-200">
                        <div className="h-16 flex items-center justify-center">
                          <FaBarcode className="text-4xl text-yellow-800" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-yellow-700 text-sm font-medium">
                        Vencimento:{" "}
                        {boletoDetails.dueDate ||
                          new Date(
                            Date.now() + 3 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                      </p>
                      <p className="text-yellow-700 text-sm font-medium">
                        Valor: R$ {total.toFixed(2)}
                      </p>
                    </div>

                    <a
                      href={boletoDetails.pdfUrl}
                      download="boleto.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg w-full hover:bg-yellow-700 inline-block text-center"
                    >
                      Download do Boleto
                    </a>
                  </div>
                )}

                {formData.paymentMethod === "pix" && (
                  <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                    <h3 className="font-medium text-blue-800 mb-2 flex items-center justify-center">
                      <FaCheck className="mr-2" />
                      Pagamento PIX Confirmado
                    </h3>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-blue-700 text-sm">
                        O pagamento via PIX foi processado com sucesso. Seu
                        pedido está sendo preparado!
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaArrowLeft className="mr-2" />
                  Voltar para a Loja
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Order Summary Section */}
        {step < 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-96"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 divide-y divide-gray-100">
              <div className="pb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShoppingCart className="text-blue-500" />
                  Resumo do Pedido
                </h3>
                <p className="text-sm text-gray-500">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "itens"}{" "}
                  no carrinho
                </p>
              </div>

              <div className="py-4 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Qtd: {item.quantity}
                        </span>
                        <span className="text-sm text-gray-500">
                          R$ {item.price.toFixed(2)} un
                        </span>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800 whitespace-nowrap">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Frete</span>
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <FaTruck className="text-xs" />
                    Grátis
                  </span>
                </div>
                <div className="pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-blue-600">
                        R$ {total.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500">
                        em até 12x sem juros
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Modified InputField component to support disabled state
const InputField = ({ label, disabled, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors ${
        disabled ? "bg-gray-100 text-gray-500" : ""
      }`}
      disabled={disabled}
      {...props}
    />
  </div>
);

const Button = ({ children, disabled, className, ...props }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.01 } : {}}
    whileTap={!disabled ? { scale: 0.99 } : {}}
    className={`w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </motion.button>
);

const getNextOrderNumber = () => {
  const lastOrderNumber = localStorage.getItem("lastOrderNumber") || 0;
  const nextNumber = (parseInt(lastOrderNumber) + 1)
    .toString()
    .padStart(5, "0");
  localStorage.setItem("lastOrderNumber", nextNumber);
  return nextNumber;
};

const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const orderNumber = getNextOrderNumber();
    const templateParams = {
      to_email: "tififerreira@gmail.com",
      order_number: `Pedido N°: ${orderNumber}`, // Adicionado número do pedido
      customer_name: orderData.customer.name,
      customer_email: orderData.customer.email,
      customer_phone: orderData.customer.phone,
      customer_cpf: orderData.customer.cpf,
      shipping_address: `${orderData.shipping.address.street}, ${orderData.shipping.address.number}`,
      shipping_complement: orderData.shipping.address.complement,
      shipping_neighborhood: orderData.shipping.address.neighborhood,
      shipping_city: `${orderData.shipping.address.city} - ${orderData.shipping.address.state}`,
      shipping_cep: orderData.shipping.address.zipCode,
      order_items: orderData.items
        .map(
          (item) =>
            `${item.name} - Qtd: ${item.quantity} - R$ ${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join("\n"),
      order_total: `R$ ${orderData.totalAmount.toFixed(2)}`,
      payment_method: "PIX",
      transaction_id: orderData.transactionId,
    };

    await emailjs.send(
      "service_k8musaf", // Seu Service ID do EmailJS (encontrado no Integration)
      "template_k0vdpj8", // Seu Template ID do EmailJS (encontrado em Email Templates)
      templateParams,
      "y_Gw2gjFyzo9n9T2h" // Sua Public Key do EmailJS (encontrada em Account > API Keys)
    );

    console.log("Email enviado com sucesso!");
    return orderNumber; // Retornar o número do pedido
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
};

export default CheckoutPage;
