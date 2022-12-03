import React from 'react';
import EmojiBar from './components/EmojiBar';
import Wobble from './components/Wobble';
import './App.css';
import rand from './util/rand'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {seen: []}
    for (const i in props.data) {
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
      seen: seen
    }
  }

  getNextState(state, props) {
    const unseen_indices = []

    console.log(state)

    for (const i in state.seen) {
      if (!state.seen[i]) {
        unseen_indices.push(i)
      }
    }

    console.log(unseen_indices)

    if (unseen_indices.length === 0) {
      return {
        finished: true
      }
    }

    const next_index = unseen_indices[rand(unseen_indices.length)]

    console.log(next_index)

    return this.getState(state, props, next_index, false)
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

    if (this.state.finished) {
      return (
        <div id="app">
          <div id="emoji_bar">
            Congratulations! All done!
          </div>
        </div>
      )
    }

    return <div id="app">
      <div id="emoji_bar">
        <EmojiBar index={this.state.current} value={this.state.data.value} />
      </div>

      <div className='small_button' id="show_all" onClick={show_all}><Wobble>👁️</Wobble></div>
      <div className='small_button' id="next" onClick={next}><Wobble>➡️</Wobble></div>
    </div>
  }
}

export default App
