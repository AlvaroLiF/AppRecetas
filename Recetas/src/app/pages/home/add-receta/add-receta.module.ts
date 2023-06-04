import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecetaPageRoutingModule } from './add-receta-routing.module';

import { AddRecetaPage } from './add-receta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecetaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddRecetaPage]
})
export class AddRecetaPageModule {}
