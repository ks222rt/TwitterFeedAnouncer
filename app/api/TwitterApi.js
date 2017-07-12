"use strict";
import axios from 'axios';

export const fetch_request_token = () => {
  return axios.get('/twitter/get-request-token')
      .then((response) => {
        if(response.status === 200) {
          window.location = response.data;
        }
      }).catch((error) => {
        return error;
      });
};

export const fetch_home_timeline = () => {
  return axios.get('/twitter/get-user-homeline')
      .then((response) => {
        console.log(response);
        return response;
      }).catch((error) => {
        return response;
      });
};