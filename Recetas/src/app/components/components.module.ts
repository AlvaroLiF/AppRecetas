import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { MenuDesplegableComponent } from './menu-desplegable/menu-desplegable.component';



@NgModule({
    declarations: [
        HeaderComponent,
        MenuDesplegableComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        HeaderComponent,
        MenuDesplegableComponent
    ]
})
export class ComponentsModule { }