import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pizzas',
    loadChildren: () => import('./pages/pizzas/pizzas.module').then( m => m.PizzasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'quesadillas',
    loadChildren: () => import('./pages/quesadillas/quesadillas.module').then( m => m.QuesadillasPageModule)
  },
  {
    path: 'postres',
    loadChildren: () => import('./pages/postres/postres.module').then( m => m.PostresPageModule)
  },
  {
    path: 'tacos',
    loadChildren: () => import('./pages/tacos/tacos.module').then( m => m.TacosPageModule)
  },
  {
    path: 'hamburguesas',
    loadChildren: () => import('./pages/hamburguesas/hamburguesas.module').then( m => m.HamburguesasPageModule)
  },
  {
    path: 'dulceria',
    loadChildren: () => import('./pages/dulceria/dulceria.module').then( m => m.DulceriaPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
