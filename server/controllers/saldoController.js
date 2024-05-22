const Saldo = require("../models/saldoModel");

exports.obtenerSaldo = (req, res) => {
  Saldo.obtenerSaldo((Saldo) => {
    res.json(Saldo);
  });
};
