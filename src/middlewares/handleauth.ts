import express from 'express';

let authRouter = express.Router();

authRouter.use('/', (req,res,next)=>{
    // Verify IF the user is Auth
    //let ary[] ="{'/Dog','/Dh'}";
    
    if(req.headers['authorization'])
    {
        // Check Auth Here
    }
    console.log('hello from auht');
    next();
});
export {authRouter};