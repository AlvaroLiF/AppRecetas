import { Document } from 'mongoose';
export interface IReceta extends Document {
    title: string;
    imageUrl: string;
    cookingTime: number;
    ingredients: string[];
    ingredientsCount: number;
    steps: string[]
}