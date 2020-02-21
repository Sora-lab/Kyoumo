// Item Data interface 
import { Item } from '../components/ItemList/ItemList';

// firebase
import firebase from 'firebase';
import 'firebase/firestore';

import {InitializeFireBaseApp} from '../utilities/initializeFirebaseApp';

if (!firebase.apps.length) {
  const KyomoApp = new InitializeFireBaseApp;
  KyomoApp.initializeApp();
}

// find user and add item
export function addItem(data: Item) {
  const db = firebase.firestore();
  const userId: string | undefined = firebase.auth()?.currentUser?.uid;
// db.collection('users').doc(userId).get().then((doc: any) => {
//   console.log(doc);})
  db.collection('users')
    .doc(userId)
    .collection('items')
    .add(data)
  .then(()=>console.log('Document successfully written!'))
  .catch((error)=>{console.error("Error adding document: ", error)});

}

export function updateIteam(data: any) {
  console.log('updateIteam', data)
  const db = firebase.firestore();
  const userId: string | undefined = firebase.auth()?.currentUser?.uid;

  db.collection('users').doc(userId).get().then((doc: any) => {
      console.log(doc);})
}