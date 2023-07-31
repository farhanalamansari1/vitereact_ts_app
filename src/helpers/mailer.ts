import nodemailer from 'nodemailer';
import User from "../models/userModel.js";
import bcrptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        else if(emailType==="FORGETPASSWORD"){
            await User.findByIdAndUpdate(userId,
                {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                
            })
            console.log("Some one Forget Password")
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "afc6183cf593f2",
              pass: "a989c249de67b4"
            }
          });
          let typeofemail="";
          if(emailType==="VERIFY"){
            typeofemail="verifyemail"
          }
          else if(emailType==="FORGETPASSWORD"){
            typeofemail="resetPassword"
          }

    const mailOptions={
        from: 'farhan.alamansaris@gmail.com',
        to : email,
        subject: emailType==="VERIFY"?"Verify your email":"Reset Password",
        html:`<p>Click <a href="${process.env.DOMAIN}/${typeofemail}?token=${hashedToken}">
        to ${emailType==="VERIFY"?"Verify your Email":"Reset Your Password"}</p>`
    }
    const mailResponse= await transport.sendMail(mailOptions)
   
    return mailResponse
        } 
     
    catch (error: any) {
            throw new Error(error.message);
        }
    }