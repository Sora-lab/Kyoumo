import React, { Component } from 'react';
// component 
import {AppBar} from './AppBar/AppBar';

// Item data type 
import {Item} from './ItemList/ItemList';

// CURD API 
import {addItem} from '../API/CRUD';


// utility functions
import {setProperty} from '../utilities/Object';

interface Props{
  closeButton: ()=>void;
}
interface State {
  itemData: Item
}
class AddForm extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemData:
        {
          title: 'New task/event/reminder/routine'
        }
    }
  }
  saveItem(e:any){
    e.preventDefault()
    console.log(document.forms.item(0));
    const formEl = document.forms.item(0);
    const formData = formEl && new FormData(formEl);
    let newItem: Item = {title: ''}
    if(formData !== null){
      for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
        let key = pair[0] as keyof Item;
        let value = pair[1] as string;
        setProperty(newItem, key, value)
      }
    }
    console.log(newItem)
    addItem(newItem);
  }

  render(){
    return(
      <>
      <AppBar layout={'addItemForm'} leftIconOnClick={this.props.closeButton} rightIconsOnClick={(e)=>{this.saveItem(e)}}/>

      <form name="itemform" className="vh-100">
        <input type="text" id="title" name="title" required minLength={4} placeholder='New task/event/reminder/routine'/>
      </form>
      </>
    )
  }
}

export default AddForm;