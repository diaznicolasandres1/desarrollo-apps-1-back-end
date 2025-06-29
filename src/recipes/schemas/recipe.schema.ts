import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export class Step {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  mediaResource?: string;
}

export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    required: true,
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

export class MediaResource {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false })
  description?: string;
}

export class Rating {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1, max: 5 })
  score: number;

  @Prop({ required: false })
  comment?: string;

  @Prop({ required: true, enum: ["approved", "pending", "rejected"] })
  status: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;
}

@Schema()
export class Recipe extends Document {
  @ApiProperty({
    example: "Tarta de Manzana",
    description: "Nombre de la receta",
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: "Lista de ingredientes de la receta",
    example: [
      { name: "Harina", quantity: 200, measureType: "gramos" },
      { name: "Manzana", quantity: 4, measureType: "unidad" },
    ],
  })
  @Prop({ required: true, type: [Ingredient] })
  ingredients: Ingredient[];

  @ApiProperty({
    example: "Una deliciosa tarta de manzana casera",
    description: "Descripción general de la receta",
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: "Pasos para preparar la receta",
    example: [
      {
        id: "1",
        title: "Preparación de la masa",
        description: "Mezclar los ingredientes secos",
        mediaResource: "https://example.com/step1.jpg",
      },
      {
        id: "2",
        title: "Horneado",
        description: "Hornear a 180°C por 45 minutos",
      },
    ],
  })
  @Prop({ required: true })
  steps: Step[];

  @ApiProperty({
    description: "Imágenes principales de la receta",
    example: [
      {
        url: "https://example.com/main.jpg",
        description: "Tarta de manzana terminada",
      },
    ],
  })
  @Prop({ required: false, type: [MediaResource] })
  principalPictures?: MediaResource[];

  @ApiProperty({
    example: "507f1f77bcf86cd799439013",
    description: "ID del usuario creador de la receta",
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    example: ["postres", "dulces", "tartas"],
    description: "Categorías de la receta",
  })
  @Prop({ required: true })
  category: string[];

  @ApiProperty({
    example: 60,
    description: "Duración de la preparación en minutos",
  })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({
    example: "media",
    description: "Nivel de dificultad de la receta",
    enum: ["fácil", "media", "difícil"],
  })
  @Prop({ required: true })
  difficulty: string;

  @ApiProperty({
    example: 8,
    description: "Número de porciones que rinde la receta",
  })
  @Prop({ required: true })
  servings: number;

  @ApiProperty({
    example: "2024-03-20T12:00:00Z",
    description: "Fecha de creación de la receta",
  })
  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    example: "active",
    description: "Estado de la receta",
  })
  @Prop({ required: false })
  status: string;

  @ApiProperty({
    description: "Calificaciones de la receta",
    example: [
      {
        id: "1",
        userId: "user123",
        score: 5,
        comment: "Excelente receta",
        status: "approved",
        createdAt: "2024-03-20T12:00:00Z",
      },
    ],
  })
  @Prop({ required: false, type: [Rating] })
  ratings?: Rating[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
