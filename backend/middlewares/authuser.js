import { user } from "../modals/user.modal.js"
import jwt from "jsonwebtoken"

//userauthenticate
export const  isAuthenticated=async (req,res,next) => {
      try {
         const token=req.cookies.jwt;
         console.log("middleware",token);
         if(!token){
            return res.status(401).json({message:"user not authenticated"})
         }
         const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

         const user=await user.findById(decoded.userId);
         if(!user){
            return res.status(404).json({message:"user not found"})
         }

         req.user=user;
         next();

      } catch (error) {
        
          console.log("erroroccurring in Authentication");
          return res.status(401).json({message:"user not authenticcated"})
      }
}


//userauthorization

export const isAutho=(...roles) => {

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({message:`user with oven role donot exist`});
        }
        next();
    }
}