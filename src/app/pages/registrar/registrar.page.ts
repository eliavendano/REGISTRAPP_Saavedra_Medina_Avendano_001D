import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { RegistroserviceService,Usuario } from 'src/app/services/registroservice.service';
import{ToastController}from '@ionic/angular'; 

import { FormGroup,
  FormControl,
  Validators,
  FormBuilder 
}from '@angular/forms';

@Component({  
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formularioRegistro:FormGroup;
  newUsuario: Usuario = <Usuario>{};

  constructor(private alertController: AlertController,
    private toastController :ToastController,
    private registroService:RegistroserviceService,
    private fb:FormBuilder) { 
      this.formularioRegistro = this.fb.group({
        'nombre':new FormControl("",Validators.required),
        'rut':new FormControl("",Validators.required),
        'password':new FormControl("",Validators.required),
        'confirmaPass':new FormControl("",Validators.required)
      });
    }

  ngOnInit() {
  }

  async CrearUsuario(){
    var form = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'datos incorrectos',
        message:'deve completar todos los datos',
        buttons:['aceptar']
      })

      await alert.present();
      return;
    }

    this.newUsuario.nomUsuario = form.nombre,
    this.newUsuario.rut = form.rut,
    this.newUsuario.passUsuario = form.password,
    this.newUsuario.repassUsuario = form.confirmaPass,
    this.registroService.addDatos(this.newUsuario).then(dato=>{
      this.newUsuario =<Usuario>{};
      this.showToast('!datos ingresados');  
    });
  }

  async showToast(msg:string){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000 
    });
    toast.present();
  }
}
