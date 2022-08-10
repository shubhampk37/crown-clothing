import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss';
const defaultFormFields = {
    email:'',
    password:'',
}
const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{
           const {user} = await signInAuthUserWithEmailAndPassword(email,password);
           //setCurrentUser(user);
           resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrected password ');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default: console.log(error);
            }
            }
            
    }
    const signInWithGoogle =async ()=>{
        await signInWithGooglePopup();
        //setCurrentUser(user);
        
    }
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email & password</span>
            <form onSubmit={handleSubmit} autoComplete='off' >
                <FormInput label='Email' required type='email' onChange={handleChange} autoComplete='off' value={email} name='email' />  
                <FormInput label='Password' required type='password' onChange={handleChange} autoComplete='off' value={password} name='password' />
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;