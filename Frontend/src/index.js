import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import reportWebVitals from './reportWebVitals';
import './i18n.js';
import './index.css';
import App from './App';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap');
</style>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
