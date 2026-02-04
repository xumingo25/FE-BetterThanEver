interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input({ label, type = "text", value, onChange }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-cyan-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          bg-black/60
          border border-cyan-500/40
          px-4 py-2
          text-cyan-100
          shadow-inner
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400
          focus:border-cyan-400
          placeholder:text-cyan-700
        "
      />
    </div>
  );
}
