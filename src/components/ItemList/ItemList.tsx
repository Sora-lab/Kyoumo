import React, { Component } from 'react';

// firebase
import firebase from 'firebase';
import 'firebase/firestore';

// components 
import { ItemCard } from './ItemCard';

// interface
import { Item } from '../../models/ToDoItem';

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
  
  today = new Date();
  todayDate = this.today.getDate();
  tomorrow = this.today.setDate(this.todayDate + 1);
  tomorrowDate = this.today.getDate()

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
          <div className='item-list'>
            <div className='item-list-col-date'>
              <span>No Dates</span>
            </div>
            <div className='item-list-col-items'>
              {this.props.itemObj.itemArray?.map((item: any, index) => {
                return (
                  <ItemCard key={index} item={item} />
                )
              })}
            </div>
          </div>
          <div className='item-list'>
          <div className='item-list-col-date'>
            <span>{this.todayDate}</span>
          </div>
          <div className='item-list-col-items'>
            {this.props.itemObj.todayItems?.map((item: any, index) => {
              return (
                <ItemCard key={index} item={item} />
              )
            })}
          </div>
          </div>
          <div className='item-list'>
          <div className='item-list-col-date'>
            <span>{this.tomorrowDate}</span>
          </div>
          <div className='item-list-col-items'>
            {this.props.itemObj.todayItems?.map((item: any, index) => {
              return (
                <ItemCard key={index} item={item} />
              )
            })}
          </div>
          </div>
        </>
      );
    }
  }
}

export default ItemList;
