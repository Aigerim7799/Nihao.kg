import {CLEAR_BASKET_OR_NOTE} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case CLEAR_BASKET_OR_NOTE:
            [...state]=[action.payload?.data]
    }
    return state
}