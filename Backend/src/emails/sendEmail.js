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
