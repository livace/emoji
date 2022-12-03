import React from 'react';

class EmojiSpan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    if (this.props.show) {
      return (
        <span onClick={this.props.handle_click}>
          {this.props.text}
        </span>
      )
  } else {
      return (
        <span onClick={this.props.handle_click}>
          {this.props.emoji}
        </span>
      )
    }
  }
}

export default EmojiSpan
