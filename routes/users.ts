/*
 * GET users listing.
 */
import express = require('express');
import { NextFunction } from 'express-serve-static-core';
import { UserModel } from './schema';
import { UserInformation } from './model/user.model';
import { userInfo } from 'os';
const router = express.Router();

router.post('/user', async (req: express.Request, res: express.Response,next:NextFunction) => {
    const userInformation = req.body as UserInformation;
    const result = await UserModel.findOne({id:userInformation.id,password:userInformation.password}).exec();
   
    if(result){
        res.statusCode = 200;
        res.write(JSON.stringify(result));
    }else{
        res.statusCode = 404;
        res.write('not found');
    }
    res.end('');
});
router.post('/newUser', async (req:express.Request,res:express.Response,next:NextFunction)=>{
    const newUserInfo = req.body as UserInformation;
    console.log(newUserInfo);
    const newUserModel = new UserModel(newUserInfo);
    await newUserModel.save();
    res.send('');
})
export default router;