import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audio: HTMLAudioElement | null = null;

  private apiKey = '	h4328jSqy13a5FHmDkYyv5YSadkblM1tzEbq5jbS'; // Coloca aquí tu clave de API de Freesound

  constructor(private http: HttpClient) {}

  // Método para obtener detalles del sonido
  getSoundById(id: number): Observable<any> {
    return this.http.get(`https://freesound.org/apiv2/sounds/${id}/?token=${this.apiKey}`);
  }

  // Método para reproducir el sonido en bucle
  playBackgroundMusic() {
    this.getSoundById(732706).subscribe((data: any) => {
      // Utiliza el enlace de vista previa en formato MP3 para asegurar la compatibilidad
      const soundUrl = data.previews['preview-hq-mp3'] || data.previews['preview-lq-mp3'];
      
      if (soundUrl) {
        this.audio = new Audio(soundUrl);
        this.audio.loop = true; // Activa el bucle
        this.audio.play().catch(error => {
          console.error('Error al reproducir la música:', error);
        });
      } else {
        console.log('No se encontró un archivo de sonido disponible.');
      }
    });
  }

  // Método para detener la música de fondo
  stopBackgroundMusic() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
