"use strict";
import axios from 'axios';

export const fetch_request_token = () => {
  return axios.get('/twitter/get-request-token')
      .then((response) => {
        console.log('TwitterApi');
        console.log(response);
        if(response.status === 200) {
          window.location = response.data;
        }
      }).catch((error) => {
        console.log(error);
      });
};