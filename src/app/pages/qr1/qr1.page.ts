import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-qr1',
  templateUrl: './qr1.page.html',
  styleUrls: ['./qr1.page.scss'],
})
export class Qr1Page implements OnInit {
  texto: string = '';
  
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {}

obtenerDatosDesdeFirebase() {
  this.firestore.collection('qr1').doc('001').get()
    .subscribe((doc) => {
      if (doc.exists) {
        const data = doc.data() as {
          nombreAsignatura: string;
          fechaYHora: string;
          salaDeClases: string;
        };
        
        this.texto = `Asignatura: ${data.nombreAsignatura}, Fecha y Hora: ${data.fechaYHora}, Sala: ${data.salaDeClases}`;
      } else {
        console.log('No existe el documento');
      }
    });
}
}