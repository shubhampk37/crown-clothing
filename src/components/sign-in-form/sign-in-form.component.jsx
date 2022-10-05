import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles.jsx';
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
const defaultFormFields = {
    email:'',
    password:'',
}
const SignInForm = ()=>{
    const dispatch = useDispatch()
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
           dispatch(emailSignInStart(email,password));
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
        dispatch(googleSignInStart())
    }
    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email & password</span>
            <form onSubmit={handleSubmit} autoComplete='off' >
                <FormInput label='Email' required type='email' onChange={handleChange} autoComplete='off' value={email} name='email' />  
                <FormInput label='Password' required type='password' onChange={handleChange} autoComplete='off' value={password} name='password' />
                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>GOOGLE SIGN IN</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}
export default SignInForm;