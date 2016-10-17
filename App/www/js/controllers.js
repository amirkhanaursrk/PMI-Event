angular.module('scanner.controllers', [])
    .controller('HomeController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $http, $ionicPopup) {
        var vm = this;
        vm.ip = "192.168.1.4"
        vm.setIP = function(){
          $ionicPopup.prompt({
   title: 'Ip Setter',
   template: 'Enter Your Ip',
   inputPlaceholder: 'Your IP'
 }).then(function(res) {
  console.log(String(res));
  vm.ip = String(res);
 });
        };
        vm.scan = function(){
            $ionicPlatform.ready(function() {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) {
                        // Success! Barcode data is here
                        vm.scanResults = result.text;
                        $http.get("http://"+vm.ip+":80/post/" + result.text)
                    .then(function(response){ vm.serverresponse = response.data; });
                    }, function(error) {
                        // An error occurred
                        vm.scanResults = 'Error: ' + error;
                    });
            });
        };

        vm.scanResults = '';
    });
