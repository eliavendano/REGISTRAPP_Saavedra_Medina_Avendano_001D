import { Injectable } from '@angular/core';
import{Storage}from '@ionic/storage';


export  interface Datos{
  nombre:string;
  rut:string;
  password:string;
}

const ITEMS_KEY ='my-datos';
@Injectable({
  providedIn: 'root'
})

export class ServicesdatosService {
  private _storage!:Storage;

  constructor( private storage:Storage) {
    this.init();
  }
  async init(){
    const storage = await this.storage.create();
    this._storage =storage
  }
  async addUser(dato:Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos :Datos[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(ITEMS_KEY,datos);
      }else{
        return this.storage.set(ITEMS_KEY,[dato]);
      }
    });
  }
  async getNombreUsuario(): Promise<string> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (datos && datos.length > 0) {
        console.log(datos[0].nombre);
        return datos[0].nombre;
      }
      return '';
    });
  }
  async getRut(): Promise<string> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (datos && datos.length > 0) {
        console.log(datos[0].rut);
        return datos[0].rut;
      }
      return '';
    });
  }
  getUsuarios():Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }
  getDatos():Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }
  async updateDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if(!datos || datos.length ==0){
        return null;
      }
      let newDato: Datos[]=[];
      for(let i of datos){
        if(i.rut === dato.rut){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY,newDato);
    });
  }
  async deleteDatos(id: string):Promise<Datos>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if(!datos || datos.length ===0){
        return null;
      }
      let toKeep:Datos[]=[];
      for(let i of datos){
        if(i.rut !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY,toKeep);
    })
  }
}
