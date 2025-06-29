import { ApiProperty } from "@nestjs/swagger";

export class IngredientDto {
  @ApiProperty({ example: "Harina", description: "Nombre del ingrediente" })
  name: string;

  @ApiProperty({ example: 200, description: "Cantidad del ingrediente" })
  quantity: number;

  @ApiProperty({
    example: "gramos",
    description: "Tipo de medida del ingrediente",
    enum: [
      "gramos",
      "cucharadas",
      "kilogramo",
      "mililitros",
      "tazas",
      "unidad",
      "pizca",
    ],
  })
  measureType: string;
}

export class StepDto {
  @ApiProperty({ example: "1", description: "ID del paso" })
  id: string;

  @ApiProperty({
    example: "Preparación de la masa",
    description: "Título del paso",
  })
  title: string;

  @ApiProperty({
    example: "Mezclar los ingredientes secos",
    description: "Descripción detallada del paso",
  })
  description: string;

  @ApiProperty({
    example: "https://example.com/step1.jpg",
    description: "URL del recurso multimedia asociado al paso",
    required: false,
  })
  mediaResource?: string;
}

export class MediaResourceDto {
  @ApiProperty({
    example:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    description: "URL del recurso multimedia o base64 de la imagen",
  })
  url: string;

  @ApiProperty({
    example: "Tarta de manzana terminada",
    description: "Descripción del recurso multimedia",
    required: false,
  })
  description?: string;
}

export class RatingDto {
  @ApiProperty({
    example: "507f1f77bcf86cd799439016",
    description: "ID de la calificación",
  })
  _id: string;

  @ApiProperty({
    example: "user123",
    description: "ID del usuario que califica",
  })
  userId: string;

  @ApiProperty({
    example: "Orlando Perez",
    description: "nombre del usuario que califica",
  })
  name: string;

  @ApiProperty({
    example: 5,
    description: "Puntuación de la receta (1-5)",
    minimum: 1,
    maximum: 5,
  })
  score: number;

  @ApiProperty({
    example: "Excelente receta, muy fácil de seguir",
    description: "Comentario sobre la receta",
  })
  comment: string;

  @ApiProperty({
    example: "approved",
    description: "Estado del comentario",
    enum: ["pending", "approved", "rejected"],
  })
  status: string;

  @ApiProperty({
    example: "2025-06-26T23:43:59.180Z",
    description: "Fecha de creación de la calificación",
  })
  createdAt: string;
}

export class UpdateRatingDto {
  @ApiProperty({
    example: "507f1f77bcf86cd799439013",
    description: "ID del usuario que actualiza la calificación",
  })
  userId: string;

  @ApiProperty({
    example: 5,
    description: "Nueva puntuación de la receta (1-5)",
    minimum: 1,
    maximum: 5,
  })
  score: number;

  @ApiProperty({
    example: "Excelente receta, muy fácil de seguir",
    description: "Nuevo comentario sobre la receta",
    required: false,
  })
  comment?: string;
}
