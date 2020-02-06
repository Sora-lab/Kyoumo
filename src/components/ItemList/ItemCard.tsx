import React, { Component } from 'react';

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
  render() {
    return (
      <div key={this.props.key} className="item-card primary" onClick={() => this.taggleShowMore()}>
        <div className="card-text-wrapper white">
          <div className="card-title">{this.props.item.title}</div>
          <div className="card-subtext">{this.props.item.start ? this.props.item.start : null} {this.props.item.end ? " - " + this.props.item.end : null}</div>
          <div style={this.more()}>{this.props.item.note}<div>Mark complete</div></div>
        </div>
      </div>
    )
  }
}