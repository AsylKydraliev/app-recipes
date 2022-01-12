import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeSteps } from '../shared/recipeSteps.model';
import { RecipeService } from '../shared/recipe.service';

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
  id = '';
  steps!: RecipeSteps[];
  loading = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.data.subscribe(data => {
      this.recipeService.recipeLoading.next(false);
      this.recipe = <Recipe | null>data.recipe;
      if(this.recipe){
        this.id = this.recipe.id
        this.name = this.recipe.name;
        this.description = this.recipe.description;
        this.imageUrl = this.recipe.imageUrl;
        this.ingredients = this.recipe.ingredients;
        this.steps = this.recipe.steps;
      }
    })
    this.loading = false;
  }

  deleteStep(id: string) {
    this.recipeService.stepDelete(id);
  }

  goHome() {
    void this.router.navigate(['/']);
  }
}
