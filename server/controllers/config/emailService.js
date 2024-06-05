const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "barmanage.contacto@gmail.com",
    pass: "deph dsxl poic zjof",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviarCorreo = (correoElectronico, subject, text, callback) => {
  const mailOptions = {
    from: "barmanage.contacto@gmail.com",
    to: correoElectronico,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = enviarCorreo;
