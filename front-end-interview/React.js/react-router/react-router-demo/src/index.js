import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './page/route3/router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
