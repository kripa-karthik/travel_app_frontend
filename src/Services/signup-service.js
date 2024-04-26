import axios from "axios";
export const signupHandler=async(username,number,email,password,setAlert)=>{
    try{
        const data=await axios.post("https://travelin.cyclic.app/api/auth/register",{
            username:username,number:number,email:email,password:password
        })
        console.log("signed up")
        console.log(data);
        setAlert({
            open:true,
            message:`Account created::username-${username}`,
            type:"success"
        })

    }catch(err){
        console.log("error in adding the user to the database")
    }
}