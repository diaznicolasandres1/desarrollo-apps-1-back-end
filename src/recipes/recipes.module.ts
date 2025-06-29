import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiExtraModels } from "@nestjs/swagger";
import { User, UserSchema } from "../user/schemas/user.schema";
import {
  IngredientDto,
  MediaResourceDto,
  RatingDto,
  StepDto,
  UpdateRatingDto,
} from "./dto/nested/recipe-nested.dto";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";
import { Recipe, RecipeSchema } from "./schemas/recipe.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
@ApiExtraModels(
  IngredientDto,
  StepDto,
  MediaResourceDto,
  RatingDto,
  UpdateRatingDto
)
export class RecipesModule {}
