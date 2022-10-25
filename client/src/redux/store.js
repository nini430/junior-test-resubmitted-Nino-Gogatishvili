import { createStore, compose } from "redux";
import reducer from "./commerce/reducer";

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, withDevTools());

export default store;
