import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFish,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaPaperPlane,
  FaCheck,
  FaAnchor,
  FaBookOpen,
  FaCalculator,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const footerLinks = [
    {
      title: "Recursos",
      links: [
        {
          text: "Guia para Iniciantes",
          url: "/beginner-guide",
          icon: <FaBookOpen />,
        },
        { text: "Espécies de Peixes", url: "/fish-species", icon: <FaFish /> },
        {
          text: "Calculadora de Parâmetros",
          url: "/parameter-calculator",
          icon: <FaCalculator />,
        },
        {
          text: "Calendário de Manutenção",
          url: "/maintenance-calendar",
          icon: <FaCalendarAlt />,
        },
        { text: "Plantas Aquáticas", url: "/plant-species", icon: <FaLeaf /> },
      ],
    },
  ];

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Simple email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    setIsEmailValid(valid);

    if (valid) {
      // Simulate API call success
      setTimeout(() => {
        setIsSubmitted(true);
        setEmail("");

        // Reset after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 500);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-500 to-blue-700 text-white overflow-hidden relative">
      {/* Animated water wave at top */}
      <div className="w-full overflow-hidden">
        <svg
          className="relative block w-full rotate-180"
          style={{ height: "40px", marginTop: "-1px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Fish swimming above footer content */}
      <div className="absolute w-full" style={{ top: "20px", zIndex: 0 }}>
        <motion.div
          className="absolute left-0"
          animate={{
            x: ["0%", "100%"],
            y: [0, -15, 0, 15, 0],
          }}
          transition={{
            x: { duration: 30, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 5, repeat: Infinity },
          }}
        >
          <FaFish className="text-blue-300 opacity-30" size={28} />
        </motion.div>

        <motion.div
          className="absolute left-1/4"
          animate={{
            x: ["0%", "100%"],
            y: [0, 20, 0, -20, 0],
          }}
          transition={{
            x: { duration: 25, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 7, repeat: Infinity },
          }}
        >
          <FaFish className="text-blue-200 opacity-20" size={22} />
        </motion.div>

        <motion.div
          className="absolute left-2/3"
          animate={{
            x: ["0%", "100%"],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            x: { duration: 35, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 6, repeat: Infinity },
          }}
        >
          <FaFish className="text-blue-100 opacity-25" size={18} />
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-5"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white rounded-full p-2">
                <FaFish className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">AquaHelpPro</h2>
            </motion.div>
            <p className="text-blue-100 mb-5 leading-relaxed">
              Sua fonte completa de informações sobre aquários, peixes
              ornamentais e manutenção de ambientes aquáticos. Ajudando
              entusiastas a criarem habitats saudáveis desde 2024.
            </p>
            <div className="flex space-x-3 mt-5">
              <SocialIcon icon={<FaFacebook />} ariaLabel="Facebook" />
              <SocialIcon icon={<FaTwitter />} ariaLabel="Twitter" />
              <SocialIcon icon={<FaInstagram />} ariaLabel="Instagram" />
              <SocialIcon icon={<FaYoutube />} ariaLabel="YouTube" />
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-5 border-b border-blue-400 pb-2 flex items-center">
              <FaAnchor className="mr-2" /> Links Rápidos
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" text="Início" />
              <FooterLink to="/register" text="Registrar Aquário" />
              <FooterLink to="/tips" text="Dicas" />
              <FooterLink to="/products/fish" text="Nossos Peixes" />
              <FooterLink to="/products/plants" text="Nossas Plantas" />
              <FooterLink to="/products/equipment" text="Nossos Equipamentos" />
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-5 border-b border-blue-400 pb-2 flex items-center">
              <FaFish className="mr-2" /> Recursos
            </h3>
            <ul className="space-y-3">
              {footerLinks[0].links.map((link, j) => (
                <motion.li
                  key={j}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to={link.url}
                    className="text-blue-200 hover:text-white transition flex items-center gap-2"
                  >
                    {link.icon && (
                      <span className="text-blue-300">{link.icon}</span>
                    )}
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-5 border-b border-blue-400 pb-2 flex items-center">
              <FaEnvelope className="mr-2" /> Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <span className="text-blue-200 mt-1 group-hover:text-white transition-colors">
                  <FaEnvelope />
                </span>
                <a
                  href="mailto:contato@aquarismo.com.br"
                  className="hover:text-blue-200 transition-colors"
                >
                  tififerreira@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="text-blue-200 mt-1 group-hover:text-white transition-colors">
                  <FaPhone />
                </span>
                <a
                  href="tel:+551155551234"
                  className="hover:text-blue-200 transition-colors"
                >
                  (11) 93248-2402
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="text-blue-200 mt-1 group-hover:text-white transition-colors">
                  <FaMapMarkerAlt />
                </span>
                <span>Vargem Grande Paulista, SP - Brasil</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Receba nossas novidades:</h4>

              {!isSubmitted ? (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex group">
                    <input
                      type="email"
                      placeholder="Seu email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEmailValid(true); // Reset validation on change
                      }}
                      className={`px-4 py-2 text-gray-700 rounded-l-md border-2 
                        ${
                          !isEmailValid ? "border-red-400" : "border-blue-200"
                        } border-r-0
                        focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                        bg-white bg-opacity-90 transition-all duration-200 flex-1`}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-r-md
                        text-white font-medium transition-colors flex items-center justify-center
                        ${
                          !isEmailValid
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      <span className="hidden sm:inline mr-1">Enviar</span>
                      <FaPaperPlane className="text-sm" />
                    </motion.button>
                  </div>
                  {!isEmailValid && (
                    <p className="text-red-300 text-sm">
                      Por favor, insira um email válido.
                    </p>
                  )}
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-600 text-white px-4 py-3 rounded-md flex items-center"
                >
                  <FaCheck className="mr-2" />
                  <span>Obrigado! Email cadastrado com sucesso.</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-8 border-t border-blue-400 flex flex-col md:flex-row justify-between items-center text-blue-100 text-sm">
          <p>
            &copy; {currentYear} tififerreira@gmail.com. Todos os direitos
            reservados.
          </p>
          <motion.p
            className="flex items-center mt-3 md:mt-0"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Feito com <FaHeart className="text-red-400 mx-1" /> por Tiago
            Ferreira.
          </motion.p>
        </div>
      </div>

      {/* Animated bubble decorations */}
      <BubbleAnimation />
    </footer>
  );
};

// Footer link component with hover animation
const FooterLink = ({ to, text }) => (
  <li>
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Link
        to={to}
        className="hover:text-blue-200 transition-colors flex items-center"
      >
        <span className="mr-2 text-xs opacity-70">•</span>
        {text}
      </Link>
    </motion.div>
  </li>
);

// Social icon component with animation
const SocialIcon = ({ icon, ariaLabel }) => (
  <motion.a
    href="#"
    aria-label={ariaLabel}
    className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
    whileHover={{
      scale: 1.2,
      rotate: 5,
      backgroundColor: "#1d4ed8", // tailwind blue-700
    }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

// Animated bubbles in the background
const BubbleAnimation = () => {
  // Generate random positions for bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 30) + 10,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.floor(Math.random() * 12) + 8}s`,
    animationDelay: `${Math.floor(Math.random() * 5)}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="rounded-full absolute bottom-0 bg-white opacity-10"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
          }}
          animate={{
            y: [0, -500],
            opacity: [0.1, 0.2, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: parseFloat(bubble.animationDuration),
            repeat: Infinity,
            delay: parseFloat(bubble.animationDelay),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Footer;
