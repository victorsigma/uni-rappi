import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';
import { ModalProductComponent } from 'src/app/component/modal-product/modal-product.component';

@Component({
  selector: 'app-plantilla-tienda',
  templateUrl: './plantilla-tienda.page.html',
  styleUrls: ['./plantilla-tienda.page.scss'],
})
export class PlantillaTiendaPage implements OnInit {

  pizzas = [
    {productname: "Pizzas pepperoni 1",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 2",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 3",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 4",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 5",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 6",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 7",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 8",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 9",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 10",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 11",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 12",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 13",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 14",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 15",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"},
    {productname: "Pizzas pepperoni 16",productDescription: "Pizza de pepperoni y queso", price:12, imagen:"assets/images/Imagenes-Pruebas/Pizza.webp"}
  ]

  constructor(private modalController: ModalController) {}

  // Función para abrir el modal
  async openModal(pizza: any) {
    const modal = await this.modalController.create({
      component: ModalProductComponent, // El componente que se mostrará en el modal
      cssClass: 'custom-modal',
      breakpoints: [0.1, 0.5, 0.9], // Puntos de ruptura para el tamaño del modal (10%, 50%, 90%)
      initialBreakpoint: 0.9, // Comienza el modal en 50% de la altura
      handle: true, // Activa el control para arrastrar el modal
      backdropDismiss: true,  // Permite cerrar el modal al hacer clic fuera
      componentProps: {
        pizza: pizza // Pasa el objeto pizza al modal
      }
    });

    await modal.present();
  }

  // Función para abrir el carrito
  async openCarrito() {
    const modal = await this.modalController.create({
      component: CarritoComponent, // No especificamos un componente aquí
      cssClass: 'full-modal', // Estilos personalizados (opcional)
      backdropDismiss: true,  // Permitir cerrar al hacer clic fuera
      componentProps: {
        // Puedes pasar propiedades si es necesario
      }
    });

    await modal.present();
  }

  ngOnInit() {
  }

}
