import React, { useState, useEffect, useContext } from "react";
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
  FaLeaf,
  FaShoppingCart,
  FaStore,
  FaBox,
} from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  // Updated navItems to include products dropdown
  const navItems = [
    { path: "/", text: "Início", icon: <FaHome /> },
    { path: "/register", text: "Registrar Aquário", icon: <FaClipboardList /> },
    { path: "/my-aquariums", text: "Meus Aquários", icon: <FaList /> },
    {
      text: "Produtos",
      icon: <FaStore />,
      hasDropdown: true,
      submenu: [
        {
          path: "/products/fish",
          text: "Peixes",
          icon: <FaFish />,
        },
        {
          path: "/products/plants",
          text: "Plantas",
          icon: <FaLeaf />,
        },
        {
          path: "/products/equipment",
          text: "Equipamentos",
          icon: <FaBox />,
        },
      ],
    },
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
          path: "/plant-species",
          text: "Espécies de Plantas",
          icon: <FaLeaf />,
        },
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

  const handleDropdownHover = (dropdownType, index) => {
    setHoveredItem(index);
    if (dropdownType === "resources") {
      setResourcesOpen(true);
      setProductsOpen(false);
    } else if (dropdownType === "products") {
      setProductsOpen(true);
      setResourcesOpen(false);
    }
  };

  // Modificar o renderização do dropdown no desktop
  const renderDropdown = (item, index, type) => (
    <div className="relative">
      <button
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isPathActive(item)
            ? scrolled
              ? "bg-blue-100 text-blue-800"
              : "bg-white/20 text-white"
            : scrolled
            ? "hover:bg-blue-50 text-blue-700"
            : "hover:bg-white/10 text-white"
        }`}
        onMouseEnter={() => handleDropdownHover(type, index)}
        onMouseLeave={() => {
          if (type === "resources") setResourcesOpen(false);
          if (type === "products") setProductsOpen(false);
        }}
        onClick={() => {
          if (type === "resources") setResourcesOpen(!resourcesOpen);
          if (type === "products") setProductsOpen(!productsOpen);
        }}
      >
        <span className="text-lg">{item.icon}</span>
        <span className="font-medium">{item.text}</span>
        <FaChevronDown className="ml-1 text-xs opacity-70" />
      </button>

      <AnimatePresence>
        {((type === "resources" && resourcesOpen) ||
          (type === "products" && productsOpen)) && (
          <motion.div
            className={`absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg overflow-hidden z-20 ${
              scrolled ? "bg-white" : "bg-blue-700"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              if (type === "resources") setResourcesOpen(true);
              if (type === "products") setProductsOpen(true);
            }}
            onMouseLeave={() => {
              if (type === "resources") setResourcesOpen(false);
              if (type === "products") setProductsOpen(false);
            }}
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
                  <span className="text-sm">{subItem.icon}</span>
                  <span>{subItem.text}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
        {/* Logo section */}
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
                AquaHelp
                <span className={scrolled ? "text-blue-500" : "text-blue-100"}>
                  Pro
                </span>
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
                  ) : item.text === "Recursos" ? (
                    renderDropdown(item, index, "resources")
                  ) : item.text === "Produtos" ? (
                    renderDropdown(item, index, "products")
                  ) : null}

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
          </ul>
        </nav>

        {/* Mobile Controls - Modificado */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Mobile Menu Button */}
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

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 hover:text-blue-600">
            <FaShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Cart Icon */}
        <div className="hidden lg:flex items-center">
          <Link to="/cart" className="relative p-2 hover:text-blue-600">
            <FaShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
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

                  if (item.path) {
                    return (
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
                    );
                  }

                  // Dropdown items (Produtos e Recursos)
                  return (
                    <React.Fragment key={index}>
                      <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="py-1"
                      >
                        <button
                          onClick={() => {
                            if (item.text === "Produtos") {
                              setMobileProductsOpen(!mobileProductsOpen);
                              setMobileResourcesOpen(false);
                            } else if (item.text === "Recursos") {
                              setMobileResourcesOpen(!mobileResourcesOpen);
                              setMobileProductsOpen(false);
                            }
                          }}
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
                              (item.text === "Produtos" &&
                                mobileProductsOpen) ||
                              (item.text === "Recursos" && mobileResourcesOpen)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      </motion.li>

                      {/* Submenu items */}
                      <AnimatePresence>
                        {((item.text === "Produtos" && mobileProductsOpen) ||
                          (item.text === "Recursos" &&
                            mobileResourcesOpen)) && (
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
                                  onClick={() => {
                                    if (item.text === "Produtos") {
                                      setMobileProductsOpen(false);
                                    } else {
                                      setMobileResourcesOpen(false);
                                    }
                                    setMobileMenuOpen(false);
                                  }}
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
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
