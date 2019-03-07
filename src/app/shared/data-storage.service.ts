import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.sevice";

@Injectable({
	providedIn: "root"
})
export class DataStorageService {
	constructor(
		private httpClient: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService
	) { }

	storeRecipes() {
		const token = this.authService.getToken();

		return this.httpClient.put(
			"https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json?auth=" +
			token,
			this.recipeService.getRecipes()
		);
	}

	getRecipes() {
		const token = this.authService.getToken();

		this.httpClient
			.get<Recipe[]>(
				"https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json?auth=" +
				token
			)
			.pipe(
				map(recipes => {
					for (let recipe of recipes) {
						if (!recipe["ingredients"]) {
							console.log(recipe);
							recipe["ingredients"] = [];
						}
					}
					return recipes;
				})
			)
			.subscribe((recipes: Recipe[]) => {
				this.recipeService.setRecipes(recipes);
			});
	}
}
