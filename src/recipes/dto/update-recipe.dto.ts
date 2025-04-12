// src/recipes/dto/update-recipe.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeDto {
  @ApiProperty({
    example: 'Tarta de Manzana Casera',
    description: 'El nombre de la receta',
    required: false
  })
  name?: string;

  @ApiProperty({
    example: ['Harina', 'Manzana', 'Azúcar', 'Canela', 'Manteca'],
    description: 'Lista de ingredientes necesarios',
    type: [String],
    required: false
  })
  ingredients?: string[];

  @ApiProperty({
    example: [
      { description: 'Precalentar el horno a 180°C' },
      { description: 'Preparar la masa', imageUrl: 'https://example.com/images/step1.jpg' }
    ],
    description: 'Pasos para preparar la receta',
    type: [Object],
    required: false
  })
  steps?: {
    description?: string;
    imageUrl?: string;
  }[];

  @ApiProperty({
    example: 'https://example.com/images/tarta.jpg',
    description: 'URL de la imagen principal de la receta',
    required: false
  })
  principalPicture?: string;
}
