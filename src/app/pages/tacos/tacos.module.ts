import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TacosPageRoutingModule } from './tacos-routing.module';

import { TacosPage } from './tacos.page';
import { FooterModule } from 'src/app/component/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TacosPageRoutingModule,
    FooterModule
  ],
  declarations: [TacosPage], // No declaras FooterComponent aquí
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TacosPageModule {}
