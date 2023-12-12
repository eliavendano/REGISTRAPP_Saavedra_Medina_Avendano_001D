import { Injectable } from '@angular/core';
import { setDoc, doc, collection, getFirestore, updateDoc, getDoc, DocumentSnapshot,getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {}

  async IngresarDatos(data: any, path: string, id: string) {
    try {
      const docRef = await setDoc(doc(collection(getFirestore(), path), id), data);
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async MostrarDatos() {
    const querySnapshot = await getDocs(collection(getFirestore(), "login"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  async ModificarContraseña(rut: string, nuevapassword: string) {
    try {
      const firestore = getFirestore(); // Asegúrate de tener acceso a la instancia de Firestore
      const userRef = doc(collection(firestore, 'login'), rut);

      const userDoc = await getDoc(userRef);
      
      if (userDoc instanceof DocumentSnapshot && userDoc.exists()) {
        // Si el documento existe, actualiza la contraseña
        await updateDoc(userRef, { password: nuevapassword });
        console.log('Contraseña actualizada exitosamente');
      } else {
        console.error('Error: No se encontró el documento con el ID de usuario especificado');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  }
}