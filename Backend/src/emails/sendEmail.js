const nodemailer = require("nodemailer");
const fs = require("fs").promises;

async function sendEmail(to, subject, link, userName) {
  try {
    // Read the EJS template from the file
    const template = await fs.readFile(
      "./backend/src/emails/email.ejs",
      "utf-8"
    );

    // Render the template with dynamic values
    const html = template
      .replace(
        /<a data-qa="verification_link" href=\${link}/g,
        `<a data-qa="verification_link" href=${link}`
      )
      .replace(/Hello\s+\${userName},/g, `Hello ${userName},`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDEMAIL,
        pass: process.env.SENDPASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Blood Pressure" <${process.env.SENDEMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// async function sendEmail(to, subject, link, userName) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SENDEMAIL,
//       pass: process.env.SENDPASSWORD,
//     },
//   });
//   const html = `<head><style type="text/css" title="x-apple-mail-formatting"></style>
//   <title>Typeform</title>
//   <meta name="viewport" content="width = 375, initial-scale = -1">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="x-apple-disable-message-reformatting">
//   <link rel="stylesheet" href="https://font.typeform.com/dist/font-email.css">
//   <style type="text/css">
//   @font-face{font-family:apercu-pro;font-style:normal;font-weight:400;src:local("apercu-pro"),url(https://font.typeform.com/dist/fonts/ApercuPro-Regular.woff2) format("woff")}
//   body,td{font-family:Arial,Helvetica,sans-serif}
//   strong {
//   font-weight: bold;}
//   p{margin:0;padding:0 0 1em 0}
//   a{text-decoration:none}
//       @media all and (max-width: 520px) {
//             .hide_on_mobile{display:none !important}
//       .show_on_mobile{display:block !important;margin:auto !important; float:left !important}
//             .fullwidth{width:100% !important;height:auto !important;min-width:100% !important;float:none !important}
//             .padded{box-sizing:border-box;padding-left:10px !important;padding-right:10px !important}
//             #logo{float:none !important}
//             .button{font-size:16px !important}
//     .content td{padding-right:10px !important}
//         }
//         @media screen{
//             body,td{font-family:apercu-pro,sans-serif !important}
//         }
//   </style>
// <style type="text/css">
// </style>
// <style type="text/css">
// </style>
// </head>
// <body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" rightmargin="0" bottommargin="0" bgcolor="#FFFFFF" style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:none">
// <div style="display:none;font-size:1px;color:#FFFFFF;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden">
//           <p>You registered an account on our website, before being able to use your account you need to verify that this is your email address by clicking here.</p>
//       </div>
//   <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FFFFFF" class="fullwidth">
//     <tbody><tr>
//       <td>
//         <table border="0" cellpadding="0" cellspacing="0" width="600" class="fullwidth" align="center" style="margin:auto">
//         <tbody>
//           <tr>
//             <td class="content">
//       <div mc:repeatable="Hero Section">
//         <table border="0" cellpadding="0" cellspacing="0" width="100%">
//         <tbody><tr>
//           <td style="padding:0 30px" class="padded">

//             <table border="0" cellpadding="0" cellspacing="0" width="100%" class="fullwidth" style="border-bottom:1px solid #e7e7e7">
//             <tbody><tr>
//               <td style="padding:20px 0;text-align:left;font-weight:500;font-size:24px;color:#343333" class="avenir" mc:edit="title">Hello ${userName},</td>
//               </tr>
//               <tr>
//               <td style="padding:0 80px 0 0;font-size:18px;line-height:167%;font-weight:400;color:#343333" mc:edit="copy 1">
//                                           <p>You registered an account on our website! ,
//                                           before being able to use your account you need to verify that this is your email address by clicking here.</p>
//                                    </td>
//               </tr>
//               <tr>
//               <td style="padding:30px 0 60px 0" mc:edit="button">
//                 <!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" bgcolor="#343333"><tr><td align="left"><![endif]-->
//                 <div align="left">
//                   <a data-qa="verification_link" href=${link} style="text-decoration:none;color:#FFFFFF;background-color:#343333;display:inline-block;padding:15px 20px;margin:auto;border:2px solid #343333;border-radius:3px;font-size:18px;font-weight:500" class="button">
//                                             Verify my email
//                                         </a>
//                 </div>
//                 <!--[if mso]></td></tr></table><![endif]-->
//               </td>
//             </tr>
//             </tbody></table>
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" class="fullwidth">
//             <tbody><tr>
//               <td style="padding:20px 80px 0 0;font-size:16px;line-height:167%;font-weight:400;color:#343333" mc:edit="copy 2">
//                 <p>This link will self-destruct in 1 hours.<br> Didn’t ask for this email? Just ignore me.								</p></td>
//             </tr>
//             </tbody></table>
//           </td>
//         </tr>
//         </tbody></table>
//               </div>
//     </td>
//         </tr>
//           </tbody></table>
//   </td>
//  </tr>
//   </tbody></table>
//   </body> `;

//   const info = await transporter.sendMail({
//     from: `"Blood Pressure" <${process.env.SENDEMAIL}>`, // sender address
//     to, // list of receivers
//     subject, // Subject line
//     html, // html body
//   });
// }
//export default sendEmail;
