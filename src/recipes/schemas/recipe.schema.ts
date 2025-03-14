import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class Step {
  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imageUrl?: string;
}

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ingredients: string[];

  @Prop({ required: true })
  steps: Step[];

  @Prop({ required: false })
  principalPicture?: string;

  @Prop({ required: true })
  userName: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
