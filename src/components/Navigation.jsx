export default function Breadcrumbs({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="bg-gradient-to-br from-[#3B6036]/90 to-[#62C584]/40 backdrop-blur-sm border border-[#3B6036]/40 rounded-2xl p-6 shadow-2xl shadow-[#3B6036]/20">
      <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const isAccessible = idx <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isAccessible && setCurrentStep(idx)}
              disabled={!isAccessible}
              className={`
                group relative flex items-center justify-center px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                ${isActive 
                  ? "bg-gradient-to-br from-[#3B6036]/60 to-[#62C584]/60 border-[#62C584] text-white shadow-lg shadow-[#3B6036]/30" 
                  : isCompleted
                    ? "bg-gradient-to-br from-[#62C584]/30 to-[#3B6036]/30 border-[#62C584]/60 text-[#CFFFD8] hover:from-[#62C584]/40 hover:to-[#3B6036]/40"
                    : isAccessible
                      ? "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600 text-gray-300 hover:border-[#62C584]/50 hover:text-white"
                      : "bg-gray-800/30 border-gray-700 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {/* Номер шага */}
              <span className={`
                flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 text-xs md:text-sm font-bold transition-colors duration-300
                ${isActive 
                  ? "bg-[#62C584] text-[#1A2B17]" 
                  : isCompleted
                    ? "bg-[#3B6036] text-white"
                    : "bg-gray-600 text-gray-300"
                }
              `}>
                {isCompleted ? "✓" : idx + 1}
              </span>

              {/* Название шага */}
              <span className="text-xs md:text-sm font-medium hidden sm:inline">
                {step.name}
              </span>

              {/* Мобильная версия */}
              <span className="text-xs font-medium sm:hidden">
                {step.name.split(' ')[0]}
              </span>

              {/* Эффект hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </button>
          );
        })}
      </nav>

      {/* Индикатор прогресса */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Прогресс</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#3B6036] to-[#62C584] h-2 rounded-full transition-all duration-500 ease-out shadow-sm shadow-[#62C584]/40"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}