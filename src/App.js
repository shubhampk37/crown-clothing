import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.components";
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/authentication/authentication.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { createUserDocumentFromAuth, getCurrentUser, onAuthStateChangedListener, signOutUser } from "./utils/firebase/firebase.utils";
import { checkUserSession } from './store/user/user.action';
import {useDispatch} from 'react-redux'

const App = ()=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    // const unscubscribe = onAuthStateChangedListener((user)=>{
    //  if(user){
    //      createUserDocumentFromAuth(user);
    //  }
    //      dispatch(setCurrentUser(user));
    //  })
    //  return unscubscribe;
    dispatch(checkUserSession())
 }, [])
 

  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
    
  )
}
 export default App;