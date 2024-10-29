import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    username: '',
    email: '',
    bio: '',
    avatarUrl: '' // URL de la imagen de perfil
  };

  constructor(
    private userService: UserService, // Servicio que proporciona la información del usuario
    private alertController: AlertController // Controlador de alertas para edición de perfil
  ) {}

  ngOnInit() {
    // Inicializa los datos del perfil del usuario desde el servicio
    this.loadUserProfile();
  }

  // Cargar la información del usuario
  loadUserProfile() {
   
    this.user.email = 'usuario@example.com'; // Se puede reemplazar por un método en `userService` si deseas obtener el correo almacenado
    this.user.bio = 'Escribe algo sobre ti...'; // Valor de ejemplo para la bio, ajustable según tu servicio
    
    // Cargar la imagen de perfil desde localStorage
    const storedAvatar = localStorage.getItem('avatarUrl');
    this.user.avatarUrl = storedAvatar ? storedAvatar : 'assets/img/default-avatar.png'; // Imagen predeterminada
  }

  // Método para editar perfil (bio, avatar, etc.)
  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nombre de Usuario',
          value: this.user.username
        },
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'Biografía',
          value: this.user.bio
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.user.username = data.username;
            this.user.bio = data.bio;
            this.userService.setUsername(data.username); // Actualizar el nombre en el servicio
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para cambiar la imagen de perfil
  changeAvatar(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatarUrl = e.target.result; // Asignar la imagen leída a la variable de avatar
        localStorage.setItem('avatarUrl', this.user.avatarUrl); // Guardar en localStorage
      };
      reader.readAsDataURL(fileInput.files[0]); // Leer la imagen como Data URL
    }
  }

  changeTheme(theme: string | undefined) {
    if (!theme) {
      return; // Si el tema es undefined, no hacemos nada
    }
  
    document.body.classList.remove('dark-theme', 'anime-theme'); // Asegúrate de tener estos nombres de clase definidos
    document.body.classList.add(theme);
    localStorage.setItem('selectedTheme', theme); // Guarda el tema seleccionado
  }

  onThemeChange(event: any) {
    const selectedTheme = event.detail.value; // Este valor puede ser 'dark-theme' o 'anime-theme'
    this.changeTheme(selectedTheme); // Asegúrate de que no sea undefined
  }
  
}