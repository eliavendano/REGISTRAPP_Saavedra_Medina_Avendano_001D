import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Feriado } from '../interfaces/interfaces';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  dias:Feriado[]=[];
  constructor(private apiService:ApiService,private menuCtrl:MenuController) {}

  ngOnInit() {
    
    this.apiService.getTopHeadLines().subscribe(resp => {
        console.log('dias',resp);
        this.dias.push(...resp.data)
    });
  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
