(function(angular, undefined) {
  angular.module("proftestApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"moder",
		"admin"
	]
})

;
})(angular);