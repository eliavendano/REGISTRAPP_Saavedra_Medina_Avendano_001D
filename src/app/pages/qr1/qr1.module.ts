import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Qr1PageRoutingModule } from './qr1-routing.module';

import { Qr1Page } from './qr1.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,  
    Qr1PageRoutingModule
  ],
  declarations: [Qr1Page]
})
export class Qr1PageModule {}
