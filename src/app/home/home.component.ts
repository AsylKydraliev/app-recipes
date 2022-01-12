import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes!: Recipe[];
  loading = false;
  deleteId = '';
  loadingSubscription!: Subscription;
  recipesSubscription!: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipesSubscription = this.recipeService.recipesChange.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.loadingSubscription = this.recipeService.loadingChange.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    })
    this.recipeService.getRecipes();
  }

  delete(id: string) {
    this.deleteId = id;
    this.recipeService.recipeDelete(id)
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
    this.recipesSubscription.unsubscribe();
  }
}
