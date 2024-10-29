import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  books = [
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
    // Agrega más libros según necesites
  ];

  filteredBooks = [...this.books];
  selectedCategory = '';

  constructor(
    private alertController: AlertController, 
    private userService: UserService,
    public navCtrl: NavController // Inyección de NavController
  ) {}

  ngOnInit() {
    this.filterBooks(); // Filtra los libros al iniciar
  }

  async ionViewDidEnter() {
    const username = this.userService.getUsername();

    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Hola, ${username}!`,
      buttons: ['OK']
    });

    await alert.present();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterBooks(); // Llama a filterBooks para actualizar filteredBooks
  }

  filterBooks() {
    // Filtra la lista de libros según la categoría seleccionada
    if (this.selectedCategory) {
      this.filteredBooks = this.books.filter(book => book.category === this.selectedCategory);
    } else {
      this.filteredBooks = [...this.books]; // Muestra todos los libros si no hay categoría seleccionada
    }
  }

   // Método para navegar al perfil
  goToProfile() {
    this.navCtrl.navigateForward('/profile'); // Cambia a la ruta de perfil
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

  openExternalLink(link: string) {
    window.open(link, '_blank'); // Abre la página externa en una nueva pestaña
  }
  
}