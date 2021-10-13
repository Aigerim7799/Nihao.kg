import axios from 'axios'
import { API_GET_CATALOG, API_GET_SUB_CATALOG, API_GET_ITEMS, API_GET_BASKET, API_GET_NOTE, SEARCH_SECOND } from '../config'
export const GET_CATALOG = 'GET_CATALOG'
export const GET_CATALOG_ALIBABA = 'GET_CATALOG_ALIBABA'
export const GET_SUB_CATALOG = 'GET_SUB_CATALOG'
export const GET_SECOND_SUB_CATALOG = 'GET_SECOND_SUB_CATALOG'
export const GET_THIRD_SUB_CATALOG = 'GET_THIRD_SUB_CATALOG'
export const GET_FOURTH_SUB_CATALOG = 'GET_FOURTH_SUB_CATALOG'
export const GET_ITEMS = 'GET_ITEMS'
export const GET_BASKET = 'GET_BASKET'
export const GET_NOTE = 'GET_NOTE'
export const CLEAR_BASKET_OR_NOTE = 'CLEAR_BASKET_OR_NOTE'
export const REMOVE_ITEM_FROM_B_OR_N = 'REMOVE_ITEM_FROM_B_OR_N'
export const CREATE_ORDER = 'CREATE_ORDER'

export const fetchCatalog = async () => {
    const req = await axios.get(API_GET_CATALOG)

    return {
        type: GET_CATALOG,
        payload: req
    }
}
export const fetchCatalogAlibaba = async (id) => {
    const req = await axios.get(API_GET_SUB_CATALOG+id)

    return {
        type: GET_CATALOG_ALIBABA,
        payload: req
    }
}
export const fetchSubCatalog = async (id) => {
    const url = API_GET_SUB_CATALOG + id
    const req = await axios.get(url)
    return {
        type: GET_SUB_CATALOG,
        payload: req
    }
}
export const fetchSecondSubCatalog = async (id) => {
    const url = API_GET_SUB_CATALOG + id
    const req = await axios.get(url)
    return {
        type: GET_SECOND_SUB_CATALOG,
        payload: req
    }
}
export const fetchThirdSubCatalog = async (id) => {
    const url = API_GET_SUB_CATALOG + id
    const req = await axios.get(url)
    return {
        type: GET_THIRD_SUB_CATALOG,
        payload: req
    }
}
export const fetchFourthSubCatalog = async (id) => {
    const url = API_GET_SUB_CATALOG + id
    const req = await axios.get(url)
    return {
        type: GET_FOURTH_SUB_CATALOG,
        payload: req
    }
}
export const fetchItems = async (id, first) => {
    const url = API_GET_ITEMS + id + `</CategoryId>%3CSearchMethod%3EExtended%3C/SearchMethod%3E%3CMaximumPageCount%3E250%3C/MaximumPageCount%3E%3C/SearchItemsParameters%3E&framePosition=${first}&frameSize=50&blockList=AvailableSearchMethods`
    const req = await axios.get(url)
    return {
        type: GET_ITEMS,
        payload: req,
        id: id,
        url:url
    }
}
export const fetchBasket = async (id) => {
    const url = API_GET_BASKET + id
    const req = await axios.get(url)
    return {
        type: GET_BASKET,
        payload: req
    }
}
export const fetchNote = async (id) => {
    const url = API_GET_NOTE + id
    const req = await axios.get(url)
    return {
        type: GET_NOTE,
        payload: req
    }
}
export const clearBasketOrNote = async (id, method) => {
    const url = `http://otapi.net/service-json/Clear${method}?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${id}`
    const req = await axios.get(url)
    return {
        type: CLEAR_BASKET_OR_NOTE,
        payload: req
    }
}
export const removeItemFromBorN = async (id, method, ElId) => {
    const url = `http://otapi.net/service-json/RemoveItemFrom${method}?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${id}&elementId=${ElId}`
    const req = await axios.get(url)
    return {
        type: REMOVE_ITEM_FROM_B_OR_N,
        payload: req
    }
}
export const createOrder = async(token,weight,id,deliveryModeId,comment,userProfileId)=>{
    const url = ``
    const req = await axios.fetch(url)
    return{
        type:CREATE_ORDER,
        payload:req
    }
}