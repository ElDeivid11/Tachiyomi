import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookService, Book } from '../services/book.service';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.page.html',
  styleUrls: ['./book-management.page.scss'],
})
export class BookManagementPage {
  book: Partial<Book> = {
    title: '',
    cover: '',
    category: '',
    link: ''
  };
  isEditing = false;
  editingBookId: number | null = null;

  constructor(
    private bookService: BookService,
    private translate: TranslateService,
    private navCtrl: NavController
  ) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.book.cover = image.dataUrl || '';
    } catch (error) {
      console.error('Error al seleccionar la imagen', error);
    }
  }

  saveBook() {
    if (this.isEditing && this.editingBookId !== null) {
      this.bookService.updateBook(this.editingBookId, this.book).subscribe(() => {
        this.navCtrl.navigateBack('/library');
      });
    } else {
      this.bookService.addBook(this.book as Book).subscribe(() => {
        this.navCtrl.navigateBack('/library');
      });
    }
  }
}
