import http from'./httpService';
import {apiUrl } from '../config.json';

const endpoint = apiUrl+"auth" ;

export function login(email,password)
{
   return http.post(endpoint,{email,password});
}