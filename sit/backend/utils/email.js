const nodemailer = require("nodemailer");
require("dotenv").config();
// async..await is not allowed in global scope, must use a wrapper
async function email(emailConfig, receiverEmail, subject, text, cc, bcc) {
  try {
    //get the email config from database
    const { emailHost, emailPort, emailUser, emailPass } = emailConfig;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailUser, // sender address
      to: receiverEmail,
      cc: cc,
      bcc: bcc,
      subject: subject, // Subject line
      html: text,
    });
    return (message = { "Message sent: %s": info.messageId });
  } catch (error) {
    return (message = { error: error.message });
  }
}
module.exports = {
  email,
};
