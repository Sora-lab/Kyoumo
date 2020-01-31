import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import ItemForm from '../ItemForm';
import {AppBar} from '../AppBar/AppBar';
import {Item} from '../../API/query';

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
	db = firebase.firestore();
	userId = firebase.auth()?.currentUser?.uid;
	// items = this.db
	// 	.collection('users')
	// 	.doc(this.userId)
	// 	.collection('items');
	query = this.db
		.collection('users')
		.doc(this.userId)
		.collection('items')
		.where('end', '>', 0);
	componentDidMount() {

    let query:Array<Item> = [];
		this.query
			.get()
			.then((doc: any) => {
				console.log(doc);
				doc.forEach((ele: any) => {
          console.log(ele.data());
          query.push(ele.data() as Item);
        });
        this.setState({itemArray: query})
			})
			.catch(function(error) {
				console.log('Error getting document:', error);
			});
  }
  
  showItemForm(){
    if(!this.state.isShown){
      console.log(this.state.isShown)
      this.setState({isShown: true})
    } else {
      this.setState({isShown: false})
    }
  }

  leftIconOnClick(){
    if(this.state.isShown){
      console.log(this.state.isShown)
      this.setState({isShown: false})
    }
  }
	render() {
		return (
			<>
      	<AppBar layout={this.state.isShown ?  'foo' : 'defalut'} leftIconOnClick={()=>this.leftIconOnClick()}/>
        <div id='item-dialog'
          style={this.state.isShown ? {display: 'unset'} : {display: 'none'}}>
          <ItemForm />
        </div>
				<div id='item-list'>{this.state.itemArray?.map((item:any)=>{
          return (
            <div key={item['title']}>
            <p>{item['title']}</p>
            <p>{item['note']}</p>
            <p>{item['start']}</p>
            </div>
          )
        })}
          <button className="fab-add" onClick={()=>this.showItemForm()}><i className="material-icons">add</i></button>
        </div>
				<div>
					<a onClick={() => firebase.auth().signOut()}>Sign-out</a>
				</div>
        
			</>
		);
	}
}

export default ItemList;
