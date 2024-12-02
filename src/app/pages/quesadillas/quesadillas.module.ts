import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuesadillasPageRoutingModule } from './quesadillas-routing.module';

import { QuesadillasPage } from './quesadillas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuesadillasPageRoutingModule
  ],
  declarations: [QuesadillasPage]
})
export class QuesadillasPageModule {}
