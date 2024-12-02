import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DulceriaPage } from './dulceria.page';

const routes: Routes = [
  {
    path: '',
    component: DulceriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DulceriaPageRoutingModule {}
