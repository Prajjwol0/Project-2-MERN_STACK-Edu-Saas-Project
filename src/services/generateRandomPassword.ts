
import bcrypt from "bcrypt"

const randomPasswordGenerator = (teacherName:String)=>{

   const randomNumber= Math.floor(1000+Math.random()*90000)

   const passwordData={
  
      hashedVersion:bcrypt.hashSync(`${randomNumber}_${teacherName}`,10)
   }
   return passwordData

}
export default randomPasswordGenerator;