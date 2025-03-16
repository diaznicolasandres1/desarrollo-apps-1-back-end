import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { Recipe } from "./schemas/recipe.schema";

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async getAll(limit?: number, sortOrder: string = "desc"): Promise<Recipe[]> {
    const sortValue = sortOrder === "asc" ? 1 : -1;

    const query = this.recipeModel.find().sort({ createdAt: sortValue });

    if (limit) {
      query.limit(limit);
    }

    return query.exec();
  }

  async getById(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id);

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  async getFilteredByIngredients(
    ingredients: string[],
    exclude: boolean
  ): Promise<Recipe[]> {
    const regexIngredients = ingredients.map(
      (ing) => new RegExp(ing, "i") // for case-insensitive
    );

    const query = exclude
      ? { ingredients: { $not: { $in: regexIngredients } } }
      : { ingredients: { $in: regexIngredients } };

    return this.recipeModel.find(query).exec();
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
