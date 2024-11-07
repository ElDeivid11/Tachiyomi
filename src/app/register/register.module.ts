// src/app/register/register.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de importar TranslateModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Asegúrate de incluir esto
    IonicModule,
    TranslateModule // Agrega TranslateModule aquí
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
