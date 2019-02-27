import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
		new Recipe('A test Recipe', 'This is a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
		new Recipe('Another test Recipe', 'This is another test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
	];


    getRecipes() {
        return this.recipes.slice();
    }
}