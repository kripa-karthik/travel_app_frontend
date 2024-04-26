import './Auth.css';
import { useAuth,useAlert } from '../../context';
import { validateName,validateEmail,validateNumber,validatePassword } from '../../utils';
import { signupHandler } from '../../Services';

let isNumberValid,isEmailValid,isNameValid,isPasswordValid,isConfirmPasswordValid;


export const AuthSignup=()=>{

    const {username,number,email,password,confirmPassword,authDispatch}=useAuth();
    const {setAlert}=useAlert();
    const handleNumberChange=(event)=>{

        isNumberValid=validateNumber(event.target.value);
        if(isNumberValid){
            console.log("Valid number");
            authDispatch({
                type:"NUMBER",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid Number");
        }
    }
    const handleNameChange=(event)=>{

        isNameValid=validateName(event.target.value);
        if(isNameValid){
            console.log("Valid input");
            authDispatch({
                type:"USERNAME",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid Name")
        }
    }
    const handleEmailChange=(event)=>{

        isEmailValid=validateEmail(event.target.value);

        if(isEmailValid){
            console.log("Valid input");
            authDispatch({
                type:"EMAIL",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid Email")
        }
    }
    const handlePasswordChange=(event)=>{
 
        isPasswordValid=validatePassword(event.target.value);

        if(isPasswordValid){
            console.log("Valid input");
            authDispatch({
                type:"PASSWORD",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid password")
        }
    }
    const handleConfirmPasswordChange=(event)=>{

        isConfirmPasswordValid=validatePassword(event.target.value);

        if(isConfirmPasswordValid){
            console.log("Valid input");
            authDispatch({
                type:"CONFIRM_PASSWORD",
                payload:event.target.value
    
            })    
        }else{
            console.log("Invalid password")
        }
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        if(isNumberValid && isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid){

            signupHandler(username,number,email,password,setAlert);
        }
        authDispatch({
            type:"CLEAR_USER_DATA"
        })
        authDispatch({
            type:"SET_TO_LOGIN"
        })

    }
    return(
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number 
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input 
                         className="auth-input" maxlength="10" defaultValue={number}
                        placeholder="Enter Mobile Number" required onChange={handleNumberChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Name
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input className="auth-input" placeholder="Enter name"
                        defaultValue={username} onChange={handleNameChange} required/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Email
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input className="auth-input" placeholder="Enter Email"
                            defaultValue={email} type="email" onChange={handleEmailChange} required/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input className="auth-input" placeholder="Enter Password" type="password"
                            defaultValue={password} onChange={handlePasswordChange} required/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Confirm Password
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input className="auth-input" placeholder="Enter Password" type="password"
                            defaultValue={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Submit</button>
                </div>
            </form>
            

        </div>
    )
}