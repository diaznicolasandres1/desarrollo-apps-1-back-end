// src/recipes/dto/update-recipe.dto.ts
export class UpdateRecipeDto {
  name?: string;
  ingredients?: string[];
  steps?: {
    description?: string;
    imageUrl?: string;
  }[];
  principalPicture;
}
