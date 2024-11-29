import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuesadillasPage } from './quesadillas.page';

const routes: Routes = [
  {
    path: '',
    component: QuesadillasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuesadillasPageRoutingModule {}
