import { createContext, useState, useEffect } from "react";

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
    //   const index = cartItems.indexOf(productToRemove);
    //   cartItems.splice(index,1)
    //     return cartItems;
    }   
    //return new array with modified cartItems
    
    return cartItems.map((cartItem)=>
            cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity-1}: cartItem
        )
}

const clearCartItems = (cartItems, itemToClear)=>{
    return cartItems.filter((cartItem)=>cartItem.id !== itemToClear.id)
}

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const count = cartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
        setCartCount(count)
        const totalAmount = cartItems.reduce((total, {price, quantity})=>total + price*quantity,0);
        setCartTotal(totalAmount);
        },[cartItems])

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItems(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItems(cartItems, productToRemove))
    }
    const clearItemFromCart = (itemToClear)=>{
        setCartItems(clearCartItems(cartItems, itemToClear))
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal,removeItemFromCart, clearItemFromCart}; 

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}