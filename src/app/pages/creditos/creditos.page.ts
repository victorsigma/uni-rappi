import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private route: ActivatedRoute
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

}
