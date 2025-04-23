import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IngredientNotFoundException } from "./exceptions/ingredient-not-found.exception";
import { Ingredient } from "./schemas/ingredients.schema";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientModel.findById(id);
    if (!ingredient) {
      throw new IngredientNotFoundException(id);
    }
    return ingredient;
  }

  async findByName(name: string): Promise<Ingredient> {
    const ingredient = await this.ingredientModel.findOne({ name });
    if (!ingredient) {
      throw new IngredientNotFoundException(name);
    }
    return ingredient;
  }

  async create(name: string): Promise<Ingredient> {
    const ingredient = new this.ingredientModel({ name });
    return ingredient.save();
  }

  async update(id: string, name: string): Promise<Ingredient> {
    const updated = await this.ingredientModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated) throw new NotFoundException("Ingrediente no encontrado");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ingredientModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException("Ingrediente no encontrado");
  }
}
