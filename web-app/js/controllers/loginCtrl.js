angular.module('automaHome').controller('loginCtrl', function ($scope, usuarios, $rootScope) {
	$scope.usuario = {};

	$scope.entrar = function (usuario) {
		var promise = usuarios.autenticar(usuario.email, usuario.senha);
		promise.then(function (retorno) {
			window.location.replace("#!/lighting");
		});
		promise.catch(function (err) {
			$scope.usuario = {};
			alert('O e-mail ou a senha est\u00e3o incorretos.');
		});
	};

	clearInterval($rootScope.reqAgua);
	clearInterval($rootScope.reqIluminacao);
    clearInterval($rootScope.reqJardim);
    clearInterval($rootScope.reqCozinha);
});