import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantillaTiendaPageRoutingModule } from './plantilla-tienda-routing.module';

import { PlantillaTiendaPage } from './plantilla-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantillaTiendaPageRoutingModule
  ],
  declarations: [PlantillaTiendaPage]
})
export class PlantillaTiendaPageModule {}
