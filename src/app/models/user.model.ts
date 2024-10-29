// src/app/models/user.model.ts
export interface User {
    id: string; // ID del usuario, necesario si usas MockAPI para identificar al usuario
    username: string; // Nombre de usuario
    email: string; // Correo electrónico
    password: string; // Contraseña
  }
  