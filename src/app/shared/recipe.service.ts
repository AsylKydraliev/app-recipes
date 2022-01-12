import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService{
  recipes: Recipe[] | null = null;
  recipesChange = new Subject<Recipe[]>();

  constructor(private http: HttpClient) {}

  postRecipe(recipe: Recipe){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes.json', recipe).subscribe();
  }

  getRecipes(){
    this.http.get<{[id: string]: Recipe}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(result => {
        if(result === null){
          return [];
        }
        return Object.keys(result).map(id => {
          const recipe = result[id];
          return new Recipe(
            id,
            recipe.name,
            recipe.description,
            recipe.imageUrl,
            recipe.ingredients,
            recipe.steps
          )
        })
      }))
      .subscribe(recipes => {
        this.recipes = [];
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice());
      })
  }

  getRecipe(id: string){
    return this.http.get<Recipe | null>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes/${id}.json`).pipe(
      map(result => {
        if(!result) return null;
        return new Recipe(
          id,
          result.name,
          result.description,
          result.imageUrl,
          result.ingredients,
          result.steps
        );
      })
    )
  }
}
