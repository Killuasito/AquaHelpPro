import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTemperatureHigh,
  FaFilter,
  FaWater,
  FaFish,
  FaChevronRight,
} from "react-icons/fa";

const BeginnerGuide = () => {
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
      ],
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
      ],
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
      ],
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
      ],
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

      <div className="grid gap-8 md:grid-cols-2">
        {guideTopics.map((topic, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6 flex items-center text-white">
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
