import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tablero from './Tablero';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Tablero count={50}/>, document.getElementById('root'));
registerServiceWorker();
