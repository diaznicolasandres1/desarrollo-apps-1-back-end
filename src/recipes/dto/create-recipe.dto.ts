import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Tarta de Manzana',
    description: 'El nombre de la receta'
  })
  name: string;

  @ApiProperty({
    example: ['Harina', 'Manzana', 'Azúcar', 'Canela', 'Manteca'],
    description: 'Lista de ingredientes necesarios',
    type: [String]
  })
  ingredients: string[];

  @ApiProperty({
    example: [
      { description: 'Precalentar el horno a 180°C' },
      { description: 'Preparar la masa', imageUrl: 'https://example.com/images/step1.jpg' }
    ],
    description: 'Pasos para preparar la receta',
    type: [Object]
  })
  steps: {
    description: string;
    imageUrl?: string;
  }[];

  @ApiProperty({
    example: 'https://example.com/images/tarta.jpg',
    description: 'URL de la imagen principal de la receta',
    required: false
  })
  principalPicture?: string;

  @ApiProperty({
    example: 'usuario123',
    description: 'Nombre de usuario del creador de la receta'
  })
  userName: string;
}
