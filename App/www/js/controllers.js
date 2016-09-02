angular.module('scanner.controllers', [])
    .controller('HomeController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {
        var vm = this;

        vm.scan = function(){
            $ionicPlatform.ready(function() {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) {
                        // Success! Barcode data is here
                        vm.scanResults = result.text;
                    }, function(error) {
                        // An error occurred
                        vm.scanResults = 'Error: ' + error;
                    });
            });
        };

        vm.scanResults = '';
    });
