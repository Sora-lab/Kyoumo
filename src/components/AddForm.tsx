import React, { Component } from 'react';

// Item data type 
import { Item } from './ItemList/ItemList';

// CURD API 
import { addItem, updateIteam } from '../API/CRUD';


// utility functions
import { setProperty } from '../utilities/Object';

interface Props {}

interface State {
  itemData: Item
}
export class AddForm extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemData:
      {
        title: 'New task/event/reminder/routine'
      }
    }
  }
  componentDidMount(){
    console.log("addForm componentDidMount")
  }
  componentDidUpdate(prevProps:any){
    console.log("addForm componentDidUpdate")
  }
  componentWillMount(){
    console.log("addForm componentWillMount")
  }

  saveItem(e: any) {
    // e.preventDefault()
    console.log(document.forms.item(0));
    const formEl = document.forms.item(0);
    const formData = formEl && new FormData(formEl);
    const newItem: Item = { title: '' }
    if (formData !== null) {
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        const key = pair[0] as keyof Item;
        const value = pair[1] as string;
        setProperty(newItem, key, value)
      }
    }
    console.log(newItem)
    // addItem(newItem);
    updateIteam("foo")
    //clear the form
    formEl?.reset();
  }

  render() {
    return (
      <form name="itemform" className="vh-100">
        <input type="text" id="title" name="title" required minLength={4} placeholder={this.state.itemData.title} />
      </form>
    )
  }
}


