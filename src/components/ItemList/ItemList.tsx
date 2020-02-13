import React, { Component } from 'react';

// firebase
import firebase from 'firebase';
import 'firebase/firestore';

// components 
import { ItemCard } from './ItemCard';


export interface Item {
  title: string;
  type?: string;
  start?: number;
  end?: number;
  note?: string;
}
interface State {
  itemArray: Array<Item> | undefined;
  isLoading: boolean;
}
interface Props {
  itemArray: Array<Item> | undefined;
  isLoading: boolean;
}

class ItemList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemArray: this.props.itemArray || undefined,
      isLoading: false,
    }
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
        <div id='item-list'>{this.props.itemArray?.map((item: any, index) => {
          return (
            <ItemCard key={index} item={item} />
          )
        })}
        </div>
      );
    }
  }
}

export default ItemList;
