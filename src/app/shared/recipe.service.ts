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
  loadingChange = new Subject<boolean>();
  deleteLoading = new Subject<boolean>();
  recipeLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  postRecipe(recipe: Recipe){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes.json', recipe).subscribe(
      () => {
        this.getRecipes();
      }
    );
  }

  getRecipes(){
    this.loadingChange.next(true);
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
        this.loadingChange.next(false);
      }, () => {
        this.loadingChange.next(false);

      })
  }

  getRecipe(id: string){
    this.recipeLoading.next(true);
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

  recipeDelete(id: string){
    this.deleteLoading.next(true);
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes/${id}.json`).subscribe(
      () => {
        this.getRecipes();
        this.deleteLoading.next(false);
      }
    );
  }

  stepDelete(id: string){
    this.deleteLoading.next(true);
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes/${id}/steps.json`).subscribe(
      () => {
        this.deleteLoading.next(false);
      }
    );
  }

  recipeEdit(recipe: Recipe){
    const body = {
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    }
    return this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/recipes/${recipe.id}.json`, body)
      .pipe();
  }
}
