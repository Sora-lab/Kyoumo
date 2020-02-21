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
import ItemList from '../ItemList/ItemList';
import { AddForm } from './AddForm';
import { AppBar } from '../AppBar/AppBar';
const newAddForm = new AddForm('foo');

// utilities 
import {setProperty} from '../../utilities/Object';

//CURD API 
import {updateIteam} from '../../API/CRUD'

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
      itemObj: {
        todayItems: undefined,
        itemArray: undefined,
      },
      itemsLoading: true,
      layout: Layout.default,
    }
  }

  /**
   * set firestore database
   */
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
    
    let itemObj: {itemArray: Array<Item>; todayItems: Array<Item> }= {
      itemArray: [],
      todayItems: []
    };
    
    Promise.all(
      [this.queryAnyDay.get(), this.queryToday.get()]
    ).then((querySnapshots: any) => {
      querySnapshots[0].forEach((ele: any) => {
        // console.log(ele, ele.data());
        itemObj.itemArray.push(ele.data() as Item);
      });
      querySnapshots[1].forEach((ele: any) => {
        // console.log(ele, ele.data());
        itemObj.todayItems.push(ele.data() as Item);
      });
      console.log(itemObj)
    this.setState({ itemObj: itemObj, itemIsLoading: false });
  }).catch(function(error) {
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
  if (this.state.layout === Layout.add || this.state.layout === Layout.edit) {
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
    const formEl = document.forms.item(0);
    const formData = formEl && new FormData(formEl);
    let newItem: Item = { title: '', start: null, end: null }
    if (formData !== null) {
      for (const pair of formData.entries()) {
        // console.log(pair[0] + ', ' + pair[1]);
        const key = pair[0] as keyof Item;
        const value = pair[1] as string;
        setProperty(newItem, key, value)
      }
    }
    console.log(newItem)
    updateIteam('foo')
    // newAddForm.saveItem('foo') // THIS IS A BIT HACKY... 
     formEl?.reset();
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
        farRightIconsOnClick={this.farRightIconsOnClick.bind(this)}
      />
      <div style={this.state.layout === Layout.default ? { display: "block" } : { display: 'none' }}>
        <ItemList
          isLoading={this.state.itemIsLoading}
          itemObj={this.state.itemObj}
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