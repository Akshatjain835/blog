import jwt from  'jsonwebtoken';
import { user } from '../modals/user.modal.js';

const createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign((userId),process.env.JWT_SECRET_KEY, {
        expiresIn:'7d'

    })
    res.cookie("jwt",token,{
        secure:true,
        sameSite:"strict",
        httpOnly:true,

    })

    await user.findByIdAndUpdate(userId,(token));
    return token;

}

export default createTokenAndSaveCookies;
