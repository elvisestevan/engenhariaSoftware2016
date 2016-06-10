/*global require,module*/
var express = require('express');
var router = express.Router();

var ensureAuthorized = function (req, res, next) {
    'use strict';
    var bearerToken = req.headers.authorization, bearer;
    if (typeof bearerToken !== 'undefined') {
        bearer = bearerToken.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};



router.get('/me', ensureAuthorized, function (req, res) {
    'use strict';
    var token = req.headers.authorization;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idusuarios, nome, login, email, ativo, ultimoLogin, roles FROM usuarios WHERE token = ?', [token], function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result[0]);
            }
        });
    });
});

router.get('/', ensureAuthorized, function (req, res) {
    'use strict';
    req.getConnection(function (err, connection) {
        connection.query('SELECT idusuarios, nome, login, email, ativo, ultimoLogin, roles FROM usuarios', function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.get('/:id', ensureAuthorized, function (req, res) {
    'use strict';
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idusuarios, nome, login, email, ativo, senha, roles FROM usuarios where idusuarios = ?', id, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result[0]);
            }
        });
    });
});

router.put('/:id', ensureAuthorized, function (req, res) {
    'use strict';
    var data = req.body, id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('UPDATE usuarios SET ? WHERE idusuarios = ?', [data, id], function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.post('/', ensureAuthorized, function (req, res) {
    'use strict';
    var usuario = req.body;
    usuario.alteraSenha = 1;
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO usuarios SET ?', usuario, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

module.exports = router;