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
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  
    const validationError = validateForm(form);
    if (validationError) {
    setError(validationError);
    return;
    }

  const handleSubmit = async () => {
    setError("");
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
    } catch {
      setError("Error al calcular los macros");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nutrition Calculator</h1>

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
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Calcular
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="border rounded p-4 space-y-1">
          <p>🔥 Calorías: {result.calories}</p>
          <p>🥩 Proteínas: {result.protein} g</p>
          <p>🍞 Carbohidratos: {result.carbs} g</p>
          <p>🥑 Grasas: {result.fat} g</p>
        </div>
      )}
    </div>
  );
}
