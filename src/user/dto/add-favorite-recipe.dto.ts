import { ApiProperty } from '@nestjs/swagger';

export class AddFavoriteRecipeDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID de la receta a agregar a favoritos'
  })
  recipeId: string;
} 