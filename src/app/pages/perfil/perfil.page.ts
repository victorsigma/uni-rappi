import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token/token.service';
import { UsersService } from 'src/app/services/users/users.service';
import { firstValueFrom } from 'rxjs';
import { PhotoModalComponent } from 'src/app/component/photo-modal/photo-modal.component';
import { SalesService } from 'src/app/services/sales.service';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  selectedOption: string = 'informacion';
  isEditing: boolean = false;

  userId: number = 0;
  username: string = '';
  email: string = '';
  phonenumber: string = '';
  controlNumber: string = '';
  group: string = '';
  fullName: string = '';
  photoUrl: string = '';

  ordenes: {id: number, balance: number}[] = [];

  constructor(
    private usersService: UsersService,
    private modalController: ModalController,
    private tokenService: TokenService,
    private alertController: AlertController,
    private saleService: SalesService
  ) {}

  async ngOnInit() {
    this.loadUserData();
    await this.obtenerOrdenes();
  }

  async obtenerOrdenes() {
    (await this.saleService.obtenerOrdenes()).subscribe({
      complete: () => { },
      next: (value) => {
        this.ordenes = value.data;
      },
      error: (error) => {}
    })
  }

  async loadUserData() {
    try {
      this.userId = (await this.tokenService.getUserId()) || 0;

      if (!this.userId) {
        throw new Error('Usuario no autenticado');
      }

      const user: any = await firstValueFrom(this.usersService.getUserById(this.userId));
      this.username = user.data.username;
      this.email = user.data.email;
      this.phonenumber = user.data.phonenumber;
      this.controlNumber = user.data.controlNumber;
      this.group = user.data.group;
      this.fullName = user.data.fullName;
      this.photoUrl = user.data.photoUrl; 
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      this.showAlert('Error', 'No se pudo cargar la información del usuario');
    }
  }

  toggleEdit() {
    if (this.isEditing) {
      this.saveChanges();
    } else {
      this.isEditing = true;
    }
  }

  async saveChanges() {
    const updatedData = {
      username: this.username,
      email: this.email,
      phonenumber: this.phonenumber,
      controlNumber: this.controlNumber,
      group: this.group,
      fullName: this.fullName,
    };
    const alert = await this.alertController.create({
      header: 'Confirmar cambios',
      message: '¿Estás seguro de que deseas guardar los cambios?.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async () => {
            try {
              await firstValueFrom(this.usersService.updateUser(this.userId, updatedData));
              this.isEditing = false;
              this.showAlert('Éxito', 'Datos actualizados correctamente');
            } catch (error: any) {
              this.showAlert('Error', error.error.message);
            }        
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Eliminar cuenta',
      message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await firstValueFrom(this.usersService.deleteUser(this.userId));
              this.tokenService.logOut();
              this.showAlert('Éxito', 'Cuenta eliminada correctamente');
            } catch (error: any) {
              console.error('Error al eliminar la cuenta:', error);
              this.showAlert('Error', error.error.message);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async openPhotoModal() {
    const modal = await this.modalController.create({
      component: PhotoModalComponent, // Crear este componente para subir fotos
      componentProps: { userId: this.userId, photoUrl: this.photoUrl },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.photoUrl !== undefined) {
      this.photoUrl = data.photoUrl;
    }
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Actualizar Contraseña',
      inputs: [
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nueva Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (!data.newPassword) {
              this.showAlert('Error', 'Debes ingresar una contraseña.');
              return false;
            }
            try {
              await this.updatePassword(data.newPassword);
              return true; // Retorna true al completar la actualización
            } catch (error) {
              console.error(error);
              this.showAlert('Error', 'No se pudo actualizar la contraseña.');
              return false; // Retorna false en caso de error
            }
          },
        },
      ],
    });
  
    await alert.present();
  }  

  async updatePassword(newPassword: string) {
    try {
      await firstValueFrom(
        this.usersService.updateUser(this.userId, { password: newPassword })
      );
      this.showAlert('Éxito', 'Contraseña actualizada correctamente.');
    } catch (error: any) {
      console.error('Error al actualizar la contraseña:', error);
      this.showAlert('Error', error.error.message || 'No se pudo actualizar la contraseña.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  setSelectedOption(option: string) {
    this.selectedOption = option;
  }

  async openCarrito() {
    const modal = await this.modalController.create({
      component: CarritoComponent, // No especificamos un componente aquí
      cssClass: 'full-modal', // Estilos personalizados (opcional)
      backdropDismiss: true,  // Permitir cerrar al hacer clic fuera
      breakpoints: [1], // Puntos de ruptura para el tamaño del modal (10%, 50%, 90%)
      initialBreakpoint: 1, // Comienza el modal en 50% de la altura
      handle: false, // Activa el control para arrastrar el modal
    });

    await modal.present();
  }
}
