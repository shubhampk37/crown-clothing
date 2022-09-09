import { useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm = ()=>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;
    //console.log(formFields);
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            alert('passwords do not match');
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
           // setCurrentUser(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if(error.code==="auth/email-alreay-in-use"){
                console.log('cannot create user,email already exists');
                console.log(error.code);
                console.log(typeof(error.code));
                console.log('string');
        }
        
            
            else console.log('user creation encountered an error',error);
            //console.log(error.code)
        }
    }
    return(
        <div>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email & password</span>
            <form onSubmit={handleSubmit} autoComplete='off' >
                <FormInput label='Name' required type='text' onChange={handleChange} autoComplete='off' value={displayName} name='displayName'/> 

                <FormInput label='Email' required type='email' onChange={handleChange} autoComplete='off' value={email} name='email' />  

                <FormInput label='Password' required type='password' onChange={handleChange} autoComplete='off' value={password} name='password' />

                <FormInput label='Confirm Password' required type='password' onChange={handleChange} autoComplete='off' value={confirmPassword} name='confirmPassword' /> 
                <Button >SIGN UP</Button>  
            </form>
        </div>
    )
}
export default SignUpForm;