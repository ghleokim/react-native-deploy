import React from 'react';
import { Routes } from './components/Routes';
import axios from 'axios';

const HTTPS_AWS = 'https://food-truck.shop/api'

axios.defaults.baseURL=HTTPS_AWS;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status && '/users/login' === error.response.config.url ) {
    alert('잘못된 로그인 정보입니다. 다시 시도해주십시오.')
    return Promise.reject(error)
  } else if (401 === error.response.status) {
    console.log(error.response)
    localStorage.clear();
    return Promise.reject(error);
  }
})

const App = () => {
  return (
    <Routes/>
  )
}

export default App;
