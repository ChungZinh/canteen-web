
export default function PaymentOption({
  id,
  label,
  imageUrl,
  isSelected,
  onSelect,
}) {
  return (
    <div
      className={`flex items-center gap-4 border p-4 cursor-pointer ${
        isSelected ? "bg-slate-200" : ""
      }`}
      onClick={onSelect}
    >
      <input
        type="radio"
        name="payment"
        id={id}
        checked={isSelected}
        onChange={onSelect}
        className="cursor-pointer"
      />
      <div className="flex items-center gap-2">
        {imageUrl && <img src={imageUrl} alt={label} className="w-10 h-10" />}
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      </div>
    </div>
  );
}
