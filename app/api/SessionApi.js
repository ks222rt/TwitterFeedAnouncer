"use strict";
import axios from 'axios';

export const is_session_set = () => {
  return axios.get('/check/valid/session')
    .then((res) => {
      console.log(res.data);
      return res.data;
    }).catch((err) => {
      return err;
    });
}