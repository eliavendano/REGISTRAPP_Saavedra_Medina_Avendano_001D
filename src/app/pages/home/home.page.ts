import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ServicesdatosService } from 'src/app/services/servicesdatos.service';
import { NavController } from '@ionic/angular';


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

  nombreUsuario!: string;

  componentes : Componente[] = [
    {
      icon: 'camera-outline',
      name: 'Escanear',
      redirecTo: '/escaneo'
    },
    {
      icon: 'accessibility-outline',
      name: 'contexto',
      redirecTo: '/contexto'
    },
    {
      icon: 'today-outline',
      name: 'Dias Feriados',
      redirecTo: '/api'
    },
    {
      icon: 'person-outline',
      name: 'Mis datos ',
      redirecTo: '/mostrar'
    }
  ];
  constructor(private menuCtrl:MenuController,
    private datosService:ServicesdatosService,
    private navController: NavController) { }

  ngOnInit() {
    this.datosService.getNombreUsuario().then(nombre=> {
      this.nombreUsuario = localStorage.getItem('usuario')||'';
    });
  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
  cerrarSesion() {
    localStorage.clear(); 
    this.navController.navigateRoot('login');
  }
}
