export default function Step(props) {
  const { step } = props;
  if (step.type === "type") {
    const types = ["Столешницы для кухни", "Столешницы для ванной", "Подоконники"];
    const descr = ["Кухонные и рабочие столешницы", "Интегрированные мойки", "Пожоконники из искуственного камня"];
    const images = ["🫖", "🛀🏿", "🪟"]
    return (
      <section className="container"> 
        <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
          <h2 className="text-text-accent font-bold text-[24px]">Тип продукта</h2>
          <h3 className="text-text-secondary text-center">Выберите тип продукта</h3>
          <div className="flex items-center justify-between">
          {types.map((type, i) => (
  <button
    key={i}
    onClick={() => props.setProductType(type)}
    className={`w-[32.5%] bg-white/5 rounded-[12px] border px-4 py-8 border-white/50
      ${props.productType === type ? "bg-blue-500/30 border-blue-400" : ""}`}
  >
    <p className="text-[62px] text-center">{images[i]}</p>
    <p className="text-text-headers text-center py-2 font-semibold text-[18px]">{type}</p>
    <p className="text-text-secondary text-center">{descr[i]}</p>
  </button>
))}
          
          </div>
        </div>
      </section> 
    );
  }
  if(step.type === "shape") {
    let shapes, imgs, h;
    if (props.productType === "Столешницы для кухни") {
       shapes = ["Прямая","Г-образная","П-образная"];
       imgs = ["/img/001.jpg", "/img/002.jpg", "/img/003.jpg"];
       h = "Выберите форму столешницы для кухни";
    } else if (props.productType === "Столешницы для ванной") {
       shapes = ["Прямая"];
       imgs = ["/img/014.jpg"];
       h = "Выберите форму столешницы для ванной";
    } else {
       shapes = ["Прямой", "Угловой", "Эркерный"];
       imgs = ["/img/004.jpg", "/img/005.jpg", "/img/006.jpg"];
       h = "Выберите форму подоконника";
    }
    return (
      <section className="container"> 
        <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
          <h2 className="text-text-accent font-bold text-[24px]">Форма</h2>
          <h3 className="text-text-secondary text-center">{h}</h3>
          <div className="flex items-center justify-between">
          {shapes.map((shape, i) => (
  <button
    key={i}
    onClick={() => props.setShape(shape)}
    className={`w-[32.5%] bg-white/5 rounded-[12px] border px-4 py-8 border-white/50
      ${props.shape === shape ? "bg-blue-500/30 border-blue-400" : ""}`}
  >
    <img src={imgs[i]} alt="#" className="mx-auto"/>
    <p className="text-text-headers text-center py-2 font-semibold text-[18px]">{shape}</p>
  </button>
))}
          
          </div>
        </div>
      </section> 
    );
  }

if (step.type === "material") {
  const materials = ["LG", "Tristone", "Staron", "Corian", "Hanex", "Grandex", "Bienstone", "Neomarm"];
  const descr = [
    "Надёжный и доступный",
    "Устойчивый к влаге",
    "Прочный и практичный",
    "Премиальное качество",
    "Разнообразие текстур",
    "Современный стиль",
    "Экологичный камень",
    "Элитная коллекция"
  ];
  const imgs = [
    "/img/mat-lg.jpg",
    "/img/mat-tristone.jpg",
    "/img/mat-staron.jpg",
    "/img/mat-corian.jpg",
    "/img/mat-hanex.jpg",
    "/img/mat-grandex.jpg",
    "/img/mat-bienstone.jpg",
    "/img/mat-neomarm.jpg"
  ];

  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
        <h2 className="text-text-accent font-bold text-[24px]">Материал</h2>
        <h3 className="text-text-secondary text-center">Выберите материал для вашего изделия</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {materials.map((mat, i) => (
            <button
              key={i}
              onClick={() => props.setSelectedMaterial({ type: mat, index: 0 })}
              className={`bg-white/5 rounded-[12px] border px-4 py-6 border-white/30 hover:border-blue-400 transition
                ${props.selectedMaterial.type === mat ? "bg-blue-500/30 border-blue-400" : ""}`}
            >
              <img
                src={imgs[i]}
                alt={mat}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <p className="text-text-headers font-semibold text-center">{mat}</p>
              <p className="text-text-secondary text-sm text-center">{descr[i]}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
  if(step.type === "profile") {
    return (
      <div>
        <h2>Профиль</h2>
        {props.selectedProfile != null && props.profiles.map((p,i) =>
          <button 
            key={i} 
            className={props.selectedProfile===i?"bg-blue-200":"bg-gray-100"} 
            onClick={()=>props.setSelectedProfile(i)}
          >
            Профиль {i}
          </button>
        )}
      </div>
    );
  }

  if(step.type === "bord") {
    return (
      <div>
        <h2>Бортик</h2>
        {props.bord.map((b,i) =>
          <button 
            key={i} 
            className={props.selectedBord===i?"bg-blue-200":"bg-gray-100"} 
            onClick={()=>props.setSelectedBord(i)}
          >
            Бортик {i}
          </button>
        )}
      </div>
    );
  }

  if(step.type === "washing") {
    return (
      <div>
        <h2>Мойки</h2>
        {props.washings.map((w,i) => (
          <button 
            key={i} 
            className={props.selectedWashings.includes(i)?"bg-blue-200":"bg-gray-100"}
            onClick={()=>{
              if(props.selectedWashings.includes(i))
                props.setSelectedWashings(props.selectedWashings.filter(x=>x!==i));
              else
                props.setSelectedWashings([...props.selectedWashings,i]);
            }}
          >
            {w[0]}
          </button>
        ))}
      </div>
    );
  }

  if(step.type === "dimensions") {
    return (
      <div>
        <h2>Размеры (мм)</h2>
        <label>W1: <input type="number" value={props.dimensions.W1} onChange={e=>props.setDimensions({...props.dimensions,W1:+e.target.value})} /></label>
        <label>H1: <input type="number" value={props.dimensions.H1} onChange={e=>props.setDimensions({...props.dimensions,H1:+e.target.value})} /></label>
      </div>
    );
  }

  return null;
}