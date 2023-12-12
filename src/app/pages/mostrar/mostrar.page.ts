import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { ServicesdatosService ,Datos} from 'src/app/services/servicesdatos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroserviceService,Usuario } from 'src/app/services/registroservice.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.page.html',
  styleUrls: ['./mostrar.page.scss'],
})
export class MostrarPage implements OnInit {
  datosUsuario: any = {};
  rutUsuario!: string;
  nombreuser!:string;
  contraForm: FormGroup;
  datos: Datos[]=[];
  usuarios: Usuario[]=[];
  constructor(
    private menuCtrl: MenuController,
    private firebaseService: FirebaseService,
    private datosService:ServicesdatosService,
    private formBuilder: FormBuilder,
    private registroService:RegistroserviceService,
    ) {
      this.contraForm = this.formBuilder.group({
        nuevacontra: ['', Validators.required],
      });
    }

  ngOnInit() {
    this.datosService.getRut().then(rut => {
      this.rutUsuario = localStorage.getItem('rut') || '';
      this.nombreuser = localStorage.getItem('usuario') || '';
      this.obtenerDatos(this.rutUsuario);
    });
    
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  async obtenerDatos(rut: string) {
    try {
      const docSnapshot = await getDoc(doc(getFirestore(), "login", rut));

      if (docSnapshot.exists()) {
        // Si el documento existe, asigna sus datos a datosUsuario
        this.datosUsuario = { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        console.error("El documento no existe");
      }
    } catch (error) {
      console.error("Error document: ", error);
    }
  }
  
  async cambiarContra() {
    try {
      this.usuarios = await this.registroService.getUsuarios();

      if (this.usuarios.length === 0) {
        return null;
      }

      for (let obj of this.usuarios) {
        if (obj.nomUsuario === this.nombreuser && obj.rut === this.rutUsuario) {
          for (let obj of this.usuarios) {
            if (obj.nomUsuario === this.nombreuser && obj.rut === this.rutUsuario) {

              await this.registroService.updateDatos({
                rut: this.rutUsuario,
                nomUsuario: this.nombreuser,
                passUsuario: this.contraForm.value.nuevacontra,
                repassUsuario: this.contraForm.value.nuevacontra
                
              });
            }
          }
        }
      }

      if (this.contraForm.valid) {
        const f = this.contraForm.value;

        const datos = await this.datosService.getUsuarios();

        if (datos && datos.length === 0) {
          return null;
        }

        for (let obj of datos || []) {
          if (obj.nombre === this.nombreuser && obj.password !== f.password) {
            console.log('Contraseña cambiada localmente');
            localStorage.setItem('password', f.password);
          }
        }

        const nuevacontra = this.contraForm.value.nuevacontra;
        await this.firebaseService.ModificarContraseña(this.rutUsuario, nuevacontra);
        localStorage.setItem('password', nuevacontra);
        this.contraForm.reset(); // Opcional: reiniciar el formulario después de enviar
        console.log('Contraseña cambiada en Firebase y localmente:', nuevacontra);
      }

      return null;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      return null;
    }
  }
}

