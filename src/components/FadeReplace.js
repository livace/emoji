import React from 'react'

import './FadeReplace.css'

class FadeReplace extends React.Component {
  static action_fade_out = 'fade-out'
  static action_fade_in = 'fade-in'

  constructor(props) {
    super(props);

    this.state = {
      children: props.children,
      animationKey: props.animationKey,
      action: FadeReplace.action_fade_in
    }
  }

  render() {
    if (this.state.action === FadeReplace.action_fade_in) {
      return (
        <div className='animation-container'
          action='fade-in'
        >
          {this.state.children}
        </div>
      )
    } else {
      return (
        <div
          action='fade-out'
          className='animation-container'
          onAnimationEnd={() => { this.onFadeOutEnd() }}
        >
          {this.state.children}
        </div>
      )
    }
  }

  onFadeOutEnd() {
    this.setState((state, props) => {
      return {
        children: props.children,
        action: FadeReplace.action_fade_in,
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.animationKey !== state.animationKey) {
      return {
        ...state,
        animationKey: props.animationKey,
        action: FadeReplace.action_fade_out
      }
    }

    return {
      ...state,
      children: props.children
    }
  }
}

export default FadeReplace

