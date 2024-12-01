import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DulceriaPageRoutingModule } from './dulceria-routing.module';

import { DulceriaPage } from './dulceria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DulceriaPageRoutingModule,
  ],
  declarations: [DulceriaPage ]
})
export class DulceriaPageModule {}
