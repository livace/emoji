import React from 'react';
import EmojiSpan from './EmojiSpan';
import Favicon from 'react-favicon'
import FadeReplace from './FadeReplace';

class EmojiBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)

    let spans = []

    for (const i in this.props.value) {
      const value = this.props.value[i]
      spans.push(<EmojiSpan key={2 * i} show={value.show} handle_click={value.handle_click} emoji={value.emoji} text={value.text} />)
      spans.push(<span key={2 * i + 1}> </span>)
    }

    return (
      <FadeReplace animationKey={this.props.index}>
        <Favicon url={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.props.value[0].emoji}</text></svg>`} />
        {spans}
      </FadeReplace>
    )
  }
}

export default EmojiBar
