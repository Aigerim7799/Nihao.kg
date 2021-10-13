import {GET_THIRD_SUB_CATALOG} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_THIRD_SUB_CATALOG:
            [...state]=[action.payload?.data]
    }
    return state
}