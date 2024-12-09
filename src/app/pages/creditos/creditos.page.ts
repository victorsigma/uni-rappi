import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.page.html',
  styleUrls: ['./creditos.page.scss'],
})
export class CreditosPage implements OnInit {

  constructor(
    private paymentsService: PaymentsService,
    private tokenService: TokenService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.checkTransactionStatus();
  }

  async checkTransactionStatus() {
    const status = this.route.snapshot.queryParamMap.get('status');

    if (status === 'success') {
      this.showAlert('Éxito', 'Tu recarga fue procesada exitosamente.');
    } else if (status === 'cancel') {
      this.showAlert('Cancelado', 'La recarga fue cancelada.');
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true,
    });
  }

  async purchaseCredits(amount: number) {
    const userId = await this.tokenService.getUserId();
    if (!userId) {
      this.showAlert('Error', 'Usuario no autenticado.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Procesando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const response = await this.paymentsService.createPaymentIntent(amount, userId);
      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        this.showAlert('Error', 'No se pudo procesar el pago.');
      }
    } catch (error) {
      this.showAlert('Error', 'No se pudo procesar el pago.');
      console.error(error);
    } finally {
      loading.dismiss();
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
