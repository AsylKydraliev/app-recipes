import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Injectable({
  providedIn: 'root',
})

export class ResolverService implements Resolve<Recipe>{
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Observable<never> {
    const id = <string>route.params['id'];
    return this.recipeService.getRecipe(id).pipe(mergeMap(recipe => {
      if(recipe) {
        return of(recipe);
      }else {
        return  EMPTY;
      }
    }))
  }
}
