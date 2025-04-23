import { ConflictException } from "@nestjs/common";

export class IngredientAlreadyExistsException extends ConflictException {
  constructor(name: string) {
    super(`El ingrediente "${name}" ya existe`);
  }
}
