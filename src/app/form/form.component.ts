import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      steps: new FormArray([]),
    })
  }

  getFormErrors(fieldName: string, errorType: string){
    const field = this.form.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  onSubmit() {
    const id = Math.random().toString();
    const recipe = new Recipe(
      id,
      this.form.value.name,
      this.form.value.description,
      this.form.value.imageUrl,
      this.form.value.ingredients,
      this.form.value.steps,
    )

    this.recipeService.postRecipe(recipe);
  }

  addStep() {
    const steps = <FormArray>this.form.get('steps');
    const stepGroup = new FormGroup({
      stepImage: new FormControl('', Validators.required),
      stepDescription: new FormControl('', Validators.required),
    })
    steps.push(stepGroup);
  }

  getStepsControls(){
    const steps = <FormArray>this.form.get('steps');
    return steps.controls;
  }
}
