import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.sevice';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))    
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}