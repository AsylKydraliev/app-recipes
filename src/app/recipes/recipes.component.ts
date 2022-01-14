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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
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
  }

  deleteStep(id: string, index: number) {
    // if(this.steps[0]) {
    //   this.recipeService.stepDelete(id, index);
    //   this.steps.splice(index, 1);
    // }else{
    //   this.steps = [];
    // }
    this.recipeService.stepDelete(id, index);
    this.steps.splice(index, 1);
  }

  goHome() {
    void this.router.navigate(['/']);
  }
}
