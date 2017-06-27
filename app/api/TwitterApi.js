"use strict";
import axios from 'axios';

export const fetch_request_token = () => {
  return new Promise((resolve, reject) => {
      axios.get('/twitter/get-request-token')
        .then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
    });
};