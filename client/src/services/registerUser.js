import http from'./httpService';
import {apiUrl } from '../config.json';

const endpoint = apiUrl+"users" ;
export function saveUser(credential)
{
    return http.post(endpoint,credential);
}