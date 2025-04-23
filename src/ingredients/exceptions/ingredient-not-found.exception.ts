import { NotFoundException } from "@nestjs/common";

export class IngredientNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Ingrediente no encontrado: "${identifier}"`);
  }
}
