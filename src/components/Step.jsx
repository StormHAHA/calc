import React from "react";
import { useRef } from "react";

export default function Step(props) {
  const { step } = props;
  const printRef = useRef();
  const handlePrint = () => {
   const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Расчет стоимости изделия</title>
          <style>
            body { font-family: sans-serif; padding: 20px; background: #fff; color: #000; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };
  // Хелпер для плейсхолдера
  const getPlaceholder = (field) => {
    const match = field.match(/([WH])(\d+)/); 
    if (!match) return field; 

    const [, type, num] = match; 

    if (num === "1") {
      return type === "W" ? "Ширина" : "Глубина";
    } else {
      return type === "W" ? `Ширина ${num - 1}` : `Глубина ${num - 1}`;
    }
  };
  const baseCard = "border border-black/40 rounded-2xl p-8 shadow-2xl shadow-black/20";

  // Активная кнопка (зелёная)
  const activeBtn = "bg-gradient-to-br from-black/50 to-[#62C584]/50 border-[#62C584] shadow-lg shadow-black/40";

  // Пассивная кнопка
  const inactiveBtn = "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-[#62C584]/40";
  if (step.type === "type") {
    const types = ["Столешницы для кухни", "Столешницы для ванной", "Подоконники"];
    const descr = ["Кухонные и рабочие столешницы", "Интегрированные мойки", "Подоконники из искусственного камня"];
    const images = ["https://akrilnsk.nilit1.ru/img/кухня.jpg", "https://akrilnsk.nilit1.ru/img/ванная.jpg", "https://akrilnsk.nilit1.ru/img/подоконник.jpg"];

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Тип продукта</h2>
            <p className="text-gray-400">Выберите тип продукта для начала конфигурации</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {types.map((type, i) => (
              <button
                key={i}
                onClick={() => props.setProductType?.(type)}
                className={`group relative overflow-hidden rounded-xl border-2 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${props.productType === type 
                    ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                    : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-full h-34 mb-3 rounded-lg overflow-hidden bg-gray-600/30">
                    <img
                      src={images[i]}
                      alt={descr[i]}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{type}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{descr[i]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (step.type === "shape") {
    let shapes, imgs, h;
    
    if (props.productType === "Столешницы для кухни") {
      shapes = ["Прямая", "Г-образная", "П-образная"];
      imgs = ["https://akrilnsk.nilit1.ru/img/001.jpg", "https://akrilnsk.nilit1.ru/img/002.jpg", "https://akrilnsk.nilit1.ru/img/003.jpg"];
      h = "Выберите форму столешницы для кухни";
    } else if (props.productType === "Столешницы для ванной") {
      shapes = ["Прямая"];
      imgs = ["https://akrilnsk.nilit1.ru/img/014.jpg"];
      h = "Выберите форму столешницы для ванной";
    } else {
      shapes = ["Прямой", "Угловой", "Эркерный"];
      imgs = ["https://akrilnsk.nilit1.ru/img/005.jpg", "https://akrilnsk.nilit1.ru/img/006.jpg", "https://akrilnsk.nilit1.ru/img/004.jpg"];
      h = "Выберите форму подоконника";
    }

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Форма изделия</h2>
            <p className="text-gray-400">{h}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shapes.map((shape, i) => (
              <button
                key={i}
                onClick={() => props.setShape?.(shape)}
                className={`group relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${props.shape === shape 
                    ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                    : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-full h-38 mb-4 rounded-lg overflow-hidden bg-gray-600/30">
                    <img 
                      src={imgs[i]} 
                      alt={shape}
                      className="w-full h-full  object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{shape}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (step.type === "material") {
    const materials = ["Однотонный", "Крошка", "Мрамор",];
    const materialKeys = {
      "Однотонный": "Однотонный",
      "Крошка": "Крошка",
      "Мрамор": "Мрамор"
    };
    // const imgs = [
    //   "/img/HiMacs.png",
    //   "/img/Staron.png",
    //   "/img/Dupont.png",
    //   "/img/Hanex.png",
    //   "/img/Grandex.png",
    //   "/img/Neomarm.png",
    // ];

    const selectedSeries = props.selectedMaterial ? props.materials?.[props.selectedMaterial.type] : [];

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Материал</h2>
            <p className="text-gray-400">Выберите материал для вашего изделия</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {materials.map((mat, i) => {
              const key = materialKeys[mat];
              return (
                <button
                  key={i}
                  onClick={() => props.setSelectedMaterial?.({ type: key, index: 0 })}
                  className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${props.selectedMaterial?.type === key 
                      ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                      : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-600/30">
                      {/* <img
                        src={imgs[i]}
                        alt={mat}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      /> */}
                    </div>
                    <h3 className="text-sm font-semibold text-white text-center">{mat}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* {props.selectedMaterial?.type && selectedSeries && selectedSeries.length > 0 && (
            <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Серии {props.selectedMaterial.type}
              </h3>
              <div className="flex gap-3 flex-wrap justify-center">
                {selectedSeries.map((val, idx) => (
                  <button
                    key={idx}
                    onClick={() => props.setSelectedMaterial?.({ type: props.selectedMaterial?.type, index: idx })}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105
                      ${props.selectedMaterial?.index === idx 
                        ? "bg-black-500 border-black-400 text-white shadow-black-500/30" 
                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                      }`}
                  >
                    {val} мм
                  </button>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </section>
    );
  }

  if (step.type === "profile") {
    const profileNames = ["R3", "R5", "R10", "L45", "Классика", "Непроливайка"];
    const imgs = ["https://akrilnsk.nilit1.ru/img/k1.jpg", "https://akrilnsk.nilit1.ru/img/k2.jpg", "https://akrilnsk.nilit1.ru/img/k3.jpg", "https://akrilnsk.nilit1.ru/img/k4.jpg", "https://akrilnsk.nilit1.ru/img/k5.jpg", "https://akrilnsk.nilit1.ru/img/k6.jpg"];

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Профиль</h2>
            <p className="text-gray-400">Выберите профиль для вашего изделия</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profileNames.map((name, i) => (
              <button
                key={i}
                onClick={() => props.setSelectedProfile?.(i)}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${props.selectedProfile === i 
                    ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                    : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-full h-34 mb-3 rounded-lg overflow-hidden bg-gray-600/30">
                    <img
                      src={imgs[i]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-center">{name}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (step.type === "bord") {
    const bordNames = ["Галтель", "R3-R5", "Классика", "L45", "Литой"];
    const imgs = ["https://akrilnsk.nilit1.ru/img/b1.jpg", "https://akrilnsk.nilit1.ru/img/b2.jpg", "https://akrilnsk.nilit1.ru/img/b3.jpg", "https://akrilnsk.nilit1.ru/img/b4.jpg", "https://akrilnsk.nilit1.ru/img/b5.jpg"];

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Бортик</h2>
            <p className="text-gray-400">Выберите бортик для вашего изделия</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bordNames.map((name, i) => (
              <button
                key={i}
                onClick={() => props.setSelectedBord?.(i)}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${props.selectedBord === i 
                    ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                    : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-600/30">
                    <img
                      src={imgs[i]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-center">{name}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (step.type === "dimensions") {
    let dimensionFields = [];
    let shapeImage = "";

    if (props.productType === "Столешницы для кухни") {
      if (props.shape === "Прямая") {
        dimensionFields = ["W1", "H1"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/001b.png";
      } else if (props.shape === "Г-образная") {
        dimensionFields = ["W1", "H1", "W2", "H2"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/002b.png";
      } else if (props.shape === "П-образная") {
        dimensionFields = ["W1", "H1", "W2", "H2", "W3", "H3"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/003b.png";
      }
    } else if (props.productType === "Столешницы для ванной") {
      dimensionFields = ["W1", "H1"];
      shapeImage = "https://akrilnsk.nilit1.ru/img/014b.png";
    } else if (props.productType === "Подоконники") {
      if (props.shape === "Прямой") {
        dimensionFields = ["W1", "H1"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/005b.png";
      } else if (props.shape === "Угловой") {
        dimensionFields = ["W1", "H1", "W2", "H2"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/006b.png";
      } else if (props.shape === "Эркерный") {
        dimensionFields = ["W1", "H1", "W2", "H2", "W3", "H3"];
        shapeImage = "https://akrilnsk.nilit1.ru/img/004b.png";
      }
    }
    const renderDimensionField = (field) => {
  const positionsByShape = {
    "Прямая": {
      W1: { top: "23%", left: "34%" },
      H1: { top: "14%", left: "85%" },
    },
    "Прямая для ванной": {
      W1: { top: "20%", left: "34%" },
      H1: { top: "65%", left: "10%" },
    },
    "Г-образная": {
      W1: { top: "22%", left: "30%" },
      H1: { top: "65%", left: "10%" },
      W2: { top: "25%", left: "81%" },
      H2: { top: "62%", left: "92%" },
    },
    "П-образная": {
      W1: { top: "70%", left: "14%" },
      H1: { top: "75%", left: "60%" },
      W2: { top: "27%", left: "15%" },
      H2: { top: "12%", left: "54%" },
      W3: { top: "18%", left: "80%" },
      H3: { top: "47%", left: "92%" },
    },
    "Прямой": {
      W1: { top: "78%", left: "60%" },
      H1: { top: "72%", left: "20%" },
    },
    "Угловой": {
      W1: { top: "50%", left: "46%" },
      H1: { top: "75%", left: "10%" },
      W2: { top: "50%", left: "76%" },
      H2: { top: "75%", left: "80%" },
    },
    "Эркерный": {
      W1: { top: "56%", left: "30%" },
      H1: { top: "90%", left: "20%" },
      W2: { top: "50%", left: "50%" },
      H2: { top: "65%", left: "52%" },
      W3: { top: "45%", left: "70%" },
      H3: { top: "60%", left: "90%" },
    }
  };

  let coords = positionsByShape[props.shape]?.[field] || { top: "0%", left: "0%" };
  if (props.productType === "Столешницы для ванной") {
    coords = positionsByShape["Прямая для ванной"]?.[field];
  }
  return (
    <input
      key={field}
      type="number"
      value={props.dimensions?.[field] || ""}
      onChange={(e) =>
        props.setDimensions?.({
          ...props.dimensions,
          [field]: e.target.value === "" ? 0 : +e.target.value,
        })
      }
      placeholder={field}
      className="absolute w-20 px-2 py-1 bg-gray-800/70 border border-gray-500 rounded-md text-white text-center text-sm focus:ring-2 focus:ring-black-500"
      style={{
        top: coords.top,
        left: coords.left,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
    const kitchenSinks = ["M410", "MR410", "D380", "M250"];
    const bathSinks = ["L600", "SH500", "R530"];
    const washingImages = {
      M410: "https://akrilnsk.nilit1.ru/img/washing0.jpg",
      MR410: "https://akrilnsk.nilit1.ru/img/washing1.jpg",
      D380: "https://akrilnsk.nilit1.ru/img/washing2.jpg",
      M250: "https://akrilnsk.nilit1.ru/img/washing5.jpg",
      L600: "https://akrilnsk.nilit1.ru/img/washing3.jpg",
      SH500: "https://akrilnsk.nilit1.ru/img/washing4.jpg",
      R530: "https://akrilnsk.nilit1.ru/img/washing6.jpg",
    };

    return (
      <section className="w-full">
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Размеры (мм)</h2>
            <p className="text-gray-400">Укажите точные размеры вашего изделия</p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[600px] mb-10">
              <img
                src={shapeImage}
                alt={props.shape}
                className="w-full h-auto rounded-xl border border-gray-600/50 shadow-lg"
              />
              {dimensionFields.map((field) => renderDimensionField(field))}
            </div>
          </div>

          {/* Радиусы бортиков
          {(props.productType === "Столешницы для кухни" || props.productType === "Сто��ешницы для ванной") ? (
            <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/50 p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Радиусы бортиков (мм)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <label className="block text-gray-300 text-center">Радиус {i + 1}</label>
                    <input
                      type="number"
                      value={props.rounding?.[i] || ""}
                      onChange={(e) => {
                        const newRounding = [...(props.rounding || [0, 0, 0, 0])];
                        newRounding[i] = e.target.value === "" ? 0 : +e.target.value;
                        props.setRounding?.(newRounding);
                      }}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-center focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all duration-300"
                      placeholder="0"
                      step="1"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            dimensionFields.length > 2 && (
              <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/50 p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Радиусы бортиков (мм)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dimensionFields.map((f, i) => (
                    <div key={i} className="space-y-2">
                      <label className="block text-gray-300 text-center">{f} радиус</label>
                      <input
                        type="number"
                        value={props.rounding?.[i] || ""}
                        onChange={(e) => {
                          const newRounding = [...(props.rounding || [])];
                          newRounding[i] = e.target.value === "" ? 0 : +e.target.value;
                          props.setRounding?.(newRounding);
                        }}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-center focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all duration-300"
                        placeholder="0"
                        step="1"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )} */}

          {/* Блок с мойкой */}
          {(props.productType === "Столешницы для кухни" || props.productType === "Столешницы для ванной") && (
            <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Мойка</h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={props.cutoutWashing}
                    onChange={(e) => {
                      props.setCutoutWashing?.(e.target.checked);
                      if (!e.target.checked) {
                        props.setSinkStone?.(false);
                        props.setSelectedWashings?.([]);
                      }
                    }}
                     className="
                        w-5 h-5
                        form-checkbox
                        text-black-500
                        bg-gray-700
                        border-gray-600
                        rounded
                        focus:ring-black-500 focus:ring-2
                        cursor-pointer
                      "
                    />
                  <span className="text-white group-hover:text-black-300 transition-colors duration-300">Вырез под мойку</span>
                </label>

                {props.cutoutWashing && (
                  <label className="flex items-center gap-3 ml-8 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={props.sinkStone}
                      onChange={(e) => {
                        props.setSinkStone?.(e.target.checked);
                        if (!e.target.checked) {
                          props.setSelectedWashings?.([]);
                        }
                      }}
                      className="
                        w-5 h-5
                        form-checkbox
                        text-black-500
                        bg-gray-700
                        border-gray-600
                        rounded
                        focus:ring-black-500 focus:ring-2
                        cursor-pointer
                      "
                    />
                    <span className="text-white group-hover:text-black-300 transition-colors duration-300">Мойка из камня</span>
                  </label>
                )}

                {props.cutoutWashing && props.sinkStone && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {(props.productType === "Столешницы для кухни" ? kitchenSinks : bathSinks).map((sink, i) => (
                      <button
                        key={i}
                        onClick={() => props.setSelectedWashings?.([i])}
                        className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                          ${props.selectedWashings?.includes(i) 
                            ? "bg-gradient-to-br from-black-500/30 to-black-600/30 border-black-400 shadow-black-500/20" 
                            : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500"
                          }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          {washingImages[sink] && (
                            <div className="w-full h-34 mb-3 rounded-lg overflow-hidden bg-gray-600/30">
                              <img
                                src={washingImages[sink]}
                                alt={sink}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          )}
                          <h3 className="font-semibold text-white text-center">{sink}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (step.type === "summary") {
    // Расчет площади
    let S = 0;
    if (props.productType === "Подоконники") {
      if (props.dimensions?.W3 && props.dimensions?.H3) {
        S = (props.dimensions.W1 * props.dimensions.H1 + props.dimensions.W2 * props.dimensions.H2 + props.dimensions.W3 * props.dimensions.H3) / 1000000;
      } else if (props.dimensions?.W2 && props.dimensions?.H2) {
        S = (props.dimensions.W1 * props.dimensions.H1 + props.dimensions.W2 * props.dimensions.H2) / 1000000;
      } else {
        S = (props.dimensions?.W1 * props.dimensions?.H1) / 1000000;
      }
    } else {
      if (props.shape === "Прямая") {
        S = (props.dimensions?.W1 * props.dimensions?.H1) / 1000000;
      } else if (props.shape === "Г-образная") {
        S = (props.dimensions?.W1 * props.dimensions?.H1 + (props.dimensions?.H2 - props.dimensions?.H1) * props.dimensions?.W2) / 1000000;
      } else if (props.shape === "П-образная") {
        S = (props.dimensions?.W1 * props.dimensions?.H2 + (props.dimensions?.H1 - props.dimensions?.H2) * props.dimensions?.W2 + props.dimensions?.W3 * props.dimensions?.H3) / 1000000;
      }
    }

    const pricePerM2 = props.materials?.[props.selectedMaterial?.type]?.[props.selectedMaterial?.index] || 0;
    const totalPrice = props.calculateTotal?.() || 0;

    return (
      <div>
      <section className="w-full" ref={printRef}>
        <div className={baseCard}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Расчет стоимости изделия</h2>
            <p className="text-gray-400">Детальная смета вашего заказа</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Основная информация */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl p-4 border border-gray-600/50">
                <h3 className="text-lg font-semibold text-white mb-3">Основные параметры</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Форма: </span>
                    <span className="text-white font-medium">{props.shape}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Площадь изделия: </span>
                    <span className="text-white font-medium">{S.toFixed(2)} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Тип материала: </span>
                    <span className="text-white font-medium">{props.selectedMaterial?.type}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-300">Толщина материала: </span>
                    <span className="text-white font-medium">{props.materials?.[props.selectedMaterial?.type]?.[props.selectedMaterial?.index]} мм</span>
                  </div> */}
                </div>
              </div>

              {/* <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl p-4 border border-gray-600/50">
                <h3 className="text-lg font-semibold text-white mb-3">Дополнительные опции</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Вид передней кромки: </span>
                    <span className="text-white font-medium">{["R3", "R5", "R10", "L45", "Классика", "Непроливайка"][props.selectedProfile || 0]}</span>
                  </div>
                  
                  {props.productType !== "Подоконники" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Радиусы бортиков: </span>
                        <span className="text-white font-medium">{props.rounding?.map(r => r || 0).join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Вырез под мойку: </span>
                        <span className={`font-medium ${props.cutoutWashing ? 'text-black-400' : 'text-red-400'}`}>
                          {props.cutoutWashing ? "Да" : "Нет"}
                        </span>
                      </div>
                      {props.cutoutWashing && props.sinkStone && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">Выбранная мойка: </span>
                          <span className="text-white font-medium">{props.selectedWashings?.map(i => props.washings?.[i]?.[0]).join(", ")}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div> */}
            </div>

            {/* Стоимость */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-black-600/20 to-black-700/20 rounded-xl p-4 border border-black-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">Стоимость</h3>
                <div className="space-y-3">
                  
                  
                  {/* {props.productType !== "Подоконники" && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Стоимость бортика: </span>
                      <span className="text-white font-medium">{(S * (props.bord?.[props.selectedBord || 0] || 0)).toLocaleString()} руб.</span>
                    </div>
                  )} */}
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Итоговая стоимость: </span>
                      <span className="text-2xl font-bold text-[#62ff84]">{totalPrice.toLocaleString()} руб.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-gradient-to-r from-black-600/20 to-black-700/20 rounded-xl p-4 border border-black-500/30">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Ваш заказ готов!</h4>
                  <p className="text-gray-300 text-sm mb-4">Свяжитесь с нами для оформления заказа</p>
                  <button className="w-full bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-black-500/30">
                    Оформить заказ
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-black-600 text-white rounded-lg"
      >
        Печать / PDF
      </button> */}
      </div>
    );
  }

  return null;
}