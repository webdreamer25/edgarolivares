// Module that names my form
var myApp = angular.module('myApp', []);

// myApp.config(['$routeProvider', function($routeProvider) {
// 	$routeProvider.
// 		when('/send', {
// 			templateUrl: 'views/send.html',
// 			controller: 'SendController'
// 		}).
// 		when('/sent', {
// 			templateUrl: 'views/sent.html',
// 			controller: 'SentController'
// 		}).
// 		otherwise({
// 			redirectTo: '/send'
// 		});
// }]);

/*------------------
	CONTROLLERS
--------------------*/	

myApp.controller('SendController', ['$scope', '$http', function($scope, $http) {
	$scope.result 					= 'hidden';
	$scope.resultMessage 			= 'message';
	$scope.contactData;
	$scope.submitButtonDisabled 	= false;
	$scope.submitted 				= false;

	$scope.submit = function (contactMe) {
		console.log(contactMe);
		$scope.submitted 					= true;
		$scope.submittedButtonDisabled		= true;

		if (contactMe.$valid) {
			$http({
				method: 'POST',
				url: 'contact.php',
				headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
			}).success(function (data) {
				if (data.success) {
					$scope.submitButtonDisabled 		= true;
					$scope.resultMessage						= data.message;
					$scope.result 										= 'bg-success';
				} else {
					$scope.submitButtonDisabled 		= false;
					$scope.resultMessage 						= data.message;
					$scope.result 									= 'bg-danger';
				}
			});
		} else {
			$scope.submitButtonDisabled 		= false;
			$scope.resultMessage 						= 'failed to submit.';
			$scope.result 									= 'bg-danger';
		}
	}

	// $scope.msg = 'Send me a message';
}]);
