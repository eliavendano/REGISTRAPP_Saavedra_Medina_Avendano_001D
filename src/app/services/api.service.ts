import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http:HttpClient) { }
  
  getTopHeadLines(){
    return this.Http.get<RespuestaTopHeadlines>('https://api.victorsanmartin.com/feriados/en.json');
  }
}
