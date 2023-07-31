var jwt = require('jsonwebtoken');
var jwt_secret="farhanisgoodboy"
const fetchuser=(req,resp,next)=>{
    //get the user from the jwt and add id to the request
    const token=req.header('auth-token')
    if(!token){
        resp.status(401).send({error:"please authenticate using a valid token"})
    }
    try{
        const data=jwt.verify(token, jwt_secret)
        req.user=data.user;
        next()
    }
    catch(error){
        resp.status(401).send({error:"please authenticate using a valid token"})
    }
    

}
module.exports=fetchuser;