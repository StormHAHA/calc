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
    className={`w-[32.5%] rounded-[12px] border px-4 py-8 
      ${props.productType === type ? "bg-blue-500/30 border-blue-400" : "bg-white/5 border-white/50"}`}
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
       imgs = ["/img/005.jpg", "/img/006.jpg", "/img/004.jpg"];
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
    className={`w-[32.5%]  rounded-[12px] border px-4 py-8 
      ${props.shape === shape ? "bg-blue-500/30 border-blue-400" : "bg-white/5 border-white/50"}`}
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
  const materials = ["LG (Hi-Macs)", "Samsung (Staron)", "Corian (Dupont)", "Hanex", "Grandex", "Neomarm"];
  const materialKeys = {
    "LG (Hi-Macs)": "LG",
    "Samsung (Staron)": "Staron",
    "Corian (Dupont)": "Corian",
    "Hanex": "Hanex",
    "Grandex": "Grandex",
    "Neomarm": "Neomarm"
  };
  const imgs = [
    "/img/Lg-Hi-Macs.png",
    "/img/Samsung-Staron.png",
    "/img/Corian.png",
    "/img/Hanex.png",
    "/img/Grandex.png",
    "/img/Neomarm.jpg",
  ];

  // Серии выбранного материала
  const selectedSeries = props.selectedMaterial ? props.materials[props.selectedMaterial.type] : [];

  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
        <h2 className="text-text-accent font-bold text-[24px]">Материал</h2>
        <h3 className="text-text-secondary text-center">Выберите материал для вашего изделия</h3>

        {/* Сетка материалов */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {materials.map((mat, i) => {
            const key = materialKeys[mat];
            return (
              <button
                key={i}
                onClick={() => props.setSelectedMaterial({ type: key, index: 0 })}
                className={`border px-4 py-6 hover:border-blue-400 transition
                  ${props.selectedMaterial.type === key ? "bg-blue-500/30 border-blue-400" : "bg-white/5 rounded-[12px] border-white/30"}`}
              >
                <img
                  src={imgs[i]}
                  alt={mat}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <p className="text-text-headers font-semibold text-center">{mat}</p>
              </button>
            );
          })}
        </div>

        {/* Контейнер серий выбранного материала */}
        {props.selectedMaterial.type && selectedSeries && selectedSeries.length > 0 && (
          <div className="bg-white/5 rounded-br border border-white/10 p-4 mt-6">
            <h3 className="text-text-accent font-semibold text-lg mb-2 text-center">
              Серии {props.selectedMaterial.type}
            </h3>
            <div className="flex gap-2 flex-wrap justify-center">
              {selectedSeries.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => props.setSelectedMaterial({ type: props.selectedMaterial.type, index: idx })}
                  className={`border px-3 py-1 rounded-md text-sm
                    ${props.selectedMaterial.index === idx ? "bg-blue-400 text-white" : "bg-white/5"}`}
                >
                  {val} мм
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
if(step.type === "profile") {
  const profileNames = ["R3", "R5", "R10", "L45", "Классика", "Непроливайка"];
  const imgs = ["/img/k1.jpg", "/img/k2.jpg", "/img/k3.jpg", "/img/k4.jpg", "/img/k5.jpg", "/img/k6.jpg"];

  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
        <h2 className="text-text-accent font-bold text-[24px]">Профиль</h2>
        <h3 className="text-text-secondary text-center">Выберите профиль для вашего изделия</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profileNames.map((name, i) => (
            <button
              key={i}
              onClick={() => props.setSelectedProfile(i)}
              className={`border px-4 py-6 rounded-[12px] flex flex-col items-center hover:border-blue-400 transition
                ${props.selectedProfile === i ? "bg-blue-500/30 border-blue-400" : "bg-white/5 border-white/30"}`}
            >
              <img
                src={imgs[i]}
                alt={name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <p className="text-text-headers font-semibold text-center">{name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

if(step.type === "bord") {
  const bordNames = ["Галтель", "R3-R5", "Классика", "L45", "Литой"]; 
  const imgs = ["/img/b1.jpg", "/img/b2.jpg", "/img/b3.jpg", "/img/b4.jpg", "/img/b5.jpg"];

  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-4 flex flex-col gap-4">
        <h2 className="text-text-accent font-bold text-[24px]">Бортик</h2>
        <h3 className="text-text-secondary text-center">Выберите бортик для вашего изделия</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bordNames.map((name, i) => (
            <button
              key={i}
              onClick={() => props.setSelectedBord(i)}
              className={`border px-4 py-6 rounded-[12px] flex flex-col items-center hover:border-blue-400 transition
                ${props.selectedBord === i ? "bg-blue-500/30 border-blue-400" : "bg-white/5 border-white/30"}`}
            >
              <img
                src={imgs[i]}
                alt={name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <p className="text-text-headers font-semibold text-center">{name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}



if (step.type === "dimensions") {
  // Определяем поля ввода в зависимости от формы и типа
  let dimensionFields = [];
  let shapeImage = "";

  if (props.productType === "Столешницы для кухни") {
    if (props.shape === "Прямая") {
      dimensionFields = ["W1", "H1"];
      shapeImage = "/img/001b.jpg";
    } else if (props.shape === "Г-образная") {
      dimensionFields = ["W1", "H1", "W2", "H2"];
      shapeImage = "/img/002b.jpg";
    } else if (props.shape === "П-образная") {
      dimensionFields = ["W1", "H1", "W2", "H2", "W3", "H3"];
      shapeImage = "/img/003b.jpg";
    }
  } else if (props.productType === "Столешницы для ванной") {
    dimensionFields = ["W1", "H1"];
    shapeImage = "/img/014b.jpg";
  } else if (props.productType === "Подоконники") {
    if (props.shape === "Прямой") {
      dimensionFields = ["W1", "H1"];
      shapeImage = "/img/005b.jpg";
    } else if (props.shape === "Угловой") {
      dimensionFields = ["W1", "H1", "W2", "H2"];
      shapeImage = "/img/006b.jpg";
    } else if (props.shape === "Эркерный") {
      dimensionFields = ["W1", "H1", "W2", "H2", "W3", "H3"];
      shapeImage = "/img/004b.jpg";
    }
  }

  // Наборы моек
  const kitchenSinks = ["M410", "MR410", "D380", "M250"];
  const bathSinks = ["L600", "SH500", "R530"];
  const washingImages = {
    M410: "/img/washing0.jpg",
    MR410: "/img/washing1.jpg",
    D380: "/img//img/washing2.jpg",
    M250: "/img//img/washing5.jpg",
    L600: "/img/washing3.jpg",
    SH500: "/img/washing4.jpg",
    R530: "/img/washing6.jpg",
};
  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-6 flex flex-col gap-6">
        <h2 className="text-text-accent font-bold text-[24px] text-center">Размеры (мм)</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Картинка выбранной формы */}
          <div className="flex-shrink-0">
            <img src={shapeImage} alt={props.shape} className="rounded-md border w-80 h-auto object-cover" />
          </div>

          {/* Поля ввода */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {dimensionFields.map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label className="text-text-secondary">{field}</label>
                <input
                  type="number"
                  value={props.dimensions[field] || ""}
                  onChange={(e) =>
                    props.setDimensions({ ...props.dimensions, [field]: e.target.value === "" ? 0 : +e.target.value })
                  }
                  className="border rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  step="1"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Радиусы бортиков */}
        {(props.productType === "Столешницы для кухни" || props.productType === "Столешницы для ванной") ? (
          <div className="mt-4">
            <h3 className="text-text-accent font-semibold text-lg mb-2">Радиусы бортиков (мм)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-2 items-center">
                  <label className="text-text-secondary">Радиус {i + 1}</label>
                  <input
                    type="number"
                    value={props.rounding[i] || ""}
                    onChange={(e) => {
                      const newRounding = [...props.rounding];
                      newRounding[i] = e.target.value === "" ? 0 : +e.target.value;
                      props.setRounding(newRounding);
                    }}
                    className="border rounded-md p-2 text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    step="1"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          dimensionFields.length > 2 && (
            <div className="mt-4">
              <h3 className="text-text-accent font-semibold text-lg mb-2">Радиусы бортиков (мм)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dimensionFields.map((f, i) => (
                  <div key={i} className="flex flex-col gap-2 items-center">
                    <label className="text-text-secondary">{f} радиус</label>
                    <input
                      type="number"
                      value={props.rounding[i] || ""}
                      onChange={(e) => {
                        const newRounding = [...props.rounding];
                        newRounding[i] = e.target.value === "" ? 0 : +e.target.value;
                        props.setRounding(newRounding);
                      }}
                      className="border rounded-md p-2 text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      step="1"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* Блок с мойкой */}
        {(props.productType === "Столешницы для кухни" || props.productType === "Столешницы для ванной") && (
          <div className="mt-6">
            <h3 className="text-text-accent font-semibold text-lg mb-2">Мойка</h3>

            {/* Чекбокс: вырез */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={props.cutoutWashing}
                onChange={(e) => {
                  props.setCutoutWashing(e.target.checked);
                  if (!e.target.checked) {
                    props.setSinkStone(false);
                    props.setSelectedWashings([]);
                  }
                }}
              />
              Вырез под мойку
            </label>

            {/* Чекбокс: мойка из камня */}
            {props.cutoutWashing && (
              <label className="flex items-center gap-2 ml-4 mt-2">
                <input
                  type="checkbox"
                  checked={props.sinkStone}
                  onChange={(e) => {
                    props.setSinkStone(e.target.checked);
                    if (!e.target.checked) {
                      props.setSelectedWashings([]);
                    }
                  }}
                />
                Мойка из камня
              </label>
            )}

            {/* Карточки моек */}
            {props.cutoutWashing && props.sinkStone && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {(props.productType === "Столешницы для кухни" ? kitchenSinks : bathSinks).map((sink, i) => (
                  <button
                    key={i}
                    onClick={() => props.setSelectedWashings([i])}
                    className={`border px-4 py-6 rounded-[12px] flex flex-col items-center hover:border-blue-400 transition
                      ${props.selectedWashings.includes(i) ? "bg-blue-500/30 border-blue-400" : "bg-white/5 border-white/30"}`}
                  >
                    {washingImages[sink] && (
                      <img
                        src={washingImages[sink]}
                        alt={sink}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                    )}
                    <p className="text-text-headers font-semibold text-center">{sink}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
// 2. Внутри компонента Step добавляем новый тип
if (step.type === "summary") {
  // Считаем площадь для отображения
  let S = 0;
  if (props.productType === "Подоконники") {
    if (props.dimensions.W3 && props.dimensions.H3) {
      S = (props.dimensions.W1 * props.dimensions.H1 + props.dimensions.W2 * props.dimensions.H2 + props.dimensions.W3 * props.dimensions.H3) / 1000000;
    } else if (props.dimensions.W2 && props.dimensions.H2) {
      S = (props.dimensions.W1 * props.dimensions.H1 + props.dimensions.W2 * props.dimensions.H2) / 1000000;
    } else {
      S = (props.dimensions.W1 * props.dimensions.H1) / 1000000;
    }
  } else {
    // для кухонь и ванных
    if (props.shape === "Прямая") {
      S = (props.dimensions.W1 * props.dimensions.H1) / 1000000;
    } else if (props.shape === "Г-образная") {
      S = (props.dimensions.W1 * props.dimensions.H1 + (props.dimensions.H2 - props.dimensions.H1) * props.dimensions.W2) / 1000000;
    } else if (props.shape === "П-образная") {
      S = (props.dimensions.W1 * props.dimensions.H2 + (props.dimensions.H1 - props.dimensions.H2) * props.dimensions.W2 + props.dimensions.W3 * props.dimensions.H3) / 1000000;
    }
  }

  const pricePerM2 = props.materials[props.selectedMaterial.type][props.selectedMaterial.index];
  const totalPrice = props.calculateTotal();

  return (
    <section className="container">
      <div className="bg-white/5 rounded-br border border-white/10 p-6 flex flex-col gap-4">
        <h2 className="text-text-accent font-bold text-2xl text-center">Расчет стоимости изделия</h2>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p>Форма:</p>
          <p>{props.shape}</p>

          <p>Площадь изделия:</p>
          <p>{S.toFixed(2)} м²</p>

          <p>Производитель:</p>
          <p>{props.selectedMaterial.type}</p>

          <p>Наименование материала:</p>
          <p>{props.materials[props.selectedMaterial.type][props.selectedMaterial.index]} мм</p>

          <p>Стоимость материала:</p>
          <p>{(pricePerM2 * S).toLocaleString()} руб.</p>

          <p>Вид передней кромки:</p>
          <p>{["R3", "R5", "R10", "L45", "Классика", "Непроливайка"][props.selectedProfile]}</p>

          {props.productType !== "Подоконники" && (
            <>
              <p>Стоимость бортика:</p>
              <p>{(S * props.bord[props.selectedBord]).toLocaleString()} руб.</p>

              <p>Радиусы бортиков:</p>
              <p>{props.rounding.map(r => r || 0).join(", ")}</p>

              <p>Вырез под мойку:</p>
              <p>{props.cutoutWashing ? "Да" : "Нет"}</p>

              {props.cutoutWashing && props.sinkStone && (
                <>
                  <p>Выбранная мойка:</p>
                  <p>{props.selectedWashings.map(i => props.washings[i][0]).join(", ")}</p>
                </>
              )}
            </>
          )}

          <p className="font-bold mt-4">Итоговая стоимость:</p>
          <p className="font-bold">{totalPrice.toLocaleString()} руб.</p>
        </div>
      </div>
    </section>
  );
}

  return null;
}