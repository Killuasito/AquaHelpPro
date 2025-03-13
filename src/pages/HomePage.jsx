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
  FaQuestionCircle,
  FaCheckCircle,
  FaMobileAlt,
  FaLaptop,
  FaBell,
  FaClock,
  FaTachometerAlt,
  FaUsers,
  FaStar,
  FaMedal,
  FaShieldAlt,
  FaHandHoldingWater,
  FaChevronDown,
  FaStore,
  FaShoppingCart,
  FaBox,
  FaTruck,
  FaPercent,
  FaTag,
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
          saudável e deslumbrante com a plataforma mais completa de
          gerenciamento de aquários e loja especializada.
        </motion.p>

        {/* Hero CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link to="/register">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaClipboardList className="mr-2" /> Começar Agora
            </motion.button>
          </Link>
          <Link to="/products/fish">
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaStore className="mr-2" /> Visitar Loja
            </motion.button>
          </Link>
          <Link to="/beginner-guide">
            <motion.button
              className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-200 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRegLightbulb className="mr-2" /> Guia para Iniciantes
            </motion.button>
          </Link>
        </div>

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

      {/* What We Offer Section */}
      <section className="max-w-6xl mx-auto my-24">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            O que oferecemos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O Aquasferium é uma plataforma completa para aquaristas de todos os
            níveis, com gerenciamento de aquários e uma loja especializada para
            todas as suas necessidades.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <FeatureCard
            icon={<FaWater />}
            title="Qualidade da Água"
            description="Monitore todos os parâmetros essenciais da água com gráficos detalhados e receba alertas quando algo estiver fora do ideal."
            color="blue"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaLeaf />}
            title="Plantas Aquáticas"
            description="Catálogo completo com mais de 200 espécies de plantas, com dicas de cuidado e compatibilidade com seu aquário."
            color="green"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaFish />}
            title="Catálogo de Peixes"
            description="Informações detalhadas sobre mais de 1000 espécies de peixes, incluindo comportamento, compatibilidade e requisitos específicos."
            color="teal"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaBell />}
            title="Lembretes Personalizados"
            description="Nunca mais esqueça de trocar a água, alimentar os peixes ou realizar manutenções importantes no seu aquário."
            color="purple"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaChartLine />}
            title="Análise de Tendências"
            description="Acompanhe a evolução dos parâmetros do seu aquário ao longo do tempo e identifique padrões para prevenir problemas."
            color="indigo"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaMobileAlt />}
            title="Acesso em Qualquer Lugar"
            description="Gerencie seu aquário pelo computador ou smartphone com nossa plataforma totalmente responsiva e intuitiva."
            color="red"
            variants={itemVariants}
          />

          <FeatureCard
            icon={<FaStore />}
            title="Loja Especializada"
            description="Adquira peixes saudáveis, plantas vibrantes e equipamentos de qualidade selecionados por especialistas, com entrega em todo o Brasil."
            color="amber"
            variants={itemVariants}
          />
        </motion.div>
      </section>

      {/* Our Store Section - NEW */}
      <motion.section
        className="flex justify-center my-24 py-8 md:py-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl mx-auto w-full md:w-2/3"
        variants={itemVariants}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4 text-center md:text-left">
                Nossa Loja Especializada
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 text-center md:text-left">
                Além de gerenciar seu aquário, você pode encontrar tudo o que
                precisa em nossa loja online. Oferecemos uma seleção premium de
                peixes ornamentais, plantas aquáticas vibrantes e equipamentos
                de alta qualidade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start space-x-2 bg-white p-3 rounded-lg shadow-sm">
                  <FaFish className="text-blue-500 text-lg mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Peixes saudáveis e aclimatados
                  </span>
                </div>
                <div className="flex items-start space-x-2 bg-white p-3 rounded-lg shadow-sm">
                  <FaLeaf className="text-green-500 text-lg mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Plantas cultivadas em ambientes controlados
                  </span>
                </div>
                <div className="flex items-start space-x-2 bg-white p-3 rounded-lg shadow-sm">
                  <FaBox className="text-amber-500 text-lg mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Equipamentos das melhores marcas
                  </span>
                </div>
                <div className="flex items-start space-x-2 bg-white p-3 rounded-lg shadow-sm">
                  <FaTruck className="text-gray-500 text-lg mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Entrega segura em todo o Brasil
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Link to="/products/fish">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center text-sm md:text-base"
                  >
                    <FaFish className="mr-2" /> Ver Peixes
                  </motion.button>
                </Link>
                <Link to="/products/plants">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center text-sm md:text-base"
                  >
                    <FaLeaf className="mr-2" /> Ver Plantas
                  </motion.button>
                </Link>
                <Link to="/products/equipment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center text-sm md:text-base"
                  >
                    <FaBox className="mr-2" /> Ver Equipamentos
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-0">
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://i0.wp.com/patadigital.com/wp-content/uploads/2024/03/image-30.png?resize=960%2C590&ssl=1"
                  alt="Peixe ornamental"
                  className="w-full h-32 md:h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs md:text-sm font-semibold text-center">
                    Peixes Ornamentais
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl overflow-hidden shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://www.aquaplantados.com.br/image/cache/catalog/PLANTAS/Anubias%20barteri%20var.%20nana-800x800.jpg"
                  alt="Plantas aquáticas"
                  className="w-full h-32 md:h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs md:text-sm font-semibold text-center">
                    Plantas Aquáticas
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl overflow-hidden shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://m.media-amazon.com/images/I/41MZNX9eIQL.jpg"
                  alt="Equipamentos"
                  className="w-full h-32 md:h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs md:text-sm font-semibold text-center">
                    Equipamentos
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl overflow-hidden shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://images.tcdn.com.br/img/img_prod/648834/camarao_takashi_amano_caridina_multidentata_5_unidades_7779_9_42b3e269ba81465eca29f6b8ee987025.jpeg"
                  alt="Invertebrados"
                  className="w-full h-32 md:h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs md:text-sm font-semibold text-center">
                    Invertebrados
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="flex justify-center my-24 py-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl mx-auto w-full md:w-2/3"
        variants={itemVariants}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <img
                  src="https://cdnx.jumpseller.com/hydra-fertilizers/image/42686037/RGB-Landscaping-Lighting-aquarium-lamp-LED-Aquarium-Light-WEEK-AQUA-P-Series-Pandora-APP-control-Adjustable.webp?1701167878"
                  alt="Aquário plantado"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Sobre a Aquasferium
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A Aquasferium nasceu da paixão por aquarismo e da necessidade de
                uma solução completa para gerenciamento de aquários. Nossa
                missão é tornar o hobby mais acessível e prazeroso para todos.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Desenvolvida por aquaristas para aquaristas, nossa plataforma
                combina conhecimento técnico e experiência prática para oferecer
                as melhores ferramentas e informações para o sucesso do seu
                aquário.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">
                    Fundada em 2024
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                ></motion.div>
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="max-w-6xl mx-auto my-24"
        variants={itemVariants}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Começar a usar a AquaHelpPro é simples. Siga estes passos para
            transformar o gerenciamento do seu aquário.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard
            number="1"
            title="Cadastre seu aquário"
            description="Informe as dimensões, equipamentos e configuração atual do seu aquário."
            icon={<FaClipboardList />}
          />
          <StepCard
            number="2"
            title="Adicione suas espécies"
            description="Registre os peixes e plantas que você possui ou planeja adicionar."
            icon={<FaFish />}
          />
          <StepCard
            number="3"
            title="Registre parâmetros"
            description="Mantenha um histórico de medições como pH, amônia, nitrato e temperatura."
            icon={<FaTachometerAlt />}
          />
          <StepCard
            number="4"
            title="Receba orientações"
            description="Obtenha recomendações personalizadas e lembretes de manutenção."
            icon={<FaRegLightbulb />}
          />
        </div>

        <div className="text-center mt-12">
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register" className="flex items-center">
              <FaClipboardList className="mr-2" /> Cadastrar Meu Aquário
            </Link>
          </motion.button>
        </div>
      </motion.section>

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
            programe manutenções e receba lembretes personalizados. Nossa
            plataforma é 100% gratuita! E ainda oferecemos produtos
            especializados em nossa loja online.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md"
              >
                Criar Registro
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products/fish"
                className="inline-block bg-amber-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-md"
              >
                <span className="flex items-center">
                  <FaShoppingCart className="mr-2" /> Visitar Loja
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Testimonials Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-24 px-4"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          O que dizem nossos usuários
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Este site oferece uma ampla gama de produtos de alta qualidade para o controle preciso do pH e o tratamento eficiente da água, garantindo resultados excepcionais e a manutenção ideal do seu aquário."
            name="Anderson José"
            role="Químico"
            avatar="AJ"
          />
          <TestimonialCard
            quote="As dicas e guia são incríveis! Recebi ajuda quando tive problemas com meus peixes e agora posso ajudar outros iniciantes."
            name="Renata Ferreira"
            role="Aquarista profissional"
            avatar="RF"
          />
          <TestimonialCard
            quote="Os lembretes de manutenção salvaram meu aquário várias vezes. A interface é intuitiva e os recursos são exatamente o que eu precisava!"
            name="Kamilly Danieli"
            role="Iniciante em aquarismo"
            avatar="KD"
          />
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.section
        className="max-w-4xl mx-auto my-24"
        variants={itemVariants}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossa plataforma e
            serviços
          </p>
        </div>

        <div className="space-y-6">
          <FaqItem
            question="O Aquasferium é gratuito?"
            answer="Sim! Oferecemos uma versão completamente gratuita com todas as funcionalidades essenciais para o gerenciamento do seu aquário. Também temos planos premium com recursos avançados para aquaristas profissionais."
          />
          <FaqItem
            question="Posso gerenciar múltiplos aquários?"
            answer="Absolutamente! Nossa plataforma permite que você cadastre e gerencie quantos aquários desejar, cada um com suas próprias configurações, espécies e parâmetros."
          />
          <FaqItem
            question="Como funciona o sistema de lembretes?"
            answer="O sistema de lembretes analisa os dados do seu aquário e cria alertas personalizados para trocas de água, alimentação, adição de fertilizantes, manutenção de equipamentos e muito mais, tudo baseado nas necessidades específicas do seu ecossistema."
          />
          <FaqItem
            question="Posso usar o Aquasferium em dispositivos móveis?"
            answer="Sim, nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones e tablets. Também oferecemos um aplicativo nativo para iOS e Android com funcionalidades offline."
          />
          <FaqItem
            question="Como funciona a entrega dos produtos da loja?"
            answer="Trabalhamos com transportadoras especializadas para garantir que peixes, plantas e equipamentos cheguem com segurança. Peixes e plantas vivas são enviados com embalagem especial para garantir sua saúde e vitalidade durante o transporte. Entregamos para todo o Brasil, com prazos variando de 1 a 5 dias úteis dependendo da sua localização."
          />

          <FaqItem
            question="É possível comprar produtos diretamente pela plataforma?"
            answer="Sim! Nossa loja online está totalmente integrada à plataforma de gerenciamento. Você pode navegar por categorias de produtos, ver recomendações personalizadas baseadas no seu aquário e finalizar suas compras com facilidade. Aceitamos diversos métodos de pagamento e oferecemos promoções exclusivas para usuários cadastrados."
          />
        </div>
      </motion.section>

      {/* Final Call to Action */}
      <motion.section
        className="max-w-4xl mx-auto my-24 text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Pronto para começar?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Junte-se a milhares de aquaristas que já transformaram seus aquários
          com o Aquasferium e descubra produtos de qualidade em nossa loja
          especializada
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register" className="flex items-center">
              <FaClipboardList className="mr-2" /> Cadastrar Meu Aquário
            </Link>
          </motion.button>

          <motion.button
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products/fish" className="flex items-center">
              <FaStore className="mr-2" /> Visitar Loja
            </Link>
          </motion.button>

          <motion.button
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/beginner-guide" className="flex items-center">
              <FaRegLightbulb className="mr-2" /> Explorar Recursos
            </Link>
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color, variants }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 shadow-blue-200",
    green: "from-green-500 to-green-600 shadow-green-200",
    yellow: "from-yellow-500 to-yellow-600 shadow-yellow-200",
    purple: "from-purple-500 to-purple-600 shadow-purple-200",
    indigo: "from-indigo-500 to-indigo-600 shadow-indigo-200",
    red: "from-red-500 to-red-600 shadow-red-200",
    teal: "from-teal-500 to-teal-600 shadow-teal-200",
    amber: "from-amber-500 to-amber-600 shadow-amber-200",
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
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Step Card Component
const StepCard = ({ number, title, description, icon }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md relative"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute -top-4 -left-2">
        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {number}
        </div>
      </div>
      <div className="text-center mt-2">
        <motion.div
          className="text-4xl text-blue-500 mb-4 flex justify-center"
          animate={{ rotateY: [0, 360] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, name, role, avatar }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500 relative">
      <div className="text-blue-500 opacity-20 text-9xl font-serif absolute -top-10 -left-4">
        "
      </div>
      <p className="italic text-lg text-gray-600 mb-6 relative z-10">
        "{quote}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-blue-600">{avatar}</span>
        </div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden"
      initial={false}
      animate={{
        backgroundColor: isOpen ? "rgba(239, 246, 255, 0.6)" : "white",
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <FaQuestionCircle className="text-blue-500 mr-3" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown
            className={`transform ${
              isOpen ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-600">{answer}</div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
