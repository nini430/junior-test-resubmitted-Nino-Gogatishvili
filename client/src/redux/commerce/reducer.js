import { actionTypes } from "./actionTypes";

const initialState = {
  currentCurrencySymbol:
    JSON.parse(localStorage.getItem("currentSymbol")) || "",
  allAttrsFromCategory: [],
  selectedAttrs: JSON.parse(localStorage.getItem("selectedAttributes")) || {},
  categoryProducts: JSON.parse(localStorage.getItem("categoryProducts")),
  mainCategory: "",
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isOverlayOpen: false,
  isModalOpen: false,
  modalProduct: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENCY_SYMBOL:
      localStorage.setItem("currentSymbol", JSON.stringify(action.payload));
      return {
        ...state,
        currentCurrencySymbol: action.payload,
      };
    case actionTypes.SET_ATTRS_FROM_CATEGORY:
      return {
        ...state,
        allAttrsFromCategory: action.payload,
      };
    case actionTypes.SET_SELECTED_ATTRS:
      return {
        ...state,
        selectedAttrs: action.payload,
      };
    case actionTypes.SET_CATEGORY_PRODUCTS:
      return { ...state, categoryProducts: action.payload };
    case actionTypes.SET_MAIN_CATEGORY:
      return { ...state, mainCategory: action.payload };
    case actionTypes.ADD_TO_CART:
      let updatedCart;
      const productFound = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (productFound) {
        updatedCart = state.cart.map((item) => {
          if (item.id === productFound.id) {
            item = { ...item, quantity: item.quantity + 1 };
            return item;
          } else {
            return item;
          }
        });
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    case actionTypes.TOGGLE_CART_OVERLAY:
      return {
        ...state,
        isOverlayOpen: action.payload ? action.payload : !state.isOverlayOpen,
      };
    case actionTypes.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case actionTypes.SET_MODAL_PRODUCT:
      return { ...state, isModalOpen: true, modalProduct: action.payload };
    case actionTypes.INCREMENT_ITEM:
      const productToBeIncremented = state.cart.find(
        (item) => item.id === action.payload.id
      );
      const updatedInc = state.cart.map((item) => {
        if (item.id === productToBeIncremented.id) {
          item = { ...item, quantity: item.quantity + 1 };
          return item;
        } else {
          return item;
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedInc));

      return { ...state, cart: updatedInc };

    case actionTypes.DECREMENT_ITEM:
      let updatedDec;
      const productToBeDecremented = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (productToBeDecremented.quantity === 1) {
        updatedDec = state.cart.filter(
          (item) => item.id !== productToBeDecremented.id
        );
      } else {
        updatedDec = state.cart.map((item) => {
          if (item.id === productToBeDecremented.id) {
            item = { ...item, quantity: item.quantity - 1 };
            return item;
          } else {
            return item;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(updatedDec));

      return { ...state, cart: updatedDec };

    default:
      return state;
  }
};

export default reducer;
