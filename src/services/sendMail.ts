
import nodemailer from 'nodemailer';

interface IMailInformation{
    to:string,
    subject:string,
    text:string
}

const sendMail=async (mailInformation:IMailInformation)=>{
// Mail pathauney logic goes here:
// Step 1: Create nodemailer Transport
// step 2: add service
// step 3: make auth --> Sender ko gmail ra password rakhney ,
// auth.user ma sender ko gmail rakhney ra password ma google ko app password k xa tehi rakhne 

const transporter=nodemailer.createTransport({
    service:"gmail",  //Gmail,yahoo etc (gmail ma pathauna milyo tara aru ma mildaina gmail rakhepaxi)
auth:{
    user:process.env.NODEMAILER_USER,
    pass:process.env.NODEMAILER_PASS   // real gmail ko pw haina --> app pw chahi hoo!!!!
}
})

const mailFormatObject = {
    from: "SaaS MERN <prajjwolpyakurel11@gmail.com>",
    to:mailInformation.to,
    subject:mailInformation.subject,
    text:mailInformation.text
}
try{
await transporter.sendMail(mailFormatObject)
}catch(error){
    console.log("error while sending mail: "+error)
}

}

export default sendMail;