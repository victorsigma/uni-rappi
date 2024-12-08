import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ModalProductComponent } from './component/modal-product/modal-product.component';
import { CarritoComponent } from './component/carrito/carrito.component';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { authInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [AppComponent, ModalProductComponent, CarritoComponent, MenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
