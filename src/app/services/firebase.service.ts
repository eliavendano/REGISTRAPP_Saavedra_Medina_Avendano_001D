import { Injectable } from '@angular/core';
import { setDoc,doc, collection, getFirestore } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( ) { }

  async IngresarDatos(data: any, path: string, id: string) {
    try {
      const docRef = await setDoc(doc(collection(getFirestore(), path), id), data);
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

}

