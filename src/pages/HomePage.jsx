import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWater,
  FaFish,
  FaClipboardList,
  FaChartLine,
  FaLeaf,
  FaRegLightbulb,
} from "react-icons/fa";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="py-16 px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
          Bem-vindo ao Mundo do Aquarismo!
        </h1>

        <motion.p
          className="text-xl text-blue-700 mb-8 leading-relaxed"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Descubra tudo o que você precisa para criar um ambiente aquático
          saudável e deslumbrante para seus peixes.
        </motion.p>

        {/* Decorative fish icon */}
        <motion.div
          className="flex justify-center mb-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaFish className="text-6xl text-blue-500" />
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <FeatureCard
          icon={<FaWater />}
          title="Qualidade da Água"
          description="Aprenda a manter os parâmetros da água em níveis ideais para cada espécie de peixe."
          color="blue"
          variants={itemVariants}
        />

        <FeatureCard
          icon={<FaLeaf />}
          title="Plantas Aquáticas"
          description="Descubra como cultivar plantas que embelezam seu aquário e melhoram a saúde dos peixes."
          color="green"
          variants={itemVariants}
        />

        <FeatureCard
          icon={<FaRegLightbulb />}
          title="Dicas para Iniciantes"
          description="Evite erros comuns e descubra as melhores práticas para começar no hobby do aquarismo."
          color="yellow"
          variants={itemVariants}
        />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="mt-20 text-center max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-xl p-10 text-white">
          <h2 className="text-3xl font-semibold mb-6">Registre Seu Aquário</h2>

          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FaClipboardList className="text-4xl text-white" />
          </motion.div>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Mantenha um controle eficiente sobre os parâmetros do seu aquário,
            programe manutenções e receba lembretes personalizados.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md"
            >
              Criar Registro
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-10 text-center"
        variants={containerVariants}
      >
        <StatCard
          number="1000+"
          text="Espécies Cadastradas"
          icon={<FaFish />}
          variants={itemVariants}
        />

        <StatCard
          number="24/7"
          text="Suporte da Comunidade"
          icon={<FaChartLine />}
          variants={itemVariants}
        />

        <StatCard
          number="5000+"
          text="Aquários Registrados"
          icon={<FaClipboardList />}
          variants={itemVariants}
        />
      </motion.div>

      {/* Testimonials or Featured Content could go here */}
      <motion.div
        className="max-w-6xl mx-auto mt-24 px-4"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          Por que os entusiastas adoram nosso site
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500 relative">
            <div className="text-blue-500 opacity-20 text-9xl font-serif absolute -top-10 -left-4">
              "
            </div>
            <p className="italic text-lg text-gray-600 mb-6 relative z-10">
              "Este site transformou a maneira como cuido do meu aquário. As
              ferramentas de acompanhamento são fáceis de usar e as dicas foram
              inestimáveis!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600">RM</span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Ricardo Martins</h4>
                <p className="text-sm text-gray-500">Aquarista há 3 anos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500 relative">
            <div className="text-blue-500 opacity-20 text-9xl font-serif absolute -top-10 -left-4">
              "
            </div>
            <p className="italic text-lg text-gray-600 mb-6 relative z-10">
              "A comunidade é incrível! Recebi ajuda quando tive problemas com
              meus peixes e agora posso ajudar outros iniciantes."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600">AS</span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Ana Silva</h4>
                <p className="text-sm text-gray-500">Aquarista profissional</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color, variants }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 shadow-blue-200",
    green: "from-green-500 to-green-600 shadow-green-200",
    yellow: "from-yellow-500 to-yellow-600 shadow-yellow-200",
  };

  return (
    <motion.div
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
      variants={variants}
      whileHover={{ y: -5 }}
    >
      <div
        className={`p-6 text-white bg-gradient-to-br ${colorClasses[color]}`}
      >
        <div className="text-3xl mb-2">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ number, text, icon, variants }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md"
      variants={variants}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.div
        className="text-4xl text-blue-500 mb-2 flex justify-center"
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-3xl font-bold text-gray-800">{number}</h3>
      <p className="text-blue-600 mt-1">{text}</p>
    </motion.div>
  );
};

export default HomePage;
