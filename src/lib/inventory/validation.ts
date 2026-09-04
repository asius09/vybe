import type { CreateBikeInput, UpdateBikeInput } from "./types";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateBike(input: CreateBikeInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.name || input.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }
  if (!input.category) {
    errors.push({ field: "category", message: "Category is required" });
  }
  if (!input.price || input.price <= 0) {
    errors.push({ field: "price", message: "Price must be greater than 0" });
  }
  if (input.year && (input.year < 2000 || input.year > new Date().getFullYear() + 1)) {
    errors.push({ field: "year", message: "Invalid year" });
  }
  if (input.mileage !== undefined && input.mileage < 0) {
    errors.push({ field: "mileage", message: "Mileage cannot be negative" });
  }
  if (input.batteryHealthPercent !== undefined && (input.batteryHealthPercent < 0 || input.batteryHealthPercent > 100)) {
    errors.push({ field: "batteryHealthPercent", message: "Battery health must be 0-100" });
  }

  return errors;
}

export function validateUpdateBike(input: UpdateBikeInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.name !== undefined && input.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }
  if (input.price !== undefined && input.price <= 0) {
    errors.push({ field: "price", message: "Price must be greater than 0" });
  }
  if (input.year !== undefined && (input.year < 2000 || input.year > new Date().getFullYear() + 1)) {
    errors.push({ field: "year", message: "Invalid year" });
  }
  if (input.batteryHealthPercent !== undefined && (input.batteryHealthPercent < 0 || input.batteryHealthPercent > 100)) {
    errors.push({ field: "batteryHealthPercent", message: "Battery health must be 0-100" });
  }

  return errors;
}
