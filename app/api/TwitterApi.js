"use strict";
import axios from 'axios';

export const fetch_request_token = () => {
  return axios.get('/twitter/get-request-token')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
};