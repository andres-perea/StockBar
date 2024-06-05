const jwt = require("jsonwebtoken");
const secret = "";

const generarToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verificarToken = (token, callback) => {
    jwt.verify(token, secret, callback);
}

module.exports = { generarToken, verificarToken };