export default function PriceDisplay({ total }) {
  return (
    <div className="mt-4 text-lg font-bold">
      Итоговая цена: {total} ₽
    </div>
  );
}