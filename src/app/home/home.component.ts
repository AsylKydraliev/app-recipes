import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipesChange.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipeService.getRecipes();
  }

  delete(id: string) {
    this.recipeService.recipeDelete(id)
  }
}
