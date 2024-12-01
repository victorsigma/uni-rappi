import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  usernameOrEmail: string = '';
  password: string = '';
  mostrarContrasena: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private navCtrl: NavController,
    private alertController: AlertController 
  ) { }

  ngOnInit() {
  }

  alternarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async login() {
    this.authService
      .login({ usernameOrEmail: this.usernameOrEmail, password: this.password })
      .subscribe({
        next: async (response) => {
         this.tokenService.setToken(response.data.access_token);
          await this.showAlert('Éxito', 'Inicio de sesión exitoso');
          this.navCtrl.navigateForward('/home');
        },
        error: async (err) => {
          console.error('Error al iniciar sesión:', err);
          const errorMessage = err.error?.message || 'Ocurrió un error al iniciar sesión';
          await this.showAlert('Error', errorMessage);
        },
      });
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
