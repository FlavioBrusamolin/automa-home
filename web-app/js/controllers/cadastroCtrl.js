angular.module('automaHome').controller('cadastroCtrl', function ($scope, $location, usuarios) {
    $scope.usuario = {};

    $scope.cadastrar = function (usuario) {
        var promise = usuarios.cadastrar(usuario);
        promise.then(function (resultado) {
            $location.path('#!/login');
            alert('Cadastro realizado com sucesso.');
        });
        promise.catch(function (err) {
            alert('N\u00e3o foi possivel realizar o cadastro.');
        });
    };
});