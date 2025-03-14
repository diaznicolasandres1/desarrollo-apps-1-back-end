import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Recipe } from "./schemas/recipe.schema";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async getAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const newRecipe = new this.recipeModel(dto);
    return newRecipe.save();
  }

  async update(id: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return updatedRecipe;
  }

  async delete(id: string): Promise<Recipe> {
    const deletedRecipe = await this.recipeModel.findByIdAndDelete(id);

    if (!deletedRecipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return deletedRecipe;
  }
}
