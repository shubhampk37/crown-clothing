import { Fragment, useContext } from "react";  //used for no functional tag to act as a parent
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { NavLink, NavLinksContainer, NavigationContainer, LogoContainer } from "./navigation.styles";

const Navigation = ()=>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

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