import axios from 'axios';

export function getHello() {
    axios.get('http://70.12.247.106:8001/hello')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }