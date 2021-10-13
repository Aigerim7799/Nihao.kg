import {CREATE_ORDER} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case CREATE_ORDER:
            [...state]=[action.payload?.data]
    }
    return state
}