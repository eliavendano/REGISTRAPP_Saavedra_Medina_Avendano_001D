import { Component, OnInit, ViewChild} from '@angular/core';
import { ServicesdatosService,Datos } from 'src/app/services/servicesdatos.service';
import { Platform,ToastController,IonList } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService,Usuario } from 'src/app/services/registroservice.service';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  datos: Datos[]=[];
  newDato: Datos = <Datos>{};
  @ViewChild('myList')myList!: IonList;

  formularioLogin:FormGroup;
  usuarios: Usuario[] = [];
  constructor(private storageService : ServicesdatosService,
              private plt: Platform,private toastController :ToastController,
              private alertController: AlertController,
              private navController:NavController,
              private registroService:RegistroserviceService,
              private fb:FormBuilder){
      this.plt.ready().then(()=>{
        this.loadDatos();
      })
      this.formularioLogin =this.fb.group({
        'nombre':new FormControl("",Validators.required),
        'rut':new FormControl("",Validators.required),
        'password':new FormControl("",Validators.required)
      })
    }
 
  ngOnInit() {
  }

  async Ingresar() {
    var f = this.formularioLogin.value;
    var a = 0;
    this.registroService.getUsuarios().then( datos=>{
      this.usuarios=datos;
      if(datos.length==0){
        return null;
      }
      for(let obj of this.usuarios){
        if(obj.nomUsuario == f.nombre && obj.passUsuario==f.password){
          a=1;
          console.log('inresado');
          localStorage.setItem('ingresado','true');
          localStorage.setItem('usuario',f.nombre);
          this.navController.navigateRoot('home')
        }
      }
      console.log(a);
      if(a==0){
        console.log(this.alertMsg)
        this.alertMsg;
        return null;

      }
      return;
    })
  }
  async alertMsg(){
    const alert = await this.alertController.create({
      header:'datos incorrectos',
      message:'deve completar todos los datos',
      buttons:['aceptar']
    })
    await alert.present();
    return;
  }

  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    })
  }
  addDatos(){
    this.storageService.addUser(this.newDato).then(dato=>{
      this.newDato = <Datos>{};
      this.showToast('!Datos Ageregados');
      this.loadDatos();
    });
  }
  updateDatos(dato: Datos){
    dato.nombre = `UPDATE: ${dato.nombre}`;
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Elemento actializado');
      this.myList.closeSlidingItems();
      this.loadDatos();
    })
  }
  async showToast(msg:string){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }
}

