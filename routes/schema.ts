import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id:String,
    password:String
})
const postSchema = new mongoose.Schema({
    title:String,
    date:Date,
    body:String
})

export const UserModel = mongoose.model('User',userSchema)
export const PostModel = mongoose.model('Post',postSchema);