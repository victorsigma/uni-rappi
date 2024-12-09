import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UsersService } from 'src/app/services/users/users.service';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  username: string = '';
  balance: number = 0.00;

  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController 
  ) { }

  ngOnInit() {
    this.loadUserData();
  }


  async loadUserData() {
    const userId = await this.tokenService.getUserId();
    if (userId) {
      this.usersService.getUserById(userId).subscribe({
        next: async (res:any) => {
        console.log(res);
         this.username= res.data.username;
         this.balance = res.data.wallet.balance;
        },
        error: async (err) => {
          console.error('Error al cargar informacion del menu:', err);
        },
      });
    }
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);
  }

  goToCredits() {
    this.router.navigate(['/creditos']);
  }

  async logout() {
    await this.menuCtrl.close(); 
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
