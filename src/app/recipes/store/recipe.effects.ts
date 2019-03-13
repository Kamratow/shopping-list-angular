import {Injectable} from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
    .pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient
			.get<Recipe[]>("https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json", {
				observe: 'body',
				responseType: 'json'
			})
        }),
        map(recipes => {
            for (let recipe of recipes) {
                if (!recipe["ingredients"]) {
                    console.log(recipe);
                    recipe["ingredients"] = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        })
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const req = new HttpRequest('PUT', 'https://my-ng-recipe-book-b0167.firebaseio.com/recipes.json',
                state.recipes, {
                    reportProgress: true
                });
		        return this.httpClient.request(req);
            })
        )

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromRecipe.FeatureState>) {}
}