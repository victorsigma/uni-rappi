import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  contrasena: string = "";
  mostrarContrasena: boolean = false;
  repetirContrasena: string = "";
  mostrarRepetirContrasena: boolean = false;

  constructor() { }

  alternarContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }

  alternarRepetirContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }
  
  ngOnInit() {
  }

}
