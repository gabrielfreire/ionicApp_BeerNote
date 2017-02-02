angular.module('starter').controller('BrowseController', BrowseController);

 function BrowseController($scope, $timeout, $ionicPopup, $state, BrowseFactory, $ionicLoading, StorageFactory) {
 	var vm = this;
 	vm.browse = "Browse";
 	vm.howMuchToSpend = undefined;
 	vm.setAmountToSpend = setAmountToSpend;
 	vm.doRefresh = doRefresh;

 	function setAmountToSpend(amount){
 		if(angular.isUndefined(amount)){
 			showConfirm();
 		}else{
	 		definirLimite(amount);
 		}
 	}

 	function doRefresh(){
 		$timeout(function(){
 			$scope.$broadcast("scroll.refreshComplete");
 			$state.reload();
 			vm.howMuchToSpend = undefined;
 		}, 1000);
 	}

 	function showConfirm() {
	    var confirmPopup = $ionicPopup.confirm({
	       title: 'Uau! Ta rico é?',
	       template: 'Não seria interessante definir um limite pra hoje?'
	    });
	    confirmPopup.then(function(res) {
	       if(res) {
	         	console.log('Não ta rico');
	       }else {
	       		definirLimite();
	         	
	       }
		});
	}

	function definirLimite(amount){
		$ionicLoading.show({
 			template:"<ion-spinner icon='bubbles' class='spinner-balanced'></ion-spinner><br>Calibrando o fígado...",
 			duration: 1000
 		}).then(function(){
 			StorageFactory.saveAmountToSpend(amount);
 			$timeout(function(){
	 			$state.transitionTo("app.beer");
 			}, 1000);
 		});
	}

	$scope.$on("$destroy", function(){
		vm.howMuchToSpend = undefined;
	});

 }