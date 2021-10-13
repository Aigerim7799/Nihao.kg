import {GET_FOURTH_SUB_CATALOG} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_FOURTH_SUB_CATALOG:
            [...state]=[action.payload?.data]
    }
    return state
}