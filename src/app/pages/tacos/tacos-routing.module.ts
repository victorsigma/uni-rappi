import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TacosPage } from './tacos.page';

const routes: Routes = [
  {
    path: '',
    component: TacosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TacosPageRoutingModule {}
