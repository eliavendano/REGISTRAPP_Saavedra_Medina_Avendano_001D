import { Injectable } from '@angular/core';
import { setDoc, doc, collection, getFirestore,getDocs, onSnapshot  } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  nombresDocumentos: string[] = [];

  constructor( ) {this.actualizarNombresDocumentos(); }

  async IngresarDatos(data: any, path: string, id: string) {
    try {
      const docRef = await setDoc(doc(collection(getFirestore(), path), id), data);
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  async MostrarDatos(nombre:string): Promise<string[]> {
    const nombresDocumentos: string[] = [];
  
    try {
      const querySnapshot = await getDocs(collection(getFirestore(), nombre));
      querySnapshot.forEach((doc) => {
        // Agregar el ID del documento al array
        nombresDocumentos.push(doc.id);
      });
  
      return nombresDocumentos;
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
      return [];
    }
  }
  
  private async actualizarNombresDocumentos() {
    const querySnapshot = await getDocs(collection(getFirestore(), "clase"));
    this.nombresDocumentos = [];
    
    querySnapshot.forEach((doc) => {
      this.nombresDocumentos.push(doc.id);
    });

    // Agregar escucha en tiempo real para actualizaciones
    onSnapshot(collection(getFirestore(), "clase"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Nuevo documento agregado
          this.nombresDocumentos.push(change.doc.id);
        }
        if (change.type === "modified") {
          // Documento modificado
          const index = this.nombresDocumentos.indexOf(change.doc.id);
          if (index !== -1) {
            this.nombresDocumentos[index] = change.doc.id;
          }
        }
        if (change.type === "removed") {
          // Documento eliminado
          const index = this.nombresDocumentos.indexOf(change.doc.id);
          if (index !== -1) {
            this.nombresDocumentos.splice(index, 1);
          }
        }
      });
    });
  }
}


