import "./Auth.css";
import { validateNumber,validatePassword } from "../../utils";
import { useAuth } from "../../context";
import { loginHandler } from "../../Services";

let isNumberValid,isPasswordValid;

export const AuthLogin=()=>{

    const {authDispatch,number,password} =useAuth();

    const handleNumberChange=(event)=>{

        isNumberValid=validateNumber(event.target.value);
        if(isNumberValid){
            console.log("valid number")
            authDispatch({
                type:"NUMBER",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid Number");
        }
    }

    const handlePasswordChange=(event)=>{
 
        isPasswordValid=validatePassword(event.target.value);

        if(isPasswordValid){
            console.log("valid password")
            authDispatch({
                type:"PASSWORD",
                payload:event.target.value
    
            })
        }else{
            console.log("Invalid password")
        }
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(isNumberValid && isPasswordValid){
            const {accessToken,username}=loginHandler(number,password);
            authDispatch({
                type:"SET_ACCESSTOKEN",
                payload:accessToken
            })
            authDispatch({
                type:"SET_USERNAME",
                payload:username
            })
        }
        authDispatch({
            type:"CLEAR_USER_DATA"
        })
        authDispatch({
            type:"SHOW_AUTH_MODAL"
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
                        defaultValue={number} className="auth-input" maxlength="10"
                        placeholder="Enter Mobile Number" required onChange={handleNumberChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password
                        <span className="asterik">*</span>{" "}
                    </label>
                    <input defaultValue={password} className="auth-input" placeholder="Enter Password" type="password" 
                            required onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Login</button>
                </div>
            </form>
            <div className="cta">
                <button className="button btn-outline-primary cursor">Login with Test Credentials</button>
            </div>

        </div>
    )
}