import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-contexto',
  templateUrl: './contexto.page.html',
  styleUrls: ['./contexto.page.scss'],
})
export class ContextoPage implements OnInit {

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
