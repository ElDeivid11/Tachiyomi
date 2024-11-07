import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookManagementPage } from './book-management.page';

const routes: Routes = [
  {
    path: '',
    component: BookManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookManagementPageRoutingModule {}
