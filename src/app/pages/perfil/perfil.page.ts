import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  selectedOption: string = 'informacion';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  celular: string = '';
  fechaNacimiento: string = '';
  genero: string = '';

  constructor() {}

  // Función para manejar la opción seleccionada
  setSelectedOption(option: string) {
    this.selectedOption = option;
  }

  ngOnInit() {
    // Cargar los datos guardados en el localStorage al iniciar
    this.loadData();
  }

  openDatePicker() {
    const datePicker = document.querySelector('ion-datetime');
    if (datePicker) {
      // Verifica si el calendario está visible
      const isVisible = datePicker.style.display === 'block';
      // Alterna la visibilidad
      datePicker.style.display = isVisible ? 'none' : 'block';
    }
  }

  // Método para guardar los datos en localStorage
  saveData() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('correo', this.correo);
    localStorage.setItem('celular', this.celular);
    localStorage.setItem('fechaNacimiento', this.fechaNacimiento);
    localStorage.setItem('genero', this.genero);
  }

  // Método para cargar los datos desde localStorage
  loadData() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.apellido = localStorage.getItem('apellido') || '';
    this.correo = localStorage.getItem('correo') || '';
    this.celular = localStorage.getItem('celular') || '';
    this.fechaNacimiento = localStorage.getItem('fechaNacimiento') || '';
    this.genero = localStorage.getItem('genero') || '';
  }
}
