//import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");

async function sendEmail(to,subject,html){
const transporter = nodemailer.createTransport({
service:'gmail',
  auth: {
    user: process.env.SENDEMAIL,
    pass: process.env.SENDPASSWORD ,//huyz yvhs ktcr ogcn
  },
}); 

const info = await transporter.sendMail({
    from: `"Infinity Light" <${process.env.SENDEMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });

}
//export default sendEmail;
module.exports = sendEmail;


