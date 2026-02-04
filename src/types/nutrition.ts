export type ActivityLevel =
  | "SEDENTARY"
  | "LOW"
  | "MODERATE"
  | "HIGH";

export type Goal = "LOSE_WEIGHT" | "GAIN_WEIGHT";

export interface NutritionRequest {
  unit: "KG" | "LB";
  weight: number;
  height: number;
  age: number;
  gender: "MALE" | "FEMALE";
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface MacrosResponse {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionForm {
  unit: "KG" | "LB";
  weight: string;
  height: string;
  age: string;
  gender: "MALE" | "FEMALE";
  activityLevel: "SEDENTARY" | "LOW" | "MODERATE" | "HIGH";
  goal: "LOSE_WEIGHT" | "GAIN_WEIGHT";
}

