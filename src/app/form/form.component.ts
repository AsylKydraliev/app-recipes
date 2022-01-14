import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeSteps } from '../shared/recipeSteps.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  recipe: Recipe | null = null;
  recipeId = '';
  recipesUpdate = false;
  editCount!: number;
  addButtonDisabled = false;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      steps: new FormArray([]),
    })

    this.route.data.subscribe(data => {
      this.recipe = <Recipe | null>data.recipe;
      if(this.recipe) {
        this.recipesUpdate = true;
        this.recipeId = this.recipe.id;
        this.setFormValue({
          name: this.recipe.name,
          description: this.recipe.description,
          imageUrl: this.recipe.imageUrl,
          ingredients: this.recipe.ingredients,
          steps: [],
        })
      }else{
        this.setFormValue({
          name: '',
          description: '',
          imageUrl: '',
          ingredients: '',
          steps: [],
        })
      }
    })
  }

  setFormValue(value: {[key: string]: any}) {
    setTimeout(() => {
      this.form.setValue(value);
    })
  }

  getFormErrors(fieldName: string, errorType: string){
    const field = this.form.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  getSkillsError(fieldName: string, errorType: string, index: number){
    const steps = <FormArray>this.form.get('steps');
    const field = steps.controls[index].get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  onSubmit() {
    const id = this.recipeId || Math.random().toString();
    const recipe = new Recipe(
      id,
      this.form.value.name,
      this.form.value.description,
      this.form.value.imageUrl,
      this.form.value.ingredients,
      this.form.value.steps,
    )

    if(this.recipeId) {
      this.recipeService.recipeEdit(recipe).subscribe();
      this.recipeService.getRecipes();
      void this.router.navigate(['/']);
    }else{
      this.recipeService.postRecipe(recipe);
      void this.router.navigate(['/']);
    }
  }

  getRecipeFormGroup(){
    const steps = <FormArray>this.form.get('steps');
    const stepGroup = new FormGroup({
      stepImage: new FormControl('', Validators.required),
      stepDescription: new FormControl('', Validators.required),
    })
    steps.push(stepGroup);
  }

  addStep() {
    this.addButtonDisabled = true;
     if(this.recipesUpdate){
       if(this.recipe?.steps && this.recipe?.steps.length !== this.editCount) {
         this.recipe?.steps.forEach((step:RecipeSteps) => {
           const steps = <FormArray>this.form.get('steps');
           const stepGroup = new FormGroup({
             stepImage: new FormControl(`${step.stepImage}`, Validators.required),
             stepDescription: new FormControl(`${step.stepDescription}`, Validators.required),
           })
           steps.push(stepGroup);
           this.editCount = <number>this.recipe?.steps.length;
         })
       }else {
         this.getRecipeFormGroup();
       }
     }else{
       this.getRecipeFormGroup();
     }
  }

  getStepsControls(){
    const steps = <FormArray>this.form.get('steps');
    return steps.controls;
  }
}
