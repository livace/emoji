import React from 'react';
import './EmojiSpan.css'
import FadeReplace from './FadeReplace';

class EmojiSpan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    if (this.props.show) {
      return (
        <FadeReplace animationKey='0'>
          <span className='emoji' onClick={this.props.handle_click}>
            {this.props.text}
          </span>
        </FadeReplace>
      )
  } else {
      return (
        <FadeReplace animationKey='1'>
          <span className='emoji' onClick={this.props.handle_click}>
            {this.props.emoji}
          </span>
        </FadeReplace>
      )
    }
  }
}

export default EmojiSpan
