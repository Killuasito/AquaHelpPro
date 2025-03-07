import React, { useState } from "react";
import {
  FaWater,
  FaFish,
  FaTools,
  FaThermometerHalf,
  FaLeaf,
  FaLightbulb,
  FaFlask,
  FaBug,
  FaBriefcaseMedical,
  FaUserGraduate,
  FaGraduationCap,
  FaTachometerAlt,
  FaLayerGroup,
  FaRuler,
  FaUserFriends,
  FaClock,
  FaWrench,
  FaBalanceScale,
} from "react-icons/fa";

const TipsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const tipCategories = [
    { id: "all", name: "Todas as Dicas" },
    { id: "beginner", name: "Iniciante" },
    { id: "intermediate", name: "Intermediário" },
    { id: "advanced", name: "Avançado" },
  ];

  const allTips = [
    // Beginner Tips
    {
      icon: <FaWater className="text-2xl text-blue-500" />,
      title: "Qualidade da Água",
      content:
        "Mantenha os parâmetros da água ideais realizando testes regularmente. O pH, amônia, nitrito e nitrato ideais dependem das espécies de peixes que você tem.",
      category: "beginner",
    },
    {
      icon: <FaFish className="text-2xl text-blue-500" />,
      title: "Alimentação",
      content:
        "Alimente seus peixes em pequenas quantidades 1-2 vezes por dia. Excesso de alimentação pode levar à má qualidade da água e problemas de saúde.",
      category: "beginner",
    },
    {
      icon: <FaTools className="text-2xl text-blue-500" />,
      title: "Manutenção",
      content:
        "Realize trocas regulares de água de 20-30% a cada 1-2 semanas. Limpe os filtros de acordo com as instruções do fabricante.",
      category: "beginner",
    },
    {
      icon: <FaThermometerHalf className="text-2xl text-blue-500" />,
      title: "Controle de Temperatura",
      content:
        "A maioria dos peixes tropicais prospera em temperaturas entre 24-27°C. Invista em um aquecedor e termômetro confiáveis.",
      category: "beginner",
    },
    {
      icon: <FaFlask className="text-2xl text-blue-500" />,
      title: "Ciclagem do Aquário",
      content:
        "Antes de adicionar peixes, cicle seu aquário para estabelecer bactérias benéficas. Este processo pode levar de 2 a 6 semanas.",
      category: "beginner",
    },
    {
      icon: <FaClock className="text-2xl text-blue-500" />,
      title: "Rotina Diária",
      content:
        "Reserve alguns minutos diariamente para observar seus peixes. Verifique se todos estão comendo, se comportando normalmente e sem sinais de doença.",
      category: "beginner",
    },
    {
      icon: <FaRuler className="text-2xl text-blue-500" />,
      title: "Tamanho do Aquário",
      content:
        "Para iniciantes, aquários maiores são mais fáceis de manter estáveis. Comece com pelo menos 60 litros para ter mais margem de erro.",
      category: "beginner",
    },

    // Intermediate Tips
    {
      icon: <FaBug className="text-2xl text-blue-500" />,
      title: "Controle de Algas",
      content:
        "Controle o crescimento de algas limitando a exposição à luz, evitando excesso de nutrientes e mantendo um bom equilíbrio de plantas vivas.",
      category: "intermediate",
    },
    {
      icon: <FaLeaf className="text-2xl text-blue-500" />,
      title: "Cuidados com Plantas",
      content:
        "Plantas vivas melhoram a qualidade da água e fornecem esconderijos para os peixes. Escolha espécies adequadas para sua iluminação.",
      category: "intermediate",
    },
    {
      icon: <FaLightbulb className="text-2xl text-blue-500" />,
      title: "Iluminação",
      content:
        "Mantenha um ciclo de luz consistente de 8-10 horas diárias. Muita luz promove crescimento de algas, enquanto pouca luz afeta as plantas.",
      category: "intermediate",
    },
    {
      icon: <FaBriefcaseMedical className="text-2xl text-blue-500" />,
      title: "Saúde dos Peixes",
      content:
        "Observe seus peixes diariamente para sinais de doenças: nadadeiras danificadas, pontos brancos, comportamento incomum ou perda de apetite.",
      category: "intermediate",
    },
    {
      icon: <FaUserFriends className="text-2xl text-blue-500" />,
      title: "Compatibilidade",
      content:
        "Pesquise sobre compatibilidade antes de adicionar novas espécies. Considere temperamento, tamanho adulto, requisitos de água e hábitos territoriais.",
      category: "intermediate",
    },
    {
      icon: <FaBalanceScale className="text-2xl text-blue-500" />,
      title: "Equilíbrio Biológico",
      content:
        "Crie um sistema equilibrado com plantas, peixes e invertebrados. Um aquário bem balanceado requer menos intervenção e manutenção.",
      category: "intermediate",
    },

    // Advanced Tips
    {
      icon: <FaWrench className="text-2xl text-blue-500" />,
      title: "Automação",
      content:
        "Considere automatizar tarefas como alimentação, iluminação e controle de CO2. Temporizadores, dosadores e controladores de pH podem facilitar a manutenção avançada.",
      category: "advanced",
    },
    {
      icon: <FaLayerGroup className="text-2xl text-blue-500" />,
      title: "Substrato Nutritivo",
      content:
        "Para aquários plantados avançados, use substratos específicos com nutrientes. Considere técnicas como substrato em camadas para plantas exigentes.",
      category: "advanced",
    },
    {
      icon: <FaTachometerAlt className="text-2xl text-blue-500" />,
      title: "Injeção de CO2",
      content:
        "Para aquários densamente plantados, implemente um sistema de injeção de CO2. Monitore níveis com drop checkers e ajuste de acordo com a iluminação.",
      category: "advanced",
    },
    {
      icon: <FaGraduationCap className="text-2xl text-blue-500" />,
      title: "Aclimatação Drip",
      content:
        "Use o método de aclimatação por gotejamento para introduzir novos habitantes. Isso permite ajuste mais gradual aos parâmetros da água, reduzindo o estresse.",
      category: "advanced",
    },
    {
      icon: <FaUserGraduate className="text-2xl text-blue-500" />,
      title: "Reprodução de Espécies",
      content:
        "Aprenda sobre os requisitos específicos para reprodução de diferentes espécies. Alguns podem precisar de parâmetros de água alterados, tanques separados ou alimentação especial.",
      category: "advanced",
    },
    {
      icon: <FaFlask className="text-2xl text-blue-500" />,
      title: "Parâmetros Avançados",
      content:
        "Monitore e ajuste parâmetros além dos básicos, como GH, KH, TDS e condutividade. Essenciais para espécies mais exigentes e reprodução.",
      category: "advanced",
    },
  ];

  // Filter tips based on active category
  const displayedTips =
    activeCategory === "all"
      ? allTips
      : allTips.filter((tip) => tip.category === activeCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 pb-12 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">
            Dicas para Aquários
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-base text-blue-700 max-w-2xl mx-auto">
            Siga estas dicas essenciais para manter seus amigos aquáticos
            felizes e saudáveis em seu lar subaquático.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tipCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTips.map((tip, index) => (
            <TipCard
              key={index}
              icon={tip.icon}
              title={tip.title}
              content={tip.content}
              bgColor="bg-white"
            />
          ))}
        </div>

        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-gray-100 pb-2">
            Guia de Referência Rápida
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              Teste os parâmetros da água semanalmente (pH, amônia, nitrito,
              nitrato)
            </li>
            <li>Troque 20-30% da água a cada 1-2 semanas</li>
            <li>Limpe o vidro e as decorações durante as trocas de água</li>
            <li>
              Enxágue o meio filtrante na água antiga do aquário, não em água da
              torneira
            </li>
            <li>
              Monitore o comportamento dos peixes diariamente para sinais de
              estresse ou doença
            </li>
            <li>
              Evite superpopulação do aquário - respeite o espaço necessário
              para cada espécie
            </li>
            <li>
              Aclimatize novos peixes lentamente antes de adicioná-los ao
              aquário principal
            </li>
          </ul>
        </div>

        <div className="mt-10 p-6 bg-blue-500 text-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <FaLightbulb className="mr-2" /> Dica Profissional
          </h2>
          <p>
            Considere usar plantas vivas em seu aquário. Elas ajudam a manter a
            qualidade da água absorvendo nitratos, fornecem abrigo natural para
            os peixes e criam um ambiente mais autêntico e bonito.
          </p>
        </div>
      </div>

      {/* Simplificando as bolhas */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>

      <style jsx>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          animation: float 20s infinite;
          z-index: 0;
        }
        .bubble-1 {
          width: 60px;
          height: 60px;
          left: 20%;
          bottom: -100px;
          animation-delay: 0s;
        }
        .bubble-2 {
          width: 40px;
          height: 40px;
          left: 50%;
          bottom: -100px;
          animation-delay: 5s;
        }
        .bubble-3 {
          width: 30px;
          height: 30px;
          left: 80%;
          bottom: -100px;
          animation-delay: 10s;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const TipCard = ({ icon, title, content, bgColor }) => {
  return (
    <div
      className={`${bgColor} p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center mb-3">
        {icon}
        <h2 className="text-lg font-semibold text-blue-700 ml-3">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

export default TipsPage;
