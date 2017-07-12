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

export const logout_and_unset_session = () => {
  return axios.get('/logout/unset/session')
    .then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
};
