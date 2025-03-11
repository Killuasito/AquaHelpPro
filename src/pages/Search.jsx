import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFish,
  FaLeaf,
  FaBox,
  FaSearch,
  FaBookOpen,
  FaCalculator,
  FaCalendarAlt,
  FaLightbulb,
  FaThermometerHalf,
  FaFilter,
  FaTint,
  FaBacterium,
  FaTools,
} from "react-icons/fa";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const filters = [
    { id: "all", label: "Tudo", icon: <FaSearch /> },
    { id: "products", label: "Produtos", icon: <FaBox /> },
    { id: "species", label: "Espécies", icon: <FaFish /> },
    { id: "guides", label: "Guias", icon: <FaBookOpen /> },
    { id: "tools", label: "Ferramentas", icon: <FaCalculator /> },
  ];

  // Handle new search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = new URL(window.location);
      url.searchParams.set("q", searchQuery);
      window.history.pushState({}, "", url);
      fetchResults(searchQuery);
    }
  };

  const fetchResults = (searchTerm) => {
    setLoading(true);
    const mockResults = [
      // Produtos - Peixes (mantendo mesmo ID e detalhes do ProductsFish)
      {
        type: "products",
        category: "fish",
        title: "Betta Splendens Macho",
        description: "Betta macho com cores vibrantes e cauda exuberante",
        path: "/products/fish?id=1",
        icon: <FaFish />,
        price: "R$ 49,90",
        id: 1,
      },
      {
        type: "products",
        category: "fish",
        title: "Guppy",
        description:
          "Pequeno, vibrante e fácil de cuidar. Reproduz rapidamente.",
        path: "/products/fish?id=2",
        icon: <FaFish />,
        price: "R$ 12,90",
        id: 2,
      },
      {
        type: "products",
        category: "fish",
        title: "Tetra Neon",
        description: "Peixe pequeno com cores brilhantes azul e vermelho.",
        path: "/products/fish?id=3",
        icon: <FaFish />,
        price: "R$ 4,20",
        id: 3,
      },
      {
        type: "products",
        category: "fish",
        title: "Molinésia",
        description:
          "Peixe resistente disponível em várias cores. Fácil de cuidar e reproduz rapidamente.",
        path: "/products/fish?id=4",
        icon: <FaFish />,
        price: "R$ 14,50",
        id: 4,
      },
      // Adicionar todos os outros peixes da mesma forma...
      // Copiar exatamente os mesmos dados do ProductsFish, convertendo para o formato de resultado de busca
      {
        type: "products",
        category: "fish",
        title: "Tetra Diamante",
        description:
          "Peixe de cardume com escamas prateadas reluzentes e nadadeiras avermelhadas.",
        path: "/products/fish?id=19",
        icon: <FaFish />,
        price: "R$ 9,90",
        id: 19,
      },
      {
        type: "products",
        category: "fish",
        title: "Acará Bandeira",
        description:
          "Peixe anjo de grande porte da Amazônia, mais raro que o escalare comum.",
        path: "/products/fish?id=20",
        icon: <FaFish />,
        price: "R$ 69,90",
        id: 20,
      },
      {
        type: "products",
        category: "fish",
        title: "Camarão Red Cherry",
        description:
          "Camarão pequeno com coloração vermelha intensa, excelente para aquários plantados.",
        path: "/products/fish?id=21",
        icon: <FaFish />,
        price: "R$ 14,90",
        id: 21,
      },
      // ... outros produtos e categorias existentes ...

      // Continuar com as outras seções (species, guides, tools) que já existem
      // Produtos - Plantas
      {
        type: "products",
        category: "plants",
        title: "Anúbia Nana",
        description: "Planta aquática de baixa manutenção",
        path: "/products/plants?id=101",
        icon: <FaLeaf />,
        price: "R$ 29,90",
        id: 101,
      },
      {
        type: "products",
        category: "plants",
        title: "Musgo de Java",
        description: "Musgo de crescimento lento para decoração",
        path: "/products/plants?id=16",
        icon: <FaLeaf />,
        price: "R$ 18,90",
        id: 16,
      },
      {
        type: "products",
        category: "plants",
        title: "Elodea",
        description: "Planta de crescimento rápido para oxigenação da água",
        path: "/products/plants?id=17",
        icon: <FaLeaf />,
        price: "R$ 12,50",
        id: 17,
      },
      {
        type: "products",
        category: "plants",
        title: "Microsorum Pteropus",
        description: "Samambaia de Java para aquários plantados",
        path: "/products/plants?id=18",
        icon: <FaLeaf />,
        price: "R$ 34,90",
        id: 18,
      },
      // Produtos - Equipamentos
      {
        type: "products",
        category: "equipment",
        title: "Filtro Hang On 250L/H",
        description:
          "Equipamento de filtragem profissional para aquários grandes",
        path: "/products/equipment?id=204",
        icon: <FaFilter />,
        price: "R$ 399,90",
        id: 204,
      },
      {
        type: "products",
        category: "equipment",
        title: "Termostato 25W",
        description: "Controle preciso de temperatura para aquários até 35L",
        path: "/products/equipment?id=205",
        icon: <FaThermometerHalf />,
        price: "R$ 89,90",
        id: 205,
      },
      {
        type: "products",
        category: "equipment",
        title: "Iluminação LED 60cm",
        description: "Luminária completa com espectro ideal para plantas",
        path: "/products/equipment?id=21",
        icon: <FaLightbulb />,
        price: "R$ 249,90",
        id: 21,
      },
      {
        type: "products",
        category: "equipment",
        title: "Kit CO2 para Aquário",
        description:
          "Sistema completo para injeção de CO2 em aquários plantados",
        path: "/products/equipment?id=22",
        icon: <FaTint />,
        price: "R$ 699,90",
        id: 22,
      },
      {
        type: "products",
        category: "equipment",
        title: "Substrato Fértil 5kg",
        description: "Base nutritiva para o crescimento de plantas aquáticas",
        path: "/products/equipment?id=23",
        icon: <FaLeaf />,
        price: "R$ 79,90",
        id: 23,
      },
      // Espécies - Peixes
      {
        type: "species",
        category: "fish",
        title: "Tetra Neon",
        description:
          "Guia completo sobre cuidados e características do Tetra Neon",
        path: "/fish-species?id=302",
        icon: <FaFish />,
        id: 302,
      },
      {
        type: "species",
        category: "fish",
        title: "Betta Splendens",
        description: "Tudo sobre o peixe de briga siamês e suas variedades",
        path: "/fish-species?id=301",
        icon: <FaFish />,
        id: 301,
      },
      {
        type: "species",
        category: "fish",
        title: "Acará Disco",
        description: "Guia completo para manutenção de Discos em aquários",
        path: "/fish-species",
        icon: <FaFish />,
      },
      {
        type: "species",
        category: "fish",
        title: "Corydora",
        description:
          "Informações sobre este peixe de fundo pacífico e suas variantes",
        path: "/fish-species",
        icon: <FaFish />,
      },
      // Espécies - Plantas
      {
        type: "species",
        category: "plants",
        title: "Vallisneria",
        description:
          "Informações sobre cultivo e manutenção desta planta de fundo",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Cryptocoryne Wendtii",
        description: "Guia completo sobre esta versátil planta de aquário",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Glossostigma",
        description: "Como cultivar este carpete aquático de baixa altura",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      {
        type: "species",
        category: "plants",
        title: "Bucephalandra",
        description: "Espécie exótica para fixação em rochas e madeiras",
        path: "/plant-species",
        icon: <FaLeaf />,
      },
      // Guias
      {
        type: "guides",
        title: "Guia para Iniciantes",
        description:
          "Tudo que você precisa saber para começar seu primeiro aquário",
        path: "/beginner-guide",
        icon: <FaBookOpen />,
      },
      {
        type: "guides",
        title: "Aquário Plantado",
        description: "Como montar e manter um belo aquário com plantas vivas",
        path: "/beginner-guide",
        icon: <FaLeaf />,
      },
      {
        type: "guides",
        title: "Dicas de Manutenção",
        description: "Melhores práticas para seu aquário se manter saudável",
        path: "/tips",
        icon: <FaLightbulb />,
      },
      {
        type: "guides",
        title: "Ciclagem do Aquário",
        description:
          "Entenda o processo de estabelecimento do ciclo do nitrogênio",
        path: "/beginner-guide",
        icon: <FaBacterium />,
      },
      {
        type: "guides",
        title: "Aquário Marinho",
        description:
          "Guia completo para iniciantes em aquários de água salgada",
        path: "/beginner-guide",
        icon: <FaFish />,
      },
      // Ferramentas
      {
        type: "tools",
        title: "Calculadora de Parâmetros",
        description: "Calcule os parâmetros ideais do seu aquário",
        path: "/parameter-calculator",
        icon: <FaCalculator />,
      },
      {
        type: "tools",
        title: "Calendário de Manutenção",
        description: "Organize as manutenções do seu aquário",
        path: "/maintenance-calendar",
        icon: <FaCalendarAlt />,
      },
      {
        type: "tools",
        title: "Calculadora de Dosagem",
        description: "Calcule dosagens precisas de fertilizantes para plantas",
        path: "/parameter-calculator",
        icon: <FaTint />,
      },
      {
        type: "tools",
        title: "Compatibilidade de Espécies",
        description: "Verifique quais espécies podem conviver pacificamente",
        path: "/parameter-calculator",
        icon: <FaTools />,
      },
    ];

    // Filtra resultados baseados no termo de busca
    const filteredResults = mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchResults(query);
    }
  }, [query]);

  const filteredResults = results.filter(
    (result) => activeFilter === "all" || result.type === activeFilter
  );

  const getBadgeColor = (type) => {
    switch (type) {
      case "products":
        return "bg-green-100 text-green-800";
      case "species":
        return "bg-blue-100 text-blue-800";
      case "guides":
        return "bg-yellow-100 text-yellow-800";
      case "tools":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconByCategory = (type, category) => {
    if (type === "products") {
      switch (category) {
        case "fish":
          return <FaFish className="text-blue-500" />;
        case "plants":
          return <FaLeaf className="text-green-500" />;
        case "equipment":
          if (category === "filter")
            return <FaFilter className="text-gray-500" />;
          if (category === "heater")
            return <FaThermometerHalf className="text-red-500" />;
          return <FaBox className="text-gray-500" />;
        default:
          return <FaBox className="text-gray-500" />;
      }
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos, espécies, guias..."
            className="w-full pl-12 pr-28 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {query && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados da busca
            </h1>
            <p className="text-gray-600">
              Exibindo resultados para:{" "}
              <span className="font-medium text-blue-600">"{query}"</span>
            </p>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Resultados count */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {filteredResults.length}{" "}
              {filteredResults.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"}
              {activeFilter !== "all" &&
                ` em ${filters.find((f) => f.id === activeFilter)?.label}`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={`${result.type}-${result.id || index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={result.path}
                    className="block p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 bg-white h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${getBadgeColor(
                          result.type
                        )}`}
                      >
                        {result.icon ||
                          getIconByCategory(result.type, result.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">
                            {result.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(
                              result.type
                            )}`}
                          >
                            {result.type === "products"
                              ? "Produto"
                              : result.type === "species"
                              ? "Espécie"
                              : result.type === "guides"
                              ? "Guia"
                              : "Ferramenta"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {result.description}
                        </p>
                        {result.price && (
                          <p className="text-green-600 font-medium mt-2">
                            {result.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Nenhum resultado encontrado
              </h2>
              <p className="text-gray-600 mb-8">
                Tente buscar por termos diferentes ou verifique a ortografia
              </p>

              <div className="max-w-lg mx-auto">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Sugestões de pesquisa:
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Betta",
                    "Aquário plantado",
                    "Filtro",
                    "Iluminação",
                    "Tetra",
                    "Manutenção",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setTimeout(
                          () => handleSearch({ preventDefault: () => {} }),
                          0
                        );
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!query && !loading && (
        <div className="text-center py-12">
          <FaSearch className="mx-auto h-16 w-16 text-blue-400 mb-6" />
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            O que você está procurando?
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Digite algum termo de busca para encontrar produtos, espécies, guias
            ou ferramentas para o seu aquário
          </p>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Buscas populares:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Betta",
                "Anúbia",
                "Filtro Canister",
                "Tetra Neon",
                "Aquário plantado",
                "Ciclagem",
                "Kinguio",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(
                      () => handleSearch({ preventDefault: () => {} }),
                      0
                    );
                  }}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
