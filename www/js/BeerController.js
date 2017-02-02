angular.module('starter').controller('BeerController', BeerController);

 function BeerController($scope, $timeout, $state, BrowseFactory, amountToSpend, StorageFactory, $ionicLoading, $ionicPopup) {
 	var vm = this;
 	vm.amount = 0;
 	vm.beerPrice = StorageFactory.getBeerPrice();
 	vm.addBeer = addBeer;
 	vm.removeBeer = removeBeer;
 	vm.storePrice= storePrice;
 	vm.changePrice = changePrice;
 	vm.save = save;
 	vm.doRefresh = doRefresh;
 	vm.divideValue= divideValue;

 	$scope.$on("$ionicView.beforeEnter", function() {
	    vm.amountToSpend = StorageFactory.getAmountToSpend();      
	});


 	function doRefresh(){
 		$timeout(function(){
 			$scope.$broadcast("scroll.refreshComplete");
 			$state.reload();
 		}, 1000);
 	}

 	function storePrice(price){
 		vm.priceStored = price;
 		vm.chosePrice = true;
 		StorageFactory.saveBeerPrice(price);
 	}

 	function changePrice(price){
 		vm.beerPrice = price;
 		StorageFactory.saveBeerPrice(vm.beerPrice);
 	}

 	function addBeer(){
 		vm.amount++;
 		if(vm.amount == 1){
 			vm.priceStored = vm.beerPrice;
 		}else{
 			vm.priceStored = Number(vm.priceStored) + Number(vm.beerPrice);
 		}
 		vm.priceToPay = vm.priceStored;
 	}

 	function removeBeer(){
 		if(vm.amount <= 0){
 			vm.amount = 0;
 		}else{
 			vm.amount--;
 			vm.priceStored = Number(vm.priceStored) - Number(vm.beerPrice);
 			vm.priceToPay = vm.priceStored;
 		}
 	}

 	function save(price, amount, paid, div){
 		var data = {
 			price: price,
 			amnt: amount,
 			paid: paid,
 			div: div
 		};
 		$ionicLoading.show({
 			template: "<ion-spinner icon='bubbles' class='spinner-balanced'></ion-spinner><br>Salvando...",
 			duration: 1000
 		}).then(function(){
 			$timeout(function(){
		 		StorageFactory.saveAllData(data);
 			}, 1000);
 		});
 	}

 	function divideValue(){
 		var myPopup = $ionicPopup.show({
		     template: '<input type="number" ng-model="vm.numberOfPpl">',
		     title: 'Dividir a conta',
		     subTitle: 'Quantas pessoas vão dividir a conta?',
		     scope: $scope,
		     buttons: [
		       { 
		       		text: 'Cancelar' 
		       },
		       {
			         text: '<b>Dividir</b>',
			         type: 'button-positive',
			         onTap: function(e) {
				           if (!vm.numberOfPpl) {
					             //don't allow the user to close unless he enters wifi password
					             e.preventDefault();
				           } else {
				             	return vm.numberOfPpl;
				           }
			         }
		       },
		     ]
		});
	   myPopup.then(function(res) {
	     	vm.finalPriceAfterDivided = vm.priceToPay / res;
	   });
 	}


 	

 }