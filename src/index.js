import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import loadData from './Data';

ReactDOM.render(<App data={loadData()} />, document.getElementById('root'));
