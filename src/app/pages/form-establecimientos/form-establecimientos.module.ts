import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEstablecimientosPageRoutingModule } from './form-establecimientos-routing.module';

import { FormEstablecimientosPage } from './form-establecimientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormEstablecimientosPageRoutingModule
  ],
  declarations: [FormEstablecimientosPage]
})
export class FormEstablecimientosPageModule {}
