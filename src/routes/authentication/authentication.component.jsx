import { auth, signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form copy/sign-in-form.component";
import './authentication.styles.scss';
const Authentication = () =>{
    return (
        <div className="authentication-container">
        <SignInForm></SignInForm>
        <SignUpForm/>
        </div>
        
    )
}

export default Authentication;