import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Qr1Page } from './qr1.page';

const routes: Routes = [
  {
    path: '',
    component: Qr1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Qr1PageRoutingModule {}
