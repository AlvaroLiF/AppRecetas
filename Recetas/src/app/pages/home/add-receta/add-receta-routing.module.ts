import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecetaPage } from './add-receta.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecetaPageRoutingModule {}
