const nodeMailer = require("nodemailer");
var transporter = nodeMailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "anshshah0961@gmail.com",
      pass: "J4GwOPS51WBbFDyp"
    }
});
const sendFileMail = async ({ from, to, subject, text, html }) => {
  let mailOptions = {
    from: `inShare <${from}>`,
    to,
    subject,
    text,
    html,
  };
  let info = await transporter.sendMail(mailOptions 
    // (error, info) => {
    // if (error) {
    //     // response = { error: "Something went wrong!" }
    //     console.log("<--->")
    //     console.log(error)
    //     throw new Error(error)
    // } else {
    //     console.log("<----------------------->")
    //     console.log("email sent : "+ info.response)
    // }   }

    );
    console.log(info)
};

module.exports = {
    sendFileMail
};
