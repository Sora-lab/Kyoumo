import React, { Component } from 'react';
import {QueryItems} from  '../API/query';
import {Item} from '../API/query';

import {AppBar} from './AppBar/AppBar';

interface State {
  itemData: Item
}
class ItemForm extends Component<any, State> {
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
    let formEl = document.forms.item(0);
    let formData = formEl && new FormData(formEl);
    if(formData !== null){
      for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
     }
    }
  }

  render(){
    return(

      <form name="itemform" className="vh-100">
        <input type="text" id="title" name="title" required minLength={4} placeholder={this.state.itemData.title}/>
      </form>

    )
  }
}

export default ItemForm;