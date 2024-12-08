import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-establecimientos',
  templateUrl: './form-establecimientos.page.html',
  styleUrls: ['./form-establecimientos.page.scss'],
})
export class FormEstablecimientosPage implements OnInit {

  establecimientos = [
    { nombre: 'Café Central', encargado: 'Juan Pérez' },
    { nombre: 'Librería Alameda', encargado: 'Ana López' },
  ];

  nuevoEstablecimiento = {
    nombre: '',
    encargado: '',
  };

  constructor() {}

  ngOnInit() {}

  submitForm() {
    if (this.nuevoEstablecimiento.nombre && this.nuevoEstablecimiento.encargado) {
      this.establecimientos.push({ ...this.nuevoEstablecimiento });
      this.nuevoEstablecimiento = { nombre: '', encargado: '' };
      console.log('Establecimiento agregado');
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }

editarEstablecimiento(establecimiento: any) {
  console.log('Editar:', establecimiento);
  
}

eliminarEstablecimiento(establecimiento: any) {
  console.log('Eliminar:', establecimiento);
  this.establecimientos = this.establecimientos.filter(
    (item) => item !== establecimiento
  );
}


}
