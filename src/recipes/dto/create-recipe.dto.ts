export class CreateRecipeDto {
  name: string;
  ingredients: string[];
  steps: {
    description: string;
    imageUrl?: string;
  }[];
  principalPicture?: string;
  userName: string;
}
