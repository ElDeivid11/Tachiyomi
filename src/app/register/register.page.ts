// src/app/register/register.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = ''; // Inicializa con una cadena vacía
  email: string = ''; // Inicializa con una cadena vacía
  password: string = ''; // Inicializa con una cadena vacía

  constructor(
    private apiService: ApiService, 
    private translate: TranslateService,
    private router: Router) {}


  changeLanguage(language: string) {
    this.translate.use(language);
  }

  async onRegister() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    try {
      await this.apiService.registerUser(user);
      console.log('Usuario registrado con éxito');
      this.router.navigate(['/login']); // Redirigir a la página de login después del registro
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }
}
