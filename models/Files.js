const mongoose = require('mongoose');
const mailmodel = require('../controller/mailsender');

const fileSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   imageUrl:{
    type:String,
   },
   videoUrl:{
      type:String,
   },
   tags:{
    type:String,
   },
   email:{
    type:String,
   }
}); 

//there are two types of middleware post and pre
//post middleware
fileSchema.post("save",async (doc) =>{
   try {
    await mailmodel.mailsender(doc).then(result =>{console.log("done")}).catch(err =>{console.log(error => {console.log(error)});});
   } catch(err){
    console.log(err);
   }
})

const File = mongoose.model('File', fileSchema);
module.exports = File;