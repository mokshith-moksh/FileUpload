const File = require("../models/Files");
const cloudinary = require("cloudinary").v2;

//localfileupload handlers
exports.localFileUpload = async (req, res) => {
   // how to fetch the file from the request
   const file = req.files.file;
   console.log("FILE", file);

   let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
   console.log("PATH->", path);
    
   file.mv(path , (err)=>{
    console.log("ERROR", err);
   });

   res.json({
    success:true,
    message: "File uploaded successfully"
   })

};     


function isFileTypeSupported(type,supportedTypes){
return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file,folder,quality){
// to upload the file these fumction do that work
const options = {folder};

options.resource_type = "auto"; // detects the file type image/video/raw or other file

if(quality){
  options.quality = quality;
}
//middleware in the indexjs is giving temp path to file.
console.log("tempFile Path",file.tempFilePath);
return await cloudinary.uploader.upload(file.tempFilePath,options);

}


//imageUpload
exports.imageUpload = async (req, res) => {
try{
   const {name,tags,email} = req.body;
   console.log(name, tags, email);

   const file = req.files.imageFile;
   console.log(file);

   //validation
   const supportedTypes = ["jpg","jpeg","png"];
   const fileType = file.name.split('.')[1].toLowerCase();
   console.log(fileType);

   //function need to be called to perform the validation 
if(!isFileTypeSupported(fileType,supportedTypes)){
return res.status(400).json({success:false});
}
console.log("uploading image to MokshFolder");
const response = await (file,"MokshFolder");
console.log(response);


//save the entry to DB
const fileData = await File.create({
    name,
    email,
    tags,
    imageUrl:response.secure_url,

})
res.json({
    success:true,
    secure_url:response.secure_url,
    massage:'Image Upload Success'
})

}


catch(err){
  console.log(err);
  res.json({
    success:false,
    message:'something went wrong'
  })
}
}

//video upload handler
exports.videoUpload = async (req, res) => {
  try{
     const {name,tags,email} = req.body;
     console.log(name, tags, email);
  
     const file = req.files.videoFile;
     console.log(file);
  
     //validation
     const supportedTypes = ["mp4","mov"];
     const fileType = file.name.split('.')[1].toLowerCase();
     console.log(fileType);
  
     //function need to be called to perform the validation 
  if(!isFileTypeSupported(fileType,supportedTypes)){
  return res.status(400).json({success:false});
  }
  console.log("uploading video to MokshFolder");
  const response = await uploadFileToCloudinary(file,"MokshFolder");
  console.log(response);
  
  
  //save the entry to DB
  const fileData = await File.create({
      name,
      email,
      tags,
      videoUrl:response.secure_url,
  
  })
  res.json({
      success:true,
      secure_url:response.secure_url,
      massage:'Image Upload Success'
  })
  
  }
  
  
  catch(err){
    console.log(err);
    res.json({
      success:false,
      message:'something went wrong 2'
    })
  }
  }
  
//imageSizeReducer
exports.imageSizeReducer = async (req,res) => {
  try{
    const {name,tags,email} = req.body;
    console.log(name, tags, email);
 
    const file = req.files.imageFile;
    console.log(file);
 
    //validation
    const supportedTypes = ["jpg","jpeg","png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log(fileType);
 
    //function need to be called to perform the validation 
 if(!isFileTypeSupported(fileType,supportedTypes)){
 return res.status(400).json({success:false});
 }

 console.log("uploading image to MokshFolder");
 const response = await uploadFileToCloudinary(file,"MokshFolder",30);
 console.log(response);
 
 
 //save the entry to DB
 const fileData = await File.create({
     name,
     email,
     tags,
     imageUrl:response.secure_url,
 
 })
 res.json({
     success:true,
     secure_url:response.secure_url,
     massage:'Image Upload Success'
 })
 
 }
 
 
 catch(err){
   console.log(err);
   res.json({
     success:false,
     message:'something went wrong'
   })
 }
 
  
}