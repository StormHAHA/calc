export default function PriceDisplay({ total }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-black-500 to-black-600 rounded-xl flex items-center justify-center shadow-lg shadow-black-500/30">
            <span className="text-white text-2xl font-bold">₽</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Текущая стоимость</h3>
            <p className="text-black-300 text-sm">Предварительный расчет</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-bold text-black-400 mb-1">
            {total.toLocaleString()} руб.
          </div>
          {total > 0 && (
            <div className="text-sm text-black-300">
              Включая работы и материалы
            </div>
          )}
        </div>
      </div>
    </div>
  );
}