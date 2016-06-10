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
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas', function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.get('/dashboard/cadastradas', ensureAuthorized, function (req, res) {
    'use strict';
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas', function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.get('/dashboard/concluidas', ensureAuthorized, function (req, res) {
    'use strict';
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas WHERE status_idstatus = 2', function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.get('/dashboard/deadline', ensureAuthorized, function (req, res) {
    'use strict';
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas WHERE dataFimEstimada = \'2016-06-09\' AND status_idstatus = 1', function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

router.get('/dashboard/atrasadas', ensureAuthorized, function (req, res) {
    'use strict';
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas WHERE dataFimEstimada < \'2016-06-09\' AND status_idstatus = 1', function (err, result) {
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
        connection.query('SELECT idtarefas, nome, descricao, dataInicioEstimada, dataFimEstimada, dataInicioReal, dataFimReal, ativo, usuarios_idusuarios, projetos_idprojetos, status_idstatus FROM tarefas where idtarefas = ?', id, function (err, result) {
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
        connection.query('UPDATE tarefas SET ? WHERE idtarefas = ?', [data, id], function (err, result) {
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
    var tarefa = req.body;
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO tarefas SET ?', tarefa, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(result);
            }
        });
    });
});

module.exports = router;