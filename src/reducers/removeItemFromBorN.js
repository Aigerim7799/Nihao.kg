import {REMOVE_ITEM_FROM_B_OR_N} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case REMOVE_ITEM_FROM_B_OR_N:
            [...state]=[action.payload?.data]
    }
    return state
}