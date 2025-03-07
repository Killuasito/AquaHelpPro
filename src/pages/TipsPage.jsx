import React from "react";
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
} from "react-icons/fa";

const TipsPage = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TipCard
            icon={<FaWater className="text-2xl text-blue-500" />}
            title="Qualidade da Água"
            content="Mantenha os parâmetros da água ideais realizando testes regularmente. O pH, amônia, nitrito e nitrato ideais dependem das espécies de peixes que você tem."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaFish className="text-2xl text-blue-500" />}
            title="Alimentação"
            content="Alimente seus peixes em pequenas quantidades 1-2 vezes por dia. Excesso de alimentação pode levar à má qualidade da água e problemas de saúde."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaTools className="text-2xl text-blue-500" />}
            title="Manutenção"
            content="Realize trocas regulares de água de 20-30% a cada 1-2 semanas. Limpe os filtros de acordo com as instruções do fabricante."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaThermometerHalf className="text-2xl text-blue-500" />}
            title="Controle de Temperatura"
            content="A maioria dos peixes tropicais prospera em temperaturas entre 24-27°C. Invista em um aquecedor e termômetro confiáveis."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaFlask className="text-2xl text-blue-500" />}
            title="Ciclagem do Aquário"
            content="Antes de adicionar peixes, cicle seu aquário para estabelecer bactérias benéficas. Este processo pode levar de 2 a 6 semanas."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaBug className="text-2xl text-blue-500" />}
            title="Controle de Algas"
            content="Controle o crescimento de algas limitando a exposição à luz, evitando excesso de nutrientes e mantendo um bom equilíbrio de plantas vivas."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaLeaf className="text-2xl text-blue-500" />}
            title="Cuidados com Plantas"
            content="Plantas vivas melhoram a qualidade da água e fornecem esconderijos para os peixes. Escolha espécies adequadas para sua iluminação."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaLightbulb className="text-2xl text-blue-500" />}
            title="Iluminação"
            content="Mantenha um ciclo de luz consistente de 8-10 horas diárias. Muita luz promove crescimento de algas, enquanto pouca luz afeta as plantas."
            bgColor="bg-white"
          />

          <TipCard
            icon={<FaBriefcaseMedical className="text-2xl text-blue-500" />}
            title="Saúde dos Peixes"
            content="Observe seus peixes diariamente para sinais de doenças: nadadeiras danificadas, pontos brancos, comportamento incomum ou perda de apetite."
            bgColor="bg-white"
          />
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
