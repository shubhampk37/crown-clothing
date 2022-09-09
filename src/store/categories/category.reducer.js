import {CATEGORIES_ACTION_TYPES} from './category.types'
export const CATEGORIES_INITIAL_STATE = {
    categories: [],
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action= {})=>{
    const {type, payload} = action;

    switch(type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state, categories: payload
            }
        default:
            //throw new Error(`Unhadled type $(type) in categoriesReducer`)
            return state;
        
    }
}