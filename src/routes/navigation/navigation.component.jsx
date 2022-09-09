import { Fragment} from "react";  //used for no functional tag to act as a parent
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavLink, NavLinksContainer, NavigationContainer, LogoContainer } from "./navigation.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
const Navigation = ()=>{
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

    return(
      <Fragment>
        <NavigationContainer>
        <NavLink to='/'>
            <CrownLogo className='logo'/>
        </NavLink>
        <NavLinksContainer>
            <NavLink className='nav-link' to='/shop'>Shop</NavLink>
            {
              currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>):(<Link className="nav-link" to='/auth' >SIGN IN</Link>)
            }
            <CartIcon/>
        </NavLinksContainer>
        { isCartOpen && <CartDropdown/> }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }
export default Navigation;  