import React, { Component } from 'react';

// interface
import { Item } from '../../models/ToDoItem';

interface Props { }

interface State {
  itemData: Item;
  startString?: string | undefined;
  endString?: string | undefined;
}
export class AddForm extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      // don't need this structure but keeping it until editForm is finalized
      // hoping this will be editForm as well
      itemData:
      {
        title: 'New task / event / reminder / routine',
        start: null,
        end: null
      },
      startString: undefined,
      endString: undefined
    }
  }

  toDateInputString(dateDateType?: Date):string {
    const newDate = dateDateType ? dateDateType : new Date()
    return newDate.toISOString().substr(0,10)
  }

  componentDidMount() {
    console.log("addForm componentDidMount")
    this.setState({
      startString: this.toDateInputString(),
      endString: this.toDateInputString()
    })
  }
  componentDidUpdate(prevProps: any) {
    console.log("addForm componentDidUpdate")
  }
  componentWillMount() {
    console.log("addForm componentWillMount")
  }
  /**
   * set state triggered by date input select 
   * @param value input value 
   * @param text either start or end
   */
  handleDateOnSelect(value: any, text: string) {
    // console.log(value.target.value)
    let inputValue = value.target.value === '' ? null : value.target.value;
    // this is how to make it not "read only"
    let addFormState = {...this.state}
    if(text === 'start') {
      addFormState.itemData.start = Date.parse(inputValue);
      addFormState.startString = value.target.value;
    } else if (text === 'end'){
      addFormState.itemData.end = Date.parse(inputValue);
      addFormState.endString = value.target.value;
    }
    this.setState({
      itemData: addFormState.itemData,  
      startString: addFormState.startString,
      endString: addFormState.endString
    })
    // console.log("itemData", addFormState)
  }

  render() {
    return (
      <div className="form-dialog vh-100">
        <form name="itemform">
          <input type="text" id="title" name="title"
            style={{ height: '2rem', padding: '0.5rem', width: '80%', borderBottom: '1px solid #90bdc2' }}
            required minLength={4}
            placeholder={this.state.itemData.title}
            autoComplete="off"
          />
          <div style={{ padding: '1rem' }}>
            <label htmlFor="start">Start:</label>
            <input type="date" id="start" name="start"
              value={this.state.startString}
              //value="1980-08-26"
              min="2018-01-01" max="2200-12-31"
              onChange={(e) => this.handleDateOnSelect(e, 'start')}
            />
          </div>
          <div style={{ padding: '1rem' }}>
            <label htmlFor="start">End:</label>
            <input type="date" id="start" name="end"
              value={this.state.endString}
              min="2018-01-01" max="2200-12-31"
              onChange={(e) => this.handleDateOnSelect(e, 'end')}
            />
          </div>
        </form>
      </div>
    )
  }
}


