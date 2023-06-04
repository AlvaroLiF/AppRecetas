import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasDetallesPageRoutingModule } from './recetas-detalles-routing.module';

import { RecetasDetallesPage } from './recetas-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasDetallesPageRoutingModule
  ],
  declarations: [RecetasDetallesPage]
})
export class RecetasDetallesPageModule {}
