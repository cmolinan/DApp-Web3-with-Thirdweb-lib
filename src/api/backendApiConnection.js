"use client"
import axios from "axios";

import { getToken } from '../utils/AuthService';
import { getBackendURL } from '../utils/OtherServices';

//Login using user/password
const api_login = async (user, password) => axios(
  {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${getBackendURL()}/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "email": user,
      "password": password
    }
  }
)
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw(error)
  });

  //Login using user/password
const api_logout = async () => axios(
  {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${getBackendURL()}/auth/signout`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw(error)
  });

const api_getByEmail = async (email) => axios(
  {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${getBackendURL()}/user/email/${email}`,
    headers: {
    'Authorization': `Bearer ${getToken()}`
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw(error)
  });


export { api_login, api_logout, api_getByEmail };
