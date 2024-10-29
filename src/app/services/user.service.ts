import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string | null = null;
  private email: string | null = null;
  private bio: string | null = null;
  private favoriteBooksKey = 'favoriteBooks'; // Clave para el almacenamiento local

  constructor() {
    this.username = ''; // Inicializar si es necesario
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



