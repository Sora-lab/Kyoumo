import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

class ItemList extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state={

    }
  }
  todayItems: any;
  db = firebase.firestore();
  userId = firebase.auth()?.currentUser?.uid;
  items = this.db.collection("users");
  componentDidMount(){
    this.items.get().then((doc:any)=>
        console.log(doc)
    )
  
  }
  render(){
    return(
      <div>
        woot
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    )
  }
}

export default ItemList;