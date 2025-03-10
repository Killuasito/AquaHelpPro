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
} from "react-icons/fa";

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
  const [pixCode] = useState("546.965.398-65");

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  // Process payment based on payment method
  const processPayment = () => {
    setPaymentStatus({ processing: true, confirmed: false, error: null });

    // Different handling based on payment method
    if (formData.paymentMethod === "credit") {
      // Credit card payment simulation
      setTimeout(() => {
        // 80% success rate
        const success = Math.random() < 0.8;

        if (success) {
          setPaymentStatus({
            processing: false,
            confirmed: true,
            error: null,
          });
          setPaymentCompleted(true);
          clearCart();
          setStep(4);
        } else {
          setPaymentStatus({
            processing: false,
            confirmed: false,
            error:
              "Não foi possível processar o pagamento com cartão. Por favor, verifique os dados ou tente outro método.",
          });
        }
      }, 2000);
    } else if (formData.paymentMethod === "boleto") {
      // Boleto generation always succeeds
      setTimeout(() => {
        setPaymentStatus({
          processing: false,
          confirmed: true,
          error: null,
        });
        // Boleto requires manual payment confirmation later
        setStep(4); // Move to confirmation page with boleto details
      }, 1500);
    } else if (formData.paymentMethod === "pix") {
      // For PIX, we just generate the code and wait for customer to confirm
      setTimeout(() => {
        setPaymentStatus({
          processing: false,
          confirmed: false,
          error: null,
        });
        // Show PIX payment details but don't advance to confirmation yet
        setStep(3.5); // Using 3.5 to represent the PIX payment step
      }, 1000);
    }
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
            className={`w-12 text-center ${
              step === 2 ? "font-semibold text-blue-800" : "text-gray-500"
            }`}
          >
            Endereço
          </div>
          <div className="flex-1"></div>
          <div
            className={`w-12 text-center ${
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
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
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
                      required
                    />
                    <InputField
                      name="phone"
                      label="Telefone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">Continuar</Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-500" />
                  Endereço de Entrega
                </h2>
                <div className="grid gap-6">
                  <InputField
                    name="cep"
                    label="CEP"
                    value={formData.cep}
                    onChange={handleFormChange}
                    required
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <InputField
                        name="street"
                        label="Rua"
                        value={formData.street}
                        onChange={handleFormChange}
                        required
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
                  />
                  <InputField
                    name="neighborhood"
                    label="Bairro"
                    value={formData.neighborhood}
                    onChange={handleFormChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      name="city"
                      label="Cidade"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                    />
                    <InputField
                      name="state"
                      label="Estado"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FaCreditCard className="text-blue-500" />
                  Forma de Pagamento
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
            {step === 3.5 && (
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
                      <div className="w-64 h-64 flex items-center justify-center">
                        <FaQrcode className="text-8xl text-blue-800" />
                      </div>
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
                          ) : (
                            <span className="text-yellow-600">
                              Aguardando Pagamento
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
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
                        onClick={simulatePixConfirmation}
                        disabled={paymentStatus.processing}
                        className="flex items-center justify-center"
                      >
                        {paymentStatus.processing ? (
                          <span className="flex items-center">
                            <FaSpinner className="animate-spin mr-2" />
                            Verificando...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FaCheck className="mr-2" />
                            Já Realizei o Pagamento
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
            )}

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
                {formData.paymentMethod === "boleto" && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                    <h3 className="font-medium text-yellow-800 mb-2 flex items-center justify-center">
                      <FaBarcode className="mr-2" />
                      Seu Boleto
                    </h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      O boleto foi enviado para seu email e pode ser pago em
                      qualquer agência bancária até a data de vencimento.
                    </p>
                    <div className="bg-white p-4 rounded-lg mb-4 border border-yellow-200">
                      <div className="h-16 flex items-center justify-center">
                        <FaBarcode className="text-4xl text-yellow-800" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-yellow-700 text-sm font-medium">
                        Vencimento:{" "}
                        {new Date(
                          Date.now() + 3 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-yellow-700 text-sm font-medium">
                        Valor: R$ {total.toFixed(2)}
                      </p>
                    </div>
                    <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg w-full hover:bg-yellow-700">
                      Download do Boleto
                    </button>
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

// Componentes auxiliares
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
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
