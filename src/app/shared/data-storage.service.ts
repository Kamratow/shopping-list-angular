import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { map } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
	providedIn: "root"
})
export class DataStorageService {
	constructor(
		private httpClient: HttpClient,
		private recipeService: RecipeService
	) { }

	storeRecipes() {
		// const token = this.authService.getToken();
		// const headers = new HttpHeaders().set('Authorization', 'Bearer fagsdfgsrlghajke');

		// return this.httpClient
		// 	.put("https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json",
		// 		this.recipeService.getRecipes(), {
		// 			observe: 'body',
		// 			params: new HttpParams().set('auth', token)
		// 		}
		// 	);

		const req = new HttpRequest('PUT', 'https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json',
			this.recipeService.getRecipes(), {
				reportProgress: true
			});

		return this.httpClient.request(req);
	}

	getRecipes() {
		// const token = this.authService.getToken();

		// this.httpClient
		// 	.get<Recipe[]>("https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json?auth=" + token)

		this.httpClient
			.get<Recipe[]>("https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json", {
				observe: 'body',
				responseType: 'json'
			})
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
