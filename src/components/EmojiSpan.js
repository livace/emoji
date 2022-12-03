import React from 'react';

class EmojiSpan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_emoji: true
    };
  }

  render() {
    const self = this

    const switch_display = () => {
      self.setState((state, props) => {
        return {
          is_emoji: !state.is_emoji
        }
      })
    }

    if (!this.props.show && this.state.is_emoji) {
      return <span onClick={switch_display}>
        {self.props.emoji}
      </span>
    } else {
      return (<span>
          <span> </span>
          <span onClick={switch_display}>
            {self.props.text}
          </span>
        </span>
      )
    }
  }
}

export default EmojiSpan
