import React from 'react';
import EmojiBar from './components/EmojiBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getNextState({current: -1}, props)
  }

  getNextState(state, props) {
    const next_index = (state.current + 1) % props.data.length

    return {
      show_all: false,
      data: props.data[next_index],
      current: next_index
    }
  }

  render() {
    const show_all = () => {
      this.setState({
        show_all: true
      })
    }

    const next = () => {
      this.setState(this.getNextState)
    }

    return <div id="app">
      <EmojiBar show_all={this.state.show_all} value={this.state.data.value} />

      <div id="show_all" onClick={show_all}>👁️</div>
      <div id="next" onClick={next}>➡️</div>
    </div>
  }
}

export default App
