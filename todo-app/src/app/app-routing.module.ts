import {NgModule, Pipe} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipeComponent } from './pipe/pipe.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'pipe',
    component: PipeComponent
  },
  {
    path: 'form',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
