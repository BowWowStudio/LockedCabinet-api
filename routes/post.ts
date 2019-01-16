/*
 * GET users listing.
 */
import express = require('express');
import { NextFunction } from 'express-serve-static-core';
import { Post } from './model/post.model';
import {  PostModel } from './schema';
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    res.send(await PostModel.find(null,{ '_id': 0, 'title' :1, 'date': 1, 'body': 1}).exec());
});
router.post('/',async (req:express.Request,res:express.Response,next:NextFunction)=>{
    const body = req.body as Post;
    const newPost = new PostModel(body);
    await newPost.save();
    console.log('saved');
    res.status(200).send(true);
})
export default router;