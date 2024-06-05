const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
console.log('JWT_SECRET:', secret); 

const generarToken = (payload) => {
  if (!secret) {
    throw new Error("El secreto JWT no está definido");
  }
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verificarToken = (token, callback) => {
  if (!secret) {
    throw new Error("El secreto JWT no está definido");
  }
  jwt.verify(token, secret, callback);
};

module.exports = { generarToken, verificarToken };
