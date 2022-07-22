import { Fragment } from "react";  //used for no functional tag to act as a parent
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';

const Navigation = ()=>{
    return(
      <Fragment>
        <div className="navigation">
        <Link className='logo-container' to='/'>
            <CrownLogo className='logo'/>
        </Link>
        <div className="nav-links-container">
            <Link className='nav-link' to='/shop'>Shop</Link>
            <Link className='nav-link' to='/auth'>SIGN IN</Link>
        </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }
export default Navigation;  