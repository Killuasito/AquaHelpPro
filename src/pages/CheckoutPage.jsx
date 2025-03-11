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
  // Create a simulated transaction
  createTransaction: (orderData) => {
    return new Promise((resolve) => {
      const transactionId = `tx_${Math.random().toString(36).substr(2, 9)}`;

      // Store in localStorage for persistence
      const transaction = {
        id: transactionId,
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage
      const transactions = JSON.parse(
        localStorage.getItem("transactions") || "{}"
      );
      transactions[transactionId] = transaction;
      localStorage.setItem("transactions", JSON.stringify(transactions));

      // Simulate network delay
      setTimeout(() => {
        // Handle different payment methods
        if (orderData.paymentMethod === "credit") {
          resolve({
            success: true,
            transactionId,
            message: "Processando pagamento com cartão",
          });
        } else if (orderData.paymentMethod === "boleto") {
          // Generate mock boleto
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 3);

          const boleto = {
            barCode: "23793381286000782798602186300008790350000010000",
            barCodeImage: "https://dummyimage.com/400x100/000/fff&text=Boleto",
            dueDate: dueDate.toLocaleDateString("pt-BR"),
            pdfUrl: "#",
          };

          transactions[transactionId].boleto = boleto;
          localStorage.setItem("transactions", JSON.stringify(transactions));

          resolve({
            success: true,
            transactionId,
            boleto,
            message: "Boleto gerado com sucesso!",
          });
        } else if (orderData.paymentMethod === "pix") {
          // Generate mock PIX data
          const pix = {
            code: `00020126580014BR.GOV.BCB.PIX0136${Math.random()
              .toString(36)
              .substr(2, 20)}5204000053039865406${orderData.totalAmount.toFixed(
              2
            )}5802BR5913Aquarium Store6008Sao Paulo62150511${transactionId}6304E2B3`,
            qrCodeImage:
              "https://dummyimage.com/400x400/000/fff&text=QR+Code+PIX",
          };

          transactions[transactionId].pix = pix;
          localStorage.setItem("transactions", JSON.stringify(transactions));

          resolve({
            success: true,
            transactionId,
            pix,
            message: "PIX gerado com sucesso!",
          });
        }
      }, 700);
    });
  },

  // Check transaction status (simulates checking with payment provider)
  checkPaymentStatus: (transactionId) => {
    return new Promise((resolve) => {
      // Get transaction from localStorage
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

      // Simulate network delay
      setTimeout(() => {
        // For credit card, simulate 80% success rate
        if (
          transaction.paymentMethod === "credit" &&
          transaction.status === "pending"
        ) {
          const success = Math.random() < 0.8;

          if (success) {
            transaction.status = "completed";
            transaction.updatedAt = new Date().toISOString();
          } else if (Math.random() < 0.3) {
            // 30% chance to fail if not success
            transaction.status = "failed";
            transaction.error = "Cartão recusado pela operadora";
            transaction.updatedAt = new Date().toISOString();
          }
        }

        // For PIX, simulate gradual payment confirmation (10% chance each check)
        if (
          transaction.paymentMethod === "pix" &&
          transaction.status === "pending"
        ) {
          if (Math.random() < 0.1) {
            transaction.status = "completed";
            transaction.updatedAt = new Date().toISOString();
          }
        }

        // Update localStorage
        transactions[transactionId] = transaction;
        localStorage.setItem("transactions", JSON.stringify(transactions));

        resolve({
          success: true,
          status: transaction.status,
          message:
            transaction.status === "completed"
              ? "Pagamento confirmado!"
              : transaction.status === "failed"
              ? transaction.error || "Pagamento falhou."
              : "Aguardando pagamento.",
        });
      }, 500);
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
    paymentMethod: "",
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
    return () => {
      if (paymentPollingInterval) clearInterval(paymentPollingInterval);
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
        paymentMethod: formData.paymentMethod,
      };

      // Add payment details based on method
      if (formData.paymentMethod === "credit") {
        orderData.payment = {
          cardNumber: formData.cardNumber.replace(/\s/g, ""),
          cardName: formData.cardName,
          cardExpiry: formData.cardExpiry,
          cardCvv: formData.cardCvv,
        };
      } else if (formData.paymentMethod === "boleto") {
        orderData.payment = {
          cpf: formData.cpfBoleto || formData.cpf,
        };
      } else if (formData.paymentMethod === "pix") {
        orderData.payment = {
          pixKey: formData.pixKey,
        };
      }

      // Process using client-side payment service
      const response = await PaymentService.createTransaction(orderData);

      if (!response || !response.success) {
        throw new Error(response?.message || "Falha ao processar o pagamento");
      }

      // Store transaction ID
      setTransactionId(response.transactionId);

      // Different handling based on payment method
      if (formData.paymentMethod === "credit") {
        // Start polling for credit card payment status
        const intervalId = setInterval(() => {
          checkPaymentStatus(response.transactionId);
        }, 5000); // Check every 5 seconds

        setPaymentPollingInterval(intervalId);

        // Initial check
        checkPaymentStatus(response.transactionId);
      } else if (formData.paymentMethod === "boleto") {
        // For boleto, we just show the boleto and don't need to verify payment immediately
        setPaymentStatus({
          processing: false,
          confirmed: true,
          error: null,
        });

        // Set boleto details
        setBoletoDetails(response.boleto);

        // Move to confirmation page with boleto details
        setStep(4);
      } else if (formData.paymentMethod === "pix") {
        // For PIX, set the PIX code and QR code
        setPixCode(response.pix.code);
        setPixQrCodeImage(response.pix.qrCodeImage);

        // Start polling for PIX payment
        const intervalId = setInterval(() => {
          checkPaymentStatus(response.transactionId);
        }, 5000);

        setPaymentPollingInterval(intervalId);

        // Show PIX payment screen
        setPaymentStatus({
          processing: false,
          confirmed: false,
          error: null,
        });

        setStep(3.5);
      }
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
  const manuallyCheckPixPayment = () => {
    if (!transactionId) return;

    // For demo purposes, let's simulate a 50% chance of payment confirmation when the user clicks "verify payment"
    setPaymentStatus({ processing: true, confirmed: false, error: null });

    setTimeout(() => {
      // Get the current transaction
      const transactions = JSON.parse(
        localStorage.getItem("transactions") || "{}"
      );
      const transaction = transactions[transactionId];

      if (transaction && transaction.paymentMethod === "pix") {
        // 50% chance of payment confirmation when manually checking
        if (Math.random() < 0.5) {
          transaction.status = "completed";
          transaction.updatedAt = new Date().toISOString();

          // Update localStorage
          transactions[transactionId] = transaction;
          localStorage.setItem("transactions", JSON.stringify(transactions));

          setPaymentStatus({
            processing: false,
            confirmed: true,
            error: null,
          });
          setPaymentCompleted(true);

          // Clear polling
          if (paymentPollingInterval) {
            clearInterval(paymentPollingInterval);
            setPaymentPollingInterval(null);
          }
        } else {
          // Payment still pending
          setPaymentStatus({
            processing: false,
            confirmed: false,
            error: null,
          });
        }
      }

      setIsPaymentBeingVerified(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // Process payment instead of immediately clearing cart
      processPayment();
    } else if (step === 3.5 && paymentCompleted) {
      // If payment is completed at the PIX step, proceed to confirmation
      clearCart();
      setStep(4);
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
          <>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="py-3 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Voltar e Escolher Outro Método
            </button>

            <Button
              onClick={manuallyCheckPixPayment}
              disabled={isPaymentBeingVerified}
              className="flex items-center justify-center"
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
          </>
        ) : (
          <Button onClick={(e) => handleSubmit(e)} className="w-full">
            Concluir Pedido
          </Button>
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
                  <span className="break-words">Forma de Pagamento</span>
                </h2>

                {/* Payment status message */}
                {paymentStatus.error && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <FaTimes className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-red-700">{paymentStatus.error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        className="mr-3"
                        onChange={handleFormChange}
                        checked={formData.paymentMethod === "credit"}
                      />
                      <FaCreditCard className="mr-2 text-blue-500" />
                      Cartão de Crédito
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="boleto"
                        className="mr-3"
                        onChange={handleFormChange}
                        checked={formData.paymentMethod === "boleto"}
                      />
                      <FaBarcode className="mr-2 text-blue-500" />
                      Boleto Bancário
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pix"
                        className="mr-3"
                        onChange={handleFormChange}
                        checked={formData.paymentMethod === "pix"}
                      />
                      <FaMoneyBill className="mr-2 text-blue-500" />
                      PIX
                    </label>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Dados do Cartão
                      </h3>
                      <InputField
                        name="cardNumber"
                        label="Número do Cartão"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleFormChange}
                        required={formData.paymentMethod === "credit"}
                      />
                      <InputField
                        name="cardName"
                        label="Nome no Cartão"
                        placeholder="Como aparece no cartão"
                        value={formData.cardName}
                        onChange={handleFormChange}
                        required={formData.paymentMethod === "credit"}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          name="cardExpiry"
                          label="Validade (MM/AA)"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleFormChange}
                          required={formData.paymentMethod === "credit"}
                        />
                        <InputField
                          name="cardCvv"
                          label="CVV"
                          placeholder="000"
                          value={formData.cardCvv}
                          onChange={handleFormChange}
                          required={formData.paymentMethod === "credit"}
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "boleto" && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Dados para Boleto
                      </h3>
                      <p className="text-gray-600 mb-4">
                        O boleto será gerado em seu nome e enviado para seu
                        email. Você terá até 3 dias úteis para efetuar o
                        pagamento.
                      </p>
                      <InputField
                        name="cpfBoleto"
                        label="CPF/CNPJ do Pagador"
                        placeholder="Digite o CPF ou CNPJ"
                        value={formData.cpfBoleto || formData.cpf}
                        onChange={handleFormChange}
                        required={formData.paymentMethod === "boleto"}
                      />
                      <div className="bg-yellow-50 p-3 rounded-lg mt-3 flex items-start">
                        <FaBarcode className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          Após a confirmação, você receberá o boleto por email e
                          também poderá visualizá-lo na página de confirmação do
                          pedido.
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "pix" && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Pagamento via PIX
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Um QR Code será gerado na próxima página para que você
                        possa efetuar o pagamento imediatamente.
                      </p>

                      <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center flex-col">
                        <FaQrcode className="text-blue-500 text-5xl mb-3" />
                        <p className="text-center text-blue-700">
                          Após confirmar o pedido, você receberá um QR Code para
                          fazer o pagamento via PIX. O pagamento é processado
                          instantaneamente.
                        </p>
                      </div>

                      <InputField
                        name="pixKey"
                        label="Chave PIX para Reembolso (opcional)"
                        placeholder="CPF, email, telefone ou chave aleatória"
                        value={formData.pixKey}
                        onChange={handleFormChange}
                      />
                    </div>
                  )}

                  {!formData.paymentMethod && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-blue-700 text-center">
                        Por favor, selecione uma forma de pagamento para
                        continuar
                      </p>
                    </div>
                  )}
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
                  <Button
                    type="submit"
                    disabled={
                      !isPaymentFormComplete() || paymentStatus.processing
                    }
                    className={
                      !isPaymentFormComplete() || paymentStatus.processing
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  >
                    {paymentStatus.processing ? (
                      <span className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Processando...
                      </span>
                    ) : formData.paymentMethod === "pix" ? (
                      "Gerar QR Code PIX"
                    ) : (
                      "Finalizar Compra"
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
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaShoppingCart className="text-blue-500" />
                Resumo do Pedido
              </h3>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-3 border-b"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        R$ {total.toFixed(2)}
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

export default CheckoutPage;
