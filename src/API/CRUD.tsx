import { Item } from '../API/query';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const userId:string = firebase.auth()?.currentUser?.uid;

// find user and add item
export function addItem(data:Item) {

  db.collection('users')
    .doc(userId)
    .collection('items')
    .add(data)
  .then(()=>console.log('Document successfully written!'))
  .catch((error)=>{console.error("Error adding document: ", error)});

}

export function updateIteam(data) {

}