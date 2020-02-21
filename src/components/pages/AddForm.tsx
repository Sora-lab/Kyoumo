import React, { Component } from 'react';

// interface
import { Item } from '../../models/ToDoItem';

interface Props { }

interface State {
  itemData: Item;
}
export class AddForm extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemData:
      {
        title: 'New task / event / reminder / routine',
        start: null,
        end: null
      }
    }
  }

  today = new Date()
  todayYear = this.today.getFullYear();
  todayMonth = this.today.getMonth() < 10 ? '0' + this.today.getMonth() : this.today.getMonth();
  todayDate = this.today.getDate() < 10 ? '0' + this.today.getDate() : this.today.getDate();
  todayString = this.todayYear.toString()
    + '-' + this.todayMonth.toString() + '-' + this.todayDate.toString();

  dateString(date: number) {
    const today = new Date()
    const todayYear = this.today.getFullYear();
    const todayMonth = this.today.getMonth() < 10 ?
      '0' + this.today.getMonth() : this.today.getMonth();
    const todayDate = this.today.getDate() < 10 ?
      '0' + this.today.getDate() : this.today.getDate();
    return this.todayYear.toString()
      + '-' + this.todayMonth.toString() + '-' + this.todayDate.toString();
  }

  componentDidMount() {
    console.log("addForm componentDidMount")
  }
  componentDidUpdate(prevProps: any) {
    console.log("addForm componentDidUpdate")
  }
  componentWillMount() {
    console.log("addForm componentWillMount")
  }

  handleDateOnSelect(value: any) {
    console.log(value.target.value)
    let state = { ...this.state.itemData };
    state.start = Date.parse(value.target.value);
    this.setState({ itemData: state })
  }
  render() {
    return (
      <div className="form-dialog vh-100">
        <form name="itemform">
          <input type="text" id="title" name="title"
            style={{ height: '2rem', padding: '0.5rem', width: '80%', borderBottom: '1px solid #90bdc2' }}
            required minLength={4}
            placeholder={this.state.itemData.title}
          />
          <div style={{ padding: '1rem' }}>
            <label htmlFor="start">Start:</label>
            <input type="date" id="start" name="trip-start"
              value={this.todayString}
              min="2018-01-01" max="2200-12-31"
              onChange={(e) => this.handleDateOnSelect(e)}
            />
          </div>
        </form>
      </div>
    )
  }
}


