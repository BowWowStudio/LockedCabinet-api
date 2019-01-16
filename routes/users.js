"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET users listing.
 */
const express = require("express");
const schema_1 = require("./schema");
const router = express.Router();
router.post('/user', async (req, res, next) => {
    const userInformation = req.body;
    const result = await schema_1.UserModel.findOne({ id: userInformation.id, password: userInformation.password }).exec();
    if (result) {
        res.statusCode = 200;
        res.write(JSON.stringify(result));
    }
    else {
        res.statusCode = 404;
        res.write('not found');
    }
    res.end('');
});
router.post('/newUser', async (req, res, next) => {
    const newUserInfo = req.body;
    console.log(newUserInfo);
    const newUserModel = new schema_1.UserModel(newUserInfo);
    await newUserModel.save();
    res.send('');
});
exports.default = router;
