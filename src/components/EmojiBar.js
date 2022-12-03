import React from 'react';
import EmojiSpan from './EmojiSpan';

function EmojiBar(props) {
  let spans = []

  for (const i in props.value) {
    const value = props.value[i]
    spans.push(<EmojiSpan key={i} show={props.show_all} emoji={value.emoji} text={value.text} />)
  }

  return <div>{spans}</div>
}

export default EmojiBar
