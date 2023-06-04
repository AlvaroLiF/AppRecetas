import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionPageRoutingModule } from './informacion-routing.module';

import { InformacionPage } from './informacion.page';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
    declarations: [InformacionPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InformacionPageRoutingModule,
        ComponentsModule
    ]
})
export class InformacionPageModule {}
