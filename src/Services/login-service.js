import axios from "axios";

export const loginHandler=async(number,password,setAlert)=>{
    try{
        const {data:{accessToken,username},}=await axios.post("https://travelin.cyclic.app/api/auth/login",{
            number:number,password:password
        });
        console.log("Logged in");
        console.log({accessToken,username});
        localStorage.setItem("token",accessToken);
        localStorage.setItem("username",username);
        setAlert({
            open:true,
            message:"Login Successfull",
            type:"success"
        })
        return{accessToken,username};
    
    }catch(err){
        console.log("Unable to login")
    }

}