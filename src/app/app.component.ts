import { Component, OnInit } from '@angular/core';
import { SoundService } from './services/sound.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private soundService: SoundService) {
    this.soundService.playBackgroundMusic();
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('selectedTheme') || '';
    if (savedTheme) {
      this.changeTheme(savedTheme); // Llama a la función changeTheme
      this.soundService.playBackgroundMusic(); // Llama a la función para re
    }
  }

  // Función para cambiar el tema
  changeTheme(theme: string) {
    document.body.classList.remove('dark-theme', 'anime-theme'); // Asegúrate de tener estos nombres de clase definidos
    document.body.classList.add(theme);
    localStorage.setItem('selectedTheme', theme); // Guarda el tema seleccionado
  }
}
