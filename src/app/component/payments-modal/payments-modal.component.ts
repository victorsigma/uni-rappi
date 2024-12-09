import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-payments-modal',
  templateUrl: './payments-modal.component.html',
  styleUrls: ['./payments-modal.component.scss'],
})
export class PaymentsModalComponent implements OnInit {
  @Input() amount!: number;

  stripe: Stripe | null = null;
  elements?: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  cardholderName = '';
  email = '';
  phone = '';
  termsAccepted = false;

  constructor(
    private modalController: ModalController,
    private paymentsService: PaymentsService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private tokenService: TokenService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51QQO7yRs3yQKVUmulXebTY5ZeFTjkhjtsHSUwAuo9sLX1ZPRtzWtuisnfYB020NFaN6oolBR3j4Js0poHE2WIOpy00PKgDHkE4');
    this.elements = this.stripe?.elements();
    this.setupStripeForm();
  }

  setupStripeForm() {
    if (!this.elements) return;

    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          color: '#e86411',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '16px',
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    });

    this.cardElement.mount('#card-element');
  }

  async handlePayment() {
    if (!this.cardholderName || !this.email || !this.phone) {
      this.showAlert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Procesando...',
      spinner: 'crescent',
    });
    await loading.present();

    const userId = await this.tokenService.getUserId();
    if (!userId) {
      this.showAlert('Error', 'Usuario no autenticado.');
      return;
    }

    try {
      const response = await this.paymentsService.createPaymentIntent(this.amount, userId);
      console.log(response);

      if (!response.data?.clientSecret) {
        throw new Error('clientSecret no recibido del servidor');
      }

      const result = await this.stripe?.confirmCardPayment(response.data.clientSecret, {
        payment_method: {
          card: this.cardElement!,
          billing_details: {
            name: this.cardholderName,
            email: this.email,
            phone: this.phone,
          },
        },
      });

      if (result?.error) {
        this.showAlert('Error', result.error.message || 'No se pudo procesar el pago.');
        await this.modalController.dismiss({ status: 'cancel' });
      } else {
        await this.modalController.dismiss({ status: 'success' });
      }
    } catch (error) {
      this.showAlert('Error', 'No se pudo procesar el pago.');
      console.error(error);
      await this.modalController.dismiss({ status: 'cancel' });
    } finally {
      loading.dismiss();
    }
  }

  async dismissModal() {
    await this.modalController.dismiss({ status: 'cancel' });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  viewTerms() {
    this.showAlert('Términos y Condiciones', 'Aquí puedes agregar tus términos y condiciones.');
  }
}
