import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { SoundService } from '../services/sound.service';
import { TranslateService } from '@ngx-translate/core';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  selectedCategory = ''
  newBook: Book = {  // Inicializa el objeto newBook
    id: 0,  // Si tienes un ID único, ajusta esto según sea necesario
    title: '',
    cover: '',
    category: '',
    link: ''
  };;

  constructor(
    private alertController: AlertController,
    private bookService: BookService,
    private userService: UserService,
    private translate: TranslateService,
    private soundService: SoundService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.showWelcomeMessage();
    this.loadBooks();
  }

  async showWelcomeMessage() {
    const alreadyWelcomed = localStorage.getItem('welcomeShown');
    if (!alreadyWelcomed) {
      this.userService.getUserData('user-id').subscribe(async (userData) => {
        const username = userData?.username || 'Usuario';
        const alert = await this.alertController.create({
          header: this.translate.instant('WELCOME'),
          message: `${this.translate.instant('HELLO')}, ${username}!`,
          buttons: ['OK']
        });
        await alert.present();
        localStorage.setItem('welcomeShown', 'true');
      });
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterBooks();
  }

  filterBooks() {
    this.filteredBooks = this.selectedCategory
      ? this.books.filter(book => book.category === this.selectedCategory)
      : [...this.books];
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;  // Puedes agregar filtrado aquí si lo deseas
    });
  }

addBook() {
    if (this.newBook.title && this.newBook.category && this.newBook.link) {
      this.bookService.addBook(this.newBook).subscribe(newBook => {
        this.books.push(newBook);  // Agregar el libro a la lista de libros en tiempo real
        this.filteredBooks.push(newBook); // Si estás filtrando, también actualiza la lista filtrada
        this.newBook = { id: 0, title: '', cover: '', category: '', link: '' };  // Limpiar el formulario
      });
    } else {
      // Aquí puedes agregar un mensaje de error si faltan campos en el formulario
      console.error('Faltan campos en el libro');
    }
  }

  updateBook(bookId: number, updatedBook: Book) {
    this.bookService.updateBook(bookId, updatedBook).subscribe((book) => {
      const index = this.books.findIndex((b) => b.id === bookId);
      if (index > -1) {
        this.books[index] = book;
        this.filterBooks();
      }
    });
  }

 

  goToAddBook() {
    this.navCtrl.navigateForward('/book-management');
  }

  editBook(book: Book) {
    this.navCtrl.navigateForward('/book-management', {
      state: { book }
    });
  }
  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      // Filtra los libros eliminando el que tiene el id igual al bookId
      this.books = this.books.filter(book => book.id !== bookId);
    });
  }
  

  addToFavorites(bookTitle: string) {
    let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    if (!favoriteBooks.includes(bookTitle)) {
      favoriteBooks.push(bookTitle);
      localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
      console.log(`${bookTitle} ha sido añadido a favoritos.`);
    } else {
      console.log(`${bookTitle} ya está en favoritos.`);
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  openExternalLink(link: string) {
    window.open(link, '_blank');
  }
}
