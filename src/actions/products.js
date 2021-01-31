import axios from 'axios';
//import { SERVER_URL, API_SECRET  } from '../config';
import { PRODUCTS_RES, PRODUCTS_GET_PRODUCTS, PRODUCTS_GET_PAGES, PRODUCTS_CHANGE_PRODUCT, PRODUCTS_SAVE_PRODUCT, PRODUCTS_SET_PRODUCT, PRODUCTS_DELETE_PRODUCT, CONFIG_GET_CONFIG } from './types';

import { getPrefixUrl } from '../helpers/pages';
const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);



// export const getConfig = (callback) => async dispatch => {
//   const token = localStorage.getItem('token');
//
//   try {
//     const response = await axios.get(
//       prefixUrl+'/config?token='+token
//     );
//     dispatch({ type: CONFIG_GET_CONFIG, payload: response.data.data });
//     callback(response.data.data);
//
//   } catch(e){
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get config"} });
//   }
// };
//
// export const changePosition = (direction, itemId, menusOrPagesOrImg, callback) => async dispatch => {
//   const token = localStorage.getItem('token');
//   try{
//     const response = await axios.get(
//       prefixUrl+'/'+menusOrPagesOrImg+'/position/'+direction+'/'+itemId+'?token='+token
//     );
//
//     if(!response.data.success){
//       dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Problem with change position "+menusOrPagesOrImg} });
//     }else{
//       dispatch({ type: PRODUCTS_RES, payload: {success: true, message: "Data was saved"} });
//       callback();
//     }
//
//
//   } catch(e){
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while change "+menusOrPagesOrImg+" position"} });
//   }
// }
//
// export const delImage = (imageId, callback) => async dispatch => {
//   const token = localStorage.getItem('token');
//
//   try{
//     const response = await axios.delete(
//       prefixUrl+'/images/'+imageId+'?token='+token
//     );
//
//     if(!response.data.success){
//       dispatch({ type: PRODUCTS_RES, payload: {success: false, message: response.data.error} });
//     }else{
//       dispatch({ type: PRODUCTS_RES, payload: {success: true, message: "Data was saved"} });
//       callback();
//     }
//
//
//   } catch(e){
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing image"} });
//   }
// }
//
//
//
// export const getShopPages = () => async dispatch => {
//   const token = localStorage.getItem('token');
//
//   try {
//     const response = await axios.get(
//       prefixUrl+'/pages/type/shop?token='+token
//     );
//     dispatch({ type: PRODUCTS_GET_PAGES, payload: response.data.data });
//     //callback();
//
//   } catch(e){
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get pages for products"} });
//   }
// };
//
//
//
// export const saveProduct = (product, callback) => async  dispatch => {
//
//   const token = localStorage.getItem('token');
//
//   try {
//     let response = null;
//     if( product.id ){
//       response = await axios.put(
//         prefixUrl+'/products/'+product.id+'?token='+token,
//         product
//       );
//     }else{
//       response = await axios.post(
//         prefixUrl+'/products?token='+token,
//         product
//       );
//     }
//
//     if(!response.data.success){
//       dispatch({ type: PRODUCTS_RES, payload: {success: false, message: response.data.error} });
//     }else{
//       const productId = product.id ? product.id : response.data.data.productId; //update
//       dispatch({ type: PRODUCTS_RES, payload: {success: true, message: "Data was saved"} });
//       dispatch({ type: PRODUCTS_SAVE_PRODUCT, payload: product });
//       callback(productId);
//     }
//
//   } catch (e) {
//      console.log('___probem with ajax______', e);
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while save page"} });
//   }
// };
//
//
// export const deleteProduct = (productId) =>  async dispatch => {
//
//   const token = localStorage.getItem('token');
//
//   try{
//     const response = await axios.delete(
//       prefixUrl+'/products/'+productId+'?token='+token
//     );
//
//     if(!response.data.success){
//       dispatch({ type: PRODUCTS_RES, payload: {success: false, message: response.data.error} });
//     }else{
//       dispatch({ type: PRODUCTS_RES, payload: {success: true, message: "Data was saved"} });
//     }
//
//     dispatch({ type: PRODUCTS_DELETE_PRODUCT, payload: productId });
//   } catch(e){
//      dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing product"} });
//   }
// }
//
// //not used - to del - use only changeProduct
// export const setProduct = (product) => dispatch => {
//   dispatch({ type: PRODUCTS_SET_PRODUCT, payload: product });
// };
//
//
// export const changeProduct = (product) => dispatch => {
//   dispatch({ type: PRODUCTS_CHANGE_PRODUCT, payload: product });
// };
