import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantillaTiendaPage } from './plantilla-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: PlantillaTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillaTiendaPageRoutingModule {}
