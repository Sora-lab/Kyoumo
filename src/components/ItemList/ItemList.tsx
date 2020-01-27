import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import {Item} from '../../API/query';

interface State {
  itemArray: Array<Item> | undefined;
}

class ItemList extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
      itemArray: undefined
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
	render() {
		return (
			<div>
				<div>{this.state.itemArray?.map((item:any)=>{
          return (
            <>
            <p>{item['title']}</p>
            <p>{item['note']}</p>
            <p>{item['start']}</p>
            </>
          )
        })}</div>
				<div>
					<a onClick={() => firebase.auth().signOut()}>Sign-out</a>
				</div>
			</div>
		);
	}
}

export default ItemList;
