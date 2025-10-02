export default function PriceDisplay({ total }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
            <span className="text-white text-2xl font-bold">₽</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Текущая стоимость</h3>
            <p className="text-green-300 text-sm">Предварительный расчет</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">
            {total.toLocaleString()} руб.
          </div>
          {total > 0 && (
            <div className="text-sm text-green-300">
              Включая работы и материалы
            </div>
          )}
        </div>
      </div>
      
      {total === 0 ? (
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">
              Выберите параметры для расчета стоимости
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">Готовность к заказу</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Готово</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}