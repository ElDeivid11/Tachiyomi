import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de importar TranslateModule
import { IonicModule } from '@ionic/angular';

import { BookManagementPageRoutingModule } from './book-management-routing.module';

import { BookManagementPage } from './book-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookManagementPageRoutingModule,
    TranslateModule 
  ],
  declarations: [BookManagementPage]
})
export class BookManagementPageModule {}
