import { RecipeSteps } from './recipeSteps.model';

export class Recipe{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public ingredients: string,
    public steps: RecipeSteps[],
  ) {}
}
