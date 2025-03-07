import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaFish,
  FaThermometerHalf,
  FaFlask,
  FaTint,
  FaClipboardList,
  FaSave,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aquariumName: "",
    aquariumType: "",
    capacity: "",
    fishSpecies: "",
    waterPh: "",
    temperature: "",
    waterChange: "",
    notes: "",
  });

  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Add touched state to track field interactions
  const [touched, setTouched] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate ID and add date
    const newAquarium = {
      ...formData,
      id: Date.now(),
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    // Get existing aquariums from localStorage or initialize empty array
    const existingAquariums = JSON.parse(
      localStorage.getItem("aquariums") || "[]"
    );

    // Add new aquarium to the array
    const updatedAquariums = [...existingAquariums, newAquarium];

    // Save to localStorage
    localStorage.setItem("aquariums", JSON.stringify(updatedAquariums));

    // Show success animation
    setSubmitted(true);

    // Reset after animation completes and redirect
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        aquariumName: "",
        aquariumType: "",
        capacity: "",
        fishSpecies: "",
        waterPh: "",
        temperature: "",
        waterChange: "",
        notes: "",
      });
      setFormStep(0);
      navigate("/my-aquariums"); // Redirect to aquariums page
    }, 2000);
  };

  const nextStep = () => setFormStep(formStep + 1);
  const prevStep = () => setFormStep(formStep - 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const formSections = [
    {
      title: "Informações Básicas",
      icon: <FaFish />,
      fields: (
        <>
          <InputField
            label="Nome do Aquário"
            name="aquariumName"
            value={formData.aquariumName}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.aquariumName}
            placeholder="Ex: Aquário da Sala"
            icon={<FaFish className="text-blue-500" />}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Tipo de Aquário"
              name="aquariumType"
              value={formData.aquariumType}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.aquariumType}
              options={[
                { value: "", label: "Selecione um tipo" },
                { value: "freshwater", label: "Água Doce" },
                { value: "saltwater", label: "Água Salgada" },
                { value: "brackish", label: "Água Salobra" },
                { value: "planted", label: "Plantado" },
              ]}
              icon={<FaTint className="text-blue-500" />}
              required
            />

            <InputField
              label="Capacidade (litros)"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.capacity}
              placeholder="Ex: 100"
              icon={<FaFlask className="text-blue-500" />}
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Parâmetros da Água",
      icon: <FaFlask />,
      fields: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="pH da Água"
              name="waterPh"
              type="number"
              min="0"
              max="14"
              step="0.1"
              value={formData.waterPh}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.waterPh}
              placeholder="Ex: 7.0"
              icon={<FaFlask className="text-blue-500" />}
              required
            />

            <InputField
              label="Temperatura (°C)"
              name="temperature"
              type="number"
              min="0"
              max="40"
              step="0.1"
              value={formData.temperature}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.temperature}
              placeholder="Ex: 25.5"
              icon={<FaThermometerHalf className="text-blue-500" />}
              required
            />
          </div>

          <TextAreaField
            label="Histórico de Trocas de Água"
            name="waterChange"
            value={formData.waterChange}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.waterChange}
            placeholder="Descreva seu cronograma de trocas de água (ex: 25% a cada 15 dias)"
            icon={<FaTint className="text-blue-500" />}
            required
          />
        </>
      ),
    },
    {
      title: "Habitantes e Observações",
      icon: <FaClipboardList />,
      fields: (
        <>
          <TextAreaField
            label="Espécies de Peixes"
            name="fishSpecies"
            value={formData.fishSpecies}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.fishSpecies}
            placeholder="Liste os tipos e quantidades de peixes (ex: 5x Neon Tetra, 2x Betta)"
            icon={<FaFish className="text-blue-500" />}
            required
          />

          <TextAreaField
            label="Observações Adicionais"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.notes}
            placeholder="Inclua quaisquer informações adicionais relevantes sobre seu aquário"
            icon={<FaClipboardList className="text-blue-500" />}
          />
        </>
      ),
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {submitted ? (
        <motion.div
          className="text-center py-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            <FaSave className="text-5xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Registrado com Sucesso!
          </h2>
          <p className="text-lg text-gray-600">
            Seu aquário foi registrado em nosso sistema.
          </p>
          <p className="text-md text-blue-500 mt-3">
            Redirecionando para seus aquários...
          </p>
        </motion.div>
      ) : (
        <>
          {/* Form Header with Aquarium Icon */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block bg-blue-100 p-4 rounded-full mb-4">
              <FaFish className="text-4xl text-blue-600" />
            </div>
            <h2 className="text-3xl font-semibold text-blue-800">
              Registrar Aquário
            </h2>
            <p className="text-blue-600 mt-2">
              Preencha os detalhes do seu aquário para um melhor monitoramento
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {formSections.map((section, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      formStep >= index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    } ${index === formStep ? "ring-4 ring-blue-200" : ""}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {section.icon}
                  </motion.div>
                  {index < formSections.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        formStep > index ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-blue-800 px-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className={`text-center ${
                    index === formStep ? "font-semibold" : "text-gray-500"
                  }`}
                  style={{
                    width: `${100 / formSections.length}%`,
                    marginLeft: index === 0 ? "0" : "-10px",
                    marginRight:
                      index === formSections.length - 1 ? "0" : "-10px",
                  }}
                >
                  {section.title}
                </div>
              ))}
            </div>
          </div>

          {/* Multi-step Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
            key={formStep}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <span className="bg-blue-100 p-2 rounded-full mr-3">
                  {formSections[formStep].icon}
                </span>
                {formSections[formStep].title}
              </h3>
              {formSections[formStep].fields}
            </div>

            <div className="flex justify-between mt-8">
              {formStep > 0 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voltar
                </motion.button>
              )}
              <div className="ml-auto">
                {formStep < formSections.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Próximo
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave className="mr-2" />
                    Registrar Aquário
                  </motion.button>
                )}
              </div>
            </div>
          </motion.form>
        </>
      )}
    </motion.div>
  );
};

// Enhanced Input Field Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  touched,
  ...props
}) => {
  const isRequired = props.required;
  const isEmpty = touched && !value && isRequired;

  return (
    <div className="mb-6">
      <label className="block text-blue-800 font-medium mb-2 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full p-3 pl-4 pr-10 border-2 rounded-lg transition-all duration-200
            ${
              isEmpty
                ? "border-red-300 bg-red-50"
                : "border-gray-300 focus:border-blue-500"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-200
            ${value ? "bg-blue-50" : "bg-white"}`}
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
          {...props}
        />

        {value && !isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
          >
            <FaCheck />
          </motion.span>
        )}

        {isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
          >
            <FaExclamationCircle />
          </motion.span>
        )}
      </div>

      {isEmpty && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-1"
        >
          Este campo é obrigatório
        </motion.p>
      )}
    </div>
  );
};

// Enhanced TextArea Field Component
const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  touched,
  ...props
}) => {
  const isRequired = props.required;
  const isEmpty = touched && !value && isRequired;

  return (
    <div className="mb-6">
      <label className="block text-blue-800 font-medium mb-2 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full p-3 pl-4 pr-10 border-2 rounded-lg transition-all duration-200
            resize-none h-32
            ${
              isEmpty
                ? "border-red-300 bg-red-50"
                : "border-gray-300 focus:border-blue-500"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-200
            ${value ? "bg-blue-50" : "bg-white"}`}
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
          {...props}
        />

        {value && !isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-3 text-green-500"
          >
            <FaCheck />
          </motion.span>
        )}

        {isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-3 text-red-500"
          >
            <FaExclamationCircle />
          </motion.span>
        )}
      </div>

      {isEmpty && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-1"
        >
          Este campo é obrigatório
        </motion.p>
      )}
    </div>
  );
};

// Enhanced Select Field Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  icon,
  touched,
  ...props
}) => {
  const isRequired = props.required;
  const isEmpty = touched && (!value || value === "") && isRequired;

  return (
    <div className="mb-6">
      <label className="block text-blue-800 font-medium mb-2 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full p-3 pl-4 pr-10 border-2 rounded-lg appearance-none transition-all duration-200
            ${
              isEmpty
                ? "border-red-300 bg-red-50"
                : "border-gray-300 focus:border-blue-500"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-200
            ${value && value !== "" ? "bg-blue-50" : "bg-white"}`}
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        {value && value !== "" && !isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-green-500"
          >
            <FaCheck />
          </motion.span>
        )}

        {isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-500"
          >
            <FaExclamationCircle />
          </motion.span>
        )}
      </div>

      {isEmpty && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-1"
        >
          Este campo é obrigatório
        </motion.p>
      )}
    </div>
  );
};

export default RegisterPage;
