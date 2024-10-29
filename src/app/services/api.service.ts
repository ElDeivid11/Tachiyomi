import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://671f94ece7a5792f052ec958.mockapi.io/users'; // Base URL de tu API MockAPI

  constructor() {}

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${this.baseUrl}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Obtener todos los libros
  async getBooks() {
    try {
      const response = await axios.get(`${this.baseUrl}/books`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  }

  async addUser(user: User) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, user); // Cambia '/books' a '/users'
      return response.data;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }
  }

  // Registrar un nuevo usuario
  async registerUser(user: { username: string; email: string; password: string }) {
    try {
      const response = await axios.post(`${this.baseUrl}`, user);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  

  // Autenticación de usuario
   // Método para iniciar sesión
  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const response = await axios.get<User[]>(`${this.baseUrl}`); // Obtén todos los usuarios
      const users = response.data;

      // Verifica si las credenciales son válidas
      const user = users.find((u: User) => u.email === email && u.password === password); // Aquí definimos explícitamente el tipo de 'u'
      return user || null; // Devuelve el usuario si las credenciales son válidas o null si no lo son
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
