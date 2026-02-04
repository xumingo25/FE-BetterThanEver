interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-cyan-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          bg-black/60
          border border-fuchsia-500/40
          px-4 py-2
          text-cyan-100
          shadow-inner
          focus:outline-none
          focus:ring-2
          focus:ring-fuchsia-400
          focus:border-fuchsia-400
        "
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-black text-cyan-100"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
