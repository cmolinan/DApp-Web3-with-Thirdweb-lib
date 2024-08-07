import axios from "axios";

import { getAPIToken } from '../utils/AuthService';
import { getBackendURL } from '../utils/OtherServices';

//Get transfers or swaps Transactions
export const api_readTransfers = async (mode) => axios(
  {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${getBackendURL()}/dapp/txn/${mode}`,
    headers: {
      'Authorization': `Bearer ${getAPIToken()}`      
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw (error.response)
  });

//Save transfers or swaps Transactions
export const api_saveTransaction = async (mode, values) => axios(
  {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${getBackendURL()}/dapp/txn/${mode}`,
    headers: {
      'Authorization': `Bearer ${getAPIToken()}`
    },
    data:values
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw (error.response)
  });
