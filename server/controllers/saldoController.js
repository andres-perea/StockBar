const Saldo = require("../models/saldoModel");

exports.MostrarSaldo = (req, res) => {
  Saldo.mostrarSaldo((Saldo) => {
    res.json(Saldo);
  });
};
