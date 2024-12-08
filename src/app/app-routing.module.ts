import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'pizzas',
    loadChildren: () => import('./pages/pizzas/pizzas.module').then( m => m.PizzasPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'quesadillas',
    loadChildren: () => import('./pages/quesadillas/quesadillas.module').then( m => m.QuesadillasPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'postres',
    loadChildren: () => import('./pages/postres/postres.module').then( m => m.PostresPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'tacos',
    loadChildren: () => import('./pages/tacos/tacos.module').then( m => m.TacosPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'hamburguesas',
    loadChildren: () => import('./pages/hamburguesas/hamburguesas.module').then( m => m.HamburguesasPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'dulceria',
    loadChildren: () => import('./pages/dulceria/dulceria.module').then( m => m.DulceriaPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'first-screen',
    loadChildren: () => import('./pages/first-screen/first-screen.module').then( m => m.FirstScreenPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule),
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule),
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/plantilla-tienda/plantilla-tienda.module').then( m => m.PlantillaTiendaPageModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'admin', 'vendedor']}
  },
  {
    path: 'form-establecimientos',
    loadChildren: () => import('./pages/form-establecimientos/form-establecimientos.module').then( m => m.FormEstablecimientosPageModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }