export default function Breadcrumbs({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="breadcrumbs flex space-x-2 mb-4 text-text-headers">
      {steps.map((step, idx) => (
        <span
          key={step.id}
          className={`cursor-pointer ${currentStep === idx ? 'font-bold' : ''}`}
          onClick={() => setCurrentStep(idx)}
        >
          {step.name} {idx < steps.length-1 && '>'}
        </span>
      ))}
    </div>
  );
}