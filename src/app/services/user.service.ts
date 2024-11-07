import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string | null = null;
  private email: string | null = null;
  private bio: string | null = null;
  private apiUrl = 'https://671f94ece7a5792f052ec958.mockapi.io/users'; // Cambia esta URL por la de tu API
  private favoriteBooksKey = 'favoriteBooks'; // Clave para el almacenamiento local

  constructor(private http: HttpClient) {
    this.username = '';
     // Inicializar si es necesario
  }

    // Método para obtener la información del usuario
    getUserProfile(userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${userId}`);
    }

    // Método para actualizar la información del usuario
  updateUserProfile(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userData);
  }
  // Método para obtener los datos del usuario
  getUserData(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`).toPromise();
  }


  setEmail(email: string) {
    this.email = email;
    localStorage.setItem('email', email);
  }

  getEmail(): string | null {
    return this.email || localStorage.getItem('email');
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }
  getFavoriteBooks(): string[] {
    const favorites = localStorage.getItem(this.favoriteBooksKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  setFavoriteBooks(favorites: string[]): void {
    localStorage.setItem(this.favoriteBooksKey, JSON.stringify(favorites));
  }
}



