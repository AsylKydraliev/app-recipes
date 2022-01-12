import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NotFoundComponent } from './not-found.component';
import { ResolverService } from './recipes/resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: FormComponent},
  {path: ':id', component: RecipesComponent, resolve: {recipes: ResolverService}},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
