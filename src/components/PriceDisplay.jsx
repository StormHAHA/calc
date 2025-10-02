export default function PriceDisplay({ total }) {
  return (
    <div className="mt-4 text-lg font-bold text-text-headers">
      Итоговая цена: {total} ₽
    </div>
  );
}