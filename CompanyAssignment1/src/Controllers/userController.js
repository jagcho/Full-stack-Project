const UserModel = require("../model/user.js");
const jwt = require('jsonwebtoken');
const mongoose=require("mongoose");
const aws = require("aws-sdk");
const fs = require('fs');
const formidable = require('formidable');


//aws setup to upload file
aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
  
  let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
      let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // we will be using the s3 service of aws
  
      var uploadParams = {
        ACL: "public-read",
        Bucket: "classroom-training-bucket", //HERE
        Key: "abc/" + file.originalname, //HERE
        Body: file.buffer,
      };
  
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          return reject({ error: err });
        }
        // console.log(data)
        console.log("file uploaded succesfully");
        return resolve(data.Location);
      });
    });
  };


  //=======================================//===================================//=========================================//
  //User SignUp
const userSignup = async (req,res)=>{
    try{
    let data =req.body
    const {name, phone ,email,password,photo} = data;
   
    if (Object.keys(req.body).length == 0) return res.status(400).send({status:false,message:"Enter Your Details"});
 
    if(!name) return res.status(400).send({status:false,message:"Enter Your Name"});
    
    if(!phone) return res.status(400).send({status:false,message:"Enter Your Number"});

    if(!email)  return res.status(400).send({status:false,message:"Enter Your Email"});
 
    const emailRegex = /^[a-z0-9]{1,}@g(oogle)?mail\.com$/

    if(!emailRegex.test(email)) return res.status(400).send({status:false,message:"Enter Your valid Email"});

    if(!password) return res.status(400).send({status:false,message:"Enter Your Password"});

    const passwordRegex= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(!passwordRegex.test(password)) return res.status(400).send({status:false,message:"Enter valid password"});

     //===== validate and uplode profile photo in AWS S3======//
   
    let files = req.files;
     let fileData = files[0];
    
     if (files.length == 0) {
       return res.status(400).send({ message: "No Profile image found" });
     }
 
     if (!/([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|JPG|JPEG|PNG)/.test(fileData.originalname)) {
       return res
         .status(400)
         .send({ status: false, message: "please Add your profile Image with a valid only in JPG JPEG PNG." });
     }
 
     if (files && files.length > 0) {
       let uploadedFileURL = await uploadFile(files[0]);
       data.photo = uploadedFileURL;
     }
        
    let createUser = await UserModel.create(data)
     
    res.status(201).send({status:true,message:"create successfull",createUser})
    }
    catch (err) {
        console.log("This is the error :", err);
        res.status(500).send({ message: "Error", error: err });
      }
   
}

//============================//===============================//==========================================================//
//Login User
const login = async (req,res) =>{
   try{
    const {email, password} =req.body

    if (Object.keys(req.body).length == 0) return res.status(400).send({status:false,message:"Enter Your login Details"});

    if(!email)  return res.status(400).send({status:false,message:"Enter Your Email"});

    if(!password) return res.status(400).send({status:false,message:"Enter Your Password"});
 
    const check= await UserModel.findOne({email:email,password:password})

    if(!check) return res.status(404).send({status:false,message:"invalid login credentails"});

    res.status(200).send({status:true,message:"login successfull"})
   }
   catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ message: "Error", error: err.message });
  }
}

//=================================//=========================================================//
// upload through formidable

const upload =  (req, res) => {
	
	const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var oldpath = files.profilePic.filepath;
    var newpath = "C:/Users/jagad/OneDrive/Desktop/CompanyAssignment/upload/" + files.profilePic.originalFilename;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.send('File uploaded and moved!');
      res.end();
});
});
}


//====================================//======================================//========================================//

  //upload via AWS S3
// const uploadDocument = async(req,res)=>{
// try{
//     let files = req.files;
//     let fileData = files[0];

//     if (!/([/|.|\w|\s|-])*\.(?:pdf|PDF|csv|CSV|docx|DOCX|)/.test(fileData.originalname)) {
//         return res
//           .status(400)
//           .send({ status: false, message: "please upload valid file pdf,csv,docx" });
//       }
  
//       if (files && files.length > 0) {
//         let uploadedFileURL = await uploadFile(files[0]);
//         data.profileImage = uploadedFileURL;
//       }
//       res.status(201).send({status:true,message:"upload successful"})

//     }catch (err) {
//         console.log("This is the error :", err);
//         res.status(500).send({ message: "Error", error: err });
//       }

// }

module.exports = {userSignup,login,upload}