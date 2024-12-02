import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ModalProductComponent } from './component/modal-product/modal-product.component';
import { CarritoComponent } from './component/carrito/carrito.component';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ModalProductComponent, CarritoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptorsFromDi()),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
