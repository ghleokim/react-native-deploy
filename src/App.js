import React from 'react';
import { Routes } from './components/Routes';
import axios from 'axios';

const HTTPS_AWS = 'https://food-truck.shop/api'

axios.defaults.baseURL=HTTPS_AWS;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes/>
  )
}

export default App;
