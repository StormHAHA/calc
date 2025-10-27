export default function PriceDisplay({ total }) {
  return (
    <div className="backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#62C584] rounded-xl flex items-center justify-center shadow-lg shadow-black-500/30">
            <span className="text-white text-2xl font-bold">₽</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Текущая стоимость</h3>
            <p className="text-white text-sm">Предварительный расчет</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-bold text-[#65ff84] mb-1">
            {total.toLocaleString()} руб.
          </div>
          
        </div>
      </div>
    </div>
  );
}