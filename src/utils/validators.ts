export function validateForm(form: any): string | null {
  if (!form.weight || Number(form.weight) <= 0) return "Peso inválido";
  if (!form.height || Number(form.height) <= 0) return "Altura inválida";
  if (!form.age || Number(form.age) <= 0) return "Edad inválida";
  return null;
}
