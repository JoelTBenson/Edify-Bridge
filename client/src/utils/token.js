/**
 * storing token functions here for now, may move to actions later
 */

 import decode from 'jwt-decode';

 export const expiredToken = (token) => {
     return decode(token).exp < (Date.now() / 1000);     
 }
 
 export const getToken = () => {
     return localStorage.getItem('edify_bridge_token');
 }
 
 export const saveToken = (token) => {
     return localStorage.setItem('edify_bridge_token', token);
 }
 
 export const removeToken = () => {
     return localStorage.removeItem('edify_bridge_token');
 }