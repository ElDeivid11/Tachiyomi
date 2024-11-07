import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular'; // Importar LoadingController
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular'; // Importa ToastController para mostrar notificaciones
import { User } from '../models/user.model'; // Asegúrate de importar el modelo de usuario
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private loadingController: LoadingController, // Inyectar LoadingController
    private userService: UserService, // Inyectar UserService
    private apiService: ApiService,
    private translate: TranslateService,
    private toastController: ToastController // Importa ToastController para mostrar notificaciones

  ) {}

  async onLogin() {
    try {
      const user: User | null = await this.apiService.loginUser(this.email, this.password);
      if (user) {
        this.router.navigate(['/library']); 
      } else {
        this.showErrorToast('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.showErrorToast('Ocurrió un error al iniciar sesión.');
    }
  }


   // Método para mostrar un Toast
   async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger', // Color del toast
      position: 'top', // Posición del toast
    });
    toast.present();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register'); // Navegar a la página de registro
  }
}
