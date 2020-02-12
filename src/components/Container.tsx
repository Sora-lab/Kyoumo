/**
 * That one page of a one page app
 *  - App bar 
 *  - Item List 
 *  - Add Form 
 *  - Edit Form 
 */
// beautiful-dnd
// import { Droppable } from 'react-beautiful-dnd';
// import { DragDropContext } from 'react-beautiful-dnd';


import React, { Component } from 'react';

// firebase
import firebase from 'firebase';
import 'firebase/firestore';

// components
import ItemList from './ItemList/ItemList';
import AddForm from './AddForm';
import { AppBar } from './AppBar/AppBar';
// interface 
// TODO: I should import this later 
interface Item {
  title: string;
  type?: string;
  start: number | null;
  end: number | null;
  note?: string;
}

class Container extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemArray: undefined,
      itemIsLoading: true,
      isShown: false,
      appBarLayout: 'default', // TODO: appBarLayout should be enums
    }
  }

  // set firestore database
  db = firebase.firestore();
  userId = firebase.auth()?.currentUser?.uid;

  /**
   * set firestore query for default list
   */
  queryToday = this.db
    .collection('users')
    .doc(this.userId)
    .collection('items') // it won't be just items
    .where('end', '>', 0);

  queryAnyDay = this.db
    .collection('users')
    .doc(this.userId)
    .collection('items') // it won't be just items
    .where('end', '==', null);

  componentDidMount() {
    let query: Array<Item> = [];
    const itemDefault = Promise.all(
      [this.queryAnyDay.get(), this.queryToday.get()]
    ).then((querySnapshot: any) => {
      console.log(querySnapshot[0], querySnapshot[1], typeof querySnapshot[0])
      console.log({...querySnapshot[0], ...querySnapshot[1]})
      querySnapshot[0].forEach((ele: any) => {
        console.log(ele.data());
        query.push(ele.data() as Item);
      });
      this.setState({ itemArray: query, itemIsLoading: false });
    }).catch(function (error) {
      console.log('Error getting document:', error);
    });
    // this.queryToday
    //   .get()
    //   .then((doc: any) => {
    //     console.log(doc);
    //     doc.forEach((ele: any) => {
    //       console.log(ele.data());
    //       query.push(ele.data() as Item);
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting document:', error);
    //   });
    //   this.queryAnyDay
    //   .get()
    //   .then((doc: any) => {
    //     console.log(doc);
    //     doc.forEach((ele: any) => {
    //       console.log(ele.data());
    //       query.push(ele.data() as Item);
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting document:', error);
    //   });
    // this.setState({ itemArray: query, itemIsLoading: false })
  }

  // taggle add form visual state
  showAddForm() {
    if (!this.state.isShown) {
      this.setState({ isShown: true })
    } else {
      this.setState({ isShown: false })
    }
  }

  closeAddForm() {
    this.setState({ isShown: false, appBarLayout: 'addItemForm' })
  }

  // hamburger
  // close add form
  leftIconOnClick() {
    //TODO: open and close hamburger menu
  }

  // search and more_vert 
  // save item
  rightIconsOnClick() {
    if (this.state.appBarLayout === 'addItemForm') {
      return (this.closeAddForm)
    } else if (this.state.appBarLayout === 'default') {

    }
  }

  render() {
    console.log("Container", this.state.itemArray)
    return (
      <div id='container'>
        <AppBar
          layout={this.state.appBarLayout}
          leftIconOnClick={this.leftIconOnClick.bind(this)}
          rightIconsOnClick={this.rightIconsOnClick.bind(this)}
        />
        <ItemList
          isLoading={this.state.itemIsLoading}
          itemArray={this.state.itemArray}
        />
        <div id='item-dialog'
          style={this.state.isShown ? { display: 'unset' } : { display: 'none' }}>
          <AddForm closeButton={this.closeAddForm.bind(this)} />
        </div>
        <footer>
          <button className="fab-add" onClick={() => this.showAddForm()}><i className="material-icons">add</i></button>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </footer>
      </div>
    );
  }

}

export default Container;