import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Book {
  id: number;
  title: string;
  cover: string;
  category: string;
  link: string;
}



@Injectable({
  providedIn: 'root'
})



export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  

  // Obtener todos los libros
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);  // Asegúrate de que `apiUrl` sea correcto
  }

  // Agregar un libro nuevo
  addBook(book: any): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  // Actualizar un libro existente
  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  // Eliminar un libro
 // book.service.ts
deleteBook(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
