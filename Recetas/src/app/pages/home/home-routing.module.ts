import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LoginGuardGuard } from 'src/app/guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then( m => m.RecetasPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'add-receta',
    loadChildren: () => import('./add-receta/add-receta.module').then( m => m.AddRecetaPageModule),
    canActivate: [LoginGuardGuard]
  },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
