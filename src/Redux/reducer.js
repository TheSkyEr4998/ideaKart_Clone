import * as actionType from "./actionType";

const initState = {
  registrationPending: false,
  registrationReject: false,
  registrationSuccess: false,
  loginPending: false,
  loginReject: false,
  loginSuccess: false,
  dataStatusPending: false,
  dataStatusReject: false,
  dataStatusSuccess: false,
  contactFormStatusPending: false,
  contactFormStatusReject: false,
  contactFormStatusSuccess: false,
  addItemUpdateOurNot: false,
  navbarInputPartValue: "",
  cartPaymentCartData: {},
  paymentStatusSuccess: false,
  paymentStatusPending: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    // REGISTRATION PART
    case actionType.USER_REGISTRATION_PENDING:
      return { ...state, registrationPending: true };

    case actionType.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        registrationPending: false,
      };

    case actionType.USER_REGISTRATION_REJECT:
      return { ...state, registrationPending: false, registrationReject: true };

    // LOGIN PART
    case actionType.USER_LOGIN_PENDING:
      return { ...state, loginPending: true };
    case actionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: payload,
        loginPending: false,
      };
    case actionType.USER_LOGIN_REJECT:
      return { ...state, loginPending: false, loginReject: true };

    // LOGIN PART
    case actionType.DATA_SHOW_PENDING:
      return { ...state, dataStatusPending: true };
    case actionType.DATA_SHOW_SUCCESS:
      return {
        ...state,
        dataStatusSuccess: true,
        dataStatusPending: false,
      };
    case actionType.DATA_SHOW_REJECT:
      return { ...state, dataStatusPending: false, dataStatusReject: true };

    case actionType.CONTACT_FORM_PENDING:
      return { ...state, contactFormStatusPending: true };
    case actionType.CONTACT_FORM_SUCCESS:
      return {
        ...state,
        contactFormStatusSuccess: true,
        contactFormStatusPending: false,
      };

    case actionType.PAYMENT_PENDING:
      return { ...state, paymentStatusPending: true };
    case actionType.PAYMENT_SUCCESS:
      return {
        ...state,
        paymentStatusSuccess: true,
        paymentStatusPending: false,
      };
    case actionType.CONTACT_FORM_REJECT:
      return {
        ...state,
        contactFormStatusPending: false,
        contactFormStatusReject: true,
      };

    case actionType.ADD_TO_CART_FUN_RUNER:
      return { ...state, addItemUpdateOurNot: payload };

    case actionType.NAVBAR_INPUT_PART_VALUE:
      return { ...state, navbarInputPartValue: payload };

    case actionType.CART_PAYMENT_CART_PART:
      return { ...state, cartPaymentCartData: payload };

    default:
      return state;
  }
};
