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
      iteration: 0,
      states: [],
    }

    for (const _ in props.data) {
      this.state.seen.push(false)
    }

    this.state = this.getNewState(this.state, props)
  }

  getState(props, index, show_all) {
    const data = { ...props.data[index] }
    data.value = { ...data.value }
    for (const i in data.value) {
      const value = { ...data.value[i] }
      value.show = value.show || show_all
      value.handle_click = () => {
        this.updateCurrentState((state) => {
          const data = { ...state.data }
          data.value[i] = { ...data.value[i] }
          data.value[i].show = !data.value[i].show

          return { data: data }
        })
      }

      data.value[i] = value
    }

    return {
      data: data,
      current: index
    }
  }

  selectUnseen(seen) {
    const unseen_indices = []

    for (const i in seen) {
      if (!seen[i]) {
        unseen_indices.push(i)
      }
    }

    if (unseen_indices.length === 0) {
      return NaN;
    } else {
      return unseen_indices[rand(unseen_indices.length)]
    }
  }

  updateCurrentState(fn) {
    this.setState((state, props) => {
      const all_states = [ ...state.states ]

      all_states[state.iteration] = {
        ...all_states[state.iteration],
        ...fn(all_states[state.iteration], props)
      }

      return {
        states: all_states
      }
    })
  }

  getNewState(state, props) {
    const all_states = [ ...state.states ]

    const seen = [ ...state.seen ]
    let next_index = this.selectUnseen(seen)
    if (next_index === NaN) {
      seen = seen.map(() => { return false })
      next_index = this.selectUnseen(seen)
    }
    seen[next_index] = true

    all_states.push(this.getState(props, next_index, false))

    return {
      iteration: all_states.length - 1,
      states: all_states,
      seen: seen
    }
  }

  pushNewState() {
    this.setState(this.getNewState)
  }

  updateIteration(diff) {
    this.setState((state) => {
      const new_iteration = state.iteration + diff

      if (new_iteration < 0) {
        return;
      } else if (new_iteration === state.states.length) {
        this.pushNewState()
      } else {
        this.setState({
          iteration: new_iteration
        })
      }
    })
  }

  render() {
    const show_all = () => {
      this.updateCurrentState((state, props) => {
        return this.getState(props, state.current, true)
      })
    }

    const next = () => {
      this.updateIteration(1)
    }

    const back = () => {
      this.updateIteration(-1)
    }

    const offset = rand(100)

    const background_x = (Math.sin(offset + this.state.iteration / 2) + 1) * 50
    const background_y = (Math.cos(offset + this.state.iteration / 2) + 1) * 50

    const state = this.state.states[this.state.iteration]

    return (
      <div id="app" style={{backgroundPosition: `${background_x}% ${background_y}%` }}>
        <div id="emoji_bar">
          <EmojiBar index={state.current} value={state.data.value} />
        </div>

        <Wobble><div className='small_button' id="back" onClick={back}>⬅️</div></Wobble>
        <Wobble><div className='small_button' id="show_all" onClick={show_all}>👁️</div></Wobble>
        <Wobble><div className='small_button' id="next" onClick={next}>➡️</div></Wobble>
      </div>
    )
  }
}

export default App
