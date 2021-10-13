import {GET_CATALOG} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_CATALOG:
            [...state]=[action.payload.data?.CategoryInfoList?.Content]
    }
    return state
}