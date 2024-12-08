import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token/token.service';
import { UsersService } from 'src/app/services/users/users.service';
import { firstValueFrom } from 'rxjs';

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
  controlNumber: string = '';
  group: string = '';
  fullName: string = '';

  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    try {
      this.userId = (await this.tokenService.getUserId()) || 0;

      if (!this.userId) {
        throw new Error('Usuario no autenticado');
      }

      const user: any = await firstValueFrom(this.usersService.getUserById(this.userId));

      console.log(user);

      this.username = user.data.username;
      this.email = user.data.email;
      this.controlNumber = user.data.controlNumber;
      this.group = user.data.group;
      this.fullName = user.data.fullName;
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      this.showAlert('Error', 'No se pudo cargar la información del usuario');
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async saveChanges() {
    const updatedData = {
      username: this.username,
      email: this.email,
      controlNumber: this.controlNumber,
      group: this.group,
      fullName: this.fullName,
    };

    try {
      await firstValueFrom(this.usersService.updateUser(this.userId, updatedData));
      this.isEditing = false;
      this.showAlert('Éxito', 'Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      this.showAlert('Error', 'No se pudo actualizar la información');
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
}
