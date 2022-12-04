import React from 'react';
import EmojiBar from './components/EmojiBar';
import Wobble from './components/Wobble';
import './App.css';
import rand from './util/rand'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seen: [],
      iteration: rand(11)
    }

    for (const _ in props.data) {
      this.state.seen.push(false)
    }

    this.state = this.getNextState(this.state, props)
  }

  getState(state, props, index, show_all) {
    const data = { ...props.data[index] }
    data.value = { ...data.value }
    for (const i in data.value) {
      const value = { ...data.value[i] }
      value.show = show_all
      value.handle_click = () => {
        this.setState((state) => {
          const data = { ...state.data }
          data.value[i] = { ...data.value[i] }
          data.value[i].show = !data.value[i].show

          return { data: data }
        })
      }

      data.value[i] = value
    }

    const seen = [...state.seen]
    seen[index] = true

    return {
      data: data,
      current: index,
      seen: seen,
      iteration: state.iteration + 1
    }
  }

  getNextState(state, props) {
    const unseen_indices = []

    for (const i in state.seen) {
      if (!state.seen[i]) {
        unseen_indices.push(i)
      }
    }

    if (unseen_indices.length === 0) {
      const seen = []
      for (const _ in props.data) {
        seen.push(false)
      }

      const next_index = rand(props.data.length)

      return this.getState({...state, seen: seen}, props, next_index, false)
    } else {
      const next_index = unseen_indices[rand(unseen_indices.length)]

      return this.getState(state, props, next_index, false)
    }
  }

  render() {
    const show_all = () => {
      this.setState((state, props) => {
        return this.getState(state, props, state.current, true)
      })
    }

    const next = () => {
      this.setState(this.getNextState)
    }


    const background_x = (Math.sin(this.state.iteration / 2) + 1) * 50
    const background_y = (Math.cos(this.state.iteration / 2) + 1) * 50

    return (
      <div id="app" style={{backgroundPosition: `${background_x}% ${background_y}%` }}>
        <div id="emoji_bar">
          <EmojiBar index={this.state.current} value={this.state.data.value} />
        </div>

        <div className='small_button' id="show_all" onClick={show_all}><Wobble>👁️</Wobble></div>
        <div className='small_button' id="next" onClick={next}><Wobble>➡️</Wobble></div>
      </div>
    )
  }
}

export default App
