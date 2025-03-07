import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTemperatureHigh,
  FaFilter,
  FaWater,
  FaFish,
  FaChevronRight,
  FaLightbulb,
  FaPlusCircle,
  FaQuestionCircle,
  FaBook,
} from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";

const BeginnerGuide = () => {
  const [activeTab, setActiveTab] = useState("guia");

  const guideTopics = [
    {
      title: "Escolhendo seu primeiro aquário",
      icon: <FaWater />,
      content:
        "Para iniciantes, recomendamos aquários de pelo menos 20 litros. Aquários muito pequenos são mais difíceis de manter em equilíbrio.",
      tips: [
        "Opte por formatos retangulares para maior superfície de contato com o ar",
        "Considere o espaço disponível em sua casa",
        "Verifique se o móvel suporta o peso (1 litro = 1 kg)",
        "Invista em um bom filtro, compatível com o volume do aquário",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Ciclagem do aquário",
      icon: <FaFilter />,
      content:
        "A ciclagem é o processo de estabelecimento de bactérias benéficas que convertem amônia tóxica em compostos menos nocivos.",
      tips: [
        "O processo leva de 4-6 semanas",
        "Use kits de teste para monitorar amônia, nitrito e nitrato",
        "Tenha paciência! Não adicione peixes antes de completar a ciclagem",
        "Considere usar aceleradores biológicos de qualidade para iniciar o processo",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Parâmetros da água",
      icon: <FaTemperatureHigh />,
      content:
        "Manter parâmetros estáveis é crucial para a saúde dos peixes. Verifique regularmente pH, temperatura e dureza.",
      tips: [
        "Temperatura ideal: 24-27°C para peixes tropicais",
        "pH: varia conforme a espécie (geralmente 6.8-7.5)",
        "Faça trocas parciais de água semanalmente (25-30%)",
        "Invista em um bom termômetro e kits de teste",
      ],
      color: "from-red-500 to-red-600",
    },
    {
      title: "Plantas vivas",
      icon: <FaLeaf />,
      content:
        "Plantas vivas ajudam a equilibrar o aquário, absorvem nutrientes e oferecem abrigo para os peixes.",
      tips: [
        "Para iniciantes: Anúbias, Elodea, Vallisneria e Cryptocoryne são fáceis de cuidar",
        "Use substrato específico para plantas",
        "Considere iluminação adequada (6-8 horas diárias)",
        "Fertilizantes líquidos podem ajudar no desenvolvimento",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Escolha de peixes",
      icon: <FaFish />,
      content:
        "Comece com espécies resistentes e pacíficas. Não superlote seu aquário.",
      tips: [
        "Regra geral: 1cm de peixe adulto para cada 1-2 litros de água",
        "Peixes iniciantes: Tetra neon, Platy, Moly, Betta (sozinho) e Corydoras",
        "Introduza peixes gradualmente, poucos de cada vez",
        "Pesquise sobre compatibilidade entre espécies",
      ],
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Iluminação adequada",
      icon: <FaLightbulb />,
      content:
        "A iluminação correta é essencial tanto para a saúde dos peixes quanto para o crescimento de plantas.",
      tips: [
        "Use temporizador para manter rotina de luz (8-10 horas por dia)",
        "LED é econômico e eficiente para aquários domésticos",
        "Luz excessiva pode causar proliferação de algas",
        "Diferentes plantas têm diferentes necessidades de luz",
      ],
      color: "from-amber-400 to-amber-500",
    },
    {
      title: "Manutenção regular",
      icon: <MdCleaningServices />,
      content:
        "A manutenção constante é a chave para um aquário saudável e equilibrado.",
      tips: [
        "Programe trocas parciais de água semanais (20-30%)",
        "Limpe regularmente o vidro e o substrato",
        "Verifique o funcionamento do filtro mensalmente",
        "Monitore regularmente os parâmetros da água",
      ],
      color: "from-teal-500 to-teal-600",
    },
  ];

  const faqItems = [
    {
      question:
        "Quanto tempo devo esperar para adicionar peixes ao meu aquário novo?",
      answer:
        "Você deve esperar a conclusão do ciclo do nitrogênio, que geralmente leva de 4 a 6 semanas. Este processo estabelece as bactérias benéficas necessárias para converter substâncias tóxicas produzidas pelos peixes.",
    },
    {
      question: "Com que frequência devo alimentar meus peixes?",
      answer:
        "A maioria dos peixes deve ser alimentada uma ou duas vezes por dia, apenas o suficiente para que consumam tudo em 2-3 minutos. É melhor alimentar menos do que em excesso, pois o excesso de alimento contamina a água.",
    },
    {
      question: "Posso manter diferentes espécies de peixes juntas?",
      answer:
        "Nem todas as espécies são compatíveis. Pesquise sobre os requisitos de cada espécie (temperatura, pH, comportamento) antes de combiná-las. Alguns peixes são territoriais ou agressivos, enquanto outros são pacíficos.",
    },
    {
      question: "Com que frequência devo trocar a água do aquário?",
      answer:
        "Recomenda-se trocar entre 20-30% da água semanalmente. Nunca troque toda a água, pois isso eliminará as bactérias benéficas e causará estresse aos peixes.",
    },
    {
      question: "O que fazer se a água do meu aquário ficar turva?",
      answer:
        "Água turva pode ser causada por excesso de alimentação, superlotação, filtração inadequada ou um aquário novo em processo de ciclagem. Reduza a alimentação, verifique a qualidade da água e a eficiência do filtro.",
    },
  ];

  const additionalResources = [
    {
      title: "Livros recomendados",
      items: [
        "Aquarismo para Iniciantes - Dicas e Técnicas",
        "Guia Completo de Peixes de Água Doce",
        "Plantas Aquáticas: Cultivo e Manutenção",
      ],
    },
    {
      title: "Canais do YouTube",
      items: [
        "Aquarismo Brasil",
        "The Green Machine",
        "Aquarium Co-Op",
        "Fishtank Junkies",
      ],
    },
    {
      title: "Fóruns e Comunidades",
      items: [
        "Aquarismo.org",
        "Reddit r/Aquariums",
        "Grupos do Facebook sobre aquarismo",
      ],
    },
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Guia para Iniciantes em Aquarismo
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Seja bem-vindo ao fantástico mundo do aquarismo! Este guia aborda os
          princípios básicos para iniciar seu aquário com sucesso.
        </p>
      </div>

      <div className="mb-8 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "guia"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("guia")}
            >
              <FaBook className="inline mr-2" />
              Guia Básico
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "faq"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("faq")}
            >
              <FaQuestionCircle className="inline mr-2" />
              Perguntas Frequentes
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "recursos"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("recursos")}
            >
              <FaPlusCircle className="inline mr-2" />
              Recursos Adicionais
            </button>
          </li>
        </ul>
      </div>

      {activeTab === "guia" && (
        <div className="grid gap-8 md:grid-cols-2">
          {guideTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`bg-gradient-to-r ${topic.color} py-4 px-6 flex items-center text-white`}
              >
                <div className="mr-3 text-xl">{topic.icon}</div>
                <h2 className="text-xl font-semibold">{topic.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{topic.content}</p>
                <ul className="space-y-2">
                  {topic.tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <FaChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "faq" && (
        <motion.div
          className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium text-blue-600 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "recursos" && (
        <motion.div
          className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">
              Recursos Adicionais
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              {additionalResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium text-blue-600 mb-3">
                    {resource.title}
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {resource.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FaChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-blue-50 rounded-lg p-6 mt-8 border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          Lembre-se sempre:
        </h3>
        <p className="text-gray-700">
          Aquarismo requer paciência e aprendizado constante. Não tenha pressa,
          pesquise bastante sobre as espécies que deseja manter e não hesite em
          pedir ajuda em comunidades online ou lojas especializadas.
        </p>
      </div>
    </motion.div>
  );
};

export default BeginnerGuide;
