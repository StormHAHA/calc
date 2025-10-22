import React, { useState } from "react";
import Breadcrumbs from "./Navigation";
import PriceDisplay from "./PriceDisplay";
import Step from "./Step";

// Данные
const materials = {
  // LG: [319, 375, 375, 474, 512],
  // Tristone: [319, 353, 353, 375, 474, 474, 512, 512],
  // Staron: [345, 385, 412, 412, 558, 558],
  // Corian: [344, 422, 537, 603],
  // Hanex: [319, 353, 375, 353, 450, 512, 512, 375, 512, 512],
  // Grandex: [319, 353, 375, 474, 512, 512],
  // Bienstone: [375, 430],
  // Neomarm: [430],
  Однотонный: [265],
  Крошка: [276],
  Мрамор: [552],
};

const profiles = [0, 0, 0, 0, 1300, 1800];
const bord = [300, 300, 1300, 500, 1800];
const washings = [
  ["M410", 11000, 4200],
  ["MR410", 9000, 4200],
  ["D380", 11000, 4350],
  ["L600", 11000, 4200],
  ["SH500", 13000, 5500],
  ["M250", 11000, 4200],
  ["R530", 6500, 4000],
];

// шаги
const steps = [
  { id: 0, name: "Тип продукта", type: "type" },
  { id: 1, name: "Выбор формы", type: "shape" },
  { id: 2, name: "Материал", type: "material" },
  // { id: 3, name: "Профиль", type: "profile" },
  // { id: 4, name: "Бортик", type: "bord" },
  { id: 3, name: "Размеры", type: "dimensions" },
  { id: 4, name: "Итоговая цена", type: "summary" },
];

