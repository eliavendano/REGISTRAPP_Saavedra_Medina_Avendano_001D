import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {
  texto:any;
  identificador!: string;
  constructor(private fire:FirebaseService) { }

  ngOnInit() {
  }
  async seleccionar() {
    try {
      // Verifica si se ha proporcionado un identificador
      if (!this.identificador) {
        console.error('Debes proporcionar un identificador.');
        return;
      }

      // Utiliza el identificador para obtener datos de Firebase
      const data = await this.fire.getItems(this.identificador);

      // Convierte los datos a una cadena JSON para generar el código QR
      this.texto = JSON.stringify(data);
    } catch (error) {
      console.error('Error obteniendo datos:', error);
    }
  }
}
}
