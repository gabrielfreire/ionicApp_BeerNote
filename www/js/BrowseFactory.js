angular.module('starter').factory("BrowseFactory", BrowseFactory);

function BrowseFactory(){
	var amountToSpend = undefined;
	
	var factory = {
		setAmountToSpend: setAmountToSpend,
		getAmountToSpend: getAmountToSpend
	}

	return factory;

	function setAmountToSpend(amount){
		amountToSpend = amount
	}

	function getAmountToSpend(){
		return amountToSpend;
	}
}