import { createAction } from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"

////////////
const addCartItems = (cartItems, productToAdd)=>{
    // console.log(cartItems)
    // console.log('ITEM EXISTS')
    // console.log(productToAdd)
    //find if the cartItems contains the product to add
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === productToAdd.id
        
    );
    //If found,increment qty
    if (existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1}: cartItem
        )
    }
    console.log('ADDED ITEM:',[...cartItems, {...productToAdd, quantity: 1}])
    return [...cartItems, {...productToAdd, quantity: 1}]
    //return new array with modified cartItems

}

const removeCartItems = (cartItems, productToRemove)=>{
    //find if the cartItems contains the product to add
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === productToRemove.id
    );
    
    //If found only 1 qty,remove
    if (existingCartItem.quantity===1){
       return cartItems.filter((cartItem)=>cartItem.id !== productToRemove.id)
    }   
    //return new array with modified cartItems
    
    return cartItems.map((cartItem)=>
            cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity-1}: cartItem
        )
}

const clearCartItems = (cartItems, itemToClear)=>{
    return cartItems.filter((cartItem)=>cartItem.id !== itemToClear.id)
}
////////////
export const setIsCartOpen = (bool)=> createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)

export const addItemToCart = (cartItems, productToAdd)=>{
    const newCartItems = addCartItems(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems)
}
export const removeItemFromCart = (cartItems, productToRemove)=>{
    const newCartItems = removeCartItems(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems)
}
export const clearItemFromCart = (cartItems, itemToClear)=>{
    const newCartItems = clearCartItems(cartItems, itemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartItems)
}
