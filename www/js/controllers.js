angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  // Form data for the login modal
  vm.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/about.html', {
    scope: $scope
  }).then(function(modal) {
    vm.modal = modal;
  });

  // Triggered in the login modal to close it
  vm.closeAbout = function() {
    vm.modal.hide();
  };

  // Open the login modal
  vm.about = function() {
    vm.modal.show();
  };

  // Perform the login action when the user submits the login form
  vm.doLogin = function() {
    console.log('Doing login', vm.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      vm.closeAbout();
    }, 1000);
  };
});

