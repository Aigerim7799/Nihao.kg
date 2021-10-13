import {GET_CATALOG_ALIBABA} from '../actions'

const initialstate=[
    
]

export default function(state=initialstate,action){
    switch(action.type){
        case GET_CATALOG_ALIBABA:
            [...state]=[action.payload.data?.CategoryInfoList.Content]
    }
    return state
}