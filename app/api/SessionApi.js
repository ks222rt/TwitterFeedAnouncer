"use strict";
import axios from 'axios';

export const is_session_set = () => {
  return axios.get('/check/valid/session')
    .then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
};

