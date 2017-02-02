angular.module('starter').controller('ConfigController', ConfigController);

 function ConfigController($state, $http, $scope, $timeout, $ionicLoading, StorageFactory) {
 	var vm = this;
 	vm.clearStorage = clearStorage;
 	vm.doRefresh = doRefresh;
 	vm.yodaSpeak = yodaSpeak;
 	vm.converterEuro = converterEuro;
 	vm.converterReal = converterReal;
 	
 	$scope.$on("$ionicView.beforeEnter", function() {
	    getOuts();     
	});
 	
 	
 	function clearStorage(){
 		$ionicLoading.show({
 			template:"<ion-spinner icon='bubbles' class='spinner-balanced'></ion-spinner><br>Esquecendo...",
 			duration: 1000
 		}).then(function(){
 			$timeout(function(){
 				StorageFactory.emptyStorage();
 				$state.reload();
 			},1000);	
 		});
 	}

 	function getOuts(){
 		vm.outsSaved = StorageFactory.getAllData();
 	}

 	function doRefresh(){
 		$timeout(function(){
 			$scope.$broadcast("scroll.refreshComplete");
 			$state.reload();
 		}, 1000);
 	}

 	function yodaSpeak(sentence){
 		$http({
 			method:"GET",
 			url: "https://yoda.p.mashape.com/yoda?sentence=" + sentence,
 			headers : { "X-Mashape-Key" : "glWNRX6KBimshGx6rFZUfE9uqg0sp1xkWlwjsnVzOilndk1GtW" }
 		}).then(function(response){
 			vm.yoda = response.data;
 		});
 	}

 	function converterEuro(real){
 		$http({
 			method:"GET",
 			url: "https://currencyconverter.p.mashape.com/?from=BRL&from_amount=" + real + "&to=EUR",
 			headers : { "X-Mashape-Key" : "glWNRX6KBimshGx6rFZUfE9uqg0sp1xkWlwjsnVzOilndk1GtW" }
 		}).then(function(response){
 			vm.convertido = response.data;
 		});
 	}
 	function converterReal(euro){
 		$http({
 			method:"GET",
 			url: "https://currencyconverter.p.mashape.com/?from=EUR&from_amount=" + euro + "&to=BRL",
 			headers : { "X-Mashape-Key" : "glWNRX6KBimshGx6rFZUfE9uqg0sp1xkWlwjsnVzOilndk1GtW" }
 		}).then(function(response){
 			vm.convertidoReal = response.data;
 		});
 	}

 }