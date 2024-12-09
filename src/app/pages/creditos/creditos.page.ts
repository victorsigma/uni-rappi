import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';
import { PaymentsModalComponent } from 'src/app/component/payments-modal/payments-modal.component';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.page.html',
  styleUrls: ['./creditos.page.scss'],
})
export class CreditosPage implements OnInit {
  constructor(
    private tokenService: TokenService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async openPaymentModal(amount: number) {
    const userId = await this.tokenService.getUserId();
    if (!userId) {
      this.showAlert('Error', 'Usuario no autenticado.');
      return;
    }

    const modal = await this.modalController.create({
      component: PaymentsModalComponent,
      cssClass: 'full-modal', // Estilos personalizados (opcional)
      backdropDismiss: false,  // Permitir cerrar al hacer clic fuera
      breakpoints: [1], // Puntos de ruptura para el tamaño del modal (10%, 50%, 90%)
      initialBreakpoint: 1, // Comienza el modal en 50% de la altura
      handle: false, // Activa el control para arrastrar el modal
      componentProps: { amount }, // Pasa el monto al modal
    });

    await modal.present();

    // Escucha la respuesta del modal
    const { data } = await modal.onDidDismiss();
    if (data?.status === 'success') {
      this.showAlert('Éxito', 'Pago procesado exitosamente.');
    } else if (data?.status === 'cancel') {
      this.showAlert('Cancelado', 'El pago fue cancelado.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openCarrito() {
    const modal = await this.modalController.create({
      component: CarritoComponent, // No especificamos un componente aquí
      cssClass: 'full-modal', // Estilos personalizados (opcional)
      backdropDismiss: true,  // Permitir cerrar al hacer clic fuera
      breakpoints: [1], // Puntos de ruptura para el tamaño del modal (10%, 50%, 90%)
      initialBreakpoint: 1, // Comienza el modal en 50% de la altura
      handle: false, // Activa el control para arrastrar el modal
    });

    await modal.present();
  }

}
