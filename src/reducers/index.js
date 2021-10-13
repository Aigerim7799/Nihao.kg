import { combineReducers, CombineReducers } from "redux";
import catalog from "./catalog";
import subCatalog from "./subCatalog";
import items from "./items";
import secondSubCatalog from "./secondSubCatalog";
import thirdSubCatalog from "./thirdSubCatalog";
import fourthSubCatalog from "./fourthSubCatalog";
import getBasket from "./getBasket";
import getNote from "./getNote";
import clearBorN from "./clearBorN";
import removeItemFromBorN from "./removeItemFromBorN";
import alibabaCatalog from "./alibabaCatalog";

import createOrder from './createOrder'


const rootReducer = combineReducers({
  catalog,
  subCatalog,
  secondSubCatalog,
  thirdSubCatalog,
  fourthSubCatalog,
  getBasket,
  getNote,
  items,
  clearBorN,
  removeItemFromBorN,
  alibabaCatalog,

  createOrder,

});
export default rootReducer;
