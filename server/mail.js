const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
     service: 'gmail',
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     requireTLS: true,
     auth: {
       user: 'entpsave@gmail.com', //this should be same as 'from' address
       pass: '#W1ndow123'
      } 
   });

module.exports = mailTransporter;