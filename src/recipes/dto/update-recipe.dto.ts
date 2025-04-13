// src/recipes/dto/update-recipe.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IngredientDto, StepDto, MediaResourceDto } from './nested/recipe-nested.dto';

export class UpdateRecipeDto {
  @ApiProperty({
    example: 'Tarta de Manzana Casera',
    description: 'El nombre de la receta',
    required: false
  })
  name?: string;

  @ApiProperty({
    type: [IngredientDto],
    description: 'Lista de ingredientes necesarios con sus cantidades',
    required: false
  })
  ingredients?: IngredientDto[];

  @ApiProperty({
    example: 'Una deliciosa tarta de manzana casera',
    description: 'Descripción general de la receta',
    required: false
  })
  description?: string;

  @ApiProperty({
    type: [StepDto],
    description: 'Pasos detallados para preparar la receta',
    required: false
  })
  steps?: StepDto[];

  @ApiProperty({
    type: [MediaResourceDto],
    description: 'Imágenes principales de la receta',
    required: false
  })
  principalPictures?: MediaResourceDto[];

  @ApiProperty({
    example: ['postres', 'dulces', 'tartas'],
    description: 'Categorías de la receta',
    type: [String],
    required: false
  })
  category?: string[];

  @ApiProperty({
    example: 60,
    description: 'Duración de la preparación en minutos',
    required: false
  })
  duration?: number;

  @ApiProperty({
    example: 'media',
    description: 'Nivel de dificultad de la receta',
    enum: ['fácil', 'media', 'difícil'],
    required: false
  })
  difficulty?: string;

  @ApiProperty({
    example: 8,
    description: 'Número de porciones que rinde la receta',
    required: false
  })
  servings?: number;
}
