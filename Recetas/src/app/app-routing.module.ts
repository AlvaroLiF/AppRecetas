import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecetasDetallesPage } from './pages/home/recetas/recetas-detalles/recetas-detalles.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home/recetas',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren:() => import('./pages/home/home.module').then(m=>m.HomePageModule)
  },
  {
    path:'home/registro',
    loadChildren:() => import('./pages/home/registro/registro.module').then(m=>m.RegistroPageModule)
  },
  {
    path:'home/login',
    loadChildren:() => import('./pages/home/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'receta-detalles/:recetaId',
    component: RecetasDetallesPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
