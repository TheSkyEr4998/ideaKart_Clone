import * as type from "./actionType";

export const userRegistrationPending = (payload) => ({
  type: type.USER_REGISTRATION_PENDING,
  payload,
});
export const userRegistrationReject = (payload) => ({
  type: type.USER_REGISTRATION_REJECT,
  payload,
});
export const userRegistrationSuccess = (payload) => ({
  type: type.USER_REGISTRATION_SUCCESS,
  payload,
});

export const userLoginPending = (payload) => ({
  type: type.USER_LOGIN_PENDING,
  payload,
});
export const userLoginReject = (payload) => ({
  type: type.USER_LOGIN_REJECT,
  payload,
});
export const userLoginSuccess = (payload) => ({
  type: type.USER_LOGIN_SUCCESS,
  payload,
});

export const dataShowPending = (payload) => ({
  type: type.DATA_SHOW_PENDING,
  payload,
});
export const dataShowReject = (payload) => ({
  type: type.DATA_SHOW_REJECT,
  payload,
});
export const dataShowSuccess = (payload) => ({
  type: type.DATA_SHOW_SUCCESS,
  payload,
});

export const contantFormPending = (payload) => ({
  type: type.CONTACT_FORM_PENDING,
  payload,
});
export const contantFormReject = (payload) => ({
  type: type.CONTACT_FORM_REJECT,
  payload,
});
export const contantFormSuccess = (payload) => ({
  type: type.CONTACT_FORM_SUCCESS,
  payload,
});

export const dataAddItemUpdateOurNot = (payload) => ({
  type: type.ADD_TO_CART_FUN_RUNER,
  payload,
});
export const navbarInputPart = (payload) => ({
  type: type.NAVBAR_INPUT_PART_VALUE,
  payload,
});
export const cartPaymentCart = (payload) => ({
  type: type.CART_PAYMENT_CART_PART,
  payload,
});
export const paymentPending = (payload) => ({
  type: type.PAYMENT_PENDING,
  payload,
});
export const paymentSuccess = (payload) => ({
  type: type.PAYMENT_SUCCESS,
  payload,
});
