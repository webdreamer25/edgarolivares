// Module that names my form
var myApp=angular.module("myApp",[]);myApp.controller("SendController",["$scope","$http",function(e,s){e.result="hidden",e.resultMessage="message",e.contactData,e.submitButtonDisabled=!1,e.submitted=!1,e.submit=function(t){console.log(t),e.submitted=!0,e.submittedButtonDisabled=!0,t.$valid?s({method:"POST",url:"contact.php",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(s){s.success?(e.submitButtonDisabled=!0,e.resultMessage=s.message,e.result="bg-success"):(e.submitButtonDisabled=!1,e.resultMessage=s.message,e.result="bg-danger")}):(e.submitButtonDisabled=!1,e.resultMessage="failed to submit.",e.result="bg-danger")}}]);
//# sourceMappingURL=../maps/js/app.js.map