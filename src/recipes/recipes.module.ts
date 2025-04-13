import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./schemas/recipe.schema";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";
import { ApiExtraModels } from '@nestjs/swagger';
import { IngredientDto, StepDto, MediaResourceDto, RatingDto, UpdateRatingDto } from './dto/nested/recipe-nested.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
@ApiExtraModels(IngredientDto, StepDto, MediaResourceDto, RatingDto, UpdateRatingDto)
export class RecipesModule {}
