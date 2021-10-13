import {GET_ITEMS} from '../actions'

const initialstate={
    note: [],
    config:[]
}

export default function(state=initialstate,action){
    switch(action.type){
        case GET_ITEMS:
            // return{ ...state,note: action.payload?.data.ErrorCode=='Ok'? action.payload?.data:null}
           if(action.id === state.note[0]?.Result?.Items?.Items?.Content[0].ExternalCategoryId) {
            return {...state, note: [...state.note,action.payload?.data],config:[...state.config,action.payload.config]}
            
            
           }else if(action.url == state?.config[0]?.url){
                return null
            }           
           else {
               return {...state,note:[action.payload?.data]}
              
           }
    
            
        }
    return state
}