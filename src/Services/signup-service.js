import axios from "axios";
export const signupHandler=async(username,number,email,password)=>{
    try{
        const data=await axios.post("https://travelin.cyclic.app/api/auth/register",{
            username:username,number:number,email:email,password:password
        })
        console.log("signed up")
        console.log(data);

    }catch(err){
        console.log("error in adding the user to the database")
    }
}