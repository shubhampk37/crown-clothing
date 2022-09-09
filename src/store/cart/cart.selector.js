import { createSelector } from "reselect";

const selectCartReducer = (state) => {
    console.log(state.cart)
    return state.cart
}

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => {
        console.log(cart.isCartOpen)
        return cart.isCartOpen
    }
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, {price, quantity})=>total + price*quantity, 0)
)

// const newCartCount = newCartItems.reduce((total, cartItem)=>total + cartItem.quantity,0);
// const newCartTotal = newCartItems.reduce((total, {price, quantity})=>total + price*quantity,0);