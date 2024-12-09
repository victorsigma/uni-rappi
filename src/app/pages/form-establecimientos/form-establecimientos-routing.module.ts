import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEstablecimientosPage } from './form-establecimientos.page';

const routes: Routes = [
  {
    path: '',
    component: FormEstablecimientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormEstablecimientosPageRoutingModule {}
