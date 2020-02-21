import React, { Component } from 'react';

// firebase
import firebase from 'firebase';
import 'firebase/firestore';

// components 
import { ItemCard } from './ItemCard';

// interface
import {Item} from '../../models/ToDoItem';

interface State {
  itemArray: Array<Item> | undefined;
  todayItems: Array<Item> | undefined;
  isLoading: boolean;
}

interface Props {
  itemObj: {
    itemArray: Array<Item> | undefined,
    todayItems: Array<Item> | undefined,
  }
  isLoading: boolean;
}

class ItemList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemArray: this.props.itemObj?.itemArray || undefined,
      todayItems: this.props.itemObj?.todayItems || undefined,
      isLoading: false,
    }
  }

  componentDidMount() {
    console.log("ItemList componentDidMount")
  }
  componentDidUpdate(prevProps: any) {
    console.log("ItemList componentDidUpdate")
  }
  componentWillMount() {
    console.log("ItemList componentWillMount")
  }

  render() {
    if (this.props.isLoading) {
      return (
        <>
          <p>loading....</p>
          <div style={{ marginTop: '50px' }}>
            {/* TODO: make this much smaller!! */}
            <div className='bounce-6 bounce-ball'></div>
          </div>
        </>)
    } else {
      return (
        <>
          <div id='item-list'>{
            this.props.itemObj.itemArray?.map((item: any, index) => {
              return (
                <ItemCard key={index} item={item} />
              )
            })}
          </div>
          <div
            style={{
              borderTop: '1px solid #f0ede8',
              borderBottom: '1px solid #f0ede8',
              textAlign: 'center', padding: '0.5rem'
            }}
          >
            Today
          </div>
          <div id='item-list'>
            {this.props.itemObj.todayItems?.map((item: any, index) => {
              return (
                <ItemCard key={index} item={item} />
              )
            })}
          </div>
        </>
      );
    }
  }
}

export default ItemList;
