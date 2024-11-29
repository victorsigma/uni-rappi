import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  contrasena: string = "";
  mostrarContrasena: boolean = false;

  constructor() { }

  alternarContrasena() {
    console.log(this.mostrarContrasena);
    this.mostrarContrasena = !this.mostrarContrasena; // Alterna el valor entre true y false
  }
  ngOnInit() {
  }

}
