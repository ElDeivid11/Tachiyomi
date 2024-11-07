import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';

// Definición de la interfaz Book
interface Book {
  title: string;
  cover: string;
  category: string;
  link: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteBooks: Book[] = []; // Arreglo de libros favoritos de tipo Book

  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadFavoriteBooks();
  }

  loadFavoriteBooks() {
    const favorites: string[] = this.userService.getFavoriteBooks(); // Asegúrate de que esto devuelva un array de strings
    
    // Filtra los libros para obtener información adicional
    this.favoriteBooks = favorites
      .map((title: string) => this.getBookDetails(title)) // Tipo explícito para title
      .filter((book): book is Book => book !== undefined); // Type Predicate
  }

  getBookDetails(title: string): Book | undefined {
    // Array de todos los libros, asegurando que tenga el tipo Book[]
    const allBooks: Book[] = [
      { title: 'Mushoku Tensei', cover: 'assets/img/MushokuTensei.jpg', category: 'Manga', link: 'https://zonatmo.com/library/manga/8635/mushokutenseiisekaiittarahonkidasu' },
      { title: 'Boku No Hero', cover: 'assets/img/BokuNoHero.jpg', category: 'Manga', link: 'https://zonatmo.com/library/manga/127/bokunoheroacademia' },
      { title: 'Re:Zero', cover: 'assets/img/ReZero.jpg', category: 'Manga', link: 'https://zonatmo.com/library/manga/46255/rezero-kara-hajimeru-isekai-seikatsu-dai-4-shou-seiiki-to-gouyoku-no-majo' },
      { title: 'Chainsaw Man', cover: 'assets/img/ChainsawMan.jpg', category: 'Manga', link: 'https://zonatmo.com/library/manga/336/chainsawman' },
      { title: 'Martial Peak', cover: 'assets/img/MartialPeak.jpg', category: 'Manhua', link: 'https://zonatmo.com/library/manhua/38921/martial-peak' },
      { title: 'Release That Witch', cover: 'assets/img/ReleaseThatWitch.jpg', category: 'Manhua', link: 'https://zonatmo.com/library/manhua/42786/release-that-witch' },
      { title: 'Tales Of Demons And Gods', cover: 'assets/img/TalesOfDemonsAndGods.jpg', category: 'Manhua', link: 'https://zonatmo.com/library/manhua/12956/tales-of-demons-and-gods' },
      { title: 'Solo Leveling', cover: 'assets/img/SoloLeveling.jpg', category: 'Manhua', link: 'https://zonatmo.com/library/manhwa/217/solo-leveling' },
      { title: 'La Vida Despues De La Muerte', cover: 'assets/img/LVDM.jpg', category: 'Light Novel', link: 'https://zonatmo.com/library/novel/41401/la-vida-despues-de-la-muerte' },
      { title: 'Bungou Stray Dogs', cover: 'assets/img/BungouStrayDogs.jpg', category: 'Light Novel', link: 'https://zonatmo.com/library/novel/31238/Bungou-Stray-Dogs-Examen-' },
      { title: 'Tate No Yuushano', cover: 'assets/img/TatenoYuushanoNariagari.jpg', category: 'Light Novel', link: 'https://zonatmo.com/library/novel/10196/tatenoyuushanonariagari' },
      { title: 'The Great Demon King', cover: 'assets/img/TheGreatDemonKing.jpg', category: 'Light Novel', link: 'https://zonatmo.com/library/novel/22859/great-demon-king' },
    ];

    return allBooks.find(book => book.title === title);
  }

  openBookLink(link: string) {
    window.open(link, '_blank'); // Abre el enlace en una nueva pestaña
  }

  removeFavorite(bookTitle: string) {
    const favorites: string[] = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    const updatedFavorites = favorites.filter(title => title !== bookTitle);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites)); // Actualiza localStorage

    // Recargar la lista de favoritos
    this.loadFavoriteBooks();
    console.log(`${bookTitle} ha sido eliminado de favoritos.`);
  }

  openExternalLink(link: string) {
    window.open(link, '_blank'); // Abre la página externa en una nueva pestaña
  }
  
}