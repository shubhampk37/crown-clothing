import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import './cart-icon.styles.jsx'
import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';
const CartIcon = ()=>{
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isCartOpen))

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon></ShoppingIcon>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;