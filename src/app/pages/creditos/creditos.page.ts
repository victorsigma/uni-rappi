import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
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
    private platform: Platform
  ) {}

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

    // Limpia los parámetros de la URL
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
        if (this.platform.is('hybrid')) {
          // En móvil, abrir con Capacitor Browser
          await Browser.open({ url: response.data.url });

          // Manejo del evento `browserFinished`
          Browser.addListener('browserFinished', async () => {
            await this.handleBrowserFinished();
          });
        } else {
          // En web, redirigir con window.location.href
          window.location.href = response.data.url;
        }
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

  private async handleBrowserFinished() {
    // Aquí se puede manejar la redirección si el usuario cierra el navegador móvil
    this.router.navigate(['/creditos']);
    this.checkTransactionStatus();
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
