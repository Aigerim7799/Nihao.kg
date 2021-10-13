import {GET_BASKET} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_BASKET:
            [...state]=[action.payload?.data]
    }
    return state
}