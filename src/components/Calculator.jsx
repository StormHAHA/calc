import React, { useState } from "react";
import Breadcrumbs from "./Navigation";
import PriceDisplay from "./PriceDisplay";
import Step from "./Step";
// Данные из твоего JS
const materials = {
  LG: [319, 375, 375, 474, 512],
  Tristone: [319, 353, 353, 375, 474, 474, 512, 512],
  Staron: [345, 385, 412, 412, 558, 558],
  Corian: [344, 422, 537, 603],
  Hanex: [319,353,375,353,450,512,512,375,512,512],
  Grandex: [319,353,375,474,512,512],
  Bienstone: [375,430],
  Neomarm: [430]
};

const profiles = [0,0,0,0,1300,1800];
const bord = [300,300,1300,500,1800];
const washings = [
  ["M410",11000,4200],
  ["MR410",9000,4200],
  ["D380",11000,4350],
  ["L600",11000,4200],
  ["SH500",13000,5500],
  ["M250",11000,4200],
  ["R530",6500,4000]
];

// Шаги калькулятора
const steps = [
  { id: 0, name: "Тип продукта", type: "type" },
  { id: 1, name: "Выбор формы", type: "shape" },
  { id: 2, name: "Материал", type: "material" },
  { id: 3, name: "Профиль", type: "profile" },
  { id: 4, name: "Бортик", type: "bord" },
  { id: 5, name: "Мойки", type: "washing" },
  { id: 6, name: "Размеры", type: "dimensions" }
];

export default function CalculatorApp() {
  const [currentStep, setCurrentStep] = useState(0);

  // Состояния выбора
  const [productType, setProductType] = useState(null);
  const [shape, setShape] = useState("Прямая");
  const [selectedMaterial, setSelectedMaterial] = useState({ type: "LG", index: 0 });
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedBord, setSelectedBord] = useState(0);
  const [selectedWashings, setSelectedWashings] = useState([]);
  const [dimensions, setDimensions] = useState({ W1:0,H1:0,W2:0,H2:0,W3:0,H3:0 });
  const [rounding, setRounding] = useState(0);
  const [cutoutHob, setCutoutHob] = useState(false);
  const [cutoutWashing, setCutoutWashing] = useState(false);

  const calculateTotal = () => {
    const dollar = 105;
    const radius = 1500;
    const cutout = 345;

    let S = 0;
    if(shape === "Прямая") S = dimensions.W1 * dimensions.H1 / 1000000;
    else if(shape === "Г-образная") S = (dimensions.W1 * dimensions.H1 + (dimensions.H2 - dimensions.H1) * dimensions.W2)/1000000;
    else if(shape === "П-образная") S = (dimensions.W1*dimensions.H2 + (dimensions.H1-dimensions.H2)*dimensions.W2 + dimensions.H3*dimensions.W3)/1000000;

    const matPrice = materials[selectedMaterial.type][selectedMaterial.index] * S * dollar;
    const profPrice = profiles[selectedProfile] * S;
    const bordPrice = bord[selectedBord] * S;
    const roundingPrice = rounding * radius;
    const cutoutPrice = (cutoutHob ? 1 : 0 + cutoutWashing ? 1 : 0) * cutout;

    let sinkPrice = 0;
    selectedWashings.forEach(w => sinkPrice += washings[w][1]);

    const work = profPrice + bordPrice + roundingPrice + cutoutPrice;
    const total = matPrice + work + sinkPrice + work*0.15 + 1000;

    return Math.round(total);
  };

  return (
    <div className="calculator p-4 max-w-[1280px] flex flex-col gap-4 mx-auto">
      <Breadcrumbs steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Step
  step={steps[currentStep]}
  productType={productType} setProductType={setProductType}
  shape={shape} setShape={setShape}
  selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}
  selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile}
  selectedBord={selectedBord} setSelectedBord={setSelectedBord}
  selectedWashings={selectedWashings} setSelectedWashings={setSelectedWashings}
  dimensions={dimensions} setDimensions={setDimensions}
  rounding={rounding} setRounding={setRounding}
  cutoutHob={cutoutHob} setCutoutHob={setCutoutHob}
  cutoutWashing={cutoutWashing} setCutoutWashing={setCutoutWashing}
  
  // Передаём массивы
  profiles={profiles}
  bord={bord}
  washings={washings}
/>
      <PriceDisplay total={calculateTotal()} />
      <div className="mt-4 flex justify-between">
        {currentStep > 0 && <button onClick={()=>setCurrentStep(currentStep-1)} className="btn">Назад</button>}
        {currentStep < steps.length-1 && <button onClick={()=>setCurrentStep(currentStep+1)} className="btn">Далее</button>}
      </div>
    </div>
  );
}