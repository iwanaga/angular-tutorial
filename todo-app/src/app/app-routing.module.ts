import {NgModule, Pipe} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipeComponent } from './pipe/pipe.component';
import { FormComponent } from './form/form.component';
import { DirectiveComponent } from  './directive/directive.component';

const routes: Routes = [
  {
    path: 'pipe',
    component: PipeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'directive',
    component: DirectiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
