import { useState } from "react";
import { Input } from "../components/form/Input";
import { Select } from "../components/form/Select";
import { calculateMacros } from "../services/nutrition.service";
import type { MacrosResponse, NutritionForm } from "../types/nutrition";
import { validateForm } from "../utils/validators";

export default function Home() {
  const [form, setForm] = useState<NutritionForm>({
    unit: "KG",
    weight: "",
    height: "",
    age: "",
    gender: "MALE",
    activityLevel: "MODERATE",
    goal: "LOSE_WEIGHT",
  });

  const [result, setResult] = useState<MacrosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof NutritionForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await calculateMacros({
        unit: form.unit,
        weight: Number(form.weight),
        height: Number(form.height),
        age: Number(form.age),
        gender: form.gender,
        activityLevel: form.activityLevel,
        goal: form.goal,
      });

      setResult(response);
    } catch (e) {
      setError("Error al calcular los macros");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-cyan-200">
      <div className="w-full max-w-xl p-8 rounded-xl border border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.25)] bg-black/60 backdrop-blur">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-cyan-300 tracking-wider drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          ⚡ Nutrition Calculator
        </h1>

        <div className="space-y-4">
          <Select
            label="Unidad de peso"
            value={form.unit}
            options={[
              { label: "Kilogramos", value: "KG" },
              { label: "Libras", value: "LB" },
            ]}
            onChange={(v) => handleChange("unit", v)}
          />

          <Input label="Peso" type="number" value={form.weight} onChange={(v) => handleChange("weight", v)} />
          <Input label="Altura (cm)" type="number" value={form.height} onChange={(v) => handleChange("height", v)} />
          <Input label="Edad" type="number" value={form.age} onChange={(v) => handleChange("age", v)} />

          <Select
            label="Género"
            value={form.gender}
            options={[
              { label: "Hombre", value: "MALE" },
              { label: "Mujer", value: "FEMALE" },
            ]}
            onChange={(v) => handleChange("gender", v)}
          />

          <Select
            label="Nivel de actividad"
            value={form.activityLevel}
            options={[
              { label: "Sedentario", value: "SEDENTARY" },
              { label: "Baja", value: "LOW" },
              { label: "Moderada", value: "MODERATE" },
              { label: "Alta", value: "HIGH" },
            ]}
            onChange={(v) => handleChange("activityLevel", v)}
          />

          <Select
            label="Objetivo"
            value={form.goal}
            options={[
              { label: "Bajar peso", value: "LOSE_WEIGHT" },
              { label: "Subir peso", value: "GAIN_WEIGHT" },
            ]}
            onChange={(v) => handleChange("goal", v)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-lg font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition shadow-[0_0_25px_rgba(34,211,238,0.8)] disabled:opacity-50"
          >
            {loading ? "Calculando…" : "Calcular"}
          </button>

          {error && (
            <p className="text-red-400 text-center font-semibold drop-shadow">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 rounded-lg border border-cyan-400/30 p-4 bg-black/70 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              <p>🔥 Calorías: <strong>{result.calories}</strong></p>
              <p>🥩 Proteínas: <strong>{result.protein} g</strong></p>
              <p>🍞 Carbohidratos: <strong>{result.carbs} g</strong></p>
              <p>🥑 Grasas: <strong>{result.fat} g</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
