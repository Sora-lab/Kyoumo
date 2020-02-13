import React, { Component } from 'react';

// components 
import { IconButton, ActionButton } from '../Buttons/Buttons';

interface State {
  showMore: boolean;
}

export class ItemCard extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      showMore: false,
    }
  }

  taggleShowMore() {
    if (this.state.showMore === false) {
      this.setState({ showMore: true })
    } else {
      this.setState({ showMore: false })
    }
  }
  more(): React.CSSProperties {
    if (this.state.showMore === false) {
      return { display: "none" };
    } else {
      return { display: "unset" };
    }
  }

  markComplete() {
    console.log("congrats! you're done with this item")
  }
  edit(){
    console.log("are you read to edit?")
  }

  floatRight: React.CSSProperties = { float: 'right' };

  render() {
    return (
      <div key={this.props.key} className="item-card" onClick={() => this.taggleShowMore()}>
        <div className="card-text-wrapper">
          <div className="card-title">
            {this.props.item.title}
            <IconButton inconName='create' colorClass='primary-font' style={this.floatRight} onClick={this.edit.bind(this)}/> 
          </div>
          <div className="card-subtext">{this.props.item.start ? this.props.item.start : null} {this.props.item.end ? ' - ' + this.props.item.end : null}</div>
          <div className="card-more" style={this.more()}>{this.props.item.note}
            <ActionButton text='Mark complete' style={this.floatRight} colorClass='black-font' onClick={this.markComplete.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}