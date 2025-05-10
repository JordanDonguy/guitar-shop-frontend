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
    <div class="w-5/6">
      <div class="flex justify-between text-sm mb-2">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
      <div class="flex flex-col gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          class="w-full accent-blue-500 hover:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          class="w-full accent-blue-500 hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
