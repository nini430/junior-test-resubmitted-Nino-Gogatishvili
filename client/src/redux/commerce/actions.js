import { actionTypes } from "./actionTypes";

export const setCurrencySymbol = (payload) => ({
  type: actionTypes.SET_CURRENCY_SYMBOL,
  payload,
});
export const setAttrsFromCategory = (payload) => ({
  type: actionTypes.SET_ATTRS_FROM_CATEGORY,
  payload,
});
export const setSelectedAttrs = (payload) => ({
  type: actionTypes.SET_SELECTED_ATTRS,
  payload,
});
export const setCategoryProducts = (payload) => ({
  type: actionTypes.SET_CATEGORY_PRODUCTS,
  payload,
});
export const setMainCategory = (payload) => ({
  type: actionTypes.SET_MAIN_CATEGORY,
  payload,
});
export const addToCart = (payload) => ({
  type: actionTypes.ADD_TO_CART,
  payload,
});
export const toggleCartOverlay = (payload) => ({
  type: actionTypes.TOGGLE_CART_OVERLAY,
  payload,
});
export const setModalProduct = (payload) => ({
  type: actionTypes.SET_MODAL_PRODUCT,
  payload,
});
export const closeModal = () => ({ type: actionTypes.CLOSE_MODAL });
export const incrementItem = (payload) => ({
  type: actionTypes.INCREMENT_ITEM,
  payload,
});
export const decrementItem = (payload) => ({
  type: actionTypes.DECREMENT_ITEM,
  payload,
});
