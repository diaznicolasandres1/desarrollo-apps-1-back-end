import { ApiProperty } from '@nestjs/swagger';
import { IngredientDto, StepDto, MediaResourceDto } from './nested/recipe-nested.dto';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Tarta de Manzana',
    description: 'El nombre de la receta'
  })
  name: string;

  @ApiProperty({
    type: [IngredientDto],
    description: 'Lista de ingredientes necesarios con sus cantidades'
  })
  ingredients: IngredientDto[];

  @ApiProperty({
    example: 'Una deliciosa tarta de manzana casera',
    description: 'Descripción general de la receta'
  })
  description: string;

  @ApiProperty({
    type: [StepDto],
    description: 'Pasos detallados para preparar la receta'
  })
  steps: StepDto[];

  @ApiProperty({
    type: [MediaResourceDto],
    description: 'Imágenes principales de la receta',
    required: false
  })
  principalPictures?: MediaResourceDto[];

  @ApiProperty({
    example: '507f1f77bcf86cd799439013',
    description: 'ID del usuario creador de la receta'
  })
  userId: string;

  @ApiProperty({
    example: ['postres', 'dulces', 'tartas'],
    description: 'Categorías de la receta',
    type: [String]
  })
  category: string[];

  @ApiProperty({
    example: 60,
    description: 'Duración de la preparación en minutos'
  })
  duration: number;

  @ApiProperty({
    example: 'media',
    description: 'Nivel de dificultad de la receta',
    enum: ['fácil', 'media', 'difícil']
  })
  difficulty: string;

  @ApiProperty({
    example: 8,
    description: 'Número de porciones que rinde la receta'
  })
  servings: number;
}
