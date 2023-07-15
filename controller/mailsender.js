const nodemailer = require('nodemailer');
require('dotenv').config();

exports.mailsender = async (doc) => {
  try{
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  
    let info = await transporter.sendMail({
      from: 'moksh',
      to: doc.email,
      subject: 'New file uploaded successfully',
      html: `<h2>Hello /h2> <p><a href="${doc.imageUrl}">${doc.imageUrl}</a> </p><`,
    });
  
    console.log('info', info);
  }catch(e){console.log("error", e);};
  };
  