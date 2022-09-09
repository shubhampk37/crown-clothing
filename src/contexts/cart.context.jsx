import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils'
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount: 0,
    cartTotal: 0,
})

const addCartItems = (cartItems, productToAdd)=>{
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
export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const cartReducer = (state, action)=>{
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default: throw new Error(`Unhanled type ${type} in cartReducer`)
    }
}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}
export const CartProvider = ({children})=>{
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(()=>{
    //     const count = cartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
    //     setCartCount(count)
    //     const totalAmount = cartItems.reduce((total, {price, quantity})=>total + price*quantity,0);
    //     setCartTotal(totalAmount);
    //     },[cartItems])
    
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems)=>{
        /* 
        generate newCartCount. ncTotal
        dispatch payload = {
            newCartItems, newCartCount, newCartTotal
        }
        */
        const newCartCount = newCartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
        const newCartTotal = newCartItems.reduce((total, {price, quantity})=>total + price*quantity,0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}))
    }
    const addItemToCart = (productToAdd)=>{
        const newCartItems = (addCartItems(cartItems, productToAdd))
        updateCartItemsReducer(newCartItems)
    }
    const removeItemFromCart = (productToRemove)=>{
        const newCartItems = (removeCartItems(cartItems, productToRemove))
        updateCartItemsReducer(newCartItems)
    }
    const clearItemFromCart = (itemToClear)=>{
        const newCartItems = (clearCartItems(cartItems, itemToClear))
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool)=>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal,removeItemFromCart, clearItemFromCart}; 

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}