import type { DishIngridient, IngridientUnit } from "./dish";

export function hasUnits(
  ingr: DishIngridient,
): ingr is DishIngridient & { amount: number; units: IngridientUnit } {
  return typeof ingr.amount === "number";
}
