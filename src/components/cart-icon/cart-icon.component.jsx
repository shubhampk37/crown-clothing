import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.jsx'
import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';
const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = ()=>(setIsCartOpen(!isCartOpen))

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon></ShoppingIcon>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;