import React from 'react';
import './EmojiSpan.css'

class EmojiSpan extends React.Component {
  render() {
    return (
      <div className='emoji-container'>
        <div className={`text ${(!this.props.show && 'hide') || ''}`}>
          {this.props.text}&nbsp;
        </div>
        <div className='emoji' onClick={this.props.handle_click}>
          {this.props.emoji}&nbsp;
        </div>
      </div>
    )
  }
}

export default EmojiSpan
