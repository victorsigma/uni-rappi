import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzasPageRoutingModule } from './pizzas-routing.module';

import { PizzasPage } from './pizzas.page';
import { FooterModule } from 'src/app/component/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzasPageRoutingModule,
    FooterModule
  ],
  declarations: [PizzasPage]
})
export class PizzasPageModule {}
