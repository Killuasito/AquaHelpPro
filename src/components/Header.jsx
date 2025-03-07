import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaClipboardList,
  FaLightbulb,
  FaFish,
  FaBars,
  FaTimes,
  FaList,
  FaChevronDown,
  FaCalculator,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  // Updated navItems to include a dropdown for resources
  const navItems = [
    { path: "/", text: "Início", icon: <FaHome /> },
    { path: "/register", text: "Registrar Aquário", icon: <FaClipboardList /> },
    { path: "/my-aquariums", text: "Meus Aquários", icon: <FaList /> },
    {
      text: "Recursos",
      icon: <FaFish />,
      hasDropdown: true,
      submenu: [
        {
          path: "/beginner-guide",
          text: "Guia para Iniciantes",
          icon: <FaBookOpen />,
        },
        { path: "/fish-species", text: "Espécies de Peixes", icon: <FaFish /> },
        {
          path: "/parameter-calculator",
          text: "Calculadora de Parâmetros",
          icon: <FaCalculator />,
        },
        {
          path: "/maintenance-calendar",
          text: "Calendário de Manutenção",
          icon: <FaCalendarAlt />,
        },
      ],
    },
    { path: "/tips", text: "Dicas", icon: <FaLightbulb /> },
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [location]);

  // Function to check if a path is active (either exact match or a submenu item)
  const isPathActive = (item) => {
    const currentPath = location.pathname;
    if (item.path) return currentPath === item.path;
    if (item.submenu) {
      return item.submenu.some((subItem) => currentPath === subItem.path);
    }
    return false;
  };

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-blue-600 shadow-lg py-2"
          : "bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <motion.div
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`rounded-full p-2 ${
                scrolled ? "bg-blue-100" : "bg-white/20"
              }`}
            >
              <FaFish
                className={`text-2xl ${
                  scrolled ? "text-blue-600" : "text-white"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-xl md:text-2xl font-bold tracking-tight ${
                  scrolled ? "text-blue-600" : "text-white"
                }`}
              >
                AquaHelp<span className="text-blue-100">Pro</span>
              </h1>
              <div className="hidden md:block">
                <p
                  className={`text-xs ${
                    scrolled ? "text-blue-500" : "text-blue-100"
                  }`}
                >
                  Gerenciamento profissional de aquários
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = isPathActive(item);

              return (
                <motion.li key={index} className="relative">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? scrolled
                            ? "bg-blue-100 text-blue-800"
                            : "bg-white/20 text-white"
                          : scrolled
                          ? "hover:bg-blue-50 text-blue-700"
                          : "hover:bg-white/10 text-white"
                      }`}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  ) : (
                    <div className="relative">
                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? scrolled
                              ? "bg-blue-100 text-blue-800"
                              : "bg-white/20 text-white"
                            : scrolled
                            ? "hover:bg-blue-50 text-blue-700"
                            : "hover:bg-white/10 text-white"
                        }`}
                        onMouseEnter={() => {
                          setHoveredItem(index);
                          setResourcesOpen(true);
                        }}
                        onClick={() => setResourcesOpen(!resourcesOpen)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.text}</span>
                        <FaChevronDown className="ml-1 text-xs opacity-70" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {resourcesOpen && (
                          <motion.div
                            className={`absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg overflow-hidden z-20 ${
                              scrolled ? "bg-white" : "bg-blue-700"
                            }`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setResourcesOpen(true)}
                            onMouseLeave={() => setResourcesOpen(false)}
                          >
                            <div className="py-1">
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.path}
                                  className={`block px-4 py-2 ${
                                    location.pathname === subItem.path
                                      ? scrolled
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-blue-600 text-white"
                                      : scrolled
                                      ? "text-gray-700 hover:bg-blue-50"
                                      : "text-white hover:bg-blue-600"
                                  } flex items-center space-x-2`}
                                >
                                  <span className="text-sm">
                                    {subItem.icon}
                                  </span>
                                  <span>{subItem.text}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`h-1 w-full absolute bottom-0 rounded-full ${
                        scrolled ? "bg-blue-600" : "bg-white"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.li>
              );
            })}

            <li>
              <Link
                to="/profile"
                className={`ml-2 px-5 py-2 rounded-full transition-all ${
                  scrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700"
                }`}
              >
                <span className="font-medium">Minha Conta</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "hover:bg-blue-100 text-blue-600"
                : "hover:bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden border-t ${
              scrolled
                ? "bg-white border-blue-100"
                : "bg-blue-500/95 border-blue-400"
            } backdrop-blur-sm mt-4`}
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <ul className="flex flex-col divide-y divide-opacity-10 divide-white">
                {navItems.map((item, index) => {
                  const isActive = isPathActive(item);

                  return item.path ? (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`py-1 ${index === 0 ? "pt-2" : ""}`}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                          isActive
                            ? scrolled
                              ? "bg-blue-50 text-blue-800"
                              : "bg-white/10 text-white"
                            : ""
                        } ${
                          scrolled
                            ? "text-blue-700 hover:bg-blue-50"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="text-xl bg-opacity-20 rounded-full p-2 bg-white/10">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.text}</span>
                      </Link>
                    </motion.li>
                  ) : (
                    <React.Fragment key={index}>
                      <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="py-1"
                      >
                        <button
                          onClick={() => setResourcesOpen(!resourcesOpen)}
                          className={`flex items-center justify-between w-full space-x-3 px-4 py-3 rounded-lg ${
                            isActive
                              ? scrolled
                                ? "bg-blue-50 text-blue-800"
                                : "bg-white/10 text-white"
                              : ""
                          } ${
                            scrolled
                              ? "text-blue-700 hover:bg-blue-50"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl bg-opacity-20 rounded-full p-2 bg-white/10">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.text}</span>
                          </div>
                          <FaChevronDown
                            className={`transition-transform ${
                              resourcesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </motion.li>

                      {/* Submenu items */}
                      <AnimatePresence>
                        {resourcesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`ml-5 ${
                              scrolled
                                ? "border-l-2 border-blue-100"
                                : "border-l border-blue-400"
                            }`}
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.li
                                key={subIndex}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className={`flex items-center space-x-3 px-4 py-3 ml-5 rounded-lg ${
                                    location.pathname === subItem.path
                                      ? scrolled
                                        ? "bg-blue-50 text-blue-800"
                                        : "bg-white/10 text-white"
                                      : ""
                                  } ${
                                    scrolled
                                      ? "text-blue-700 hover:bg-blue-50"
                                      : "text-white hover:bg-white/10"
                                  }`}
                                  onClick={() => setResourcesOpen(false)}
                                >
                                  <span className="text-xl bg-opacity-20 rounded-full p-1 bg-white/10">
                                    {subItem.icon}
                                  </span>
                                  <span className="font-medium">
                                    {subItem.text}
                                  </span>
                                </Link>
                              </motion.li>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}

                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="py-3"
                >
                  <Link
                    to="/profile"
                    className={`flex justify-center items-center px-5 py-3 rounded-lg ${
                      scrolled
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <span className="font-medium">Minha Conta</span>
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
