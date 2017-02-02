angular.module('starter').factory("StorageFactory", StorageFactory);

function StorageFactory($timeout, $localStorage){
	$localStorage = $localStorage.$default({
		outData: [],
		beerPrice: '',
		amountToSpend: ''
	});
	var factory = {
		saveBeerPrice: saveBeerPrice,
		getBeerPrice: getBeerPrice,
		saveAmountToSpend: saveAmountToSpend,
		getAmountToSpend: getAmountToSpend,
		emptyStorage: emptyStorage,
		saveAllData: saveAllData,
		getAllData: getAllData
	}

	return factory;

	function saveBeerPrice(amount){
		$localStorage.beerPrice = amount;
	}

	function getBeerPrice(){
		return $localStorage.beerPrice;
	}

	function saveAmountToSpend(amountToSpend){
		$localStorage.amountToSpend = amountToSpend;
	}


	function getAmountToSpend(){
		return $localStorage.amountToSpend;
	}

	function emptyStorage(){
		$localStorage.$reset();
	}

	function saveAllData(data){
		$localStorage.outData.push(data);
	}

	function getAllData(){
		return $localStorage.outData;
	}
}