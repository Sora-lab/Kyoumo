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
import { AddForm } from './AddForm';
import { AppBar } from './AppBar/AppBar';
const newAddForm = new AddForm('foo');

// interface 
// TODO: I should import this later 
interface Item {
  title: string;
  type?: string;
  start: number | null;
  end: number | null;
  note?: string;
}

export enum Layout {
  default = 'default',
  add = 'addForm',
  edit = 'editForm',
}

class Container extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemArray: undefined,
      itemIsLoading: true,
      layout: Layout.default,
    }
  }

  // set firestore database
  db = firebase.firestore();
  userId = firebase.auth()?.currentUser?.uid;
  userDoc = this.db.collection('users').doc(this.userId)

  /**
   * set firestore query for default list
   */

  queryToday = this.userDoc
    .collection('items')
    .where('end', '>', 0);
  queryAnyDay = this.userDoc
    .collection('items')
    .where('end', '==', null);

  componentDidMount() {
    const query: Array<Item> = [];
    Promise.all(
      [this.queryAnyDay.get(), this.queryToday.get()]
    ).then((querySnapshots: any) => {
      querySnapshots.forEach((snapshot: any) => {
        snapshot.forEach((ele: any) => {
          // console.log(ele, ele.data());
          query.push(ele.data() as Item);
        });
      })

      this.setState({ itemArray: query, itemIsLoading: false });
    }).catch(function (error) {
      console.log('Error getting document:', error);
    });
  }

  /**
   * set layout state to addForm
   */
  showAddForm() {
    this.setState({ layout: Layout.add })
  }

  /**
   *  set layout state to default
   */
  closeForm() {
    this.setState({ layout: Layout.default })
  }

  /**
   * set appropriate onclick functions for left icon on appbar
   * as a prop depending on layout state
   */
  leftIconOnClick() {
    if(this.state.layout === Layout.add || this.state.layout === Layout.edit) {
      this.closeForm();
    } else {
      // open the menu
    }
  }

  /**
   * set appropriate onclick functions for right icon on appbar
   * as a prop depending on layout state
   */
  rightIconsOnClick() {
    if (this.state.layout === Layout.edit || this.state.layout === Layout.add) {
      newAddForm.saveItem('foo') // THIS IS A BIT HACKY... 
      return (
        this.closeForm()
      )
    } else if (this.state.layout === Layout.default) {
      // do other things
    }
  }

  /**
   * set appropriate onclick functions for far right icon on appbar
   * as a prop depending on layout state
   */
  farRightIconsOnClick() {
    if (this.state.layout === Layout.edit || this.state.layout === Layout.add) {
      return (this.closeForm)
    } else if (this.state.layout === Layout.default) {
      // do other things
    }
  }

  
  render() {
    console.log("Container", this.state.itemArray)
    return (
      <div id="container">
        <AppBar
          layout={this.state.layout}
          leftIconOnClick={this.leftIconOnClick.bind(this)}
          rightIconsOnClick={this.rightIconsOnClick.bind(this)}
          farRightIconsOnClick = {this.farRightIconsOnClick.bind(this)}
        />
        <div style={this.state.layout === Layout.default ? { display: "block" } : { display: 'none' }}>
          <ItemList
            isLoading={this.state.itemIsLoading}
            itemArray={this.state.itemArray}
          />
        </div>
        <div style={this.state.layout === Layout.add ? { display: "block" } : { display: 'none' }}>
          <AddForm />
        </div>
        <div style={this.state.layout === Layout.edit ? { display: "block" } : { display: 'none' }}>edit form</div>
        <footer>
          <button className="fab-add" onClick={() => this.showAddForm()}><i className="material-icons">add</i></button>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </footer>
      </div>
    );
  }

}

export default Container;