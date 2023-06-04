export interface Receta{
  id: string;
  title:string;
  imageUrl: string;
  cookingTime:number;
  ingredients:string[];
  ingredientsCount:number;
  steps:string[]
}