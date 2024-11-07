import { Component, OnInit } from '@angular/core';
import { SoundService } from './services/sound.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private soundService: SoundService,
    private translate: TranslateService // Inyección del servicio de traducción
  ) {
    this.soundService.playBackgroundMusic();

    // Establece los idiomas disponibles y el idioma predeterminado
    this.translate.addLangs(['en', 'es']);
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
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

  // Función para cambiar el idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLang', lang); // Guarda el idioma seleccionado
  }
}
