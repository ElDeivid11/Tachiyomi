// src/app/models/book.model.ts
export interface Book {
    id: number;         // O string, dependiendo de cómo estés manejando el ID
    title: string;
    author: string;
    description: string;
    link: string;      // Enlace externo
    category: string;  // Categoría del libro
    cover: string;     // URL de la portada del libro
  }
  