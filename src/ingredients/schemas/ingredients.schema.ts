import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Ingredient extends Document {
  @ApiProperty({ type: String, description: "Nombre del ingrediente" })
  @Prop({ required: true, unique: true, trim: true })
  name: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
