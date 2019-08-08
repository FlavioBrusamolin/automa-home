angular.module("automaHome").config(function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "view/login.html",
		controller: "loginCtrl"
	});

	$routeProvider.when("/signup", {
		templateUrl: "view/cadastro.html",
		controller: "cadastroCtrl"
	});

	$routeProvider.when("/lighting", {
		templateUrl: "view/iluminacao.html",
		controller: "iluminacaoCtrl"
	});

	$routeProvider.when("/kitchen", {
		templateUrl: "view/cozinha.html",
		controller: "cozinhaCtrl"
	});

	$routeProvider.when("/garden", {
		templateUrl: "view/jardim.html",
		controller: "jardimCtrl"
	});

	$routeProvider.when("/waterreuse", {
		templateUrl: "view/agua.html",
		controller: "aguaCtrl"
	});

	$routeProvider.otherwise({ redirectTo: "/login" });
});