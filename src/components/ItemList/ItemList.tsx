import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

// components 
import AddForm from '../AddForm';
import { AppBar } from '../AppBar/AppBar';
import {ItemCard} from './ItemCard';

export interface Item {
  title: string;
  type?: string;
  start?: number;
  end?: number;
  note?: string;
}
interface State {
  itemArray: Array<Item> | undefined;
  isShown: boolean;
}

class ItemList extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemArray: undefined,
      isShown: false,
    }
  }
  // set firestore database
  db = firebase.firestore();
  userId = firebase.auth()?.currentUser?.uid;

  // set firestore query
  query = this.db
    .collection('users')
    .doc(this.userId)
    .collection('items')
    .where('end', '>', 0);

  componentDidMount() {

    let query: Array<Item> = [];
    this.query
      .get()
      .then((doc: any) => {
        console.log(doc);
        doc.forEach((ele: any) => {
          console.log(ele.data());
          query.push(ele.data() as Item);
        });
        this.setState({ itemArray: query })
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  // taggle add form visual state
  showAddForm() {
    if (!this.state.isShown) {
      this.setState({ isShown: true })
    } else {
      this.setState({ isShown: false })
    }
  }

  // hamburger
  leftIconOnClick() {
    //TODO: open and close hamburger menu
  }

  // search and more_vert 
  rightIconsOnClick() { }

  closeAddForm() {
    this.setState({ isShown: false })
  }

  render() {
    return (
      <>
        <div id='item-dialog'
          style={this.state.isShown ? { display: 'unset' } : { display: 'none' }}>
          <AddForm closeButton={this.closeAddForm.bind(this)} />
        </div>
        <AppBar layout='defalut' leftIconOnClick={this.leftIconOnClick.bind(this)} rightIconsOnClick={this.rightIconsOnClick.bind(this)} />
        <div id='item-list'>{this.state.itemArray?.map((item: any, index) => {
          return (
            <>
            <div key={index}>
              <p>{item['title']}</p>
              <p>{item['note']}</p>
              <p>{item['start']}</p>
            </div>
            <ItemCard key={index} item={item} />
            </>
          )
        })}
          <button className="fab-add" onClick={() => this.showAddForm()}><i className="material-icons">add</i></button>
        </div>
        <div>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>

      </>
    );
  }
}

export default ItemList;
