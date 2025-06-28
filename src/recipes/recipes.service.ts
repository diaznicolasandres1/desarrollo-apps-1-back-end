import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { Recipe } from "./schemas/recipe.schema";
import { RatingDto, UpdateRatingDto } from "./dto/nested/recipe-nested.dto";
import * as mongoose from "mongoose";

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
    includeIngredients: string[],
    excludeIngredients: string[],
    recipeNames?: string[],
    userIds?: string[],
  ): Promise<Recipe[]> {
    const query: any = {};
    const andConditions: any[] = [];

    // Filtro por ingredientes a incluir
    if (includeIngredients && includeIngredients.length > 0) {
      const includeRegex = includeIngredients.map(ing => new RegExp(ing, "i"));
      andConditions.push({
        "ingredients.name": { $in: includeRegex }
      });
    }

    // Filtro por ingredientes a excluir
    if (excludeIngredients && excludeIngredients.length > 0) {
      const excludeRegex = excludeIngredients.map(ing => new RegExp(ing, "i"));
      andConditions.push({
        "ingredients.name": { $nin: excludeRegex }
      });
    }

    // Filtro por nombres de recetas (búsqueda parcial con OR)
    if (recipeNames && recipeNames.length > 0) {
      const nameRegex = recipeNames.map(name => new RegExp(name.trim(), "i"));
      andConditions.push({
        $or: nameRegex.map(regex => ({ name: { $regex: regex } }))
      });
    }

    // Filtro por userIds (búsqueda exacta con OR)
    if (userIds && userIds.length > 0) {
      const trimmedUserIds = userIds.map(id => id.trim()).filter(id => id.length > 0);
      if (trimmedUserIds.length > 0) {
        andConditions.push({
          userId: { $in: trimmedUserIds }
        });
      }
    }

    // Si hay condiciones, aplicar filtros
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    return this.recipeModel.find(query).exec();
  }

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const newRecipe = new this.recipeModel({
      ...dto,
      status: "pending_to_approve",
    });
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

  async approveRecipe(id: string): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true },
    );

    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return updatedRecipe;
  }

  async addRating(id: string, rating: RatingDto): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id);
    
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    const newRating = {
      id: new mongoose.Types.ObjectId().toString(),
      userId: rating.userId,
      score: rating.score,
      comment: rating.comment,
      status: 'pending',
      createdAt: new Date()
    };

    recipe.ratings = recipe.ratings || [];
    recipe.ratings.push(newRating);

    return recipe.save();
  }

  async updateRating(recipeId: string, ratingId: string, userId: string, dto: UpdateRatingDto): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(recipeId);
    
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);
    }

    recipe.ratings = recipe.ratings || [];
    const ratingIndex = recipe.ratings.findIndex(r => r.id === ratingId && r.userId === userId);
    
    if (ratingIndex === -1) {
      throw new NotFoundException(`Rating with id ${ratingId} not found for this user`);
    }

    recipe.ratings[ratingIndex] = {
      ...recipe.ratings[ratingIndex],
      score: dto.score,
      comment: dto.comment,
      status: 'pending'
    };

    return recipe.save();
  }

  async getRecipesByUser(userId: string): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find({ userId }).exec();
    if (!recipes) {
      throw new NotFoundException(`No se encontraron recetas para el usuario ${userId}`);
    }
    return recipes;
  }
}
