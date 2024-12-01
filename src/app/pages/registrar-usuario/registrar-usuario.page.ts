import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
  repetirContrasena: string = "";
  mostrarRepetirContrasena: boolean = false;

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  alternarContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }

  alternarRepetirContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }
  
  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.navCtrl.navigateForward('/iniciar-sesion');
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
      },
    });
  }
}
