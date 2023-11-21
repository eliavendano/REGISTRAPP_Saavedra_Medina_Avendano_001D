import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  scanResult: any='';
  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }
  onCodeResult(result:string)
  {
    this.scanResult=result;
  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
