import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import{Drivers}from '@ionic/storage';

import { environment } from 'src/environments/environment';
import {initializeApp} from 'firebase/app';
const firebaseApp = initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule
    ,IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot({name:'mydb',
  driverOrder:[Drivers.IndexedDB,Drivers.LocalStorage]})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
