import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getDoc, doc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-qr1',
  templateUrl: './qr1.page.html',
  styleUrls: ['./qr1.page.scss'],
})
export class Qr1Page implements OnInit {
  texto: string = '';
  qrdata = '';
  doc = '';
  nombreasignatura:string='';
  nombresDocumentos: string[] = [];
  constructor(private firestore: AngularFirestore, private route: ActivatedRoute,
    private firebaseService: FirebaseService,) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.doc = params.get('n') || '';
    });
  }

  obtenerDatosDesdeFirebase() {
    this.firestore.collection('qr1').doc(this.doc).get()
      .subscribe((doc) => {
        if (!doc.exists) {
          alert('No existe el documento');
          return;
        }

        const data = doc.data() as {
          nombreAsignatura: string;
          fechaYHora: string;
          salaDeClases: string;
        };
        this.nombreasignatura= data.nombreAsignatura;
        this.texto = `Asignatura: ${data.nombreAsignatura}, Fecha y Hora: ${data.fechaYHora}, Sala: ${data.salaDeClases}`;
        this.qrdata = JSON.stringify(data);
      });
  }
  async obtenerDatos() {
    try {
      const nombresDocumentos = await this.firebaseService.MostrarDatos(this.nombreasignatura);
  
      // Hacer algo con los nombres de los documentos, como imprimirlos en la consola
      console.log("Nombres de documentos:", nombresDocumentos);
  
      // O, si deseas asignarlos a una propiedad para usar en tu plantilla
      this.nombresDocumentos = nombresDocumentos;
  
    } catch (error) {
      console.error("Error al obtener datos: ", error);
    }
  }
}