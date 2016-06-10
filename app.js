// declarando todos os pacotes necessários
/*global require,module*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var connection  = require('express-myconnection');
var config = require('./config');
var security = require('./app/server/routes/security');
var user = require('./app/server/routes/user');
var artefatos = require('./app/server/routes/artefatos');
var produtos = require('./app/server/routes/produtos');
var projetos = require('./app/server/routes/projetos');
var tarefas = require('./app/server/routes/tarefas');
var status = require('./app/server/routes/status');

/*global process*/
var port = process.env.PORT || 8080;
app.set('JWT_SECRET', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static(__dirname + '/app/client'));

/*global connection*/
app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '310890',
        port: 3306,
        database: 'tgfatec'
    }, 'request')
);

app.use('/api/usuarios', user);
app.use('/api/artefatos', artefatos);
app.use('/api/produtos', produtos);
app.use('/api/projetos', projetos);
app.use('/api/tarefas', tarefas);
app.use('/api/status', status);
app.use('/api/', security);

app.listen(port);
/*global console*/
console.log('Mágica acontecendo em http://localhost:' + port);

module.exports = app;