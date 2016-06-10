(function() {
    var app = angular.module('tgfatec', ['ngRoute', 'ngStorage']);
    
    var token;
    var usuarioLogado = {};
        
    app.config(['$httpProvider', function ($httpProvider) {        
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
           return {
               'request': function (config) {
                   config.headers = config.headers || {};
                   if ($localStorage.token) {
                       config.headers.Authorization = $localStorage.token;
                   }
                   return config;
               },
               'responseError': function (response) {
                   if (response.status === 401 || response.status === 403) {
                       window.location.href = '/login.html';
                   }
                   return $q.reject(response);
               }
           };
        }]);        
    }]);
    
    app
    .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                
                $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html'
                })
                .when('/usuarios', {
                    templateUrl: 'templates/usuarios.html'
                })
                .when('/usuarios/add', {
                    templateUrl: 'templates/usuarioscrud.html'
                })
                .when('/usuarios/view/:id', {
                    templateUrl: 'templates/usuario.html'
                })
                .when('/usuarios/:id', {
                    templateUrl: 'templates/usuariosedit.html'
                })
                .when('/artefatos', {
                    templateUrl: 'templates/artefatos.html'
                })
                .when('/artefatos/add', {
                    templateUrl: 'templates/artefatoscrud.html'
                })
                .when('/artefatos/view/:id', {
                    templateUrl: 'templates/artefato.html'
                })
                .when('/artefatos/:id', {
                    templateUrl: 'templates/artefatosedit.html'
                })
                .when('/produtos', {
                    templateUrl: 'templates/produtos.html'
                })
                .when('/produtos/add', {
                    templateUrl: 'templates/produtoscrud.html'
                })
                .when('/produtos/view/:id', {
                    templateUrl: 'templates/produto.html'
                })
                .when('/produtos/:id', {
                    templateUrl: 'templates/produtosedit.html'
                })
                .when('/projetos', {
                    templateUrl: 'templates/projetos.html'
                })
                .when('/projetos/add', {
                    templateUrl: 'templates/projetoscrud.html'
                })
                .when('/projetos/view/:id', {
                    templateUrl: 'templates/projeto.html'
                })
                .when('/projetos/:id', {
                    templateUrl: 'templates/projetosedit.html'
                })
                .when('/relatoriotarefas/:tipo', {
                    templateUrl: 'templates/relatorio.html'
                })
                .when('/tarefas', {
                    templateUrl: 'templates/tarefas.html'
                })
                .when('/tarefas/add', {
                    templateUrl: 'templates/tarefascrud.html'
                })
                .when('/tarefas/view/:id', {
                    templateUrl: 'templates/tarefa.html'
                })
                .when('/tarefas/:id', {
                    templateUrl: 'templates/tarefasedit.html'
                })
                .otherwise('/');
            }]);
    
    app.controller('ArtefatoConsultaController', ['$http', function($http) {
        var artefatoConsultaController = this;
        artefatoConsultaController.artefatos = [];
        artefatoConsultaController.mensagemErro = {};
                
        $http({
            url: '/api/artefatos/',
            method: "GET"
        })
        .then(function successCallback(res) {
            artefatoConsultaController.artefatos = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                artefatoConsultaController.mensagemErro = res.data.message;
            }
        });
        
        this.ativa = function(id) {
            $http({
                url: '/api/artefatos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var artefato = res.data;
                artefato.ativo = 1;
                $http({
                    url: 'api/artefatos/' + artefato.idartefatos,
                    method: "PUT",
                    data: artefato
                })
                .then(function successCallback(res) {
                    window.location.href = '#/artefatos/view/' + artefato.idartefatos;
                }, function errorCallback(res) {
                    artefatoConsultaController.mensagemErro = res.data;
                    artefatoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    artefatoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
        this.desativa = function(id) {
            $http({
                url: '/api/artefatos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var artefato = res.data;
                artefato.ativo = 0;
                $http({
                    url: 'api/artefatos/' + artefato.idartefatos,
                    method: "PUT",
                    data: artefato
                })
                .then(function successCallback(res) {
                    window.location.href = '#/artefatos/view/' + artefato.idartefatos;
                }, function errorCallback(res) {
                    artefatoConsultaController.mensagemErro = res.data;
                    artefatoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    artefatoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
    }]);
    
    app.controller('ProdutoConsultaController', ['$http', function($http) {
        var produtoConsultaController = this;
        produtoConsultaController.produtos = [];
        produtoConsultaController.mensagemErro = {};
                
        $http({
            url: '/api/produtos/',
            method: "GET"
        })
        .then(function successCallback(res) {
            produtoConsultaController.produtos = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                produtoConsultaController.mensagemErro = res.data.message;
            }
        });
        
        this.ativa = function(id) {
            $http({
                url: '/api/produtos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var produto = res.data;
                produto.ativo = 1;
                $http({
                    url: 'api/produtos/' + produto.idprodutos,
                    method: "PUT",
                    data: produto
                })
                .then(function successCallback(res) {
                    window.location.href = '#/produtos/view/' + produto.idprodutos;
                }, function errorCallback(res) {
                    produtoConsultaController.mensagemErro = res.data;
                    produtoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    produtoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
        this.desativa = function(id) {
            $http({
                url: '/api/produtos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var produto = res.data;
                produto.ativo = 0;
                $http({
                    url: 'api/produtos/' + produto.idprodutos,
                    method: "PUT",
                    data: produto
                })
                .then(function successCallback(res) {
                    window.location.href = '#/produtos/view/' + produto.idprodutos;
                }, function errorCallback(res) {
                    produtoConsultaController.mensagemErro = res.data;
                    produtoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    produtoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
    }]);
    
    app.controller('UsuarioConsultaController', ['$http', function($http) {
        var usuarioConsultaController = this;
        usuarioConsultaController.usuarios = [];
        usuarioConsultaController.mensagemErro = {};
                
        $http({
            url: '/api/usuarios/',
            method: "GET"
        })
        .then(function successCallback(res) {
            usuarioConsultaController.usuarios = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                usuarioConsultaController.mensagemErro = res.data.message;
            }
        });
        
        this.ativa = function(id) {
            $http({
                url: '/api/usuarios/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var usuario = res.data;
                usuario.ativo = 1;
                $http({
                    url: 'api/usuarios/' + usuario.idusuarios,
                    method: "PUT",
                    data: usuario
                })
                .then(function successCallback(res) {
                    window.location.href = '#/usuarios/view/' + usuario.idusuarios;
                }, function errorCallback(res) {
                    usuarioConsultaController.mensagemErro = res.data;
                    usuarioConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    usuarioConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
        this.desativa = function(id) {
            $http({
                url: '/api/usuarios/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var usuario = res.data;
                usuario.ativo = 0;
                $http({
                    url: 'api/usuarios/' + usuario.idusuarios,
                    method: "PUT",
                    data: usuario
                })
                .then(function successCallback(res) {
                    window.location.href = '#/usuarios/view/' + usuario.idusuarios;
                }, function errorCallback(res) {
                    usuarioConsultaController.mensagemErro = res.data;
                    usuarioConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    usuarioConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
    }]);
    
    app.controller('ProjetoConsultaController', ['$http', function($http) {
        var projetoConsultaController = this;
        projetoConsultaController.projetos = [];
        projetoConsultaController.mensagemErro = {};
                
        $http({
            url: '/api/projetos/',
            method: "GET"
        })
        .then(function successCallback(res) {
            projetoConsultaController.projetos = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                projetoConsultaController.mensagemErro = res.data.message;
            }
        });
        
        this.ativa = function(id) {
            $http({
                url: '/api/projetos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var projeto = res.data;
                projeto.ativo = 1;
                $http({
                    url: 'api/projetos/' + projeto.idprojetos,
                    method: "PUT",
                    data: projeto
                })
                .then(function successCallback(res) {
                    window.location.href = '#/projetos/view/' + projeto.idprojetos;
                }, function errorCallback(res) {
                    projetoConsultaController.mensagemErro = res.data;
                    projetoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    projetoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
        this.desativa = function(id) {
            $http({
                url: '/api/projetos/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var projeto = res.data;
                projeto.ativo = 0;
                $http({
                    url: 'api/projetos/' + projeto.idprojetos,
                    method: "PUT",
                    data: projeto
                })
                .then(function successCallback(res) {
                    window.location.href = '#/projetos/view/' + projeto.idprojetos;
                }, function errorCallback(res) {
                    projetoConsultaController.mensagemErro = res.data;
                    projetoConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    projetoConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
    }]);
    
    app.controller('TarefaRelatorioController', ['$http', '$routeParams', function($http, $routeParams) {
        var tarefaRelatorioController = this;
        tarefaRelatorioController.tarefas = [];
        tarefaRelatorioController.mensagemErro = {};
                
        $http({
            url: '/api/tarefas/dashboard/' + $routeParams.tipo,
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaRelatorioController.tarefas = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                tarefaRelatorioController.mensagemErro = res.data.message;
            }
        });
        
    }]);
    
    app.controller('TarefaConsultaController', ['$http', function($http) {
        var tarefaConsultaController = this;
        tarefaConsultaController.tarefas = [];
        tarefaConsultaController.mensagemErro = {};
                
        $http({
            url: '/api/tarefas/',
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaConsultaController.tarefas = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                tarefaConsultaController.mensagemErro = res.data.message;
            }
        });
        
        this.ativa = function(id) {
            $http({
                url: '/api/tarefas/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var tarefa = res.data;
                tarefa.dataInicioEstimada = tarefa.dataInicioEstimada.substring(0, 10);
                tarefa.dataFimEstimada = tarefa.dataFimEstimada.substring(0, 10);
                tarefa.dataInicioReal = tarefa.dataInicioReal.substring(0, 10);
                tarefa.dataFimReal = tarefa.dataFimReal.substring(0, 10);
                tarefa.ativo = 1;
                $http({
                    url: 'api/tarefas/' + tarefa.idtarefas,
                    method: "PUT",
                    data: tarefa
                })
                .then(function successCallback(res) {
                    window.location.href = '#/tarefas/view/' + tarefa.idtarefas;
                }, function errorCallback(res) {
                    tarefaConsultaController.mensagemErro = res.data;
                    tarefaConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    tarefaConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
        this.desativa = function(id) {
            $http({
                url: '/api/tarefas/' + id,
                method: "GET"
            })
            .then(function successCallback(res) {
                var tarefa = res.data;
                tarefa.dataInicioEstimada = tarefa.dataInicioEstimada.substring(0, 10);
                tarefa.dataFimEstimada = tarefa.dataFimEstimada.substring(0, 10);
                tarefa.dataInicioReal = tarefa.dataInicioReal.substring(0, 10);
                tarefa.dataFimReal = tarefa.dataFimReal.substring(0, 10);
                tarefa.ativo = 0;
                $http({
                    url: 'api/tarefas/' + tarefa.idtarefas,
                    method: "PUT",
                    data: tarefa
                })
                .then(function successCallback(res) {
                    window.location.href = '#/tarefas/view/' + tarefa.idtarefas;
                }, function errorCallback(res) {
                    tarefaConsultaController.mensagemErro = res.data;
                    tarefaConsultaController.exibeErro = true;
                });
            }, function errorCallback(res) {
                if (res.status === 401) {
                    tarefaConsultaController.mensagemErro = res.data.message;
                }
            });
        };
        
    }]);
    
    app.controller('ArtefatoViewController', ['$http', '$routeParams', function($http, $routeParams) {
        var artefatoViewController = this;
        artefatoViewController.artefato = {};
        artefatoViewController.mensagemErro = {};
        
        $http({
            url: '/api/artefatos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            artefatoViewController.artefato = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                artefatoViewController.mensagemErro = res.data.message;
            }
        });
    }]);
    
    app.controller('ProdutoViewController', ['$http', '$routeParams', function($http, $routeParams) {
        var produtoViewController = this;
        produtoViewController.produto = {};
        produtoViewController.mensagemErro = {};
        
        $http({
            url: '/api/produtos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            produtoViewController.produto = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                produtoViewController.mensagemErro = res.data.message;
            }
        });
    }]);

    app.controller('UsuarioViewController', ['$http', '$routeParams', function($http, $routeParams) {
        var usuarioViewController = this;
        usuarioViewController.usuario = {};
        usuarioViewController.mensagemErro = {};
        
        $http({
            url: '/api/usuarios/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            usuarioViewController.usuario = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                usuarioViewController.mensagemErro = res.data.message;
            }
        });
    }]);
    
    app.controller('ProjetoViewController', ['$http', '$routeParams', function($http, $routeParams) {
        var projetoViewController = this;
        projetoViewController.projeto = {};
        projetoViewController.mensagemErro = {};
        
        $http({
            url: '/api/projetos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            projetoViewController.projeto = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                projetoViewController.mensagemErro = res.data.message;
            }
        });
    }]);
    
    app.controller('TarefaViewController', ['$http', '$routeParams', function($http, $routeParams) {
        var tarefaViewController = this;
        tarefaViewController.tarefa = {};
        tarefaViewController.mensagemErro = {};
        
        $http({
            url: '/api/tarefas/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaViewController.tarefa = res.data;
            
            $http({
                url: '/api/projetos/' + tarefaViewController.tarefa.projetos_idprojetos,
                method: "GET"
            })
            .then(function successCallback(res) {
                tarefaViewController.tarefa.projeto = res.data;
            });
            
            $http({
                url: '/api/usuarios/' + tarefaViewController.usuario.usuarios_idusuarios,
                method: "GET"
            })
            .then(function successCallback(res) {
                tarefaViewController.tarefa.usuario = res.data;
            });
            
            $http({
                url: '/api/status/' + tarefaViewController.status.status_idstatus,
                method: "GET"
            })
            .then(function successCallback(res) {
                tarefaViewController.tarefa.status = res.data;
            });
        }, function errorCallback(res) {
            if (res.status === 401) {
                tarefaViewController.mensagemErro = res.data.message;
            }
        });
    }]);
    
    app.controller('ArtefatoCrudController', ['$http', '$routeParams', function($http, $routeParams) {
        var artefatoCrudController = this;
        artefatoCrudController.artefato = {};
        
        if (typeof $routeParams.id !== 'undefined') {
            $http({
            url: '/api/artefatos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            artefatoCrudController.artefato = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                artefatoCrudController.mensagemErro = res.data.message;
            }
        });
        }
        
        this.cadastra = function() {
            
            $http({
                url: 'api/artefatos/',
                method: "POST",
                data: artefatoCrudController.artefato
            })
            .then(function successCallback(res) {
                var id = res.data.insertId;                
                window.location.href = '#/artefatos/view/' + id;
            }, function errorCallback(res) {
                artefatoCrudController.mensagemErro = res.data;
                artefatoCrudController.exibeErro = true;
            });
        };
        
        this.edita = function() {
            
            $http({
                url: 'api/artefatos/' + artefatoCrudController.artefato.idartefatos,
                method: "PUT",
                data: artefatoCrudController.artefato
            })
            .then(function successCallback(res) {
                window.location.href = '#/artefatos/view/' + artefatoCrudController.artefato.idartefatos;
            }, function errorCallback(res) {
                artefatoCrudController.mensagemErro = res.data;
                artefatoCrudController.exibeErro = true;
            });
        };
    }]);
    
    app.controller('ProdutoCrudController', ['$http', '$routeParams', function($http, $routeParams) {
        var produtoCrudController = this;
        produtoCrudController.produto = {};
        
        if (typeof $routeParams.id !== 'undefined') {
            $http({
            url: '/api/produtos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            produtoCrudController.produto = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                produtoCrudController.mensagemErro = res.data.message;
            }
        });
        }
        
        this.cadastra = function() {
            
            $http({
                url: 'api/produtos/',
                method: "POST",
                data: produtoCrudController.produto
            })
            .then(function successCallback(res) {
                var id = res.data.insertId;                
                window.location.href = '#/produtos/view/' + id;
            }, function errorCallback(res) {
                produtoCrudController.mensagemErro = res.data;
                produtoCrudController.exibeErro = true;
            });
        };
        
        this.edita = function() {
            
            $http({
                url: 'api/produtos/' + produtoCrudController.produto.idprodutos,
                method: "PUT",
                data: produtoCrudController.produto
            })
            .then(function successCallback(res) {
                window.location.href = '#/produtos/view/' + produtoCrudController.produto.idprodutos;
            }, function errorCallback(res) {
                produtoCrudController.mensagemErro = res.data;
                produtoCrudController.exibeErro = true;
            });
        };
    }]);
    
    app.controller('ProjetoCrudController', ['$http', '$routeParams', function($http, $routeParams) {
        var projetoCrudController = this;
        projetoCrudController.projeto = {};
        projetoCrudController.produtos = [];
        
        $http({
            url: '/api/produtos/',
            method: "GET"
        })
        .then(function successCallback(res) {
            projetoCrudController.produtos = res.data;
        });
        
        if (typeof $routeParams.id !== 'undefined') {
            $http({
            url: '/api/projetos/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            projetoCrudController.projeto = res.data;
            projetoCrudController.projeto.dataInicio = projetoCrudController.projeto.dataInicio.substring(0, 10);
            projetoCrudController.projeto.prazoEstimado = projetoCrudController.projeto.prazoEstimado.substring(0, 10);
        }, function errorCallback(res) {
            if (res.status === 401) {
                projetoCrudController.mensagemErro = res.data.message;
            }
        });
        }
        
        this.cadastra = function() {
            
            $http({
                url: 'api/projetos/',
                method: "POST",
                data: projetoCrudController.projeto
            })
            .then(function successCallback(res) {
                var id = res.data.insertId;                
                window.location.href = '#/projetos/view/' + id;
            }, function errorCallback(res) {
                projetoCrudController.mensagemErro = res.data;
                projetoCrudController.exibeErro = true;
            });
        };
        
        this.edita = function() {
            
            $http({
                url: 'api/projetos/' + projetoCrudController.projeto.idprojetos,
                method: "PUT",
                data: projetoCrudController.projeto
            })
            .then(function successCallback(res) {
                window.location.href = '#/projetos/view/' + projetoCrudController.projeto.idprojetos;
            }, function errorCallback(res) {
                projetoCrudController.mensagemErro = res.data;
                projetoCrudController.exibeErro = true;
            });
        };
    }]);
    
    app.controller('TarefaCrudController', ['$http', '$routeParams', function($http, $routeParams) {
        var tarefaCrudController = this;
        tarefaCrudController.tarefa = {};
        tarefaCrudController.projetos = [];
        tarefaCrudController.usuarios = [];
        
        $http({
            url: '/api/projetos/',
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaCrudController.projetos = res.data;
        });
        
        $http({
            url: '/api/usuarios/',
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaCrudController.usuarios = res.data;
        });
        
        if (typeof $routeParams.id !== 'undefined') {
            $http({
            url: '/api/tarefas/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            tarefaCrudController.tarefa = res.data;
            tarefaCrudController.tarefa.dataInicioEstimada = tarefaCrudController.tarefa.dataInicioEstimada.substring(0, 10);
            tarefaCrudController.tarefa.dataFimEstimada = tarefaCrudController.tarefa.dataFimEstimada.substring(0, 10);
            tarefaCrudController.tarefa.dataInicioReal = tarefaCrudController.tarefa.dataInicioReal.substring(0, 10);
            tarefaCrudController.tarefa.dataFimReal = tarefaCrudController.tarefa.dataFimReal.substring(0, 10);
        }, function errorCallback(res) {
            if (res.status === 401) {
                tarefaCrudController.mensagemErro = res.data.message;
            }
        });
        }
        
        this.cadastra = function() {
            
            $http({
                url: 'api/tarefas/',
                method: "POST",
                data: tarefaCrudController.tarefa
            })
            .then(function successCallback(res) {
                var id = res.data.insertId;                
                window.location.href = '#/tarefas/view/' + id;
            }, function errorCallback(res) {
                tarefaCrudController.mensagemErro = res.data;
                tarefaCrudController.exibeErro = true;
            });
        };
        
        this.edita = function() {
            
            tarefaCrudController.tarefa.usuarios_idusuarios = 3;
            
            $http({
                url: 'api/tarefas/' + tarefaCrudController.tarefa.idtarefas,
                method: "PUT",
                data: tarefaCrudController.tarefa
            })
            .then(function successCallback(res) {
                window.location.href = '#/tarefas/view/' + tarefaCrudController.tarefa.idtarefas;
            }, function errorCallback(res) {
                tarefaCrudController.mensagemErro = res.data;
                tarefaCrudController.exibeErro = true;
            });
        };
    }]);
    
    app.controller('UsuarioCrudController', ['$http', '$routeParams', function($http, $routeParams) {
        var usuarioCrudController = this;
        usuarioCrudController.usuario = {};
        
        if (typeof $routeParams.id !== 'undefined') {
            $http({
            url: '/api/usuarios/' + $routeParams.id,
            method: "GET"
        })
        .then(function successCallback(res) {
            usuarioCrudController.usuario = res.data;
        }, function errorCallback(res) {
            if (res.status === 401) {
                usuarioCrudController.mensagemErro = res.data.message;
            }
        });
        }
        
        this.cadastra = function() {
            
            $http({
                url: 'api/usuarios/',
                method: "POST",
                data: usuarioCrudController.usuario
            })
            .then(function successCallback(res) {
                var id = res.data.insertId;                
                window.location.href = '#/usuarios/view/' + id;
            }, function errorCallback(res) {
                usuarioCrudController.mensagemErro = res.data;
                usuarioCrudController.exibeErro = true;
            });
        };
        
        this.edita = function() {
            
            $http({
                url: 'api/usuarios/' + usuarioCrudController.usuario.idusuarios,
                method: "PUT",
                data: usuarioCrudController.usuario
            })
            .then(function successCallback(res) {
                window.location.href = '#/usuarios/view/' + usuarioCrudController.usuario.idusuarios;
            }, function errorCallback(res) {
                usuarioCrudController.mensagemErro = res.data;
                usuarioCrudController.exibeErro = true;
            });
        };
    }]);

    app.controller('UsuarioController', ['$http', '$location', '$localStorage', function($http, $location, $localStorage){
        var usuarioController = this;
        usuarioController.usuario = {};
        
        if ($localStorage.token) {
            $http({
                url: '/api/usuarios/me',
                method: "GET"                
            })
            .then(function successCallback(res) {
                  usuarioController.usuario = res.data;
            }, function errorCallback(res) {
                if (res.status === 401) {
                    usuarioController.mensagemErro = res.data.message;
                }
            });
        }
        
        this.logout = function() {
            window.localStorage.removeItem('ngStorage-token');
            window.location.href = '/login.html';
        };
        
        this.authenticate = function (usuario) {
            $http({
                url: '/api/authenticate',
                method: "POST",
                data: usuarioController.usuario,
                headers: {'Content-Type' : 'application/json'}
            })
            .then(function successCallback(res) {    
                //$localStorage.token = res.data.token;
                window.localStorage.setItem('ngStorage-token', JSON.stringify(res.data.token));
                window.location.href = '/';
            }, function errorCallback(res) {
                if (res.status === 401) {
                    usuarioController.mensagemErro = res.data.message;
                }
            })
        };

    }]);

  
})();
