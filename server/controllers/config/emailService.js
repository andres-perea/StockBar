const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});

const enviarCorreo = (correoElectronico, subject, text, callback) => {
  const mailOptions = {
    from: "",
    to: correoElectronico,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = enviarCorreo;
