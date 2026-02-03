import { NutritionRequest, MacrosResponse } from "../types/nutrition";

const API_URL = import.meta.env.VITE_API_URL;

export async function calculateMacros(
  data: NutritionRequest
): Promise<MacrosResponse> {
  const response = await fetch(`${API_URL}/nutrition/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error calculating macros");
  }

  return response.json();
}
