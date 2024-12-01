import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TacosPageRoutingModule } from './tacos-routing.module';

import { TacosPage } from './tacos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TacosPageRoutingModule
  ],
  declarations: [TacosPage]
})
export class TacosPageModule {}
