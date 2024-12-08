import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  user = {
    username: '',
    email: '',
    fullName: '',
    controlNumber: '',
    group: '',
    password: '',
    role: 'user',
  };
  mostrarContrasena: boolean = false;
  repetirContrasena: string = '';
  mostrarRepetirContrasena: boolean = false;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController 
  ) {}

  ngOnInit() {}

  alternarContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }

  alternarRepetirContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }

  async register() {
    this.authService.register(this.user).subscribe({
      next: async (response) => {
        console.log('Usuario registrado exitosamente:', response);
        await this.showAlert('Éxito', response.message);
        this.navCtrl.navigateForward('/first-screen');
      },
      error: async (err) => {
        console.error('Error al registrar usuario:', err);
        await this.showAlert('Éxito', err.error.message);
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