export default function CalculatorApp() {
  const [currentStep, setCurrentStep] = useState(0);

  // состояния
  const [productType, setProductType] = useState(null);
  const [shape, setShape] = useState("Прямая");
  const [selectedMaterial, setSelectedMaterial] = useState({ type: "Однотонный", index: 0 });
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedBord, setSelectedBord] = useState(0);
  const [selectedWashings, setSelectedWashings] = useState([]);
  const [dimensions, setDimensions] = useState({ W1: 0, H1: 0, W2: 0, H2: 0, W3: 0, H3: 0 });
  const [rounding, setRounding] = useState([0, 0, 0, 0]);
  const [sinkStone, setSinkStone] = useState(false);
  const [cutoutHob, setCutoutHob] = useState(false);
  const [cutoutWashing, setCutoutWashing] = useState(false);
  async function getUSDRate() {
  try {
    const response = await fetch(
      "http://www.cbr.ru/dataservice/data?y1=2025&y2=2025&publicationId=33&datasetId=127&measureId=" 
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.RawData[-3].obs_val;
  } catch (err) {
    console.error("Ошибка при получении курса:", err);
  }
}
  const calculateTotal = () => {
    if (!productType) return 0;

    const isKitchen = productType === "Столешницы для кухни";
    const isBathroom = productType === "Столешницы для ванной";
    const isWindowsill = productType === "Подоконники";

    const dollar = getUSDRate();

    const radius = 1500;
    const cutout = 345;

    let S = 0;
    if (shape === "Прямая") {
      S = (dimensions.W1 * dimensions.H1) / 1000000;
    } else if (shape === "Г-образная") {
      S = (dimensions.W1 * dimensions.H1 + (dimensions.H2 - dimensions.H1) * dimensions.W2) / 1000000;
    } else if (shape === "П-образная") {
      S = (dimensions.W1 * dimensions.H2 + (dimensions.H1 - dimensions.H2) * dimensions.W2 + dimensions.W3 * dimensions.H3) / 1000000;
    } else if (productType === "Подоконники") {
      // Для подоконников площадь зависит от введённых размеров
      if (dimensions.W3 && dimensions.H3) {
        S = (dimensions.W1 * dimensions.H1 + dimensions.W2 * dimensions.H2 + dimensions.W3 * dimensions.H3) / 1000000;
      } else if (dimensions.W2 && dimensions.H2) {
        S = (dimensions.W1 * dimensions.H1 + dimensions.W2 * dimensions.H2) / 1000000;
      } else {
        S = (dimensions.W1 * dimensions.H1) / 1000000;
      }
    }
    let sink = 0;
    let koef = 0.69;
    const actualWashings = isWindowsill ? [] : selectedWashings;
    actualWashings.forEach((w) => {
      sink += washings[w][1] + washings[w][2];
      if (w === 6) koef = 0.38; // особый случай
    });

    let mat = S + (sink > 0 ? koef : 0);

    let all_material = mat;
    if (mat <= 0.54) all_material = 0.25;
    else if (mat <= 1.08) all_material = 0.5;
    else if (mat <= 1.63) all_material = 0.75;
    else if (mat <= 2.19) all_material = 1;
    else if (mat <= 2.73) all_material = 1.25;
    else if (mat <= 3.28) all_material = 1.5;
    else if (mat <= 3.83) all_material = 1.75;
    else if (mat <= 4.38) all_material = 2;
    else if (mat <= 4.92) all_material = 2.25;
    else if (mat <= 5.47) all_material = 2.5;
    else if (mat <= 6.02) all_material = 2.75;
    else if (mat <= 6.57) all_material = 3;
    else if (mat <= 7.11) all_material = 3.25;
    else if (mat <= 7.66) all_material = 3.5;
    else if (mat <= 8.21) all_material = 3.75;
    else if (mat <= 8.76) all_material = 4;
    else if (mat <= 9.31) all_material = 4.25;
    else if (mat <= 9.86) all_material = 4.5;
    else if (mat <= 10.41) all_material = 4.75;
    else if (mat <= 10.95) all_material = 5;
    else if (mat <= 11.5) all_material = 5.25;
    else if (mat <= 12.05) all_material = 5.5;
    else if (mat <= 12.6) all_material = 5.75;
    else if (mat <= 13.13) all_material = 6;
    else if (mat <= 13.68) all_material = 6.25;
    else if (mat <= 14.23) all_material = 6.5;
    else if (mat <= 14.78) all_material = 6.75;
    else if (mat <= 15.33) all_material = 7;

    // Расчёт компонентов с учётом типа продукта
    const pricePerM2 = materials[selectedMaterial.type][selectedMaterial.index];
    const mat_sum = pricePerM2 * all_material * dollar + sink;

    const mat_work = S * 7500;
    const prof_sum = S * profiles[selectedProfile];
    
    // Бортик только для кухни и ванной
    const actualBord = isWindowsill ? 0 : bord[selectedBord];
    const bord_sum = S * actualBord;

    const roundingPrice = rounding.reduce((sum, r) => sum + r, 0) * radius;

    // Вырезы: варочная панель — только для кухни; мойка — для кухни и ванной
    const actualCutoutHob = isKitchen && cutoutHob ? 1 : 0;
    const actualCutoutWashing = (isKitchen || isBathroom) && cutoutWashing ? 1 : 0;
    const cutoutPrice = (actualCutoutHob + actualCutoutWashing) * cutout;

    const work = mat_work + prof_sum + bord_sum + roundingPrice + cutoutPrice;
    const total = mat_sum + work + work * 0.15 + 1000;

    return Math.round(total);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="space-y-6">
          <Breadcrumbs
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          
          <Step
            step={steps[currentStep]}
            productType={productType}
            setProductType={setProductType}
            shape={shape}
            setShape={setShape}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            selectedBord={selectedBord}
            setSelectedBord={setSelectedBord}
            selectedWashings={selectedWashings}
            setSelectedWashings={setSelectedWashings}
            dimensions={dimensions}
            setDimensions={setDimensions}
            rounding={rounding}
            setRounding={setRounding}
            cutoutHob={cutoutHob}
            setCutoutHob={setCutoutHob}
            cutoutWashing={cutoutWashing}
            setCutoutWashing={setCutoutWashing}
            sinkStone={sinkStone}
            setSinkStone={setSinkStone}    
            profiles={profiles}
            bord={bord}
            washings={washings}
            materials={materials}  
            calculateTotal={calculateTotal}
          />
          
          <PriceDisplay total={calculateTotal()} />
          
          <div className="flex justify-between items-center bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span>←</span>
                <span>Назад</span>
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < steps.length - 1 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="group bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-black-500/30 flex items-center gap-2"
              >
                <span>Далее</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}