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

router.get('/', ensureAuthorized, function (req, res) {
    'use strict';
    req.getConnection(function (err, connection) {
        connection.query('SELECT idprojetos, nome, ativo, dataInicio, prazoEstimado, produtos_idprodutos FROM projetos', function (err, result) {
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
        connection.query('SELECT idprojetos, nome, ativo, dataInicio, prazoEstimado, produtos_idprodutos FROM projetos where idprojetos = ?', id, function (err, result) {
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
        connection.query('UPDATE projetos SET ? WHERE idprojetos = ?', [data, id], function (err, result) {
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
    var projeto = req.body;
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO projetos SET ?', projeto, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

module.exports = router;