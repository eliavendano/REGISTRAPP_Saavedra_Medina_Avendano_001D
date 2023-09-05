import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  componentes : Componente[] = [
    {
      icon: 'camera-outline',
      name: 'escanear',
      redirecTo: '/escaneo'
    },
    {
      icon: 'accessibility-outline',
      name: 'contexto',
      redirecTo: '/contexto'
    }
  ];
  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
