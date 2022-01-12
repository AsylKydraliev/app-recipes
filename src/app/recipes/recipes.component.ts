import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeSteps } from '../shared/recipeSteps.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe | null = null;
  name = '';
  description = '';
  imageUrl = '';
  ingredients = '';
  steps!: RecipeSteps[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.recipe = <Recipe | null>data.recipe;
      if(this.recipe){
        this.name = this.recipe.name;
        this.description = this.recipe.description;
        this.imageUrl = this.recipe.imageUrl;
        this.ingredients = this.recipe.ingredients;
        this.steps = this.recipe.steps;
      }
    })
  }

}
