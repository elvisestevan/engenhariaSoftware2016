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
        connection.query('SELECT idartefatos, nome, ativo FROM artefatos', function (err, result) {
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
        connection.query('SELECT idartefatos, nome, ativo FROM artefatos where idartefatos = ?', id, function (err, result) {
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
        connection.query('UPDATE artefatos SET ? WHERE idartefatos = ?', [data, id], function (err, result) {
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
    var artefato = req.body;
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO artefatos SET ?', artefato, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                req.getConnection(function (err, connection){
                    connection.query('insert into artefatosstatus select idartefatos, 2 from artefatos where idartefatos not in (select artefatos_idartefatos from artefatosstatus)', function (err, result) {
                        
                    })
                });
                return res.status(200).json(result);
            }
        });
    });
});

module.exports = router;