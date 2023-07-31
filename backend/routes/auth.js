const express=require('express')
const router=express.Router();
const User=require('../models/Users')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwt_secret="farhanisgoodboy"
const sendEmail=require('../helpers/mailer')
const { body, validationResult } = require('express-validator');
require('dotenv').config();
var fetchuser= require('../middleware/fetchuser')




//GET A USER USING POST: "api/auth/" Doesnt require auth
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:5})

],async (req,resp)=>{
  let success=false;  
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ success,errors: errors.array() });
        }
        //check whether the email exist already
try{
   let user=await User.findOne({email: req.body.email})
   if(user){
    return resp.status(400).json({success,error:"sorry user already exist"})
   }
   var salt =await bcrypt.genSaltSync(10);
   const secPass=await bcrypt.hash(req.body.password,salt)
   console.log(salt+"yeh salt barwa ha")
   console.log(secPass+"yeh secure barwa ha")
   //create a new user
   user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
       user: {
        id:user.id

      }
        
      }
      const authToken=jwt.sign(data,process.env.TOKEN_SECRET)
      // console.log(jwt_data)
      success=true;
        //checking email
        
        const checkemail=await sendEmail({
          email:req.body.email,emailType:"VERIFY",
          userId: user._id
      })
      resp.json({success,authToken})
    }//catch errors
    catch(error){
        console.log(error.message)
        resp.status(500).send("some error occured")
    }},
)

//Authenticate  A USER USING POST: "api/auth/login" 
router.post('/login',[
  body('email',"Enter a valid email").isEmail(),
  body('password',"password cant not be blank").exists()


],async (req,resp)=>{
  let success=false;  
   //if there are errors, return bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    console.log("error ey paiuyan")
     return resp.status(400).json({ errors: errors.array() });
      
       }
       const {email, password}=req.body;
       try{
        let user=await User.findOne({email})
        console.log(user)
        if(!user){
          success=false;
         return resp.status(400).json({success,error:"Please login using Correct Credentials"})
         
           
  
        } 
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
          
          success=false;
          console.log(success,"password incorect")
          return resp.status(400).json({success,error:"Please login using Correct Credentials"})
             
  
        }
        const data={
          user: {
           id:user.id
         }
           
         }
         const authToken=jwt.sign(data,process.env.TOKEN_SECRET)
      
         // console.log(jwt_data)
         success=true;
        return resp.json({success,authToken})
       }
       catch(error){
        console.log(error.message+"end catch")
      return resp.status(500).send("Internal Server Error occured")
              // stop further execution in this callback
 
      
    }
  
})


//Route3:get logedin user details  A USER USING POST: "api/auth/getuser" 
router.post('/getuser',fetchuser,async (req,resp)=>{
try{
  var userid=req.user.id
  console.log(userid+ "id ai ha")
  const user=await User.findById(userid)
  console.log(user+ "checkup")
  resp.send(user)

}
catch(error){
  console.log(error.message)
  resp.status(500).send("Internal Server Error occured")
}

})

//verify email
router.post('/verifyemail',async(req,resp)=>{
  try {
    let success=false;  
    const token = req.body.token;
        // const { token } = reqBody;
        console.log(token,"token from rq body")
        const user = await User.findOne({
          verifyToken: token,
          verifyTokenExpiry: { $gt: Date.now() }
      });
      if(!user){
        return resp.status(400).json({success,error:"Sorry User not exist"})
      }
      user.isVerified=true;
      user.verifyToken=undefined;
      user.verifyTokenExpiry=undefined;
      await user.save();
      success=true;
      return resp.json({success,user});

  } catch (error) {
    console.log(error.message)
  resp.status(500).send("Internal Server Error occured")
  }
})

module.exports=router;