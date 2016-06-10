/*global require,process,module*/
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

router.post('/authenticate', function (req, res) {
    'use strict';
    var login = req.body.login, senha = req.body.senha;
    req.getConnection(function (err, connection) {
        connection.query("SELECT idusuarios, nome, login, token, email, ativo FROM usuarios WHERE login = ? AND senha = ? and ativo = 1", [login, senha], function (err, result) {
            if (err) {
                return res.status(500).json(err);
            } else {
                if (result.length === 0) {
                    return res.status(401).json({type: false, message: "Login e/ou senha incorreto(s)"})
                }
                var usuario = result[0];
                if (usuario.token === null) {
                    usuario.token = jwt.sign(usuario, "thorpesecret");
                    req.getConnection(function (err, connection) {
                        connection.query('UPDATE usuarios SET ? WHERE idusuarios = ? ', [usuario, usuario.idusuarios],
                            function (err, result) {
                                if (err) { return res.status(400).json(err); }
                            });
                    });
                }
                req.getConnection(function (err, connection) {
                    connection.query('UPDATE usuarios SET ultimoLogin = now() WHERE idusuarios = ? ', [usuario.idusuarios],
                        function (err, result) {
                            if (err) { return res.status(400).json(err); }
                        });
                });
                res.setHeader('Token', usuario.token);
                return res.status(200).json(usuario);
            }
        });
    });
});

module.exports = router;