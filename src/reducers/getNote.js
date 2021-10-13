import {GET_NOTE} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_NOTE:
            [...state]=[action.payload?.data]
    }
    return state
}