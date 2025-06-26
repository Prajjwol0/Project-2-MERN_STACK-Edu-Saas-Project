

import jwt from "jsonwebtoken"

const generateJWTToken= (data:{
    id:string,
    instituteNumber ? : string
})=>{
    // @ts-ignore
    const token=jwt.sign({id:dataToEncrypt},process.env.JWT_SETCRET!,{
  expiresIn:process.env.JWT_EXPIRES_IN
}) //jwt.sign({name:"prjjwol"},"thisIsSecret") 
return token
}

export default generateJWTToken