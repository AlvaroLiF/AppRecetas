import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasDetallesPage } from './recetas-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasDetallesPageRoutingModule {}
