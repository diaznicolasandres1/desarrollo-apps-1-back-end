import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class Step {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  mediaResource?: string;
}

class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, enum: ['gramos', 'cucharadas', 'kilogramo', 'mililitros', 'tazas', 'unidad', 'pizca'] })
  measureType: string;
}

class MediaResource {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false })
  description?: string;
}

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [Ingredient] })
  ingredients: Ingredient[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  steps: Step[];

  @Prop({ required: false, type: [MediaResource] })
  principalPictures?: MediaResource[];

  @Prop({ required: true })
  userName: string;

  // propagar
  @Prop({ required: true })
  category: string;

  //Acotar a enum
  @Prop({ required: true })
  duration: number;

  // Acotar a enum
  @Prop({ required: true })
  difficulty: string;

  @Prop({ required: true })
  servings: number;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  status: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
