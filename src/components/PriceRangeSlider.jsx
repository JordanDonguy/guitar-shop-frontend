export default function PriceRangeSlider({ min, max, value, onChange }) {
  const [minVal, maxVal] = value;

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal);
    onChange([minVal, newMax]);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          aria-label="Minimum price"
          className="mb-2 w-full accent-blue-500 hover:cursor-pointer max-xl:mb-10"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          aria-label="Maximum price"
          className="w-full accent-blue-500 hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
