const express= require("express")
const router=express.Router()
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')

const {userSignup,login,upload} = require("../Controllers/userController.js")

router.post('/user',userSignup)

router.post('/login',login)

router.post('/api/upload',upload)






module.exports =router

