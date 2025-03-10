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
  FaArrowRight,
  FaChevronRight,
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
      dropdownType: "products",
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
      dropdownType: "resources",
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
    setMobileResourcesOpen(false);
    setMobileProductsOpen(false);
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

  // Handle dropdown hover and click events
  const handleDropdownInteraction = (dropdownType, index, action) => {
    setHoveredItem(index);
    if (action === "enter" || action === "click") {
      if (dropdownType === "resources") {
        setResourcesOpen(true);
        setProductsOpen(false);
      } else if (dropdownType === "products") {
        setProductsOpen(true);
        setResourcesOpen(false);
      }
    } else if (action === "leave") {
      if (dropdownType === "resources") {
        setResourcesOpen(false);
      } else if (dropdownType === "products") {
        setProductsOpen(false);
      }
    }
  };

  // Render dropdown menu for desktop
  const renderDropdown = (item, index) => (
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
        onMouseEnter={() =>
          handleDropdownInteraction(item.dropdownType, index, "enter")
        }
        onMouseLeave={() =>
          handleDropdownInteraction(item.dropdownType, index, "leave")
        }
        onClick={() =>
          handleDropdownInteraction(item.dropdownType, index, "click")
        }
        aria-expanded={
          (item.dropdownType === "resources" && resourcesOpen) ||
          (item.dropdownType === "products" && productsOpen)
        }
      >
        <span className="text-lg">{item.icon}</span>
        <span className="font-medium">{item.text}</span>
        <FaChevronDown
          className={`ml-1 text-xs opacity-70 transition-transform ${
            (item.dropdownType === "resources" && resourcesOpen) ||
            (item.dropdownType === "products" && productsOpen)
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {((item.dropdownType === "resources" && resourcesOpen) ||
          (item.dropdownType === "products" && productsOpen)) && (
          <motion.div
            className={`absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg overflow-hidden z-20 ${
              scrolled ? "bg-white" : "bg-blue-700"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() =>
              handleDropdownInteraction(item.dropdownType, index, "enter")
            }
            onMouseLeave={() =>
              handleDropdownInteraction(item.dropdownType, index, "leave")
            }
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

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
                  ) : item.hasDropdown ? (
                    renderDropdown(item, index)
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

        {/* Desktop Cart Icon */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/cart"
            className="relative p-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-500"
            aria-label="Carrinho de compras"
          >
            <FaShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Cart Icon for Mobile */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Carrinho de compras"
          >
            <FaShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${
              scrolled
                ? "hover:bg-blue-100 text-blue-600"
                : "hover:bg-white/10 text-white"
            }`}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>

      {/* New Mobile Menu - Slide from right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop/Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side Panel Menu */}
            <motion.div
              className={`fixed top-0 right-0 h-full w-80 max-w-full z-50 lg:hidden overflow-y-auto
                ${scrolled ? "bg-white" : "bg-blue-600"} shadow-2xl`}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-4 flex flex-col h-full">
                {/* Header & Close Button */}
                <div
                  className="flex items-center justify-between mb-6 pb-2 border-b border-opacity-20
                  border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded-full p-2 ${
                        scrolled ? "bg-blue-100" : "bg-white/10"
                      }`}
                    >
                      <FaFish
                        className={`text-xl ${
                          scrolled ? "text-blue-600" : "text-white"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xl font-bold ${
                        scrolled ? "text-blue-600" : "text-white"
                      }`}
                    >
                      AquaHelpPro
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-full ${
                      scrolled
                        ? "text-blue-600 hover:bg-blue-50"
                        : "text-white hover:bg-white/10"
                    }`}
                    aria-label="Fechar menu"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => {
                      const isActive = isPathActive(item);

                      if (item.path) {
                        return (
                          <li key={index}>
                            <Link
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center px-4 py-3 rounded-lg transition-colors
                                ${
                                  isActive
                                    ? scrolled
                                      ? "bg-blue-50 text-blue-700 font-medium"
                                      : "bg-white/10 text-white font-medium"
                                    : scrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white hover:bg-white/10"
                                }`}
                            >
                              <span
                                className={`mr-3 text-lg ${
                                  isActive
                                    ? "text-blue-500"
                                    : scrolled
                                    ? "text-blue-400"
                                    : "text-white/80"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <span>{item.text}</span>
                              {isActive && (
                                <span className="ml-auto">
                                  <FaChevronRight
                                    size={14}
                                    className={
                                      scrolled ? "text-blue-500" : "text-white"
                                    }
                                  />
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      }

                      // Dropdown items
                      const isDropdownOpen =
                        (item.dropdownType === "resources" &&
                          mobileResourcesOpen) ||
                        (item.dropdownType === "products" &&
                          mobileProductsOpen);

                      return (
                        <li key={index}>
                          <div className="mb-1">
                            <button
                              onClick={() => {
                                if (item.dropdownType === "products") {
                                  setMobileProductsOpen(!mobileProductsOpen);
                                  setMobileResourcesOpen(false);
                                } else if (item.dropdownType === "resources") {
                                  setMobileResourcesOpen(!mobileResourcesOpen);
                                  setMobileProductsOpen(false);
                                }
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                                ${
                                  isActive
                                    ? scrolled
                                      ? "bg-blue-50 text-blue-700"
                                      : "bg-white/10 text-white"
                                    : scrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white hover:bg-white/10"
                                }`}
                              aria-expanded={isDropdownOpen}
                            >
                              <div className="flex items-center">
                                <span
                                  className={`mr-3 text-lg ${
                                    isActive
                                      ? "text-blue-500"
                                      : scrolled
                                      ? "text-blue-400"
                                      : "text-white/80"
                                  }`}
                                >
                                  {item.icon}
                                </span>
                                <span>{item.text}</span>
                              </div>
                              <FaChevronDown
                                className={`transition-transform duration-300 ${
                                  isDropdownOpen ? "rotate-180" : ""
                                } ${
                                  scrolled ? "text-blue-500" : "text-white/80"
                                }`}
                                size={14}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`ml-6 pl-2 ${
                                  scrolled
                                    ? "border-l-2 border-blue-100"
                                    : "border-l border-white/20"
                                } space-y-1`}
                              >
                                {item.submenu.map((subItem, subIndex) => {
                                  const isSubActive =
                                    location.pathname === subItem.path;
                                  return (
                                    <motion.li
                                      key={subIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.1 }}
                                    >
                                      <Link
                                        to={subItem.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-4 py-2.5 rounded-lg transition-colors
                                          ${
                                            isSubActive
                                              ? scrolled
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "bg-white/10 text-white font-medium"
                                              : scrolled
                                              ? "text-gray-600 hover:bg-gray-100"
                                              : "text-white/90 hover:bg-white/10"
                                          }`}
                                      >
                                        <span
                                          className={`mr-3 text-base ${
                                            isSubActive
                                              ? scrolled
                                                ? "text-blue-500"
                                                : "text-white"
                                              : scrolled
                                              ? "text-blue-400/70"
                                              : "text-white/70"
                                          }`}
                                        >
                                          {subItem.icon}
                                        </span>
                                        <span>{subItem.text}</span>
                                      </Link>
                                    </motion.li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Bottom Section */}
                <div
                  className={`mt-6 pt-6 border-t ${
                    scrolled ? "border-gray-100" : "border-white/10"
                  }`}
                >
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${
                      scrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white/20 text-white hover:bg-white/30"
                    } transition-colors`}
                  >
                    <div className="flex items-center">
                      <FaShoppingCart className="mr-3" />
                      <span className="font-medium">Meu Carrinho</span>
                    </div>
                    <div className="flex items-center">
                      {cartItems.length > 0 && (
                        <span className="mr-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                          {cartItems.length}
                        </span>
                      )}
                      <FaArrowRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
