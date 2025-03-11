import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaSearch,
  FaClock,
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5); // Keep only last 5 searches
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

      // Navigate to search page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Update the renderDropdown function
  const renderDropdown = (item, index) => (
    <div className="relative group">
      <button
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200
        ${
          isPathActive(item)
            ? scrolled
              ? "bg-blue-50 text-blue-600"
              : "bg-white/10 text-white"
            : scrolled
            ? "text-gray-600 hover:bg-gray-50"
            : "text-white/90 hover:bg-white/10"
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
      >
        <span className="text-lg mr-2">{item.icon}</span>
        <span className="font-medium">{item.text}</span>
        <FaChevronDown
          className={`ml-2 text-xs transition-transform duration-200
          ${
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
            className={`absolute top-full left-0 mt-2 w-72 rounded-xl overflow-hidden z-20 shadow-lg
            ${scrolled ? "bg-white" : "bg-blue-700/95 backdrop-blur-sm"}
            border ${scrolled ? "border-gray-100" : "border-blue-600"}`}
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() =>
              handleDropdownInteraction(item.dropdownType, index, "enter")
            }
            onMouseLeave={() =>
              handleDropdownInteraction(item.dropdownType, index, "leave")
            }
          >
            <div className="py-2">
              {item.submenu.map((subItem, subIndex) => (
                <Link
                  key={`submenu-${item.dropdownType}-${subItem.path}`}
                  to={subItem.path}
                  className={`group flex items-center gap-3 px-4 py-2.5 transition-colors
                  ${
                    location.pathname === subItem.path
                      ? scrolled
                        ? "bg-blue-50 text-blue-600"
                        : "bg-blue-600/50 text-white"
                      : scrolled
                      ? "text-gray-600 hover:bg-gray-50"
                      : "text-white/90 hover:bg-blue-600/50"
                  }`}
                >
                  <span
                    className={`text-lg transition-transform duration-200 group-hover:scale-110
                    ${
                      location.pathname === subItem.path
                        ? scrolled
                          ? "text-blue-500"
                          : "text-blue-200"
                        : scrolled
                        ? "text-blue-400"
                        : "text-blue-300"
                    }`}
                  >
                    {subItem.icon}
                  </span>
                  <div className="flex-1">
                    <span className="block font-medium">{subItem.text}</span>
                    {subItem.description && (
                      <span
                        className={`block text-xs mt-0.5
                      ${scrolled ? "text-gray-400" : "text-blue-200"}`}
                      >
                        {subItem.description}
                      </span>
                    )}
                  </div>
                  <motion.span
                    className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity
                    ${scrolled ? "text-blue-400" : "text-blue-300"}`}
                    initial={{ x: -4 }}
                    animate={{ x: 0 }}
                  >
                    <FaChevronRight />
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Optional: Footer with additional info or quick links */}
            {item.footerContent && (
              <div
                className={`p-3 text-xs border-t
              ${
                scrolled
                  ? "border-gray-100 bg-gray-50 text-gray-500"
                  : "border-blue-600/50 bg-blue-800/50 text-blue-200"
              }`}
              >
                {item.footerContent}
              </div>
            )}
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

  // Add click outside handler for search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest(".search-container")) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <>
      <motion.header
        className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-white shadow-md py-2"
            : "bg-gradient-to-r from-blue-800 to-blue-600 py-3"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex-shrink-0">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div
                  className={`rounded-lg p-2.5 ${
                    scrolled ? "bg-blue-50" : "bg-white/10"
                  }`}
                >
                  <FaFish
                    className={`text-2xl transform -rotate-12 ${
                      scrolled ? "text-blue-600" : "text-white"
                    }`}
                  />
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold tracking-tight ${
                      scrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    Aquasferium
                  </h1>
                  <p
                    className={`text-xs font-medium ${
                      scrolled ? "text-gray-500" : "text-blue-100"
                    }`}
                  >
                    Aquarismo Profissional
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <ul className="flex items-center space-x-1">
                {navItems.map((item, index) => {
                  const isActive = isPathActive(item);

                  if (item.path) {
                    return (
                      <motion.li key={`nav-${item.path}`} className="relative">
                        <Link
                          to={item.path}
                          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200
                            ${
                              isActive
                                ? scrolled
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-white/10 text-white"
                                : scrolled
                                ? "text-gray-600 hover:bg-gray-50"
                                : "text-white/90 hover:bg-white/10"
                            }`}
                        >
                          <span className="text-lg mr-2">{item.icon}</span>
                          <span className="font-medium">{item.text}</span>
                        </Link>
                        {isActive && (
                          <motion.div
                            layoutId="navIndicator"
                            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                              scrolled ? "bg-blue-600" : "bg-white"
                            }`}
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.li>
                    );
                  }

                  return item.hasDropdown ? (
                    <motion.li key={`dropdown-${item.dropdownType}`}>
                      {renderDropdown(item, index)}
                    </motion.li>
                  ) : null;
                })}
              </ul>

              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`relative p-2.5 rounded-lg transition-all duration-200 
                  ${
                    scrolled
                      ? "text-gray-600 hover:bg-gray-50"
                      : "text-white hover:bg-white/10"
                  }`}
              >
                <FaSearch className="text-xl" />
              </button>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className={`relative ml-4 p-2.5 rounded-lg transition-all duration-200 
                  ${
                    scrolled
                      ? "text-gray-600 hover:bg-gray-50"
                      : "text-white hover:bg-white/10"
                  }`}
              >
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg ${
                  scrolled
                    ? "text-gray-600 hover:bg-gray-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <FaSearch className="text-xl" />
              </button>
              <Link
                to="/cart"
                className={`relative p-2 rounded-lg ${
                  scrolled
                    ? "text-gray-600 hover:bg-gray-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  scrolled
                    ? "text-gray-600 hover:bg-gray-50"
                    : "text-white hover:bg-white/10"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 inset-x-0 z-40 search-container
              ${
                scrolled
                  ? "bg-white shadow-lg"
                  : "bg-blue-700/95 backdrop-blur-sm"
              }`}
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <FaSearch
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 
                  ${scrolled ? "text-gray-400" : "text-blue-300"}`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Buscar produtos, espécies, guias..."
                  className={`w-full pl-12 pr-24 py-3 rounded-xl outline-none transition-colors
                    ${
                      scrolled
                        ? "bg-gray-100 focus:bg-gray-50 text-gray-900"
                        : "bg-blue-800/50 focus:bg-blue-800/70 text-white placeholder-blue-300"
                    }`}
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="submit"
                    className={`px-4 py-1.5 rounded-lg transition-colors
                      ${
                        scrolled
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                  >
                    Pesquisar
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className={`p-1.5 rounded-full
                      ${
                        scrolled
                          ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          : "text-blue-300 hover:text-white hover:bg-blue-800/50"
                      }`}
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </form>

              {/* Search Suggestions */}
              <div className="mt-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`text-sm font-medium ${
                        scrolled ? "text-gray-500" : "text-blue-200"
                      }`}>
                        Buscas Recentes
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className={`text-xs ${
                          scrolled 
                            ? "text-gray-400 hover:text-gray-600" 
                            : "text-blue-300 hover:text-white"
                        }`}
                      >
                        Limpar histórico
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={`recent-${search}-${index}`}
                          onClick={() => {
                            setSearchQuery(search);
                            setTimeout(() => handleSearch(), 0);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors
                            ${
                              scrolled
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                : "bg-blue-800/50 text-white hover:bg-blue-800/70"
                            }`}
                        >
                          <FaClock className={scrolled ? "text-gray-400" : "text-blue-300"} />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className={`fixed top-0 right-0 w-72 h-full overflow-y-auto z-50 lg:hidden
                ${scrolled ? "bg-white" : "bg-blue-800"}`}
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
                        scrolled ? "bg-blue-100" : "bg-white/20"
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
                        : "text-white hover:bg-white/20"
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
                          <li key={`mobile-nav-${item.path}`}>
                            <Link
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center px-4 py-3 rounded-lg transition-colors
                                ${
                                  isActive
                                    ? scrolled
                                      ? "bg-blue-50 text-blue-700 font-medium"
                                      : "bg-blue-800 text-white font-medium"
                                    : scrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white hover:bg-blue-800"
                                }`}
                            >
                              <span
                                className={`mr-3 text-lg ${
                                  isActive
                                    ? scrolled
                                      ? "text-blue-500"
                                      : "text-blue-300"
                                    : scrolled
                                    ? "text-blue-400"
                                    : "text-white"
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
                        <li key={`mobile-dropdown-${item.dropdownType}`}>
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
                                      : "bg-blue-800 text-white"
                                    : scrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white hover:bg-blue-800"
                                }`}
                              aria-expanded={isDropdownOpen}
                            >
                              <div className="flex items-center">
                                <span
                                  className={`mr-3 text-lg ${
                                    isActive
                                      ? scrolled
                                        ? "text-blue-500"
                                        : "text-blue-300"
                                      : scrolled
                                      ? "text-blue-400"
                                      : "text-white"
                                  }`}
                                >
                                  {item.icon}
                                </span>
                                <span>{item.text}</span>
                              </div>
                              <FaChevronDown
                                className={`transition-transform duration-300 ${
                                  isDropdownOpen ? "rotate-180" : ""
                                } ${scrolled ? "text-blue-500" : "text-white"}`}
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
                                    : "border-l border-blue-600"
                                } space-y-1`}
                              >
                                {item.submenu.map((subItem, subIndex) => {
                                  const isSubActive =
                                    location.pathname === subItem.path;
                                  return (
                                    <motion.li
                                      key={`mobile-submenu-${item.dropdownType}-${subItem.path}`}
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
                                                : "bg-blue-600 text-white font-medium"
                                              : scrolled
                                              ? "text-gray-600 hover:bg-gray-100"
                                              : "text-white/90 hover:bg-blue-600"
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
                                              : "text-blue-300"
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
                    scrolled ? "border-gray-100" : "border-blue-600"
                  }`}
                >
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${
                      scrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-800 text-white hover:bg-blue-900"
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
    </>
  );
};

export default Header;
